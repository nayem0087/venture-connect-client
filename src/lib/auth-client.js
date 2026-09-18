import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /** The base URL of THIS Next.js app (where /api/auth/[...all] lives),
     *  NOT the separate Express backend used for startups/opportunities. */
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

// Reuse the SAME configured client instead of calling createAuthClient()
// again with no config — that second call was silently ignoring baseURL.
export const { signIn, signUp, signOut, useSession } = authClient;