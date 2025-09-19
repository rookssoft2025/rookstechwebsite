import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/tech.json"

export default function TechAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 400, height: 350 }}
        />
    )
}