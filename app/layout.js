import Provider from "../components/Provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
