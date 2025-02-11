import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers'
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AskMe Bot - AI Chatbot for Aswin | AI-Powered Knowledge Assistant",
  description: "AskMe Bot is an AI-powered chatbot that knows everything about Aswin. Get instant answers, learn about Aswin, and interact with an intelligent AI agent.",
  keywords: ["AskMe Bot", "AI Chatbot", "AI Assistant", "Next.js AI Chatbot", "Aswin AI", "Aswin Chatbot", "Aswin Krishna Bot", "Best AI Agent"],
  openGraph: {
    title: "AskMe Bot - AI Chatbot for Aswin",
    description: "An AI assistant chatbot that knows everything about Aswin Krishna. Get instant answers.",
    url: "https://askmebot.aswinkrishna.com",
    siteName: "AskMe Bot",
    images: [
      {
        url: "https://askmebot.aswinkrishna.com/aswin-image.jpg",
        width: 1200,
        height: 630,
        alt: "AskMe Bot AI Chatbot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aswin_786",
    creator: "@aswin_786",
    title: "AskMe Bot - AI Chatbot for Aswin",
    description: "AI-powered chatbot that knows everything about Aswin Krishna. Get instant AI answers.",
    images: ["https://askmebot.aswinkrishna.com/aswin-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <CSPostHogProvider>
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    //     {children}
    //     </body>
    //     </CSPostHogProvider>
    // </html>

    <html lang="en">
    <Head>
      <link rel="canonical" href="https://askmebot.aswinkrishna.com" />
      <link rel="icon" href="/favicon.ico" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Chatbot",
        "name": "AskMe Bot",
        "description": "An AI chatbot that knows everything about Aswin Krishna.",
        "author": {
          "@type": "Person",
          "name": "Aswin Krishna"
        },
        "operatingSystem": "Web-based",
        "applicationCategory": "AI Assistant",
        "browserRequirements": "Requires JavaScript",
        "url": "https://askmebot.aswinkrishna.com",
        "image": "https://askmebot.aswinkrishna.com/aswin-image.jpg"
      })}} />
    </Head>
    <CSPostHogProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </CSPostHogProvider>
  </html>
  );
}
