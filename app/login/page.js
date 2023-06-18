"use client";

import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="  flex items-center justify-center">
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
    <div>
      Logged in {session?.user?.email}
      <div>
        <button
          className="bg-white p-2 px-4 rounded-lg"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Login;
