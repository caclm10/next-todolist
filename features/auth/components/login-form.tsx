"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";

import { actionState } from "@/lib/utils";
import { loginAction } from "@/features/auth/actions/login";
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

export function LoginForm() {
    const [{ error }, action] = useFormState(loginAction, actionState());

    return (
        <form action={action}>
            <Card>
                <CardHeader>
                    <CardTitle as="h1">Login</CardTitle>
                    <CardDescription>Login to your account.</CardDescription>
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
                        <Link href="/register">Register</Link>
                    </Button>

                    <SubmitButton>Submit</SubmitButton>
                </CardFooter>
            </Card>
        </form>
    );
}
