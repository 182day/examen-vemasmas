import { useNavigate, Link } from 'react-router-dom';
import { useAutenticacion } from '../context/Autentication';
import {
    Users,
    LogOut,
} from 'lucide-react';
import { toast } from 'sonner';

export const Header = () => {
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useAutenticacion();

    const manejarCerrarSesion = () => {
        toast.dismiss();
        navigate('/login', { replace: true, state: { logoutIntencional: true } });
        setTimeout(() => {
            cerrarSesion();
            toast.success('Sesión cerrada correctamente');
        }, 0);
    }
    return (<>
        {/* Navbar Superior */}
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/personas" className="flex items-center gap-2 font-bold text-lg">
                    <Users size={24} />
                    <span>Sistema de Personas</span>
                </Link>
                <div className="flex items-center gap-4 text-sm">
                    <span className="hidden sm:inline bg-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                        {usuario?.correo}
                    </span>
                    <button
                        onClick={manejarCerrarSesion}
                        className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md transition-colors text-xs font-semibold"
                    >
                        <LogOut size={16} />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </header>
    </>)
}