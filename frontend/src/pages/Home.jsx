import React from 'react'
import Navbar from './Navbar'
import hero from '../assets/hero.png'



const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />

            <section className="min-h-[85vh] flex items-center px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">

                    {/* LEFT */}
                    <div>
                        <h1 className="font-hegarty text-7xl leading-tight text-[#36382E]">
                            the <span className="text-[#D14081]">smart </span>way <br />
                            to track <br />
                            <span className="text-[#345995]">your attendance.</span>
                        </h1>

                        <p className="mt-6 font-inconsolata text-[20px] max-w-xl font-semibold text-[#4C1036]">
                            A platform that streamlines attendance and class management,
                            connecting teachers and students in real time.
                        </p>

                        <div className="mt-8 flex gap-5">
                            <button className="py-2 w-36 font-hegarty text-lg bg-[#48ACF0]
          border-2 border-r-4 border-b-4 border-slate-900 rounded-md
          transition hover:translate-y-[1px] active:translate-y-[3px]
          active:border-b-2 active:border-r-2">
                                Get Started
                            </button>

                            <button className="py-2 w-36 font-hegarty text-lg bg-[#E3D0D8]
          border-2 border-r-4 border-b-4 border-slate-900 rounded-md
          transition hover:translate-y-[1px] active:translate-y-[3px]
          active:border-b-2 active:border-r-2">
                                Know More
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src={hero}
                            alt="Attendance illustration"
                        />
                    </div>

                </div>
            </section>

        </div>
    )
}

export default Home
