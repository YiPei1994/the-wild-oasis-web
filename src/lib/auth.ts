import NextAuth, { Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { ExtendedSession } from "./types";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: Request }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User | AdapterUser }) {
      try {
        const existingUser = await getGuest(user.email);
        if (!existingUser)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: ExtendedSession }) {
      const guest = await getGuest(session?.user?.email);
      if (session && session.user) {
        session.user.guestId = guest.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
