import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Elyxnet — Decentralized AI Infrastructure",
  description:
    "Contribute your authenticated social accounts, earn rewards, and power AI-driven research through the Elyxnet decentralized infrastructure network.",
  keywords: [
    "Elyxnet",
    "decentralized AI",
    "infrastructure",
    "Web3",
    "AI research",
    "rewards",
  ],
  openGraph: {
    title: "Elyxnet — Decentralized AI Infrastructure",
    description:
      "Power AI-driven intelligence by contributing to the decentralized infrastructure network.",
    type: "website",
  },
};

import { Web3ModalProvider } from "@/context/Web3Modal";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg-base text-text-primary font-sans antialiased">
        <Web3ModalProvider>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
