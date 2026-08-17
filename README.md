# Sistema de Administración de Personas - Examen Frontend (React)

Aplicación web interactiva para la gestión de personas (CRUD), desarrollada como prueba técnica para desarrollador Frontend React.

---

> ⚠️ **IMPORTANTE:**  
> Para poder ejecutar y conectar el entorno de desarrollo local con la API, **debes solicitar el valor de `VITE_API_URL` a Fernando** e incluirlo en tu archivo `.env`.

---

## 🚀 Tecnologías utilizadas
* React 18
* TypeScript
* React Router DOM v6
* Axios
* Tailwind CSS
* Lucide React (Iconos)
* Sonner
* Xlsx

## 🚀 Características Principales

* **CRUD Completo:** Crear, leer, actualizar y eliminar registros de personas.
* **Vistas Alternables (Tabla / Tarjetas):** Switcher en tiempo real para alternar entre vista de tabla clásica o tarjetas (Cards) con Tailwind CSS.
* **Modal de Detalle:** Inspección rápida de la información completa de cada persona sin salir del listado.
* **Notificaciones Flotantes:** Confirmaciones y mensajes de error interactivos implementados con `sonner`.
* **Manejo de Variables de Entorno:** Configuración desacoplada de la URL del API mediante archivo `.env`.

## 🛠️ Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/examen-react-personas.git](https://github.com/tu-usuario/examen-react-personas.git)
   cd examen-react-personas

2. Configurar las variables de entorno:
# Solicitar el valor exacto de la URL a Fernando

3. Configurar las variables de entorno:
npm run dev

## 📁 Estructura del Proyecto
```text
├── backend/
│   └── Solicitar URL a Fernando     # Script PHP que maneja los métodos GET, POST, PUT y DELETE
├── src/
│   ├── components/
│   │   ├── Header.tsx               # Barra de navegación superior
│   │   ├── FormularioPersonas.tsx   # Formulario reutilizable de registro/edición
│   │   └── ModalDetallePersona.tsx  # Card modal para visualización detallada
│   │   └── BotonExcel.tsx           # Botón para descargar archivo de excel
│   ├── context/
│   │   └── Autentication.tsx        # Contexto global para la gestión de autenticación
│   ├── interfaces/
│   │   └── persona.ts               # Interfaces TypeScript (Persona, RespuestaPersona)
│   ├── pages/
│   │   ├── Login.tsx                # Pantalla de inicio de sesión
│   │   ├── ListaPersonas.tsx        # Listado con filtro, vistas (Tabla/Cards) y modal
│   │   └── RegistrarPersonas.tsx    # Vistas de creación y edición con botón de regresar
│   ├── services/
│   │   └── servicioPersonas.ts      # Funciones HTTP Axios configuradas con VITE_API_URL
│   ├── utilidades/
│   │   └── hash.ts                  # Funciones utilitarias para encriptación / Hashids
│   │   └── excel.ts                 # Librería para realizar el reporte de Excel
│   ├── App.tsx                      # Componente contenedor principal
│   ├── index.css                    # Estilos globales e integración de Tailwind CSS
│   ├── main.tsx                     # Punto de entrada de React
│   └── Router.tsx                   # Definición de rutas públicas y protegidas
├── .env                             # Variables de entorno local
└── package.json