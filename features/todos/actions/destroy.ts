"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { $db } from "@/db";
import { Todo } from "@/db/schema";
import { actionState } from "@/lib/utils";

export async function destroyTodoAction(id: string) {
    await $db.delete(Todo).where(eq(Todo.id, id));

    revalidatePath("/todos");

    return actionState();
}
