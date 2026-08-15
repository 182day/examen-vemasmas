import { ProveedorAutenticacion } from './context/Autentication';
import { Router } from './Router';

export const App = () => {
  return (
    <ProveedorAutenticacion>
      <Router />
    </ProveedorAutenticacion>
  );
};

export default App;