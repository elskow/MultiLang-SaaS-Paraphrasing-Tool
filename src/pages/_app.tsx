import "@/styles/globals.css"
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <NextUIProvider>
            <SessionProvider session={session}>
                <div className={` ${inter.className} `}>
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </NextUIProvider>
    )
}
