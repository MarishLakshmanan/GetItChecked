
import { requiredDocuments } from "@/contants/main";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomLottie from "../lottie/main";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const ProgressBar = ({ service, close, status, msg, doc }) => {
  const [step, setStep] = useState(0);
  const [errorStep, setErrorStep] = useState(null);
  const steps = requiredDocuments[service] || [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const index = steps.findIndex((d) => d === doc);

    if (status === "processing" && index !== -1) {
      // If processing a valid doc, mark all previous ones as done
      setStep(index);
    }

    if (status === "error" && index !== -1) {
      setErrorStep(index);
    }

    if (status === "complete") {
      setStep(steps.length);
    }
  }, [status, doc, steps]);

  return (
    <Box className="p-6 flex flex-col items-center justify-center">
      <Box className="w-[300px]">
        <CustomLottie url="https://lottie.host/9d78d4ba-c2ea-4ac2-aab3-e10c84430ec6/2nVyjtmgLC.lottie" />
      </Box>

      <Box className="w-full my-6">
        <Stepper
          activeStep={step}
          orientation={isMobile ? "vertical" : "horizontal"}
          alternativeLabel={!isMobile}
        >
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
                    isError && msg ? (
                      <Typography variant="caption" color="error">
                        {msg}
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

      {status === "processing" && doc && (
        <Typography>{`Checking ${doc}...`}</Typography>
      )}

      {status === "complete" && (
        <Typography sx={{ color: "#008236" }}>
          {`Everything is alright! You can go ahead with filing ${service}.`}
        </Typography>
      )}
      

      <Button
        variant="contained"
        onClick={close}
        sx={{ mt: "10px" }}
        disabled={(status !== "error") && (status !== "complete")}
      >
        Close
      </Button>
    </Box>
  );
};
