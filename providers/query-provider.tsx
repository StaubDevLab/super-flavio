'use client';
import ThemeProvider from "@/providers/theme-provider";
import {

    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export const queryClient = new QueryClient()

const QueryProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem>

                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default QueryProvider;
