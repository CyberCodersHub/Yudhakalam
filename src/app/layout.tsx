import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cinzel, Cinzel_Decorative, Inter, Noto_Sans_Tamil } from "next/font/google";
import MobileFx from "./components/MobileFx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const cinzelDeco = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-deco",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Padaivedu Yudhakalam",
  description:
    "Padaivedu Yudhakalam — the ancient Tamil martial art of Silambam, forging warriors with discipline, strength, and cultural pride.",
  icons: { icon: "/logo.jpeg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080503",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${cinzelDeco.variable} ${tamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body id="top" className="min-h-full flex flex-col antialiased bg-[#080503] text-white" suppressHydrationWarning>
        {children}
        <MobileFx />
      </body>
    </html>
  );
}