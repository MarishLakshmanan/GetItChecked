
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CustomLottie = ({url}) => {
  return (
    <DotLottieReact
      src={url}
      loop
      autoplay
    />
  );
};


export default CustomLottie