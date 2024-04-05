import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminProductsPage(){
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Productos</PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new">Agregar Producto</Link>
                </Button>
            </div>
            <ProductsTable />
        </> 
    )
}

function ProductsTable() {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className="sr-only">Disponible para Comprar</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Ordenes</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
    </Table>
}