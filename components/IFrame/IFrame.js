"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/images/eaglecollectionslogo.png";

function IFRAME() {
  const [iframeVisible, setIframeVisible] = useState(false);

  const toggleIframeVisibility = () => {
    setIframeVisible(!iframeVisible);
  };

  return (
    <div className="iframe-container" onClick={toggleIframeVisibility}>
      {iframeVisible && (
        <iframe
          src="https://bw-chatbot-rho.vercel.app/"
          title="Embedded chatbot"
        />
      )}
      {/* <Image
        src={logo}
        alt="eagle collections logo"
        width="100"
        height="100"
        className=""
        priority
      /> */}
    </div>
  );
}

export default IFRAME;
