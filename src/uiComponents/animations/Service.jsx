import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/service.json"

export default function ServiceAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 400, height: 350 }}
        />
    )
}