import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
        return(
        <>
            <Nav>
                <NavLink href="/admin">Dashboard</NavLink>
                <NavLink href="/admin/products">Productos</NavLink>
                <NavLink href="/admin/users">Clientes</NavLink>
                <NavLink href="/admin/orders">Ventas</NavLink>
            </Nav>
            <div className="container my-6">{children}</div>
        </>
    )
}