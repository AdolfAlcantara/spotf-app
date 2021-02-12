import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette:{
        primary:{
            main:"#1DB954"
        },
        secondary:{
            main:"#d1243e"
        }
    },
    typography:{
        fontFamily:'Arial',
        fontWeightMedium:500,
        button:{
            fontSize:12
        },
        subtitle1:{
            fontSize:16
        },
        subtitle2:{
            fontSize:14
        },
    }
})