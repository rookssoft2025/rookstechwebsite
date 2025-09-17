import React from "react";
import Lottie from "lottie-react";
import monitor from "../../json/monitor.json"

export default function Monitor() {
    return (
        <Lottie
            animationData={monitor}
            loop={true}
            style={{ width: 200, height: 200 }}
        />
    )
}
