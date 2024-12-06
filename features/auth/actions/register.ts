"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { APIError } from "better-auth/api";

import { actionState, type ActionState } from "@/lib/utils";
import { $auth } from "@/lib/auth";

const registerSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(255).email(),
    password: z.string().min(8).max(32),
});

export async function registerAction(
    prevState: any,
    formData: FormData
): Promise<ActionState<typeof registerSchema>> {
    try {
        const data = registerSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        await $auth.api.signUpEmail({
            body: data,
        });

        redirect("/todos");
    } catch (error) {
        if (error instanceof z.ZodError) {
            return actionState({
                error: {
                    errors: error.flatten().fieldErrors,
                },
            });
        }

        if (error instanceof APIError) {
            return actionState({
                error: {
                    message: error.body.message || "Something went wrong.",
                },
            });
        }

        throw error;
    }
}
