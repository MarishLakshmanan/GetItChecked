import Header from '@/utilities/header/main'
import { SignIn } from '@clerk/nextjs'
import { Box } from '@mui/material'
import React from 'react'



const Signin = () => {
  return (
    <Box className="md:flex flex-row w-full justify-center items-center h-screen bg-white">
        <Header />
    <Box sx={{marginBottom:"30px"}} className="w-full h-full flex flex-col items-center justify-center gap-5">
            <SignIn  />
          </Box>
  </Box>
  )
}

export default Signin