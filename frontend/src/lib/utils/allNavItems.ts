export const allNavItems = [
  {
    label: "Inicio",
    icon: "🏠",
    href: "/dashboard",
    roles: ["Administrador", "Encargado"]
  },
  {
    label: "Tutores",
    icon: "👥",
    href: "/dashboard/tutores",
    roles: ["Administrador", "Encargado"],
  },
  {
    label: "Estudiantes",
    icon: "🎓",
    href: "/dashboard/estudiantes",
    roles: ["Administrador", "Encargado"],
  },
  {
    label: "Inicio",
    icon: "🏠",
    href: "/dashboard/tutor",
    roles: ["Tutor"],
  },
  {
    label: "Mis Estudiantes",
    icon: "👶",
    href: "/dashboard/tutor/mis-estudiantes",
    roles: ["Tutor"],
  },
  {
    label: "Matrículas",
    icon: "📝",
    href: "/dashboard/matriculas",
    roles: ["Administrador", "Encargado"],
  },
  {
    label: "Configuración",
    icon: "⚙️",
    href: "/dashboard/configuraciones",
    roles: ["Administrador"],
  },
];