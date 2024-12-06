"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { APIError } from "better-auth/api";

import { actionState, type ActionState } from "@/lib/utils";
import { $auth } from "@/lib/auth";

const loginSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
});

export async function loginAction(
    prevState: any,
    formData: FormData
): Promise<ActionState<typeof loginSchema>> {
    try {
        const data = loginSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        await $auth.api.signInEmail({
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
