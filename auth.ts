import authConfig from "@/auth.config"
import { db } from "@/server/db"
import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import { env } from "@/env"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const config: AuthOptions = {
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    secret: env.AUTH_SECRET,
    pages: {
        error: "/auth/error",
        
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
    },
    ...authConfig,
}   satisfies AuthOptions

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(config)