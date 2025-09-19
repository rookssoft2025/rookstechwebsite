import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/aboutus.json"

export default function AboutAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 500, height: 350 }}
        />
    )
}