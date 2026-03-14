import { createTheme } from '@mantine/core'

export const theme = createTheme({
    breakpoints: {
        sm: '40em',
        md: '48em',
        lg: '64em',
        xl: '80em',
    },
    fontFamily: 'var(--loc-fonts, system-ui, sans-serif)',
    components: {
        AppShell: {
            styles: {
                main: {
                    backgroundColor: 'light-dark(#f8f9fa, #141517)',
                },
            },
        },
    },
})
