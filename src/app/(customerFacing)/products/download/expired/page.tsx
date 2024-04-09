import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired() {
    return (
        <>
            <h1 className="text-4xl mb-4">El Enlace que has Seguido ha Caducado</h1>
            <Button asChild size="lg">
                <Link href="/orders">Conseguir Nuevo Enlace</Link>
            </Button>
        </>
    )
}