"use server";

import { revalidatePath } from "next/cache";
import { and, eq, not } from "drizzle-orm";
import { z } from "zod";

import { $db } from "@/db";
import { Todo } from "@/db/schema";
import { getAuthed } from "@/lib/auth";
import { actionState } from "@/lib/utils";

const updateTodoSchema = z.object({
    content: z.string().min(1),
});

export async function updateTodoAction(
    id: string,
    prevState: any,
    formData: FormData
) {
    try {
        const { user } = await getAuthed();

        const { content } = updateTodoSchema.parse({
            content: formData.get("content"),
        });

        await $db
            .update(Todo)
            .set({
                content,
            })
            .where(and(eq(Todo.id, id), eq(Todo.userId, user.id)));

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

export async function updateTodoCompletedAction(id: string) {
    const { user } = await getAuthed();

    await $db
        .update(Todo)
        .set({
            completed: not(Todo.completed),
        })
        .where(and(eq(Todo.id, id), eq(Todo.userId, user.id)));

    revalidatePath("/todos");

    return actionState();
}
