"use client";

import { useSession } from "next-auth/react";

export const Footer = () => {
  const { data: session } = useSession();
  return (
    <div className="">
      {session && (
        <div className="border-t-2 bg-dark-green text-center py-2">
          <h3 className="text-white">
            Eagle Collections. All Rights Reserved. ©2023
          </h3>
        </div>
      )}
    </div>
  );
};
