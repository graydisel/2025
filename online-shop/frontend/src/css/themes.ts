import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    palette: {
        primary: {
            light: '#ff9800',
            main: '#f57c00',
            dark: '#e65100',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});