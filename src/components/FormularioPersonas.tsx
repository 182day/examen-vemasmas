import React, { useState, useEffect } from 'react';
import type { Persona } from '../interfaces/persona';


interface PropsFormulario {
  valoresIniciales?: Persona;
  alEnviar: (datos: Persona) => void;
  estaCargando?: boolean;
}

export const FormularioPersonas: React.FC<PropsFormulario> = ({
  valoresIniciales,
  alEnviar,
  estaCargando,
}) => {
  const [datosFormulario, setDatosFormulario] = useState<Persona>({
    nombre: '',
    correo: '',
    telefono: '',
    puesto: '',
    activo: true,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    if (valoresIniciales) {
      setDatosFormulario(valoresIniciales);
    }
  }, [valoresIniciales]);

  const validarCampos = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    if (!datosFormulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datosFormulario.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!expresionCorreo.test(datosFormulario.correo)) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
    }

    const expresionTelefono = /^\d{10}$/;
    if (!datosFormulario.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio.';
    } else if (!expresionTelefono.test(datosFormulario.telefono)) {
      nuevosErrores.telefono = 'El teléfono debe contener exactamente 10 dígitos.';
    }

    if (!datosFormulario.puesto.trim()) {
      nuevosErrores.puesto = 'El puesto es obligatorio.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (validarCampos()) {
      alEnviar(datosFormulario);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-4 max-w-md mx-auto p-6 bg-white border rounded-lg shadow-sm">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
        <input
          type="text"
          value={datosFormulario.nombre}
          onChange={(e) => setDatosFormulario({ ...datosFormulario, nombre: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded mt-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errores.nombre && <span className="text-red-500 text-xs">{errores.nombre}</span>}
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          value={datosFormulario.correo}
          onChange={(e) => setDatosFormulario({ ...datosFormulario, correo: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded mt-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errores.correo && <span className="text-red-500 text-xs">{errores.correo}</span>}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono (10 dígitos)</label>
        <input
          type="text"
          maxLength={10}
          value={datosFormulario.telefono}
          onChange={(e) => setDatosFormulario({ ...datosFormulario, telefono: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded mt-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errores.telefono && <span className="text-red-500 text-xs">{errores.telefono}</span>}
      </div>

      {/* Puesto */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Puesto</label>
        <input
          type="text"
          value={datosFormulario.puesto}
          onChange={(e) => setDatosFormulario({ ...datosFormulario, puesto: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded mt-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errores.puesto && <span className="text-red-500 text-xs">{errores.puesto}</span>}
      </div>

      {/* Activo (Checkbox) */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="activo"
          checked={datosFormulario.activo}
          onChange={(e) => setDatosFormulario({ ...datosFormulario, activo: e.target.checked })}
          className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
        />
        <label htmlFor="activo" className="text-sm font-medium text-gray-700">
          {datosFormulario.activo ? "Estado Activo" : "Estado Inactivo"}
        </label>
      </div>

      {/* Botón de Enviar */}
      <button
        type="submit"
        disabled={estaCargando}
        className="w-full bg-indigo-600 text-white py-2 rounded font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
      >
        {estaCargando ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
};