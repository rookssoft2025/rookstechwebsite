import React from "react";
import Lottie from "lottie-react";
import homeAni from "../../json/homeAni.json"

export default function HomeAnimation() {
    return (
        <Lottie
            animationData={homeAni}
            loop={true}
            style={{ width: 400, height: 300 }}
        />
    )
}