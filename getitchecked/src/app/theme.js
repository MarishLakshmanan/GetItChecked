"use client"

import { createTheme } from "@mui/material/styles";

const palette = {
  background: {
    primary: "#ffffff",
    secondary: "#F9FAFC",
    subtle: "#FFF2F2",
  },
  action: {
    button: "#60A5FA",
    selected: "#DBDBDB80",
  },
  input: {
    main: "#177a87",
  },
  text: {
    primary: "#000000",
    secondary: "#d4d5d9",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#60A5FA',  // your primary blue
      light: '#93C5FD', // lighter version for hover/focus
      dark: '#3B82F6',  // darker version for active state
      contrastText: '#ffffff', // text on primary button
    },
    secondary: {
      main: '#8B5CF6',  // soft purple for secondary actions (you can swap to #38BDF8 if you prefer)
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff', // body background
      paper: '#FFF2f2',   // card/sidebar background
      secondary:"#f8fafc"
    },
    text: {
      primary: '#000000', // normal text
      secondary: '#4B5563', // a softer black/grey for descriptions (you can fine-tune)
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat",
      fontWeight: "600",
      fontSize: "3rem",
      lineHeight: "150%",
      letterSpacing: " 0px",
      color:"#000",
      [`@media (max-width:600px)`]: {
        fontSize: "1.5rem",
      },
      
    },
    h2: {
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontSize: "24px",
      lineHeight: "150%",
      letterSpacing: " 0px",
      color:"#000"
    },
    h3: {
      fontFamily: "Montserrat",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "24px",
      letterSpacing: " 0.5px",
      color:"#000"
    },
    subtitle1: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: "24px",
      lineHeight: "150%",
      letterSpacing: " 0px",
      color:"#000"
    },
    subtitle2: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "150%",
      letterSpacing: " 0px",
      color:"#000"
    },
    button: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "150%",
      letterSpacing: " 0px",
      color:"#000"
    },
    caption: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "150%",
      letterSpacing: " 0px",
      [`@media (max-width:500px)`]: {
        fontSize: "12px",
      },
      [`@media (max-width:400px)`]: {
        fontSize: "10px",
      },
      color:"#6B7280"
    },
    body1: {
      fontFamily: "Lato",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "150%",
      letterSpacing: " 0.5px",
      color:"#000"
    },
    body2: {
      fontFamily: "Lato",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "100%",
      letterSpacing: " 0.5px",
      color:"#000"
    },
    chip:{
      fontFamily: "Lato",
      fontWeight: "400",
      backgroundColor:"#626F47",
      padding:"5px",
      borderRadius:"7px",
      fontSize: "14px",
      lineHeight: "100%",
      marginRight:"10px",
      letterSpacing: " 0.5px",
      color:"#fff"
    }
  },
  components:{
    MuiButton:{
      styleOverrides: {
        root: {
          padding: '3px 6px',
        },
      },
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root:{
          padding:"5px"
        }
      }
    },
    MuiMenu:{
      styleOverrides:{
        paper:{
          backgroundColor:"#ffffff"
        }
      }
    },
  }
});

export { theme, palette };
