import { useLottie } from 'lottie-react'

const LottieFile = (
    props: {
        animationData: any
    }
) => {
    const { View } = useLottie({
        animationData: props.animationData,
        loop: true,
        autoplay: true,
    })
    return (
        <>
            {View}
        </>
    )
}

export default LottieFile