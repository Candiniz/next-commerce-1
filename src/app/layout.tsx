import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from '@clerk/localizations'
import Hydrate from "./components/Hydrate";
import { lora } from "./fonts/fonts";
import ScrollAwareFooter from "./components/ScrollAwareFooter";


export const metadata: Metadata = {
  title: "Sobrinha | Oficial",
  description: "Projeto de Estudos de Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR} signUpFallbackRedirectUrl="/">
      <html lang="en">
        <body className={`${lora.className}`}>
          <Hydrate>
            <Navbar />
            <main className="bg-[#e0dad4] min-h-screen pt-16"> {children} </main>
            <ScrollAwareFooter />
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
