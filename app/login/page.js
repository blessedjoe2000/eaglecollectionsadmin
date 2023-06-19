"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Login() {
  const { data: session } = useSession();

  const router = useRouter();

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

  router.push("/");
}

export default Login;
