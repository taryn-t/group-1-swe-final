
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "../components/Navigation/NavigationBar";
import Footer from "@/components/UIElements/Footer";
import { Provider } from  "./provider";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIT 333 Final Project",
  description: "Created by group 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" className=" w-full h-full overflow-x-hidden">
      <Provider>
        <CartProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} w-full h-full  antialiased`}
            >
              <NavigationBar/> 
              <div className="min-h-screen">
                {children}
              </div>
              
              <Footer/>
          </body>
        </CartProvider>
       
      </Provider>
      
    </html>
  );
}
