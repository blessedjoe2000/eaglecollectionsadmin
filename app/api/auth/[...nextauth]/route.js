import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { signJwtToken } from "@/lib/jwt";
import { mongooseConnect } from "@/lib/connectDb";

let adminEmail = [];

export const authOptions = {
  providers: [
    //Auth authentication providers... google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // CredentialsProvider({
    //   type: "credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials, req) {
    //     const { email, password } = credentials;

    //     await mongooseConnect();

    //     const user = await User.findOne({ email });

    //     if (!user) {
    //       throw new Error("Invalid credentials");
    //     }

    //     const comparePassword = await bcrypt.compare(password, user.password);

    //     if (!comparePassword) {
    //       throw new Error("Invalid credentials");
    //     } else {
    //       const { password, ...currentUser } = user._doc;
    //       const accessToken = signJwtToken(currentUser, { expiresIn: "3d" });
    //       return {
    //         ...currentUser,
    //         accessToken,
    //       };
    //     }
    //   },
    // }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (user.isAdmin) {
        adminEmail = user.email;
      }

      if (adminEmail?.includes(session?.user?.email)) {
        if (token) {
          session.user = {
            _id: token._id,
            accessToken: token.accessToken,
            email: token.email,
          };
        }
        return session;
      } else {
        return false;
      }
    },
  },

  adapter: MongoDBAdapter(clientPromise),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function isAdminRequest() {
  const session = await getServerSession(authOptions);
  if (!adminEmail?.includes(session?.user?.email)) {
    throw new Error("Not authorized, you're not an admin");
  }
}
