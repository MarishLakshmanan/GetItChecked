"use client";

import {
  Box,
  Button,
  Typography,
  ThemeProvider
} from "@mui/material";
import { theme } from "./theme";
import Header from "@/utilities/header/main";
import CustomLottie from "@/utilities/lottie/main";
import { useRouter } from "next/navigation";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function Home() {

  const router = useRouter()
  

  const handleClick = (e) => {
   router.push("/dashboard")
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full h-screen flex flex-col">
        <Header />
        <Box className="flex p-10 pt-20 flex-col md:flex-row items-center justify-center h-full w-full gap-12">
          {/* Upload Content */}
          <Box className="text-center w-full md:text-left max-md:mt-10">
            <Box className="flex flex-row items-center gap-1 w-full max-md:justify-center">
              <Typography
                variant="h1"
                fontWeight="bold"
                className="text-4xl md:text-5xl text-slate-800 mb-4"
              >
                Get It Checked
              </Typography>
              <Box className="w-[100px]">
                <CustomLottie url="https://lottie.host/346f3ed5-a058-4f05-a0e7-96b72462146d/TPxrLjo6Og.lottie" />
              </Box>
            </Box>

            <Typography variant="body1" className="text-slate-500 mb-6">
              The One Stop Solution for checking Every legal document!
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<CheckCircleIcon />}
              onClick={handleClick}
              sx={{
                background: "primary.main",
                "&:hover": {
                  background: "primary.light",
                },
                minWidth: "200px",
                borderRadius: "100px",
                mt: "30px",
                p: "24px",
                textTransform: "none",
                boxShadow:"1px 1px 32px 3px rgba(0,85,255,0.75);"
              }}
            >
              Check Now!
            </Button>
          </Box>

          {/* Illustration */}
          <Box className="w-full h-full max-md:h-[70%] max-sm:h-full flex items-center justify-center">
            <Box
              component="img"
              src="/lawyer.jpg"
              alt="Upload Illustration"
              className="w-full"
            />
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
