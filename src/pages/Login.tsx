import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../context/Autentication';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useAutenticacion();

  const [correo, setCorreo] = useState<string>('');
  const [clave, setClave] = useState<string>('');
  const [errores, setErrores] = useState<{ correo?: string; clave?: string }>({});
  const [cargando, setCargando] = useState<boolean>(false);

  const validarFormulario = (): boolean => {
    const nuevosErrores: { correo?: string; clave?: string } = {};

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!expresionCorreo.test(correo)) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
    }

    if (!clave.trim()) {
      nuevosErrores.clave = 'La contraseña es obligatoria.';
    } else if (clave.length < 6) {
      nuevosErrores.clave = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setCargando(true);

    // 1 segundo de espera
    setTimeout(() => {
      iniciarSesion(correo, clave);
      setCargando(false);
      navigate('/personas');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <LogIn size={24} />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Accede al Sistema de Administración de Personas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={manejarEnvio} noValidate>
            {/* Campo Correo Electrónico */}
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="admin@ejemplo.com"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 ${
                    errores.correo
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errores.correo && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errores.correo}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="clave" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="clave"
                  type="password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 ${
                    errores.clave
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errores.clave && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errores.clave}
                </p>
              )}
            </div>

            {/* Botón de Enviar */}
            <div>
              <button
                type="submit"
                disabled={cargando}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
              >
                {cargando ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Ingresar al sistema'
                )}
              </button>
            </div>
          </form>

          {/* Nota */}
          <div className="mt-6 border-t border-gray-100 pt-4 text-center">
            <span className="text-xs text-gray-500">
              Utilizar datos simulados.
            </span>
          </div>
        </div>

        {/* Firma del Examen */}
        <p className="mt-6 text-center text-xs font-medium text-gray-400 tracking-wide uppercase">
          Examen Vemasmas - Fernando Contreras de la Garza
        </p>
      </div>
    </div>
  );
};