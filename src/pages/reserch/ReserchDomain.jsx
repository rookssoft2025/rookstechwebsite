import React from "react";

const researchDomains = [
    {
        title: "AI",
        description:
            "AI is increasingly integrated into all aspects of modern life, from banking and healthcare to entertainment and transportation. It uses advanced algorithms to analyze data, automate tasks, and enhance decision-making. While AI improves efficiency and convenience, its rise raises ethical concerns about employment, privacy, and bias.",
    },
    {
        title: "AR",
        description:
            "AR advertising blends digital elements with the real world, creating interactive and engaging experiences for users. Businesses can use AR to showcase products in innovative ways, such as allowing virtual try-ons. Delivered through channels like e-signs, social media, and apps, AR advertising offers immersive and memorable customer experiences.",
    },
    {
        title: "Blockchain",
        description:
            "Blockchain technology is transforming various industries with its decentralized and transparent approach. It ensures data integrity, enhances security, and builds trust through an immutable transaction ledger. Key applications in finance, healthcare, and real estate showcase its potential to drive innovation and growth.",
    },
    {
        title: "Biomedical Engineering",
        description:
            "Biomedical engineering combines engineering and medicine to transform healthcare. It advances patient care through innovations in diagnostics, treatment, tissue engineering, and regenerative medicine.",
    },
    {
        title: "Cryptography",
        description:
            "Cryptography secures information transmitted over the web by using encryption. It protects text in chat rooms, emails, online meetings, and web transactions.",
    },
    {
        title: "Computer Vision",
        description:
            "Computer vision enables machines to interpret visual data like humans, impacting industries such as manufacturing, healthcare, retail, and autonomous vehicles.",
    },
    {
        title: "Cloud Computing",
        description:
            "Cloud computing delivers scalable, flexible resources online, eliminating the need for significant hardware investments. It reduces IT costs, enhances communication, and boosts productivity.",
    },
    {
        title: "Deep Learning (DL)",
        description:
            "Deep learning, a subset of AI, mimics neural networks to analyze and categorize large volumes of unstructured data. It powers applications like image recognition, NLP, and autonomous vehicles.",
    },
    {
        title: "Edge Computing",
        description:
            "By distributing computer power closer to the network's edge, edge computing lowers latency and uses less bandwidth. It is particularly useful for Internet of Things devices.",
    },
    {
        title: "Fog Computing",
        description:
            "Fog computing, an outgrowth of cloud computing, distributes computing power closer to the network’s edge, lowering latency and bandwidth usage while supporting IoT devices.",
    },
    {
        title: "Green Computing",
        description:
            "Green computing focuses on enhancing resource efficiency, using renewable energy, and reducing power consumption to minimize technology's environmental impact.",
    },
    {
        title: "Generative AI",
        description:
            "Generative AI refers to models that create new content such as text, images, or code. Unlike other AI types, it is designed specifically for content creation.",
    },
    {
        title: "Human Computer Interaction",
        description:
            "HCI focuses on interactive interface design, performance, and evaluation to improve the user experience. UX and user-centered design are its core aspects.",
    },
    {
        title: "IoT",
        description:
            "IoT connects physical systems and objects to enable efficient data exchange, automation, and remote control. It enhances efficiency in smart homes, wearables, and healthcare.",
    },
    {
        title: "Large Language Model",
        description:
            "Large Language Models (LLMs) use neural networks with numerous parameters to understand and generate text. Examples include Google’s BERT and OpenAI’s ChatGPT.",
    },
    {
        title: "Machine Learning (ML)",
        description:
            "Machine Learning enables systems to learn from experience and improve without explicit programming. It is a key technology for large-scale data analysis.",
    },
    {
        title: "Natural Language Processing",
        description:
            "NLP is used for voice assistants, social media sentiment analysis, healthcare text analysis, machine translation, and enhanced search engines.",
    },
    {
        title: "Networking",
        description:
            "Networking enables global connectivity and communication across devices, supporting multimedia interactions, partnerships, cloud computing, and remote access.",
    },
    {
        title: "Quantum Computing",
        description:
            "Quantum computing could revolutionize industries by solving problems beyond classical computers. It has potential in simulations, encryption, and machine learning.",
    },
    {
        title: "Robotics",
        description:
            "Robotics automates tasks across industries like medicine, logistics, agriculture, and services, enhancing productivity and precision.",
    },
    {
        title: "Security",
        description:
            "Cybersecurity protects digital resources from threats like malware and ransomware. It requires strong security measures, updates, and training.",
    },
    {
        title: "Sustainable Computing",
        description:
            "Sustainable computing reduces energy use, e-waste, and carbon emissions via energy-efficient hardware, optimized data centers, and renewable energy.",
    },
    {
        title: "Theoretical Computer Science",
        description:
            "Theoretical Computer Science studies the nature of computation and develops more effective methods, bridging mathematics and practical computation.",
    },
    {
        title: "Ubiquitous Computing",
        description:
            "Ubiquitous computing equips everyday objects with connectivity, enabling automation, minimal human intervention, and communication between devices.",
    },
    {
        title: "Virtual Reality",
        description:
            "Virtual reality creates immersive digital environments for gaming, business, education, and training through computer-generated simulations.",
    },
    {
        title: "Wireless Networks",
        description:
            "Wireless networks enable communication on the go, supporting gaming, streaming, and remote work. Emerging 5G tech promises faster, more reliable connections.",
    },
    {
        title: "Web Technologies",
        description:
            "Web technologies are tools and methods for communication across the Internet. They enable browsing, multimedia, and hyperlinked access to web resources.",
    },
    {
        title: "XAI",
        description:
            "Explainable AI (XAI) makes complex machine learning models understandable to humans, improving trust and interpretability in AI decisions.",
    },
    {
        title: "Yield Optimization",
        description:
            "Yield optimization involves methods to maximize revenue from digital investments through data analysis, pricing adjustments, and ad placements.",
    },
    {
        title: "Zero-waste Technology",
        description:
            "Zero-waste technology reduces waste through recycling, reusing, and composting. It supports sustainability and resource conservation.",
    },
];


function ResearchCard({ title, description }) {
    return (
        <div className="group relative border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden hover:border-cyan-400/50 hover:shadow-cyan-400/20">
            <div className="absolute inset-0 rounded-2xl bg-white/5"></div>
            
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(6,182,212,0.4),0_0_30px_rgba(6,182,212,0.3),0_0_60px_rgba(6,182,212,0.2)]"></div>
            
            <div className="relative mb-4 pb-3 border-b border-gray-700 group-hover:border-blue-400/40 transition-colors duration-500">
                <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-500">
                    {title}
                </h3>
            </div>
            
            <p className="text-sm text-gray-300 group-hover:text-gray-200 relative z-10 transition-colors duration-500">{description}</p>
        </div>
    );
}

export default function ResearchDomains() {
    return (
        <div className="">
            <section className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Our Research Domains
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {researchDomains.map((domain, index) => (
                        <ResearchCard
                            key={index}
                            title={domain.title}
                            description={domain.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}