import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { APP_NAME } from "@/config";
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
});

export const metadata: Metadata = {
    title: APP_NAME,
    description: "Your todo list app, powered by Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${openSans.variable} font-open-sans antialiased min-h-dvh`}
            >
                {children}
            </body>
        </html>
    );
}
