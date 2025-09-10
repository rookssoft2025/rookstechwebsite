import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import logoName from "../../assets/rbName.svg";

const Navbar = () => {
    return (
        <nav className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-[24px] shadow-md border border-[#FFFFFF1A] flex justify-between items-center">

            <div className="font-bold text-sm tracking-wide">
                <img src={logoName} alt="logo" className="" />
            </div>

            <ul className="flex space-x-8 md:space-x-20 text-sm font-medium">
                <li className="cursor-pointer hover:text-gray-300">Services</li>
                <li className="cursor-pointer hover:text-gray-300">About</li>
                <li className="cursor-pointer hover:text-gray-300">Works</li>
                <li className="cursor-pointer hover:text-gray-300">Careers</li>
            </ul>

            <div className="relative group w-[170px] h-[48px] overflow-hidden">
                <div className="cursor-pointer absolute inset-0 flex items-center justify-end space-x-3 transition-all duration-300 group-hover:opacity-0">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 bg-[#0B3470] text-white hover:bg-[#0A2E63] transition-colors duration-200">
                        <ArrowUpRight size={16} />
                    </button>
                    <button className="px-4 py-2 rounded-full bg-[#0B3470] text-white text-sm font-semibold hover:bg-[#0A2E63] transition-colors duration-200">
                        Get Started
                    </button>
                </div>

                <button className="cursor-pointer absolute inset-0 flex items-center justify-center gap-2 bg-[#0B3470] text-white pl-1 pr-6  rounded-full font-medium shadow-lg hover:shadow-xl
                    transform translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    <div className="bg-black p-2 rounded-full">
                        <ArrowRight size={16} />
                    </div>
                    <span>Get Started</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
