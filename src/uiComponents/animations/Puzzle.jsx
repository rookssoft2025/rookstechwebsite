import React from "react";
import Lottie from "lottie-react";
import puzzle from "../../json/Puzzle.json"

export default function Puzzle() {
    return (
        <Lottie
            animationData={puzzle}
            loop={true}
            style={{ width: 400, height: 400 }}
        />
    )
}
