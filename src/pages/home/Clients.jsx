import React, { useState, useEffect, useRef } from "react";
import InfoBlock from "../../uiComponents/InfoComponent";
import { Star } from "lucide-react";

export default function Clients() {
    const info = [
        {
            title: "What Our Clients Say About Us",
            description:
                "We value the trust our clients place in us, and their words reflect the quality, reliability, and impact of our work across industries.",
        },
    ];

    const clients = [
        {
            name: "Dr. Srinivasan",
            title: " Srinivasa Hospital",
            rating: "5.0",
            description:
                "The CCTV and networking setup was completed smoothly without affecting our daily operations. The system is stable, and their support team is always responsive.",
        },
        {
            name: "Dr. Susan William",
            title: "William Hospital",
            rating: "5.0",
            description:
                "We’ve seen a clear improvement in security and network performance after the upgrade. Everything was delivered on time and professionally managed.",
        },
        {
            name: "Dr. Sunjay",
            title: "Kani Hospital",
            rating: "5.0",
            description:
                "The surveillance coverage and server setup have made monitoring much easier for us. Reliable service and excellent support.",
        },
        {
            name: "Dr. Gopalakrishnan",
            title: "GS Lifts",
            rating: "5.0",
            description:
                "From installation to after-sales support, the team handled everything efficiently. We now feel confident about our IT infrastructure.",
        },
         {
            name: "Mr. Mari Selvan",
            title: "G. R. Furniture",
            rating: "5.0",
            description:
                "The Web application has made it much easier to track production, inventory, and orders in real time. Our workflow is smoother, and communication between departments has improved a lot",
        },
        {
            name: "Mr. Vijay Kumar",
            title: " Vijay Hardwares and Plywoods",
            rating: "5.0",
            description:
                "The Charity Financial Management System has made tracking donations and expenses simple and transparent. It greatly improved our reporting accuracy and overall financial accountability.",
        },
    ];
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let scrollInterval;
        if (!isPaused) {
            scrollInterval = setInterval(() => {
                if (carouselRef.current) {
                    carouselRef.current.scrollLeft += 1;
                    if (
                        carouselRef.current.scrollLeft >=
                        carouselRef.current.scrollWidth / 2
                    ) {
                        carouselRef.current.scrollLeft = 0;
                    }
                }
            }, 30);
        }
        return () => clearInterval(scrollInterval);
    }, [isPaused]);

    return (
        <div className="py-12">
            <div className="sm:px-10">
                {info.map((item, index) => (
                    <InfoBlock
                        key={index}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>

            <div
                ref={carouselRef}
                className="flex gap-5 sm:gap-15 overflow-x-auto px-4 mt-8 sm:mt-10"
                style={{
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}</style>

                {[...clients, ...clients].map((item, index) => (
                    <div
                        key={index}
                        className="min-w-[300px] sm:min-w-[350px] max-w-[350px] bg-[#0F2239] p-6 rounded-2xl border border-[#FFFFFF1A] shadow-md text-white flex flex-col justify-between"
                    >
                        <p className="text-sm mb-4 leading-relaxed">{item.description}</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-xs">{item.title}</p>
                                <p className="text-xs opacity-70">{item.org}</p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star size={16} fill="currentColor" />
                                <span className="text-sm text-white">{item.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
