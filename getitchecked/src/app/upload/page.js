"use client";

import { useEffect, useState } from "react";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { Document, Page } from "react-pdf";
import { theme } from "../theme";
import Header from "@/utilities/header/main";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useFile } from "@/utilities/fileContext/main";
import { redirect, useRouter } from "next/navigation";
import CustomProgressBar from "@/utilities/progress/main";
import { useAuth } from "@clerk/nextjs";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const backendUrl = process.env.NEXT_PUBLIC_BACKEND || "http://127.0.0.1:5000"


export default function PdfViewerPage() {
    const [service, pdf] = useFile()
    const [errorMsg, setErrorMsg] = useState()
    const [jobId, setJobID] = useState(null)
    const [progress, setProgress] = useState(null)
    const [modal, setModal] = useState(false)
    const router = useRouter()
    const {getToken} = useAuth()

    useEffect(() => {
        if (jobId == null) return
        const eventSource = new EventSource(`${backendUrl}/status?job_id=${jobId}`);
        eventSource.onmessage = (event) => {
            console.log(event);
            
            const data = JSON.parse(event.data);
            console.log(data);

            if (data.status === 'processing') {
                setProgress(data)
            }
            if (data.status === "error") {
                setProgress(data)
                eventSource.close()
            }
            if (data.status === 'complete') {
                setProgress(data)
                eventSource.close();
            }

            if (data.status === "error") {

            }
        };

        return () => eventSource.close();
    }, [jobId]);

    if (service == null) {
        redirect("/dashboard")
    }

    const handleClose = () => {
        setProgress(null)
        setModal(false)
    }
    // const [file, setFile] = useState(pdf);
    const [numPages, setNumPages] = useState(null);

    // const handleFileChange = (e) => {
    //     const selected = e.target.files[0];
    //     if (selected && selected.type === "application/pdf") {
    //         setFile(selected);
    //     } else {
    //         alert("Please select a PDF file.");
    //     }
    // };

    const handleUpload = async () => {
        const formData = new FormData()
        formData.set("file", pdf)
        formData.set("service", service)
        try {
            const token = await getToken()
            
            const res = await fetch(`${backendUrl}/upload`, { method: "POST", body: formData, headers:{Authorization:`Bearer ${token}`} })
            console.log(res);
            if (res.ok) {
                const json = await res.json()
                console.log(json);
                setJobID(json.job_id)
                setModal(true)
            }
        } catch (e) {
            console.log(e);
            setTimeout(()=>{
                setErrorMsg(null)
            },3000)
            setErrorMsg("Sorry Something went wrong Please try again, If it keeps happening please try after sometime")
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <Box className="w-full h-screen flex flex-col bg-white">
                <Header />
                <Box className="w-full overflow-scroll mt-15 flex flex-row max-md:flex-col">
                    {/* PDF Display */}
                    <Box className="w-2/3 max-md:w-full bg-gray-100 p-4 overflow-scroll">
                        {!pdf ? (
                            <Box className="flex flex-col items-center justify-center">
                                <Typography>File not selected please go back home and select a file</Typography>
                            </Box>
                        ) : (
                            <Document
                                file={pdf}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={600}
                                        className="my-4 mx-auto shadow"
                                    />
                                ))}
                            </Document>
                        )}
                    </Box>

                    {/*  Action */}
                    <Box className="w-1/3 max-md:w-full bg-white border-b border-b-slate-200  p-8  gap-4 flex flex-col justify-center items-center">
                        <Box className="w-full">
                            <Typography variant="h3" sx={{ mb: "24px" }} className="mb-6">
                                Service:
                            </Typography>
                            <Typography variant="body2" className="mb-6">
                                {service}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            className="w-full"
                            onClick={handleUpload}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="w-full"
                            onClick={()=>{router.back()}}
                        >
                            Go Back
                        </Button>

                        {errorMsg!=null && 
              <Box className="mt-3">
                <Typography variant="body2" sx={{color:"#ff6467"}} className="text-red- from-bottom">
                  {`${errorMsg}*`}
                </Typography>
              </Box>}
                    </Box>
                    <CustomProgressBar progress={progress} service={service} modal={modal} close={handleClose} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
