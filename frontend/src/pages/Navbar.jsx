import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <nav className="w-full p-6 flex items-center font-inconsolata text-xl/8">
      <div className="flex items-center gap-2 font-hegarty text-2xl">
        <img src={logo} className="w-6 h-6" alt="logo" />
        Presently
      </div>

      <ul className="flex flex-row gap-8 ml-auto">
        <li><a>About</a></li>
        <li><a>Sign up</a></li>
        <li>
          <a>
            <button className="bg-[#5BC3EB] w-24 border-2 border-r-4 border-b-4 border-slate-900 rounded-md flex items-center justify-center hover:opacity-90 cursor-pointer">
              Login
            </button>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
