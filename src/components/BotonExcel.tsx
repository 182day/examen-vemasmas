import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { exportarAExcel } from '../utilidades/excel';
import type { Persona } from '../interfaces/persona';

interface Props {
  datos: Persona[];
}

export const BotonExcel: React.FC<Props> = ({ datos }) => {
  const manejarExportacion = () => {
    if (!datos || datos.length === 0) return;

    // Formatear los datos para definir encabezados limpios en el Excel
    const datosFormateados = datos.map((p) => ({
      'ID': p.id,
      'Nombre': p.nombre,
      'Correo': p.correo,
      'Teléfono': p.telefono || 'N/A',
      'Puesto': p.puesto || 'N/A',
      'Estado': p.activo ? 'Activo' : 'Inactivo',
    }));

    const fechaActual = new Date().toISOString().split('T')[0];
    exportarAExcel(datosFormateados, `Lista_Personas_${fechaActual}.xlsx`, 'Personas');
  };

  return (
    <button
      onClick={manejarExportacion}
      disabled={!datos || datos.length === 0}
      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      title="Descargar lista en formato Excel"
    >
      <FileSpreadsheet className="w-4 h-4" />
      <span>Exportar Excel</span>
    </button>
  );
};