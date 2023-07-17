import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.css"; //add bootstrap
import "./globals.css";

export const metadata: Metadata = {
  title: "IndieStage",
  description: "Home of the IndieStage community",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>{children}</body>
    </html>
  );
}
