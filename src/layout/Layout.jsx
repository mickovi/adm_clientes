import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {
    const location = useLocation()
    const currentPath = location.pathname
    return (
        <div className="md:flex md:min-h-screen">
            {/* Panel lateral */}
            <div className="md:w-1/5 bg-blue-900 px-5 py-10">
                <h2 className="text-3xl font-black text-center text-white">Administrador de Clientes</h2>
                <nav className="mt-10">
                    <Link 
                        className={`${currentPath === '/clientes' ? 'text-blue-600' : 'text-white'} text-xl block mt-2 hover:text-blue-300`}
                        to="/clientes"
                    >
                        Clientes
                    </Link>
                    <Link 
                        className={`${currentPath === '/clientes/nuevo' ? 'text-blue-600' : 'text-white'} text-xl block mt-2 hover:text-blue-300`}
                        to="/clientes/nuevo"
                    >
                        Nuevo Cliente
                    </Link>
                </nav>
            </div>
            {/* Contenido */}
            <div className="md:w-4/5 p-10 md:h-screen oveflow-scroll">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout