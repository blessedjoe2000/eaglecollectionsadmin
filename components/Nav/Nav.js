"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo/Logo";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Image from "next/image";

function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const inactiveLink = "flex gap-1 text-white";
  const activeLink = `flex gap-1 text-sharp-purple bg-white px-2 py-1 rounded-md`;
  const inactiveIcon = "w-6 h-6";
  const activeIcon = `${inactiveIcon} "text-main-pink`;

  async function logout() {
    try {
      toast.success("you have been logged out", {
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
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      {session && (
        <nav
          className={`   text-white px-5 py-2 bg-main-purple sm:h-24 h-18  md:static md:w-auto transition-all`}
        >
          <div className="flex gap-5 justify-between items-center">
            <div className="mb-4">
              {" "}
              <Logo />
            </div>

            <div className="flex gap-5">
              <div>
                <Link
                  href={`/orders/page/1`}
                  className={
                    pathname.includes("/orders") ? activeLink : inactiveLink
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      pathname.includes("/orders") ? activeIcon : inactiveIcon
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  Orders
                </Link>
              </div>
              <div>
                <Link
                  href="/products"
                  className={
                    pathname.includes("/products") ? activeLink : inactiveLink
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      pathname.includes("/products") ? activeIcon : inactiveIcon
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>
                  Products
                </Link>
              </div>
            </div>

            <div>
              {session && (
                <div>
                  <button onClick={toggleDrawer}>
                    <Image
                      src={session?.user?.image}
                      alt="profile photo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </button>
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="right"
                    className="text-black/60 flex flex-col items-center"
                  >
                    <button onClick={toggleDrawer} className="pb-3 pt-5 ">
                      <Image
                        src={session?.user?.image}
                        alt="profile photo"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </button>
                    <div className="flex gap-2 font-bold">
                      <p>Welcome,</p>
                      <p>{session.user.name}</p>
                    </div>
                    <p className="py-1">{session.user.email}</p>
                    <button
                      className=" flex items-center px-2 py-1 bg-main-pink rounded-lg text-white hover:text-sharp-purple my-3"
                      onClick={logout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      <p className="font-bold">Logout</p>
                    </button>
                    <button
                      onClick={toggleDrawer}
                      className="flex items-center px-2 bg-main-purple text-white rounded-md mt-10 hover:text-sharp-pink"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <p>close</p>
                    </button>
                  </Drawer>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Nav;
