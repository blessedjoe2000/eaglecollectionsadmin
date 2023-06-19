"use client";

import Layout from "./components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="">Welcome, {session?.user?.name}</div>
        <div className="">
          <img
            src={session?.user?.image}
            alt={`profile of ${session?.user?.name}`}
            className=" w-10 h-10 rounded-full "
          />
        </div>
      </div>
    </Layout>
  );
}
