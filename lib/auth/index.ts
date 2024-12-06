import "server-only";

import * as React from "react";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { $db } from "@/db";
import * as schema from "@/db/schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const $auth = betterAuth({
    database: drizzleAdapter($db, {
        provider: "sqlite",
        schema: {
            user: schema.User,
            session: schema.Session,
            account: schema.Account,
            verification: schema.Verification,
        },
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        changeEmail: {
            enabled: true,
        },
    },
    plugins: [nextCookies()],
});

export const getAuthed = React.cache(async () => {
    const authed = await $auth.api.getSession({
        headers: headers(),
    });

    if (!authed?.session) {
        redirect("/login");
    }

    return authed;
});
