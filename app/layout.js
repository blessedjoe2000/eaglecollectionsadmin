import Provider from "../components/Provider/Provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-bodyFont">
        <Toaster position="top-right" />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
