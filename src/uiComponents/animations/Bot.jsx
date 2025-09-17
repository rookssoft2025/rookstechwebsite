import React from "react";
import Lottie from "lottie-react";
import bot from "../../json/bot.json"

export default function BotAnimation() {
    return (
        <Lottie
            animationData={bot}
            loop={true}
            style={{ width: 400, height: 400 }}
        />
    )
}