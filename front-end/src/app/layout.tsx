import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Inventory System",
    description: "An inventory system for managing products and orders.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                <div className="flex min-h-screen">
                    <SideBar />
                    <main className="flex-1 p-4 lg:p-6">{children}</main>
                </div>
            </body>
        </html>
    );
}
