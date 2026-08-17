import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FormularioPersonas } from '../components/FormularioPersonas';
import { ArrowLeft } from 'lucide-react';
import {
  obtenerPersonaPorId,
  crearPersona,
  actualizarPersona
} from '../services/servicioPersonas';
import type { Persona } from '../interfaces/persona';


export const RegistrarPersonas = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [valoresIniciales, setValoresIniciales] = useState<Persona | undefined>(undefined);
  const [cargandoDatos, setCargandoDatos] = useState<boolean>(false);
  const [estaGuardando, setEstaGuardando] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setCargandoDatos(true);
      obtenerPersonaPorId(Number(id))
        .then((data) => {
          if (data.elError === 1) {
            setValoresIniciales(data.persona);
          } else {
            toast.error(data.mensaje);
          }
        })
        .catch(() => toast.error('Error al cargar la información de la persona.'))
        .finally(() => setCargandoDatos(false));
    }
  }, [id]);

  const guardarPersona = async (datos: Persona) => {
    setEstaGuardando(true);
    try {
      if (id) {
        const response = await actualizarPersona(Number(id), datos);
        if (response.elError === 1) {
          toast.success(response.mensaje);
        } else {
          toast.error(response.mensaje);
        }
      } else {
        const response = await crearPersona(datos);
        if (response.elError === 1) {
          toast.success(response.mensaje);
        } else {
          toast.error(response.mensaje);
        }
      }
      navigate('/personas');
    } catch (error) {
      toast.error('Ocurrió un error al guardar los datos.');
    } finally {
      setEstaGuardando(false);
    }
  };

  if (cargandoDatos) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Cargando información...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Regresar
      </button>
      <div className="max-w-md mx-auto mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {id ? 'Editar Persona' : 'Registrar Nueva Persona'}
        </h1>

        <FormularioPersonas
          valoresIniciales={valoresIniciales}
          alEnviar={guardarPersona}
          estaCargando={estaGuardando}
        />
      </div>
    </main>
  );
};