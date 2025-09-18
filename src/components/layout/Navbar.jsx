import React, { useState, useContext } from "react";
import { ArrowUpRight, ArrowRight, Menu, X } from "lucide-react";
import logoName from "../../assets/rbName.svg";
import AnimatedButton from "../../uiComponents/AnimatedButton";
import { useNavigate } from "react-router-dom";
import { SplashContext } from "../../App";
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { setShowSplash } = useContext(SplashContext);

    const handleNavigate = (path, withSplash = false) => {
        if (withSplash) {
            setShowSplash(true); 
            setTimeout(() => navigate(path), 1200); 
        } else {
            navigate(path);
        }
        setIsMobileMenuOpen(false);
    };
    const navItems = [
        { label: "Technology", path: "/solutions" },
        { label: "IT Services", path: "/services" },
        { label: "Research", path: "/research" },
        { label: "About", path: "/about" },
        { label: "Works", path: "/work" },
        { label: "Careers", path: "/careers" }
    ];
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <>
            <nav className="w-full bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-2 rounded-[24px] shadow-md border border-[#FFFFFF1A] flex justify-between items-center relative z-50">
                <div className="font-bold text-sm tracking-wide block">
                    <img
                        onClick={() => handleNavigate("/", true)} 
                        src={logoName}
                        alt="logo"
                        className="max-w-full h-auto w-auto max-h-12 cursor-pointer transition-all duration-100 hover:drop-shadow-[0_0_16px_white]"
                    />
                </div>
                <ul className="hidden lg:flex space-x-6 xl:space-x-8 text-sm font-medium">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleNavigate(item.path)}
                            className="cursor-pointer hover:text-[#0B3470] hover:[text-shadow:0_0_8px_white,0_0_16px_white] transition-all duration-300 whitespace-nowrap"
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
                <div className="hidden lg:block cursor-pointer">
                    <AnimatedButton label="Get Started" onClick={scrollToBottom} />
                </div>

                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu size={20} />
                </button>
            </nav>
            <div
                className={`fixed inset-0  backdrop-blur-md z-40 transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw]  text-white z-50 transform transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="py-8 px-6 bg-white/10 backdrop-blur-md relative rounded-3xl mt-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-10 h-10 top-1 right-1 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 absolute"
                    >
                        <X size={30} />
                    </button>
                    <ul className="space-y-6">
                        {navItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleNavigate(item.path)}
                                className="group cursor-pointer py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-300 border-l-4 border-transparent hover:border-white"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-md font-medium group-hover:text-white/90 transition-colors">
                                        {item.label}
                                    </span>
                                    <ArrowRight
                                        size={18}
                                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-12 px-4">
                        <button
                            onClick={() => handleNavigate("/contact")}
                            className="w-full bg-white text-[#0B3470] py-4 rounded-xl font-semibold text-md hover:bg-white/90 transition-all duration-300 flex items-center justify-center space-x-2 group"
                        >
                            <span>Get Started</span>
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/20 text-center">
                        <p className="text-white/60 text-sm">
                            Ready to transform your business?
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                            Contact us today for a consultation
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;