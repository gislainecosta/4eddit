import { createMuiTheme } from '@material-ui/core';


export default createMuiTheme({
    typography:{
        useNextVariants: true
    },
    palette:{
        info:{
           main: "#feb059"
        },
        primary: {
            light: "#feb059",
            main: "#ff782e",
            dark: "#415259",
            contrastText: 'white',
        },
        secondary:{
            light: "#feb059",
            main: "#415259",
            dark: "#ff782e",
            contrastText: 'white',
        }
    }
})