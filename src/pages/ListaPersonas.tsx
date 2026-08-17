import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { obtenerPersonas, eliminarPersona } from '../services/servicioPersonas';
import { ModalPersona } from '../components/ModalPersonas';
import { BotonExcel } from '../components/BotonExcel';
import type { Persona } from '../interfaces/persona';
import {
    Edit,
    Trash2,
    Eye,
    Loader2,
    Search,
    Table as IconoTabla,
    LayoutGrid,
    Mail,
    Phone,
    Briefcase,
    RotateCcw
} from 'lucide-react';

// Datos de prueba iniciales
// const DATOS_INICIALES: Persona[] = [
//     { id: '1', nombre: 'Carlos Mendoza', correo: 'carlos.mendoza@ejemplo.com', telefono: '4421234567', puesto: 'Desarrollador Frontend', activo: true },
//     { id: '2', nombre: 'Ana María Gómez', correo: 'ana.gomez@ejemplo.com', telefono: '4429876543', puesto: 'Diseñadora UX/UI', activo: true },
//     { id: '3', nombre: 'Roberto Torres', correo: 'roberto.torres@ejemplo.com', telefono: '4425558899', puesto: 'Administrador de BD', activo: false },
// ];

export const ListaPersonas = () => {
    //const [personas, setPersonas] = useState<Persona[]>(DATOS_INICIALES);
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);

    const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
    const [modalAbierto, setModalAbierto] = useState<boolean>(false);

    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activos' | 'inactivos'>('todos');

    const [tipoVista, setTipoVista] = useState<'tabla' | 'cards'>('cards');

    // Filtrado dinámico
    const personasFiltradas = personas.filter((persona) => {
        const coincideTexto =
            persona.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            persona.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
            persona.puesto.toLowerCase().includes(busqueda.toLowerCase());

        if (filtroEstado === 'activos') return coincideTexto && persona.activo;
        if (filtroEstado === 'inactivos') return coincideTexto && !persona.activo;
        return coincideTexto;
    });

    const handleLimpiarFiltros = () => {
        setBusqueda("");
        setFiltroEstado("todos");
    };

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Directorio de Personas</h1>
                    <p className="text-sm text-gray-500">
                        {personas.length > 0 ? `Mostrando ${personasFiltradas.length} resultados` : 'Para registrar una persona presiona el botón "Nueva Persona"'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Switcher de Vistas (Tabla / Cards) */}
                    {personas.length > 0 && (
                        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
                            <button
                                onClick={() => setTipoVista('tabla')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${tipoVista === 'tabla'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                title="Vista en Tabla"
                            >
                                <IconoTabla size={16} />
                                <span className="hidden sm:inline">Tabla</span>
                            </button>

                            <button
                                onClick={() => setTipoVista('cards')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${tipoVista === 'cards'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                title="Vista en Tarjetas"
                            >
                                <LayoutGrid size={16} />
                                <span className="hidden sm:inline">Tarjetas</span>
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        {/* Botón de Excel */}
                        <BotonExcel datos={personasFiltradas} />

                        {/* Botón de Registrar */}
                        <Link
                            to="/registrar"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                        >
                            Nueva Persona
                        </Link>
                    </div>
                </div>
            </div>

            {/* Barra de Filtros, Búsqueda y Limpiar */}
            {personas.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, correo o puesto..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <label htmlFor="filtro" className="text-xs font-medium text-gray-600">Estado:</label>
                            <select
                                id="filtro"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value as any)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="todos">Todos</option>
                                <option value="activos">Activos</option>
                                <option value="inactivos">Inactivos</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={handleLimpiarFiltros}
                            className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            title="Limpiar filtros"
                        >
                            <RotateCcw size={16} />
                            <span>Limpiar</span>
                        </button>
                    </div>
                </div>
            )}

            {personasFiltradas.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
                    No se encontraron personas registradas.
                    {personas.length > 0 && <div>Por favor realiza otro busqueda con otros filtros.</div>}
                </div>
            ) : tipoVista === 'tabla' ? (
                /* VISTA EN TABLA */
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Nombre</th>
                                <th className="px-6 py-3 text-left">Correo</th>
                                <th className="px-6 py-3 text-left">Teléfono</th>
                                <th className="px-6 py-3 text-left">Puesto</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                            {personasFiltradas.map((persona) => (
                                <tr key={persona.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{persona.nombre}</td>
                                    <td className="px-6 py-4">{persona.correo}</td>
                                    <td className="px-6 py-4">{persona.telefono || '-'}</td>
                                    <td className="px-6 py-4">{persona.puesto || '-'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => abrirDetalle(persona)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Ver detalle"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <Link
                                                to={`/personas/editar/${persona.id}`}
                                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => manejarEliminar(persona.id, persona.nombre)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* VISTA EN CARDS / TARJETAS */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {personasFiltradas.map((persona) => (
                        <div
                            key={persona.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-900 text-base">{persona.nombre}</h3>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${persona.activo
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {persona.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>

                                <div className="space-y-2 text-xs text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-gray-400" />
                                        <span className="truncate">{persona.correo}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-gray-400" />
                                        <span>{persona.telefono || 'Sin teléfono'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={14} className="text-gray-400" />
                                        <span>{persona.puesto || 'Sin puesto'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones de la Tarjeta */}
                            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                                <button
                                    onClick={() => abrirDetalle(persona)}
                                    className="flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-md font-medium transition-colors"
                                >
                                    <Eye size={14} />
                                    Ver
                                </button>
                                <Link
                                    to={`/personas/editar/${persona.id}`}
                                    className="flex items-center gap-1 text-xs text-indigo-600 hover:bg-indigo-50 px-2.5 py-1.5 rounded-md font-medium transition-colors"
                                >
                                    <Edit size={14} />
                                    Editar
                                </Link>
                                <button
                                    // @ts-ignore
                                    onClick={() => manejarEliminar(persona.id, persona.nombre)}
                                    className="flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-md font-medium transition-colors"
                                >
                                    <Trash2 size={14} />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ModalPersona
                persona={personaSeleccionada}
                abierto={modalAbierto}
                alCerrar={cerrarDetalle}
            />
        </main>
    );
};