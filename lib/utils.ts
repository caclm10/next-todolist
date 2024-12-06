import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export interface ActionState<S extends z.ZodTypeAny = any, D = any> {
    timestamp: number;
    data?: D;
    error?: {
        message?: string;
        errors?: z.inferFlattenedErrors<S>["fieldErrors"];
    };
}

export function actionState<S extends z.ZodTypeAny = any, D = any>(
    props: Pick<ActionState<S, D>, "data" | "error"> = {}
): ActionState<S, D> {
    return {
        ...props,
        timestamp: new Date().getTime(),
    };
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
