import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/Work.json"

export default function WorkAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 400, height: 350 }}
        />
    )
}