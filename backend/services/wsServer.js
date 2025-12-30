const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const Attendance = require("../models/Attendance");

const activeSessions = {}; // Shared in-memory object

function startWebSocketServer(server) {
  const wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws, req) => {
    const params = new URLSearchParams(req.url.replace("/ws?", ""));
    const token = params.get("token");

    if (!token) {
      ws.send(JSON.stringify({ event: "ERROR", data: { message: "Unauthorized, token missing" } }));
      return ws.close();
    }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      ws.user = { userId: decoded.id, role: decoded.role };
    } catch (err) {
      ws.send(JSON.stringify({ event: "ERROR", data: { message: "Unauthorized or invalid token" } }));
      return ws.close();
    }

    ws.on("message", async (msg) => {
      try {
        const message = JSON.parse(msg);
        const { event, data } = message;

        switch (event) {
          case "ATTENDANCE_MARKED":
            if (ws.user.role !== "teacher") {
              return ws.send(JSON.stringify({ event: "ERROR", data: { message: "Forbidden, teacher only" } }));
            }

            if (!activeSessions[data.classId]) {
              return ws.send(JSON.stringify({ event: "ERROR", data: { message: "No active attendance session" } }));
            }

            // Update in-memory attendance
            activeSessions[data.classId].attendance[data.studentId] = data.status;

            // Broadcast to all
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: "ATTENDANCE_MARKED", data }));
              }
            });
            break;

          case "MY_ATTENDANCE":
            if (ws.user.role !== "student") {
              return ws.send(JSON.stringify({ event: "ERROR", data: { message: "Forbidden, student only" } }));
            }

            const session = Object.values(activeSessions).find(sess => sess.attendance[ws.user.userId] !== undefined);
            const status = session?.attendance[ws.user.userId] || "not yet updated";
            ws.send(JSON.stringify({ event: "MY_ATTENDANCE", data: { status } }));
            break;

          case "TODAY_SUMMARY":
            if (ws.user.role !== "teacher") {
              return ws.send(JSON.stringify({ event: "ERROR", data: { message: "Forbidden, teacher only" } }));
            }

            const summarySession = activeSessions[data.classId];
            if (!summarySession) {
              return ws.send(JSON.stringify({ event: "ERROR", data: { message: "No active attendance session" } }));
            }

            const present = Object.values(summarySession.attendance).filter(s => s === "present").length;
            const absent = Object.values(summarySession.attendance).filter(s => s === "absent").length;
            const total = present + absent;

            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: "TODAY_SUMMARY", data: { present, absent, total } }));
              }
            });
            break;

          case "DONE":
            if (ws.user.role !== "teacher") {
              return ws.send(JSON.stringify({ event: "ERROR", data: { message: "Forbidden, teacher only" } }));
            }

            const doneSession = activeSessions[data.classId];
            if (!doneSession) return;

            const records = Object.entries(doneSession.attendance).map(([studentId, status]) => ({
              classId: data.classId,
              studentId,
              status
            }));

            await Attendance.insertMany(records);

            const presentCount = records.filter(r => r.status === "present").length;
            const absentCount = records.filter(r => r.status === "absent").length;

            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  event: "DONE",
                  data: { message: "Attendance persisted", present: presentCount, absent: absentCount, total: records.length }
                }));
              }
            });

            delete activeSessions[data.classId];
            break;

          default:
            ws.send(JSON.stringify({ event: "ERROR", data: { message: "Unknown event" } }));
        }
      } catch (err) {
        ws.send(JSON.stringify({ event: "ERROR", data: { message: "Invalid message format" } }));
      }
    });
  });

  return wss;
}

module.exports = { startWebSocketServer, activeSessions };
