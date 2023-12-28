"use client";

import { useSession } from "next-auth/react";

export const Footer = () => {
  const { data: session } = useSession();
  return (
    <div className="font-robotoFont">
      {session && (
        <div className="border-t-2 bg-main-purple text-white text-center py-2">
          <p>Eagle Collections. All Rights Reserved. ©2023</p>
        </div>
      )}
    </div>
  );
};
