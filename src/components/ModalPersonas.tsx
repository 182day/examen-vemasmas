import React from 'react';
import { X, User, Mail, Phone, Briefcase, CheckCircle, XCircle } from 'lucide-react';
import type { Persona } from '../interfaces/persona';

interface Props {
  persona: Persona | null;
  abierto: boolean;
  alCerrar: () => void;
}

export const ModalPersona: React.FC<Props> = ({ persona, abierto, alCerrar }) => {
  if (!abierto || !persona) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Card */}
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <User className="text-indigo-600" size={20} />
            Detalle de la Persona
          </h3>
          <button
            onClick={alCerrar}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Nombre Completo</p>
              <p className="text-sm font-medium text-gray-900">{persona.nombre}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Correo Electrónico</p>
              <p className="text-sm font-medium text-gray-900">{persona.correo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Teléfono</p>
              <p className="text-sm font-medium text-gray-900">{persona.telefono || 'No especificado'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
              <Briefcase size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Puesto</p>
              <p className="text-sm font-medium text-gray-900">{persona.puesto || 'Sin asignar'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${persona.activo ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {persona.activo ? <CheckCircle size={18} /> : <XCircle size={18} />}
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Estatus</p>
              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mt-0.5 ${
                persona.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {persona.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>

        {/* Pie */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={alCerrar}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};