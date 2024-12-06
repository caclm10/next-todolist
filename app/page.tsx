import { redirect } from "next/navigation";

export default function IndexPage() {
    redirect("/todos");

    return null;
}
