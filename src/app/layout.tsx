import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from '@clerk/localizations'
import Hydrate from "./components/Hydrate";
import Footer from "./components/Footer";


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
        <body>
          <Hydrate>
            <Navbar />
            <main className="bg-pink-200 min-h-screen pt-16"> {children} </main>
            <Footer />
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
