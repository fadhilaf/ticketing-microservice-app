import "./globals.css";
import "bootstrap/dist/css/bootstrap.css"; //add bootstrap
import type { Metadata } from "next";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Header from "./components/header";

export const metadata: Metadata = {
  title: "IndieStage",
  description: "Home of the IndieStage community",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
