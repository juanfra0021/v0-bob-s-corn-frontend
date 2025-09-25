"use client"

import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#eab308", // yellow-500 - corn color
      light: "#fbbf24", // yellow-400
      dark: "#ca8a04", // yellow-600
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#16a34a", // green-600 - agricultural green
      light: "#22c55e", // green-500
      dark: "#15803d", // green-700
      contrastText: "#ffffff",
    },
    success: {
      main: "#16a34a", // green-600
      light: "#22c55e", // green-500
      dark: "#15803d", // green-700
    },
    warning: {
      main: "#f59e0b", // amber-500
      light: "#fbbf24", // amber-400
      dark: "#d97706", // amber-600
    },
    error: {
      main: "#dc2626", // red-600
      light: "#ef4444", // red-500
      dark: "#b91c1c", // red-700
    },
    background: {
      default: "#fffbeb", // amber-50
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937", // gray-800
      secondary: "#6b7280", // gray-500
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    h1: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 500,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #ca8a04 0%, #d97706 100%)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          transition: "box-shadow 0.2s ease-in-out",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
})
