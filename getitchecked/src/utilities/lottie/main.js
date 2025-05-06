
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Box } from '@mui/material';

const CustomLottie = ({url}) => {
  return (
    <Box className="w-full">

    <DotLottieReact
      src={url}
      loop
      autoplay
    />
    </Box>
  );
};


export default CustomLottie