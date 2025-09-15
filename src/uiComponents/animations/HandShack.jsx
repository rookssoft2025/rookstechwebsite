import React from "react";
import Lottie from "lottie-react";
import handshake from "../../json/handShake.json"

export default function HandShack() {
    return (
        <Lottie
            animationData={handshake}
            loop={true}
            style={{ width: 400, height: 400 }}
        />
    )
}
