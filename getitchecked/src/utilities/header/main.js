import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';


const Header = () => {
    return (
        <Box className="absolute top-0 left-0 z-10 bg-white w-full flex flex-row justify-between items-center p-4 border-b border-b-slate-200 from-top">
            <Box className="flex flex-row items-center gap-1 ">
                <Typography variant="h2"> Get it Checked</Typography>
                <CheckCircleIcon className="text-green-500" />
            </Box>
            {/* Clerk */}
            <Box>
                <SignedOut>
                    <SignInButton appearance={{baseTheme:"light"}}/>
                </SignedOut>
                <SignedIn>
                    <UserButton showName />
                </SignedIn>
            </Box>
        </Box>
    )
}

export default Header