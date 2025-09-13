export default function AboutHero() {
    return (
        <div className="relative overflow-hidden">
                     <div className="w-full flex flex-col justify-center text-white relative ">
                       <div className="flex items-center justify-center relative">
                         <h1 className="text-center font-goodtimes text-[50px] sm:text-[100px] md:text-[140px] lg:text-[170px] leading-tight whitespace-nowrap text-white relative blur-fade">
                           TECH <br /> SOLUTIONS
                         </h1>
               
                         <img
                           src={gearImg1}
                           alt="gear"
                           className="hidden md:block absolute right-30 z-50 top-130 -translate-y-1/2 w-full  md:w-[400px] object-cover animate-[spin_20s_linear_infinite]"
                         />
                       </div>
               
                       <p className="mt-8 font-semibold text-start text-[20px] md:text-[50px] leading-snug max-w-4xl relative z-10">
                        WE BUILD DIGITAL SOLUTIONS <br /> THAT DRIVE GROWTH, BOOST <br /> EFFICIENCY, AND GIVE YOUR <br /> BUSINESS A COMPETITIVE EDGE.
                       </p>
                       <div
                         className="absolute inset-0 block md:hidden bg-center bg-no-repeat bg-contain animate-[spin_20s_linear_infinite] opacity-60"
                         style={{ backgroundImage: `url(${gearImg1})` }}
                       ></div>
                      
                     </div>
                   </div>
    )}