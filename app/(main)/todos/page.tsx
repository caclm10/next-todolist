import { desc, eq } from "drizzle-orm";

import { $db } from "@/db";
import { Todo } from "@/db/schema";
import { getAuthed } from "@/lib/auth";
import { TodoCreateForm } from "@/features/todos/components/todo-create-form";
import { TodoList } from "@/features/todos/components/todo-list";

export default async function TodosPage() {
    const { user } = await getAuthed();
    const todos = await $db
        .select()
        .from(Todo)
        .where(eq(Todo.userId, user.id))
        .orderBy(desc(Todo.createdAt));

    return (
        <>
            <div className="flex justify-end mb-6">
                <TodoCreateForm />
            </div>

            <TodoList data={todos} />
        </>
    );
}
