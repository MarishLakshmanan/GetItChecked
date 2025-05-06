import { requiredDocuments } from "@/contants/main";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomLottie from "../lottie/main";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useMediaQuery, useTheme } from "@mui/material";

export const ProgressBar = ({ progress, service, close }) => {
  const [step, setStep] = useState(0);
  const [errorStep, setErrorStep] = useState(null);
  const steps = requiredDocuments[service] || [];
  const theme = useTheme();

const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (
      progress?.status === "processing" &&
      progress?.doc === steps[step] &&
      step < steps.length
    ) {
      setStep((prev) => prev + 1);
    } else if (progress?.status === "error") {
      const index = steps.findIndex((s) => s === progress?.doc);
      setErrorStep(index !== -1 ? index : null);
    }
  }, [progress, step, steps]);

  useEffect(() => {
    if (progress?.status === "complete") {
      setStep(steps.length); // mark all steps as complete
    }
  }, [progress, steps.length]);

  return (
    <Box className="p-6 flex flex-col items-center justify-center">
      <Box className="w-[300px]">
        <CustomLottie url="https://lottie.host/9d78d4ba-c2ea-4ac2-aab3-e10c84430ec6/2nVyjtmgLC.lottie" />
      </Box>

      <Box className="w-full my-6">
        <Stepper activeStep={step}
  orientation={isMobile ? "vertical" : "horizontal"}
  alternativeLabel={!isMobile}  >
          {steps.map((label, index) => {
            const isError = errorStep === index;
            return (
              <Step key={index}>
                <StepLabel
                  error={isError}
                  StepIconComponent={
                    isError ? () => <WarningAmberIcon color="error" /> : undefined
                  }
                  optional={
                    isError && progress?.message ? (
                      <Typography variant="caption" color="error">
                        {progress.message}
                      </Typography>
                    ) : null
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      {(progress?.status === "processing" && (step < steps.length)) && (
        <Typography>{`Checking ${steps[step]}...`}</Typography>
      )}

      {progress?.status === "complete" && (
        <Typography sx={{ color: "#008236" }}>
          {`Everything is alright! You can go ahead with filing ${service}.`}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={close}
        sx={{ mt: "10px" }}
        disabled={progress?.status === "processing"}
      >
        Close
      </Button>
    </Box>
  );
};
