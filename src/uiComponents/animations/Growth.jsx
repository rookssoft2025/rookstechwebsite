import React from "react";
import Lottie from "lottie-react";
import growth from "../../json/growth.json"

export default function Growth() {
    return (
        <Lottie
            animationData={growth}
            loop={true}
            style={{ width: 200, height: 200 }}
        />
    )
}
