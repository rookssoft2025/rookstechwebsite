import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/research.json"

export default function ResearchAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 400, height: 350 }}
        />
    )
}