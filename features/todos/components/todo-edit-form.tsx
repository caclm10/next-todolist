"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { PencilIcon, PlusIcon } from "lucide-react";

import { actionState } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/custom/button";
import { FormMessage } from "@/components/custom/form";
import { updateTodoAction } from "@/features/todos/actions/update";

interface TodoEditFormProps {
    id: string;
    content: string;
}

export function TodoEditForm({ id, content }: TodoEditFormProps) {
    const [{ error, timestamp }, action] = useFormState(
        updateTodoAction.bind(null, id),
        actionState()
    );
    const [prevTimestamp, setPrevtimestamp] = React.useState(timestamp);
    const [isOpen, setIsOpen] = React.useState(false);

    const contentInputId = React.useId();

    if (timestamp !== prevTimestamp) {
        setPrevtimestamp(timestamp);

        if (!error) {
            setIsOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                    <span className="sr-only">Edit</span>
                    <PencilIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit a todo</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to update the todo.
                    </DialogDescription>
                </DialogHeader>

                <form action={action}>
                    <div className="grid gap-4 pb-6">
                        <div>
                            <Label htmlFor={contentInputId}>Content</Label>
                            <Input
                                id={contentInputId}
                                name="content"
                                placeholder="What to do?"
                                defaultValue={content}
                            />
                            <FormMessage
                                message={error?.errors?.content?.[0]}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <SubmitButton>Update</SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
