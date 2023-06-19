"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-purple-300 h-screen  flex items-center justify-center">
        <div className="">
          <button
            className="bg-white p-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-300 h-screen flex ">
      <Nav />
      <div className="bg-white flex-grow mt-5 mr-2  rounded-lg p-4 ">
        {children}
        <div>
          <button
            className="bg-pink-500 p-2 px-4 rounded-lg mt-6"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Layout;
