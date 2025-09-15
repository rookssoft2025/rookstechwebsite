import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import logoName from "../../assets/rbName.svg";
import AnimatedButton from "../../uiComponents/AnimatedButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-[24px] shadow-md border border-[#FFFFFF1A] flex justify-between items-center">

            <div className="font-bold text-sm tracking-wide block">
                <img
                    onClick={() => navigate("/")}
                    src={logoName}
                    alt="logo"
                    className="cursor-pointer transition-all duration-100  hover:drop-shadow-[0_0_16px_white]"
                />
            </div>

            <ul className="flex space-x-8 sm:space-x-10 md:space-x-15 lg:space-x-20 text-sm font-medium">
               
                <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-[#0B3470] hover:[text-shadow:0_0_8px_white,0_0_16px_white]">
                    IT Services
                </li>
                 <li onClick={() => navigate("/solutions")} className="cursor-pointer hover:text-[#0B3470] hover:[text-shadow:0_0_8px_white,0_0_16px_white]">
                    Tech Solutions
                </li>
                <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-[#0B3470] hover:[text-shadow:0_0_8px_white,0_0_16px_white]">
                    About
                </li>
                <li onClick={() => navigate("/work")} className="cursor-pointer hover:text-[#0B3470] hover:[text-shadow:0_0_8px_white,0_0_16px_white]">
                    Works
                </li>
                <li onClick={() => navigate("/careers")} className="cursor-pointer hover:text-[#0B3470] hover:[text-shadow:0_0_8px_white,0_0_16px_white]">
                    Careers
                </li>
            </ul>

            <AnimatedButton label="Get Started" />
        </nav>
    );
};

export default Navbar;
