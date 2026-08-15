import { createContext, useContext, useState, useEffect } from 'react';
import { hashearTexto } from '../utilidades/hash';

interface Usuario {
  correo: string;
  clave: string;
}

interface ContextoAutenticacionTipo {
  usuario: Usuario | null;
  iniciarSesion: (correo: string, clave: string) => void;
  logeado: boolean;
}

const ContextoAutenticacion = createContext<ContextoAutenticacionTipo | undefined>(undefined);

export function ProveedorAutenticacion({ children }: { children: any }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    if (sesionGuardada) {
      setUsuario(JSON.parse(sesionGuardada));
    }
  }, []);

  const iniciarSesion = async (correo: string, clave: string) => {
    // Generar hash SHA-256 de la contraseña
    const claveHasheada = await hashearTexto(clave);

    const datosUsuario: Usuario = {
      correo,
      clave: claveHasheada,
    };

    localStorage.setItem('usuario_sesion', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuario,
        iniciarSesion,
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