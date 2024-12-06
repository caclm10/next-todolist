"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";

import { actionState } from "@/lib/utils";
import { registerAction } from "@/features/auth/actions/register";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/custom/form";
import { SubmitButton } from "@/components/custom/button";

export function RegisterForm() {
    const [{ error }, action] = useFormState(registerAction, actionState());

    return (
        <form action={action}>
            <Card>
                <CardHeader>
                    <CardTitle as="h1">Register</CardTitle>
                    <CardDescription>Create an account.</CardDescription>
                </CardHeader>

                <CardContent>
                    {error?.message && (
                        <Alert variant="destructive" className="mb-4">
                            <CircleAlertIcon className="size-4" />
                            <AlertTitle>An error ocurred.</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="ex. John Doe"
                            />
                            <FormMessage message={error?.errors?.name?.[0]} />
                        </div>

                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="youremail@example.com"
                            />
                            <FormMessage message={error?.errors?.email?.[0]} />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••••••"
                            />
                            <FormMessage
                                message={error?.errors?.password?.[0]}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button variant="link" asChild>
                        <Link href="/login">Login</Link>
                    </Button>

                    <SubmitButton>Submit</SubmitButton>
                </CardFooter>
            </Card>
        </form>
    );
}
