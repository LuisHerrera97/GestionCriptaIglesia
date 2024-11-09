import { createContext, useContext, useState } from "react";

import { createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";

export const ConfigurationContext = createContext();

export const ConfigurationProvider = (props) => {
  const [titlePage, setTitlePage] = useState("");
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        primary: {
          main: "#0062AE",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#16216A",
          contrastText: "#FFFFFF",
        },
        green: {
          main: "#4caf50",
          contrastText: "#FFFFFF",
        },
        blue: {
          main: "#4fc3f7",
          contrastText: "#FFFFFF",
        },
        red: {
          main: "#ef5350",
          contrastText: "#FFFFFF",
        },
        orange: {
          main: "#ff9800",
          contrastText: "#FFFFFF",
        },
      },
    })
  );

  const handleChangeConfiguration = (
    urlFont,
    font,
    primaryColor,
    secundaryColor,
    primaryContrast,
    secondaryContrast,
    titlePage,
    metaDescription
  ) => {
    document.getElementById("pizzeria-title-page").innerHTML = titlePage;
    document.getElementById("pizzeria-meta").setAttribute("content", metaDescription);
    document.getElementById("pizzeria-urlfont").setAttribute("href", urlFont);
    setTitlePage(titlePage);

    setTheme(
      createTheme(
        {
          typography: {
            fontFamily: font,
          },
          palette: {
            primary: {
              main: primaryColor,
              contrastText: primaryContrast,
            },
            secondary: {
              main: secundaryColor,
              contrastText: secondaryContrast,
            },
            green: {
              main: "#4caf50",
              contrastText: "#FFFFFF",
            },
            blue: {
              main: "#4fc3f7",
              contrastText: "#FFFFFF",
            },
            red: {
              main: "#ef5350",
              contrastText: "#FFFFFF",
            },
            orange: {
              main: "#ff9800",
              contrastText: "#FFFFFF",
            },
          },
          components: {
            MuiButton: {
              defaultProps: {
                variant: "contained",
                color: "primary",
              },
              styleOverrides: {
                root: {
                  boxShadow: "none",
                  borderRadius: 10,
                  textTransform: "initial",
                },
              },
            },
            MuiIconButton: {
              defaultProps: {
                color: "secondary",
              },
              styleOverrides: {
                root: {
                  backgroundColor: "white",
                  ":hover": {
                    backgroundColor: "white",
                  },
                  ":disabled": {
                    backgroundColor: "white",
                  },
                },
              },
            },
            MuiTextField: {
              defaultProps: {
                variant: "outlined",
                color: "secondary",
                fullWidth: true,
                size: "small",
              },
            },
            MuiDialog: {
              defaultProps: {
                fullWidth: true,
                maxWidth: "sm",
              },
            },
            MuiDrawer: {
              defaultProps: {
                BackdropProps: {
                  style: {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  },
                },
              },
            },
            MuiGrid: {
              defaultProps: {
                spacing: 2,
              },
            },
            MuiTable: {
              defaultProps: {
                size: "small",
              },
            },
            MuiTooltip: {
              styleOverrides: {
                tooltip: {
                  fontSize: 14,
                },
              },
              defaultProps: {
                arrow: false,
                placement: "bottom",
              },
            },
            MuiPaper: {
              defaultProps: {
                elevation: 3,
                variant: "elevation",
                //variant: "outlined",
              },
            },
            MuiFormLabel: {
              styleOverrides: {
                asterisk: {
                  color: "#ff8400",
                  fontWeight: "700",
                  fontSize: "18px",
                },
                root: {
                  color: "rgba(0, 0, 0, 0.9)",
                },
              },
            },
            MuiTab: {
              styleOverrides: {
                root: {
                  "&.Mui-selected": {
                    backgroundColor: primaryColor,
                    color: primaryContrast,
                  },
                },
              },
            },
          },
        },
        esES
      )
    );
  };

  return (
    <ConfigurationContext.Provider value={{ theme, titlePage, handleChangeConfiguration }}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => useContext(ConfigurationContext);
