"use client";

import { useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  ThemeProvider
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Header from "@/utilities/header/main";
import SelectDropdownWithSearch from "@/utilities/searchableDropDown/main2";
import CustomLottie from "@/utilities/lottie/main";
import { useFile } from "@/utilities/fileContext/main";
import { useRouter } from "next/navigation";
import { theme } from "../theme";

export default function Home() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const [errorMsg,setErrorMsg] = useState(null)
  const [a,b,setPDF] = useFile()
  const router = useRouter()
  const [service,setService] = useState(null)

  const validateAndSetFile = (file) => {
    if (file.type !== "application/pdf") {
      setErrorMsg("Only PDF files are allowed.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg("File size must be under 50MB.");
      return;
    }
    setFile(file);
    setPDF(service,file)
    router.push("/upload")
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if(service==null){
      setErrorMsg("Select Service First")
      return
    }
    if (e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if(service==null){
      setErrorMsg("Select Service First")
      return
    }
    inputRef.current?.click();
  }

  return (
   
      <Box className="w-full h-screen flex flex-col">
        <Header />
        <Box className="w-full h-full p-8 bg-white mt-20">
          <Box
            className={`w-full h-full flex items-center justify-center border-dashed border-2 rounded-md transition-all duration-200 from-bottom ${
              isDragging ? "border-[#4f83ff] bg-[#e0edff]" : "border-[#93b4f5] bg-[#f0f6ff]"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Box className="w-full flex flex-col items-center cursor-pointer">
              <Box className="w-[300px] mb-6">
                <CustomLottie url="https://lottie.host/6bec7fb1-1a5f-4b1f-8a03-baefd5c6d29f/itqdCi4Dw6.lottie" />
              </Box>

              <Typography
                variant="h3"
                className="text-center mb-4 text-gray-700"
                sx={{mb:"16px"}}
              >
                Drag & drop your PDF here  or click select
              </Typography>

              <Box className="flex w-[80%] flex-row gap-4 max-md:flex-col">
                <Box className="w-full">
                  <SelectDropdownWithSearch onChange={(v)=>{setService(v)}}/>
                </Box>

                <Button
                  className="w-full"
                  variant="contained"
                  onClick={handleClick}
                >
                  <AddCircleOutlineIcon fontSize="small" className="mr-3" />
                  <Typography variant="button">Select File</Typography>
                </Button>

                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={handleFileSelect}
                />
              </Box>

              {file && (
                <Box className="mt-3 p-5">
                  <Typography variant="body2" sx={{color:"#00a63e"}}>
                  Selected File: {file.name}
                </Typography>
                </Box>
                
              )}

              <Box className="mt-3">
                <Typography variant="caption" className="text-gray-500">
                  Max file size: 50MB | PDF only
                </Typography>
              </Box>
              {errorMsg!=null && 
              <Box className="mt-3">
                <Typography variant="body2" sx={{color:"#ff6467"}} className="text-red- from-bottom">
                  {`${errorMsg}*`}
                </Typography>
              </Box>}
            </Box>
          </Box>
        </Box>
      </Box>
    
  );
}
