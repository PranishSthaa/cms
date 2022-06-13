import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1920
        }
    },
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(0,0,0,0.2)",
                }
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    boxShadow: "none",
                }
            }
        },
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "logo",
                    },
                    style: {
                        color: '#F8F9FA',
                        fontFamily: 'roboto',
                        fontWeight: 'lighter',
                        fontSize: '1.6rem',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                    },
                },
                {
                    props: {
                        variant: "featureTitle",
                    },
                    style: {
                        color: '#212529',
                        textAlign: 'center',
                        fontFamily: 'roboto',
                        fontWeight: 'lighter',
                        fontSize: '1.8rem',
                        textDecoration: 'none',
                        lineHeight: 'normal',
                    },
                },
                {
                    props: {
                        variant: "featureSubtitle",
                    },
                    style: {
                        color: '#212529',
                        fontFamily: 'roboto',
                        fontWeight: 'lighter',
                        fontSize: '1rem',
                        textDecoration: 'none',
                        lineHeight: 'normal',
                    },
                }
            ],
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px'
                    }
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6'
                },
                subheaderTypographyProps: {
                    variant: 'body2'
                }
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px'
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F3F4F6',
                    '.MuiTableCell-root': {
                        color: '#374151'
                    },
                    borderBottom: 'none',
                    '& .MuiTableCell-root': {
                        borderBottom: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase'
                    },
                    '& .MuiTableCell-paddingCheckbox': {
                        paddingTop: 4,
                        paddingBottom: 4
                    }
                }
            }
        }
    },
    palette: {
        action: {
            active: '#6B7280',
            focus: 'rgba(55, 65, 81, 0.12)',
            hover: 'rgba(55, 65, 81, 0.04)',
            selected: 'rgba(55, 65, 81, 0.08)',
            disabledBackground: 'rgba(55, 65, 81, 0.12)',
            disabled: 'rgba(55, 65, 81, 0.26)'
        },
        primary: {
            main: '#0d6efd',
        },
        secondary: {
            main: '#6c757d',
        },
        success: {
            main: '#198754',
        },
        error: {
            main: '#DC3545',
        },
        info: {
            main: '#29b6f6',
        },
        warning: {
            main: '#FFC106',
        },
        light: {
            main: '#F8F9FA',
            contrastText: '#212529',
        },
        dark: {
            main: '#212529',
            contrastText: '#F8F9FA',
        },
        background: {
            main: '#F4F6F9',
        }
    },
});