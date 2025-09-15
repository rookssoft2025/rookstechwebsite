
import InfoBlock from "../../uiComponents/InfoComponent";
import gearImg1 from "../../assets/about/aboutHolo.svg";
import { div } from "framer-motion/client";
export default function CoreValues() {

    const info1 = [
        {
            title: "Core Values",
        },
    ];
    const info2 = [
        {id:"01", title: "Innovation", description: "We are committed to creating new and exciting products that solve real-world problems."},
        {id: "02", title: "Transparency", description: "We are transparent about our processes, goals, and results."},
        {id: "03", title: "Collaboration", description: "We work closely with our clients to understand their needs and deliver solutions that meet their expectations."},
        {id: "04", title: "Customer Focus", description: "We prioritize our clients' needs and strive to exceed their expectations."},
    ]
    return (
        <>
            <div className="mt-10">
                {info1.map((item, index) => (
                    <InfoBlock
                        key={index}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 sm:mx-20 ">
                <div>
                    <div>
                        <img src={gearImg1} alt="" />
                    </div>
                    <div className="text-white ">
                        <p>A clear vision, a strong mission, and values that guide everything we create</p>
                    </div>
                </div>
                 <div>
                   {info2.map((item, index) => (
                    <div>
                        
                    </div>
                   ))}

                    
                </div>
            </div>
        </>
    )
}