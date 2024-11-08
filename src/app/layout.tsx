import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from '@clerk/localizations'


export const metadata: Metadata = {
  title: "Next Commerce",
  description: "Projeto de Estudos de Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body>
          <Navbar />
          <main className="bg-slate-700 min-h-screen pt-16"> {children} </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
