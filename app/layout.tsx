import { ClerkProvider } from "@clerk/nextjs"
import { Geist, Geist_Mono, Poppins } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AddPropertyProvider } from "@/components/properties/addPropertyModal/page"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Real State",
  description: "Real State Marketplace",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        poppins.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="flex min-h-full flex-col bg-background">
        <ClerkProvider>
          <ThemeProvider>
            <AddPropertyProvider>{children}</AddPropertyProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
