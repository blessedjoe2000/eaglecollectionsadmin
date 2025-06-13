import Provider from "../components/Provider/Provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import IFrame from "@/components/IFrame/IFrame";

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-muktaFont text-dark-green">
        <Provider>
          <Toaster position="top-right" />
          <Nav />
          {children}
          <IFrame />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
