import { motion } from "framer-motion";
import BotAnimation from "../../uiComponents/animations/Bot";

export default function CareersCard() {

    const info2 = [
        {
            id: "01",
            title: "User-Focused Products",
            description:
                "We design and deliver digital products that are scalable, reliable, and built around user needs.",
        },
        {
            id: "02",
            title: "Design-Driven Strategy",
            description:
                "By combining creativity with technology and strategy, we create solutions that drive measurable results.",
        },
        {
            id: "03",
            title: "Partnerships That Last",
            description:
                "We believe in building long-term relationships through trust, transparency, and collaboration.",
        },
        {
            id: "04",
            title: "Future-Ready Innovation",
            description:
                "We continuously innovate to ensure our clients stay adaptive, competitive, and ahead of the curve.",
        },
    ];
    const fadeUp = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 sm:mr-20">
                <motion.div
                    className="cols-span-1 space-y-10"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="">
                        <BotAnimation />
                    </div>
                    <div className="text-white text-[30px] font-semibold ">
                        <p>
                            A clear vision, a strong mission, and values that guide everything
                            we create
                        </p>
                    </div>
                </motion.div>
                <div
                    className="flex flex-col gap-5 items-center w-full col-span-2 max-h-[600px] overflow-y-auto pt-5"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

                    {info2.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#0F2239] flex gap-10 text-white items-center justify-between rounded-3xl"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            variants={fadeUp}
                        >
                            {(item.id === "01" || item.id === "03") && <div className="w-2/6 flex items-center justify-center p-5">
                                <h1 className="text-[100px] font-semibold">{item.id}</h1>
                            </div>}
                            <div className="space-y-5 pr-5 pl-5">
                                <p className="text-[30px] font-semibold">{item.title}</p>
                                <p className="text-[20px] font-semibold">{item.description}</p>
                            </div>
                            {(item.id === "02" || item.id === "04") && <div className="w-2/6 flex items-center justify-center p-5">
                                <h1 className="text-[100px] font-semibold">{item.id}</h1>
                            </div>}
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.div
                className="mt-11 w-full overflow-x-auto hide-scrollbar"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
            </motion.div>


        </>
    );
}
