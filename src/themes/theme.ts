import { alpha } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { deepOrange, amber, lightBlue, indigo, blue, red, teal, grey, orange, cyan, pink } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: pink,
    secondary: cyan,
    grey: grey,
    error: deepOrange,
    success: {
      main: '#ffffff',
    }
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    h1: {
      fontSize: 33,
      lineHeight: "40px",
      fontWeight: "700",
    },
  },
  components: {
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 500,
    //     },
    //   },
    // },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // color: grey[300],
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // "& label": {
          //   color: grey[300],
          // },
          // "& fieldset": {
          //   borderColor: grey[100],
          // },
          // "&:hover fieldset": {
          //   borderColor: grey[100],
          // },
          // "&.Mui-focused fieldset": {
          //   borderColor: deepOrange[700],
          // },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `'TheJamsil', "Poppins", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo" !important`,
          color: '#ffffff',
          transition: `all 0.5s ease`
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: `'TheJamsil', "Poppins", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo" !important`,
          color: '#ffffff',
          transition: `all 0.5s ease`
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          textAlign: "left",
          cursor: 'pointer !important',
          '& *': {
            cursor: 'pointer !important',
          },
          transition: `all 0.5s ease`,
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff'
          }
          // '&:hover': {
          //   backgroundColor: 'transparent',
          // },
          // '&:focus': {
          //   backgroundColor: 'transparent',
          // },
        },
      },
    },
    MuiContainer: {
      // defaultProps: {
      //   maxWidth: "xs",
      // },
      styleOverrides: {
        root: {
          // paddingLeft: "16px",
          // paddingRight: "16px",
          // paddingLeft: "24px",
          // paddingRight: "24px",
          minWidth: `280px`
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          maxWidth: 444,
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "auto",
          marginRight: "auto",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          width: "auto",
          height: "auto",
          fontSize: "1.25rem",
          padding: ".25rem",
        },
        fontSizeSmall: {
          fontSize: "1rem",
        },
        fontSizeLarge: {
          fontSize: "1.75rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
          paddingLeft: "16px",
          paddingRight: "16px",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 56,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        size: "large",
      },
      styleOverrides: {
        root: {
          minWidth: 0,
          letterSpacing: "-0.4px",
          whiteSpace: "nowrap",
          textTransform: "none",
          // '&:hover': {
          //   backgroundColor: 'transparent',
          // },
          // '&:focus': {
          //   backgroundColor: 'transparent',
          // },
        },
        containedPrimary: {
          // color: '#ffffff',
        },
        sizeSmall: {
          minHeight: 28,
          fontSize: 12,
          padding: `4px 12px !important`,
        },
        sizeLarge: {
          fontSize: 15,
          lineHeight: "20px",
          minHeight: 48,
        },
        iconSizeSmall: {
          "& > span": {
            fontSize: "1rem",
            marginBottom: ".1rem",
          },
        },
        iconSizeMedium: {
          "& > span": {
            fontSize: "1.1rem",
            marginBottom: ".1rem",
          },
        },
        iconSizeLarge: {
          "& > span": {
            fontSize: "1.2rem",
            marginBottom: ".1rem",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: grey[700],
        },
        sizeSmall: {
          fontSize: 12,
        },
        sizeMedium: {
          fontSize: 14,
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "large",
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          // width: "2em",
          // height: "2em",
          width: 56,
          height: 56,
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});
