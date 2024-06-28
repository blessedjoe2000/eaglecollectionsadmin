"use client";

import { useSession } from "next-auth/react";

export const Footer = () => {
  const { data: session } = useSession();
  return (
    <div className="">
      {session && (
        <div className="border-t-2 bg-dark-green text-center py-2">
          <h3 className=" font-bold text-white">
            Eagle Collections. All Rights Reserved. ©{new Date().getFullYear()}
          </h3>
        </div>
      )}
    </div>
  );
};
