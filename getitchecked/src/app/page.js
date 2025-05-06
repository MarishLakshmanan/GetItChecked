import { Box, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "@/utilities/header/main";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full h-screen">
        {/* Header */}
        <Header />
      </Box>
    </ThemeProvider>
  );
}
