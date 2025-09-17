import React from "react";
import { motion } from "framer-motion";
import jothiVideo from "../../assets/videos/jothi.mp4";
import parkInsight from "../../assets/videos/parkInsight.mp4";
import rooks from "../../assets/videos/rooks.mp4";
import { div } from "framer-motion/client";

export default function WorkCards() {
    const workCards = [
        {
            title: "Jothi",
            description:
                "Jothi is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
            video: jothiVideo,
        },
        // {
        //   title: "Park Insight",
        //   description:
        //     "Park Insight is a mobile application that helps you find the best deals on parking spaces.",
        //   video: parkInsight,
        // },
        {
            title: "Rooks",
            description:
                "Rooks is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
            video: rooks,
        },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <div className="">
            <div className="">
                <h1 className="text-center font-semibold text-white text-[46px]">Latest Projects</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mx-auto">
                {workCards.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden shadow-lg bg-[#0F2239] text-white"
                    >
                        {/* Video */}
                        <video
                            src={card.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full object-cover"
                        />

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-sm text-gray-300 mt-1">{card.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

    );
}


// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { Observer } from "gsap/Observer";
// import SplitType from "split-type"; // use "split-type" instead of old SplitText

// import jothiVideo from "../../assets/videos/jothi.mp4";
// import parkInsight from "../../assets/videos/parkInsight.mp4";
// import rooks from "../../assets/videos/rooks.mp4";

// gsap.registerPlugin(Observer);

// export default function WorkCards() {
//   const sectionsRef = useRef([]);
//   const wrappersRef = useRef([]);
//   const headingsRef = useRef([]);
//   const currentIndex = useRef(-1);
//   const animating = useRef(false);

//   const workCards = [
//     {
//       title: "Jothi",
//       description:
//         "Jothi is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
//       video: jothiVideo,
//     },
//     {
//       title: "Park Insight",
//       description:
//         "Park Insight is a mobile application that helps you find the best deals on parking spaces.",
//       video: parkInsight,
//     },
//     {
//       title: "Rooks",
//       description:
//         "Rooks is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
//       video: rooks,
//     },
//     {
//       title: "Jothi Again",
//       description:
//         "Jothi is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
//       video: jothiVideo,
//     },
//   ];

//   useEffect(() => {
//     const wrap = gsap.utils.wrap(0, workCards.length - 1);

//     const splitHeadings = headingsRef.current.map(
//       (el) => new SplitType(el, { types: "chars" })
//     );

//     gsap.set(wrappersRef.current, { yPercent: 100 });

//     function gotoSection(index, direction) {
//       index = wrap(index);
//       animating.current = true;
//       const fromTop = direction === -1;
//       const dFactor = fromTop ? -1 : 1;

//       let tl = gsap.timeline({
//         defaults: { duration: 1.25, ease: "power1.inOut" },
//         onComplete: () => (animating.current = false),
//       });

//       if (currentIndex.current >= 0) {
//         gsap.set(sectionsRef.current[currentIndex.current], { zIndex: 0 });
//         tl.to(wrappersRef.current[currentIndex.current], {
//           yPercent: -15 * dFactor,
//         }).set(sectionsRef.current[currentIndex.current], { autoAlpha: 0 });
//       }

//       gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
//       tl.fromTo(
//         wrappersRef.current[index],
//         { yPercent: 100 * dFactor },
//         { yPercent: 0 },
//         0
//       ).fromTo(
//         splitHeadings[index].chars,
//         { autoAlpha: 0, yPercent: 150 * dFactor },
//         {
//           autoAlpha: 1,
//           yPercent: 0,
//           duration: 1,
//           ease: "power2",
//           stagger: { each: 0.02, from: "random" },
//         },
//         0.2
//       );

//       currentIndex.current = index;
//     }

//     Observer.create({
//       type: "wheel,touch,pointer",
//       wheelSpeed: -1,
//       onDown: () =>
//         !animating.current && gotoSection(currentIndex.current - 1, -1),
//       onUp: () =>
//         !animating.current && gotoSection(currentIndex.current + 1, 1),
//       tolerance: 10,
//       preventDefault: true,
//     });

//     gotoSection(0, 1);
//   }, [workCards.length]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {workCards.map((card, i) => (
//         <section
//           key={i}
//           ref={(el) => (sectionsRef.current[i] = el)}
//           className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white opacity-0"
//         >
//           <div
//             ref={(el) => (wrappersRef.current[i] = el)}
//             className="w-full h-full flex flex-col items-center justify-center p-6"
//           >
//             <video
//               src={card.video}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="absolute w-full h-full object-cover top-0 left-0 -z-10 opacity-70"
//             />
//             <h2
//               ref={(el) => (headingsRef.current[i] = el)}
//               className="text-4xl font-bold mb-4 uppercase"
//             >
//               {card.title}
//             </h2>
//             <p className="max-w-xl text-center">{card.description}</p>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }
