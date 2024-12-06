"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export const SubmitButton = React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentPropsWithoutRef<typeof Button>
>(function SubmitButton(props, ref) {
    const { pending } = useFormStatus();

    return <Button type="submit" ref={ref} disabled={pending} {...props} />;
});
