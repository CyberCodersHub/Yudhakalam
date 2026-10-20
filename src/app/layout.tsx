import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins, Noto_Sans_Tamil, Cinzel } from "next/font/google";
import MobileFx from "./components/MobileFx";


const body = Noto_Sans_Tamil({
  weight: ["400", "500", "700"],
  subsets: ["latin", "tamil"],
  variable: "--font-hind",
  display: "swap",
});


const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Padaivedu Yudhakalam",
  description:
    "Learn Silambam, the Tamil staff art, at Padaivedu Yudhakalam in Tiruvannamalai.",
  icons: { icon: "/logo.jpeg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#5A2408",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={` ${body.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <MobileFx />
      </body>
    </html>
  );
}