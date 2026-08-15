import { Users } from 'lucide-react';

export const ListaPersonas = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Superior */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Users size={24} />
            <span>Sistema de Personas</span>
          </div>
        </div>
      </header>
    </div>
  );
};