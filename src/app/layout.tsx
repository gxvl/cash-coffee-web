import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/authContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"]
});

export const metadata: Metadata = {
  title: "CashCoffee",
  description: "CashCoffee - Venda para milhões de apaixonados por cafeterias"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} h-full w-full antialiased`}>
        {/* Providers must reside inside the body */}
        <AuthProvider>
          <ReactQueryProvider>
            <main>{children}</main>
            <Toaster />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
