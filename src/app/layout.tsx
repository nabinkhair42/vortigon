import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Weight } from "lucide-react";

const inter = Poppins({ subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
 });

export const metadata: Metadata = {
  title: "Vortigon AI Chatbot | Enhance Your Customer Experience",
  description: "Discover our intelligent AI chatbot designed to provide instant, personalized support and enhance your website's customer interactions. Available 24/7 to assist with your needs.",
  keywords: "AI chatbot, customer support, AI assistant, website chatbot, 24/7 support",
  openGraph: {
    title: "Vortigon AI Chatbot | Enhance Your Customer Experience",
    description: "Discover our intelligent AI chatbot designed to provide instant, personalized support and enhance your website's customer interactions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nabinkhair42",
    title: "Vortigon AI Chatbot | Enhance Your Customer Experience",
    description: "Discover our intelligent AI chatbot designed to provide instant, personalized support and enhance your website's customer interactions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
