import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import { useAutenticacion } from './context/Autentication';
import { Login } from './pages/Login';
import { ListaPersonas } from './pages/ListaPersonas';
import { RegistrarPersonas } from './pages/RegistrarPersonas';
import { Header } from './components/Header';

// Componente para proteger rutas privadas
const RutasProtegidas = () => {
  const { logeado, logoutIntencional } = useAutenticacion();
  const location = useLocation();

  if (!logeado) {
    if (!logoutIntencional) {
      toast.error('No tienes permiso para entrar a esa sección', {
        id: 'no-permiso',
      });
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas */}
        <Route element={<RutasProtegidas />}>
          <Route path="/personas" element={<ListaPersonas />} />
          <Route path="/personas/nueva" element={<RegistrarPersonas />} />
          <Route path="/personas/editar/:id" element={<RegistrarPersonas />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};