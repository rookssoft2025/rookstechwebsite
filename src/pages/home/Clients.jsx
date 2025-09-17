import React, { useState, useEffect, useRef } from "react";
import InfoBlock from "../../uiComponents/InfoComponent";
import { Star } from "lucide-react"; // star icon

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
            name: "Rahul Menon",
            title: "Product Manager",
            org: "EduTech Solution",
            rating: "4.5",
            description:
                "Their expertise in UI/UX design helped us launch an engaging platform that our customers love. The attention to detail was impressive",
        },
        {
            name: "Arun Prakash",
            title: "Director",
            org: "BuildRight Constructions",
            rating: "4.8",
            description:
                "A reliable tech partner who truly understands business needs. Their solutions help us scale with confidence.",
        },
        {
            name: "Sophia Iyer",
            title: "Founder",
            org: "GreenLeaf Organics",
            rating: "4.7",
            description:
                "We loved how professional and innovative the team was. Their creative solutions exceeded our expectations.",
        },
        {
            name: "Karthik Rao",
            title: "CTO",
            org: "FinTech Hub",
            rating: "5.0",
            description:
                "Excellent collaboration and flawless execution. Highly recommend them for complex digital projects.",
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

                    // reset when scrolled halfway (end of first set)
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
