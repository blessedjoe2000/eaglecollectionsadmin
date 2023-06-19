import Provider from "./components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
