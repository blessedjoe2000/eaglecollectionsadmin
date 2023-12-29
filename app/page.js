"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Spinner from "@/components/Spinner/Spinner";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  if (session) {
    router.push("/orders/page/1");
  }

  return (
    <div className="flex justify-center items-center py-5">
      <Spinner />
    </div>
  );
}
