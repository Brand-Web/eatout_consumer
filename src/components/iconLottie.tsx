import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRef, useLottie } from "lottie-react";

interface Props {
    animationData: any;
    onClick: () => void;
}
const IconLottie = ({ animationData, onClick }: Props) => {


    const { View, goToAndPlay } = useLottie({
        animationData,

        loop: false,


    })
    return (
        <button
            className="btn btn-ghost w-7 h-7"
            onClick={() => {
                onClick?.();
                goToAndPlay(0, true);


            }}
        >
            {View}
        </button>
    );
};

export default IconLottie;
