interface FormMessageProps {
    message?: string;
}

export function FormMessage({ message }: FormMessageProps) {
    if (!message) return null;

    return (
        <p className="text-xs text-destructive font-medium mt-1.5">{message}</p>
    );
}
