import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#16a085',
            carrito: '#FE8403',
            selectC: '#ffffff'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
});
