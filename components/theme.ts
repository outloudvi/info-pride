import { AppShell, createTheme } from '@mantine/core'

export const theme = createTheme({
    breakpoints: {
        sm: '40em',
        md: '48em',
        lg: '64em',
        xl: '80em',
    },
    fontFamily:
        '-apple-system, system-ui, "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif',
    components: {
        AppShell: AppShell.extend({
            styles: {
                main: {
                    backgroundColor: 'light-dark(#f8f9fa, #141517)',
                },
            },
        }),
    },
})
