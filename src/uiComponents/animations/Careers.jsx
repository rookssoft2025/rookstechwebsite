import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/Careers.json"

export default function CareersAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 400, height: 350 }}
        />
    )
}