import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { env } from "@/env"
import { AuthOptions } from "next-auth"
export default {
    providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
    ],

} satisfies AuthOptions