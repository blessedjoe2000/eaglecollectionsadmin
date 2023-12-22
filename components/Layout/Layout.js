"use client";

import { useSession, signIn } from "next-auth/react";
import Nav from "../Nav/Nav";
import { useState } from "react";
import Logo from "../Logo/Logo";

function Layout({ children }) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const { data: session } = useSession();

  const login = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
      toast.success("Login successful", {
        style: {
          border: "1px solid #01B700",
          padding: "16px",
          color: "#01B700",
        },
        iconTheme: {
          primary: "#01B700",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.error("Login failed:", error);

      toast.error("Login failed", {
        style: {
          border: "1px solid #FF0000",
          padding: "16px",
          color: "#FF0000",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      toast.success("Logout successful", {
        style: {
          border: "1px solid #01B700",
          padding: "16px",
          color: "#01B700",
        },
        iconTheme: {
          primary: "#01B700",
          secondary: "#FFFAEE",
        },
      });
      await signOut();
    } catch (error) {
      console.error("Login failed:", error);

      toast.error("Login failed", {
        style: {
          border: "1px solid #FF0000",
          padding: "16px",
          color: "#FF0000",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  if (!session) {
    return (
      <div className="bg-main-purple h-full  flex items-center justify-center">
        <div className="">
          <button className="bg-white p-2 px-4 rounded-lg" onClick={login}>
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-main-purple h-screen">
      <div className="md:hidden flex items-center p-2">
        <button onClick={() => setShowMobileNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 "
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className="flex grow justify-center
        "
        >
          <Logo />
        </div>
      </div>

      <div className=" flex ">
        <Nav showMobile={showMobileNav} />
        <div className="bg-white flex-grow h-screen p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
