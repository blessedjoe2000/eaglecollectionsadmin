"use client";

import { useRouter } from "next/navigation";
import Layout from "./components/Layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

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
