import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/bd";
import { CheckCircle, CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true }}
        },
        orderBy: { name: "asc"}
    })

    if (products.length === 0) return <p>Todavia no tienes productos</p>

    return (
            <Table>
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
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.isAvailableForPurchase ?( 
                                    <>
                                        <span className="sr-only">Producto Disponible</span>
                                        <CheckCircle2 /> 
                                    </>
                                ) : (
                                    <>
                                        <span className="sr-only">Producto No Disponible</span>
                                        <XCircle />
                                    </>
                                )}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                            <TableCell>{formatNumber(product._count.orders)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical />
                                        <span className="sr-only">Ver Mas</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <a download href={`/admin/products/${product.id}/download`}>Descargar</a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                Editar
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
         </Table>
    )
}
            