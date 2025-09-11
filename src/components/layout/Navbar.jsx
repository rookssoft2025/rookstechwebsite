import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import logoName from "../../assets/rbName.svg";
import AnimatedButton from "../../uiComponents/AnimatedButton";

const Navbar = () => {
    return (
        <nav className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-[24px] shadow-md border border-[#FFFFFF1A] flex justify-between items-center">

            <div className="font-bold text-sm tracking-wide block">
                <img src={logoName} alt="logo" className="" />
            </div>

            <ul className="flex space-x-8 sm:space-x-10  md:space-x-15 lg:space-x-20 text-sm font-medium">
                <li className="cursor-pointer hover:text-[#0B3470]">Services</li>
                <li className="cursor-pointer hover:text-[#0B3470]">About</li>
                <li className="cursor-pointer hover:text-[#0B3470]">Works</li>
                <li className="cursor-pointer hover:text-[#0B3470]">Careers</li>
            </ul>

            <AnimatedButton label="Get Started" />
        </nav>
    );
};

export default Navbar;
