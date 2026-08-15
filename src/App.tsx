import { ProveedorAutenticacion } from './context/Autentication';
import { Toaster } from 'sonner';
import { Router } from './Router';

export const App = () => {
  return (
    <ProveedorAutenticacion>
      <Toaster position="top-right" richColors />
      <Router />
    </ProveedorAutenticacion>
  );
};

export default App;