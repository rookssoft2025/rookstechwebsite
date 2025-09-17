
import Lottie from "lottie-react";
import handshake from "../../json/handShake.json"

export default function HandShack() {
    return (
        <Lottie
            animationData={handshake}
            loop={true}
            style={{ width: 200, height: 200 }}
        />
    )
}
