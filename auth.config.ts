import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "@/env";

export default {
  providers: [
    Google({
      // clientId: env.GOOGLE_CLIENT_ID || "",
      clientId: env.AUTH_SECRET || "",
      clientSecret: "env.GOOGLE_CLIENT_SECRET",
    }),
    Github({
      clientId: "env.GITHUB_CLIENT_ID",
      clientSecret: "env.GITHUB_CLIENT_SECRET",
    }),
  ],
} satisfies NextAuthConfig;
