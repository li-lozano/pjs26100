# Sistema de Gestión de Matrículas Escolares 🏫

Una solución moderna y eficiente diseñada para simplificar el proceso de matrículas en instituciones educativas, optimizando la gestión de estudiantes, tutores y vacantes.

## 🚀 Tecnologías

El proyecto utiliza un stack tecnológico de última generación para garantizar rendimiento, escalabilidad y facilidad de mantenimiento:

- **Frontend:** [Astro v5](https://astro.build/) (SSR) con [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend:** [Strapi v5](https://strapi.io/) (Headless CMS)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos:** PostgreSQL
- **Estilos:** Diseño responsivo y moderno con Tailwind CSS.

## 📁 Estructura del Proyecto

El repositorio se organiza de la siguiente manera:

```text
.
├── backend/    # Servidor Strapi (API, Content Types, Autenticación)
└── frontend/   # Aplicación Astro (Dashboard, UI, Consumo de API)
```

## 🏗️ Modelo de Datos (Content Types)

El backend gestiona las siguientes entidades principales:

1.  **Estudiante:** Información personal, DNI (único) y relación con su tutor.
2.  **Tutor:** Datos de contacto del responsable legal.
3.  **Grado:** Niveles escolares con control de vacantes y secciones.
4.  **Periodo Académico:** Gestión de años escolares activos.
5.  **Matrícula:** Vinculación de estudiante-grado-periodo con gestión de estados (Pendiente, Aprobado, Rechazado, Pagado).

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (>= 20.x)
- npm o yarn
- Instancia de PostgreSQL (para el backend)

### Backend (Strapi)

1. Navega a la carpeta backend: `cd backend`
2. Instala las dependencias: `npm install`
3. Configura el archivo `.env` basado en `.env.example`.
4. Inicia en modo desarrollo: `npm run dev`

### Frontend (Astro)

1. Navega a la carpeta frontend: `cd frontend`
2. Instala las dependencias: `npm install`
3. Configura el archivo `.env` con la URL de la API de Strapi.
4. Inicia el servidor de desarrollo: `npm run dev`

## 🔄 Flujo de Trabajo (MVP)

1.  **Configuración:** El administrador define el periodo académico vigente y los grados disponibles.
2.  **Registro:** Se registran los datos del tutor y del estudiante.
3.  **Solicitud:** Se genera la matrícula vinculando al estudiante con un grado y periodo. El estado inicial es **Pendiente**.
4.  **Validación:** El administrador revisa la documentación y el pago, cambiando el estado a **Aprobado** o **Pagado** para formalizar la vacante.

## 👥 Contribuidores

- Desarrollo inicial a cargo de [Tu Nombre/Empresa].

---

Desarrollado con ❤️ para mejorar la educación.
