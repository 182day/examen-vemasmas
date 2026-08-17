import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { obtenerPersonas, eliminarPersona } from '../services/servicioPersonas';
import { ModalPersona } from '../components/ModalPersonas';
import type { Persona } from '../interfaces/persona';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react';

// Datos de prueba iniciales
// const DATOS_INICIALES: Persona[] = [
//     { id: '1', nombre: 'Carlos Mendoza', correo: 'carlos.mendoza@ejemplo.com', telefono: '4421234567', puesto: 'Desarrollador Frontend', activo: true },
//     { id: '2', nombre: 'Ana María Gómez', correo: 'ana.gomez@ejemplo.com', telefono: '4429876543', puesto: 'Diseñadora UX/UI', activo: true },
//     { id: '3', nombre: 'Roberto Torres', correo: 'roberto.torres@ejemplo.com', telefono: '4425558899', puesto: 'Administrador de BD', activo: false },
// ];

export const ListaPersonas = () => {
    const navigate = useNavigate();

    //const [personas, setPersonas] = useState<Persona[]>(DATOS_INICIALES);
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);

    const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
    const [modalAbierto, setModalAbierto] = useState<boolean>(false);

    const abrirDetalle = (persona: Persona) => {
        setPersonaSeleccionada(persona);
        setModalAbierto(true);
    };

    const cerrarDetalle = () => {
        setModalAbierto(false);
        setPersonaSeleccionada(null);
    };

    const cargarLista = async () => {
        setCargando(true);
        try {
            const datos = await obtenerPersonas();
            setPersonas(datos.lista ?? []);
        } catch (error) {
            toast.error('Error al obtener la lista de personas.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarLista();
    }, []);

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
                <span className="ml-2 text-gray-600 font-medium">Cargando personas...</span>
            </div>
        );
    }

    const manejarEliminar = (id: number, nombre: string) => {
        toast(`¿Está seguro de eliminar a ${nombre}?`, {
            id: `eliminar-${id}`, // Evita toasts duplicados si hace varios clics
            action: {
                label: 'Eliminar',
                onClick: async () => {
                    try {
                        const respuesta = await eliminarPersona(id);
                        if (respuesta.elError === 1) {
                            setPersonas((prev) => prev.filter((p) => p.id !== id));
                            toast.success(`${nombre} ha sido eliminado correctamente.`);
                        } else {
                            toast.error(respuesta.mensaje || 'No se pudo eliminar el registro');
                        }
                    } catch (error) {
                        toast.error('Error de conexión al intentar eliminar.');
                    }
                },
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => toast.dismiss(`eliminar-${id}`),
            },
        });
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
            {/* Encabezado de Sección y Acciones */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Directorio de Personas</h1>
                    <p className="text-sm text-gray-500">Administración de personal registrado.</p>
                </div>

                <button
                    onClick={() => navigate('/personas/nueva')}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition-colors font-medium text-sm"
                >
                    <Plus size={18} />
                    Nueva Persona
                </button>
            </div>
            

            {/* Tabla de Personas */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="py-3 px-4">Nombre</th>
                                <th className="py-3 px-4">Correo</th>
                                <th className="py-3 px-4">Teléfono</th>
                                <th className="py-3 px-4">Puesto</th>
                                <th className="py-3 px-4">Estado</th>
                                <th className="py-3 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {personas.length > 0 ? (
                                personas.map((persona) => (
                                    <tr key={persona.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 font-medium text-gray-900">{persona.nombre}</td>
                                        <td className="py-3 px-4 text-gray-600">{persona.correo}</td>
                                        <td className="py-3 px-4 text-gray-600">{persona.telefono}</td>
                                        <td className="py-3 px-4 text-gray-600">{persona.puesto}</td>
                                        <td className="py-3 px-4">
                                            {persona.activo ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                                                    <CheckCircle size={12} /> Activo
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full">
                                                    <XCircle size={12} /> Inactivo
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => abrirDetalle(persona)}
                                                    title="Ver Detalle"
                                                    className="cursor-pointer p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/personas/editar/${persona.id}`)}
                                                    title="Editar"
                                                    className="cursor-pointer p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        //@ts-ignore
                                                        manejarEliminar(persona.id, persona.nombre)
                                                    }}
                                                    title="Eliminar"
                                                    className="cursor-pointer p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-500">
                                        No se encontraron registros que coincidan con los criterios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalPersona
                persona={personaSeleccionada}
                abierto={modalAbierto}
                alCerrar={cerrarDetalle}
            />
        </main>
    );
};