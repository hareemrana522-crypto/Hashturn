import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Hashturn — Software House",
  description:
    "HashTurn designs and builds custom automation systems — connecting your apps, eliminating repetitive tasks, and giving your team back hundreds of hours every month.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Iconify custom element — needed before the page renders <iconify-icon> tags */}
        <Script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          strategy="beforeInteractive"
        />

        <Navbar />
        {children}
        <Footer />

        {/* Handles the .reveal scroll-in-view animation site-wide, same as main.js did */}
        <ScrollReveal />
      </body>
    </html>
  );
}
