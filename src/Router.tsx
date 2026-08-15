import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAutenticacion } from './context/Autentication';
import { Login } from './pages/Login';
import { ListaPersonas } from './pages/ListaPersonas';

// Componente para proteger rutas privadas
const RutaProtegida = ({ children }: { children: React.ReactNode }) => {
  const { logeado } = useAutenticacion();
  const location = useLocation();

  useEffect(() => {
    if (!logeado) {
      toast.error('No tienes permiso para entrar a esa sección', {
        id: 'no-permiso',
      });
    }
  }, [logeado]);

  if (!logeado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas */}
        <Route
          path="/personas"
          element={
            <RutaProtegida>
              <ListaPersonas />
            </RutaProtegida>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};