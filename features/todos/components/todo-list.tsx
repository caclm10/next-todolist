"use client";

import * as React from "react";
import autoAnimate from "@formkit/auto-animate";
import { PencilIcon, TrashIcon } from "lucide-react";

import { Todo } from "@/db/schema";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { updateTodoCompletedAction } from "@/features/todos/actions/update";
import { destroyTodoAction } from "@/features/todos/actions/destroy";
import { TodoEditForm } from "@/features/todos/components/todo-edit-form";

interface TodoListProps {
    data: (typeof Todo.$inferSelect)[];
}

export function TodoList({ data }: TodoListProps) {
    const [optimisticData, mutateOptimisticData] = React.useOptimistic<
        (typeof Todo.$inferSelect)[],
        { type: "updateCompleted" | "delete"; id: string }
    >(data, (state, action) => {
        if (action.type === "updateCompleted") {
            const newState = [...state];
            const index = state.findIndex((item) => item.id === action.id);

            if (index !== -1) {
                newState[index].completed = !newState[index].completed;
            }

            return newState;
        }

        const newState = state.filter((item) => item.id !== action.id);
        return newState;
    });

    const rootRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        rootRef.current && autoAnimate(rootRef.current);
    }, [rootRef]);

    return (
        <div ref={rootRef} className="grid gap-4">
            {optimisticData.map((item) => (
                <TodoListItem
                    key={item.id}
                    {...item}
                    mutator={mutateOptimisticData}
                />
            ))}
        </div>
    );
}

type TodoListItemProps = typeof Todo.$inferSelect & {
    mutator: (action: {
        type: "updateCompleted" | "delete";
        id: string;
    }) => void;
};

export function TodoListItem({
    id,
    content,
    completed,
    mutator: mutate,
}: TodoListItemProps) {
    const [, startTransition] = React.useTransition();

    async function handleClick() {
        startTransition(() => {
            mutate({
                type: "updateCompleted",
                id,
            });
        });
        await updateTodoCompletedAction(id);
    }

    async function handleClickDelete() {
        startTransition(() => {
            mutate({
                type: "delete",
                id,
            });
        });
        await destroyTodoAction(id);
    }

    return (
        <Card>
            <CardContent className="p-6 relative [&:not(:has([data-edit-button]:hover, [data-delete-button]:hover))]:hover:bg-accent">
                <div className="flex items-center gap-4 pr-[calc(96px_+_1.5rem)]">
                    <Checkbox className="rounded" checked={completed} />
                    <span>{content}</span>
                </div>

                <button
                    type="button"
                    className="absolute inset-0"
                    onClick={handleClick}
                ></button>

                <div className="absolute right-0 inset-y-0 flex items-center gap-4 pr-6">
                    <TodoEditForm id={id} content={content} />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                data-delete-button
                            >
                                <span className="sr-only">Delete</span>
                                <TrashIcon />
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Delete To-Do Item
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this To-Do
                                    item? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClickDelete}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
}
