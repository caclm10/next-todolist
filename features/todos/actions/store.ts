"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { $db } from "@/db";
import { Todo } from "@/db/schema";
import { getAuthed } from "@/lib/auth";
import { actionState } from "@/lib/utils";

const storeTodoSchema = z.object({
    content: z.string().min(1),
});

export async function storeTodoAction(prevState: any, formData: FormData) {
    try {
        const { user } = await getAuthed();

        const { content } = storeTodoSchema.parse({
            content: formData.get("content"),
        });

        await $db.insert(Todo).values({
            userId: user.id,
            content,
        });

        revalidatePath("/todos");

        return actionState();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return actionState({
                error: {
                    errors: error.flatten().fieldErrors,
                },
            });
        }

        throw error;
    }
}
