import { createContext, useContext, useState } from 'react';
import { hashearTexto } from '../utilidades/hash';

interface Usuario {
  correo: string;
  clave: string;
}

interface ContextoAutenticacionTipo {
  usuario: Usuario | null;
  iniciarSesion: (correo: string, clave: string) => void;
  cerrarSesion: () => void;
  logeado: boolean;
}

const ContextoAutenticacion = createContext<ContextoAutenticacionTipo | undefined>(undefined);

export function ProveedorAutenticacion({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  const iniciarSesion = async (correo: string, clave: string) => {
    const claveHasheada = await hashearTexto(clave);

    const datosUsuario: Usuario = {
      correo,
      clave: claveHasheada,
    };

    localStorage.setItem('usuario_sesion', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario_sesion');
    setUsuario(null);
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        logeado: !!usuario,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
}

export const useAutenticacion = () => {
  const context = useContext(ContextoAutenticacion);
  if (!context) {
    throw new Error('useAutenticacion sin utilizar');
  }
  return context;
};