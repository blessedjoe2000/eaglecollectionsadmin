"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Login() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/orders/page/1");
    }
  }, [session]);

  if (!session) {
    return (
      <div className="bg-main-purple h-screen  flex items-center justify-center">
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
}

export default Login;
