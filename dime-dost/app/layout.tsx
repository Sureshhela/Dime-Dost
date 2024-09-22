import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const checkDatabaseConnection = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/connection'); // Call your API route
    if (!response.ok) {
      throw new Error('Database connection failed');
    }
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

checkDatabaseConnection();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}