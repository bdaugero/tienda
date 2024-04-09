import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
        return(
        <>
            <Nav>
                <NavLink href="/">Inicio</NavLink>
                <NavLink href="/products">Productos</NavLink>
                <NavLink href="/orders">Mis Compras</NavLink>
            </Nav>
            <div className="container my-6">{children}</div>
        </>
    )
}