gestion de Matriculas para colegios

tecnologias:
- typescript
- nodejs

backend: 
- strapi v5

frontend:
- astro SSR
- tailwindcss

PASO 1 - El backend acargo de strapji brinda funcionalidades de autenticacion, roles y permisos, ademas de la API Rest para el frontend.

### Estructura de Base de Datos (Content Types)

**1. Estudiante**
- `nombres`: Text
- `apellidos`: Text
- `dni`: String (Unique)
- `fecha_nacimiento`: Date
- `tutor`: Relation (Many-to-One -> Tutor)

**2. Tutor**
- `nombre_completo`: Text
- `dni`: String
- `telefono`: Text
- `email`: Email

**3. Grado**
- `nombre`: String (Ej: 1° Grado Secundaria)
- `seccion`: String
- `cupos_totales`: Integer

**4. Periodo_Academico**
- `nombre`: String (Ej: 2025)
- `activo`: Boolean

**5. Matricula**
- `estudiante`: Relation (Many-to-One -> Estudiante)
- `grado`: Relation (Many-to-One -> Grado)
- `periodo`: Relation (Many-to-One -> Periodo_Academico)
- `estado`: Enumeration (pendiente, aprobado, rechazado, pagado)
- `documento_pago`: Media (Single file)

### Flujo de Trabajo (MVP)

1.  **Configuración**: El Administrador crea el `Periodo_Academico` vigente y los `Grados` disponibles.
2.  **Registro de Identidad**: Se dan de alta los datos del `Tutor` y el `Estudiante` en el sistema.
3.  **Solicitud de Matrícula**: El usuario genera una `Matricula` vinculando al estudiante con un grado y periodo específico. El estado inicial es `pendiente`.
4.  **Validación y Cierre**: El Administrador revisa la solicitud desde el Dashboard de Strapi o el Frontend de Astro, valida los requisitos y cambia el estado a `aprobado` o `pagado` para formalizar la vacante.


PASO 2 - Este proyecto tendra un dashboard donde por roles podran acceder a diferentes funcionalidades administrador y usuario.
usaremos rutas API internas (APIROUTE) para el consumo de datos del backend.

se estructura (ejemplo):

src/
...
├── lib
│   ├── services
│   │   ├── private
│   │   └── public
│   └── types
├── pages
│   ├── api
│   ├── dashboards
└── styles





