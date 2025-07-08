export interface MenuItem {
  title: string;
  icon?: string;
  path?: string;
  children?: (string | MenuItem)[];
}

export const menuConfig: MenuItem[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    path: "/",
  },
  {
    title: "Proyectos",
    icon: "building",
    children: [
      { title: "Proyectos de Premium", path: "/proyectos" },
      { title: "Indicadores Clave (KPIs)", path: "/proyectos/kpis" },
      { title: "Estado de Avance (cronograma/Gantt) Presupuesto y Costos", path: "/proyectos/estado-avance" },
      { title: "Licencias y Permisos", path: "/proyectos/licencias" },
      { title: "Galería de Planos y Fotos", path: "/proyectos/galeria" },
      { title: "Crear Nuevo Proyecto", path: "/proyectos/crear" }
    ]
  },
  {
    title: "Mapa de Proyectos",
    icon: "map",
    children: [
      { title: "Vista Satelital", path: "/mapa/vista-satelital" }
    ]
  },
  {
    title: "Cronograma Global",
    icon: "calendar",
    children: [
      {
        title: 'Calendario Maestro (Timeline)',
        path: '/cronograma/calendario-maestro',
      },
      {
        title: 'Actividades por Departamento',
        path: '/cronograma/actividades-departamento',
      }
    ]
  },
  {
    title: "Reportes Ejecutivos",
    icon: "file-text",
    children: [
      {
        title: 'Informe Mensual',
        path: '/reportes/informe-mensual',
      },
      {
        title: 'Comparativo de Proyectos',
        path: '/reportes/comparativo-proyectos',
      },
      {
        title: 'KPIs',
        path: '/reportes/kpis',
      }
    ]
  },
  {
    title: "Departamentos",
    icon: "briefcase",
    children: [
      {
        title: "Finanzas",
        icon: "dollar-sign",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/finanzas/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/finanzas/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/finanzas/tareas',
          }
        ]
      },
      {
        title: "Operaciones",
        icon: "cog",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/operaciones/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/operaciones/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/operaciones/tareas',
          }
        ]
      },
      {
        title: "Administración",
        icon: "briefcase",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/administracion/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/administracion/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/administracion/tareas',
          }
        ]
      },
      {
        title: "Arquitectura",
        icon: "ruler",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/arquitectura/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/arquitectura/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/arquitectura/tareas',
          }
        ]
      },
      {
        title: "Mercadeo",
        icon: "megaphone",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/mercadeo/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/mercadeo/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/mercadeo/tareas',
          }
        ]
      },
      {
        title: "Fundación",
        icon: "heart",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/fundacion/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/fundacion/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/fundacion/tareas',
          }
        ]
      },
      {
        title: "Ventas",
        icon: "shopping-cart",
        children: [
          {
            title: 'Reporte Interno',
            path: '/departamentos/ventas/reporte-interno',
          },
          {
            title: 'Agenda Semanal Interna',
            path: '/departamentos/ventas/agenda-semanal',
          },
          {
            title: 'Tareas',
            path: '/departamentos/ventas/tareas',
          }
        ]
      }
    ]
  }
]; 