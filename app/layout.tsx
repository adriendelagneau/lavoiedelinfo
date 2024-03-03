import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";
import { Frank_Ruhl_Libre } from 'next/font/google'


const FrankRuhlLibre = Frank_Ruhl_Libre ({subsets: ['latin'], weight: '400', variable: '--font-FrankRuhlLibre' })


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FrankRuhlLibre.variable}`}>
        <AuthProvider>
          <Toaster richColors toastOptions={{ classNames: { title: 'text-lg' } }} />
          {children}
      </AuthProvider>
      </body>
    </html>
  );
}
