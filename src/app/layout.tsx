import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emotico",
  description: "Emotico application",
};

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex flex-col min-h-screen bg-fill-body",
          roboto.className
        )}
      >
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
