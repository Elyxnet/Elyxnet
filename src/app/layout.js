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
  metadataBase: new URL("https://www.elyxnet.ai"),
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
    "blockchain",
    "crypto",
    "AI agent"
  ],
  authors: [{ name: "Elyxnet Team" }],
  creator: "Elyxnet",
  publisher: "Elyxnet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/tab.png",
    shortcut: "/tab.png",
    apple: "/tab.png",
  },
  openGraph: {
    title: "Elyxnet — Decentralized AI Infrastructure",
    description:
      "Power AI-driven intelligence by contributing to the decentralized infrastructure network. Connect idle social accounts into compute nodes.",
    url: "https://www.elyxnet.ai",
    siteName: "Elyxnet",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Elyxnet — Decentralized AI Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elyxnet — Decentralized AI Infrastructure",
    description:
      "Power AI-driven intelligence by contributing to the decentralized infrastructure network.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
