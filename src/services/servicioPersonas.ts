import axios from 'axios';
import type { Persona } from '../interfaces/persona';

interface RespuestaPersona {
  elError: number;
  mensaje: string;
  persona?: Persona;
  lista?: Persona[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/wspruebas/personas.php';

export const obtenerPersonas = async (): Promise<RespuestaPersona> => {
  const respuesta = await axios.get<RespuestaPersona>(API_URL);
  return respuesta.data;
};

export const obtenerPersonaPorId = async (id: number): Promise<RespuestaPersona> => {
  const respuesta = await axios.get<RespuestaPersona>(`${API_URL}/${id}`);
  return respuesta.data;
};

export const crearPersona = async (persona: Omit<Persona, 'id'>): Promise<RespuestaPersona> => {
  const respuesta = await axios.post<RespuestaPersona>(API_URL, persona);
  return respuesta.data;
};

export const actualizarPersona = async (id: number, persona: Persona): Promise<RespuestaPersona> => {
  const respuesta = await axios.put<RespuestaPersona>(`${API_URL}/${id}`, persona);
  return respuesta.data;
};

export const eliminarPersona = async (id: number): Promise<RespuestaPersona> => {
  const respuesta = await axios.delete<RespuestaPersona>(`${API_URL}/${id}`);
  return respuesta.data;
};