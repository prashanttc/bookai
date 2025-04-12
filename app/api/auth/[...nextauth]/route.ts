import { prisma } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name || "user",
              email: user.email!,
            },
          });
        }

        return true;
      } catch (err) {
        console.error("❌ Error saving user to DB:", err);
        return false;
      }
    },

    // ✅ Include your DB user ID in the JWT
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.id = dbUser.id; // store Prisma user ID
        }
      }
      return token;
    },

    // ✅ Attach Prisma user ID to session
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect() {
      return "/home";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
