import "server-only";

import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", {
        mode: "boolean",
    }).notNull(),
    image: text("image"),
    createdAt: integer("created_at", {
        mode: "timestamp",
    }).notNull(),
    updatedAt: integer("updated_at", {
        mode: "timestamp",
    }).notNull(),
});

export const Session = sqliteTable("sessions", {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", {
        mode: "timestamp",
    }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", {
        mode: "timestamp",
    }).notNull(),
    updatedAt: integer("updated_at", {
        mode: "timestamp",
    }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("userId")
        .notNull()
        .references(() => User.id),
});

export const Account = sqliteTable("accounts", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => User.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("idToken"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
        mode: "timestamp",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
        mode: "timestamp",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", {
        mode: "timestamp",
    }).notNull(),
    updatedAt: integer("updated_at", {
        mode: "timestamp",
    }).notNull(),
});

export const Verification = sqliteTable("verifications", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", {
        mode: "timestamp",
    }).notNull(),
    createdAt: integer("created_at", {
        mode: "timestamp",
    }),
    updatedAt: integer("updated_at", {
        mode: "timestamp",
    }),
});

export const Todo = sqliteTable("todos", {
    id: text("id")
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => User.id),
    content: text("title").notNull(),
    completed: integer("completed", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    createdAt: integer("created_at", {
        mode: "timestamp",
    }).default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer("updated_at", {
        mode: "timestamp",
    })
        .default(sql`(CURRENT_TIMESTAMP)`)
        .$onUpdate(() => new Date()),
});
