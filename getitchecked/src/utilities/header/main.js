import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Header = () => {
    return (
        <Box className="w-full flex flex-row justify-between items-center p-4 border-b border-b-slate-200">
            <Box className="flex flex-row items-center gap-1 ">
                <Typography variant="h2"> Get it Checked</Typography>
                <CheckCircleIcon className="text-green-500" />
            </Box>
            {/* Clerk */}
            <Box>
                <CheckCircleIcon className="text-green-500" />
            </Box>
        </Box>
    )
}

export default Header