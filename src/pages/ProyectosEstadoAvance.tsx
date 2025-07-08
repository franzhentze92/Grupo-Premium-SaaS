import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import GanttCalendar, { GanttCalendarTask } from '@/components/GanttCalendar';
import { GanttChart as GanttIcon, Filter, CheckCircle, Clock, AlertCircle, TrendingUp, CalendarDays, Users, BarChart3, DollarSign, Download, Printer, Share2, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const activities: Activity[] = [
  {
    id: 1,
    name: 'Excavación',
    departamento: 'Obra',
    estado: 'Completada',
    fecha: '2024-01-10',
    fechaFin: '2024-02-15',
    prioridad: 'Alta',
    progreso: 100,
    responsable: 'Juan Pérez',
    descripcion: 'Excavación del terreno para cimientos',
    proyecto: 'Torre Premium I',
    presupuesto: '$200,000',
    equipo: 10,
    dependencias: []
  },
  {
    id: 2,
    name: 'Cimentación',
    departamento: 'Obra',
    estado: 'En Progreso',
    fecha: '2024-02-16',
    fechaFin: '2024-03-10',
    prioridad: 'Alta',
    progreso: 60,
    responsable: 'Ana Gómez',
    descripcion: 'Colocación de cimientos y estructura base',
    proyecto: 'Torre Premium I',
    presupuesto: '$300,000',
    equipo: 12,
    dependencias: ['Excavación']
  },
  {
    id: 3,
    name: 'Estructura',
    departamento: 'Obra',
    estado: 'Pendiente',
    fecha: '2024-03-11',
    fechaFin: '2024-05-01',
    prioridad: 'Media',
    progreso: 0,
    responsable: 'Carlos Ruiz',
    descripcion: 'Levantamiento de estructura principal',
    proyecto: 'Torre Premium I',
    presupuesto: '$500,000',
    equipo: 15,
    dependencias: ['Cimentación']
  },
  {
    id: 4,
    name: 'Acabados',
    departamento: 'Obra',
    estado: 'Pendiente',
    fecha: '2024-05-02',
    fechaFin: '2024-06-30',
    prioridad: 'Baja',
    progreso: 0,
    responsable: 'Laura Díaz',
    descripcion: 'Trabajos de acabados y detalles finales',
    proyecto: 'Torre Premium I',
    presupuesto: '$150,000',
    equipo: 8,
    dependencias: ['Estructura']
  }
];

const allDepartamentos = Array.from(new Set(activities.map(a => a.departamento)));
const allEstados = Array.from(new Set(activities.map(a => a.estado)));
const allPrioridades = Array.from(new Set(activities.map(a => a.prioridad)));
const allProyectos = Array.from(new Set(activities.map(a => a.proyecto)));

const kpiCards = [
  {
    label: 'Total Fases',
    value: activities.length,
    icon: CalendarDays,
    color: 'bg-blue-100 text-blue-700',
    trend: '+1 este mes'
  },
  {
    label: 'Completadas',
    value: activities.filter(a => a.estado === 'Completada').length,
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700',
    trend: '+1 esta semana'
  },
  {
    label: 'En Progreso',
    value: activities.filter(a => a.estado === 'En Progreso').length,
    icon: Clock,
    color: 'bg-purple-100 text-purple-700',
    trend: '1 activa'
  },
  {
    label: 'Pendientes',
    value: activities.filter(a => a.estado === 'Pendiente').length,
    icon: AlertCircle,
    color: 'bg-yellow-100 text-yellow-700',
    trend: 'Por iniciar'
  },
  {
    label: 'Progreso Promedio',
    value: `${Math.round(activities.reduce((acc, a) => acc + a.progreso, 0) / activities.length)}%`,
    icon: TrendingUp,
    color: 'bg-pink-100 text-pink-700',
    trend: '+5% vs mes anterior'
  },
  {
    label: 'Equipo Total',
    value: activities.reduce((acc, a) => acc + a.equipo, 0),
    icon: Users,
    color: 'bg-orange-100 text-orange-700',
    trend: '45 personas'
  }
];

// Define Activity type for type safety
interface Activity {
  id: number;
  name: string;
  departamento: string;
  estado: 'Completada' | 'En Progreso' | 'Pendiente' | 'Retrasada';
  fecha: string;
  fechaFin: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  progreso: number;
  responsable: string;
  descripcion: string;
  proyecto: string;
  presupuesto: string;
  equipo: number;
  dependencias: string[];
}

const convertToGanttCalendarTasks = (activities: Activity[]): GanttCalendarTask[] => {
  return activities.map(activity => ({
    id: activity.id.toString(),
    name: activity.name,
    start: new Date(activity.fecha),
    end: new Date(activity.fechaFin),
    type: 'task',
    progress: activity.progreso,
    project: activity.proyecto,
    dependencies: activity.dependencias.map(dep => {
      const found = activities.find(a => a.name === dep);
      return found ? found.id.toString() : '';
    }),
    styles: {},
    isDisabled: false,
    status:
      activity.estado === 'Completada' ? 'Completed' :
      activity.estado === 'En Progreso' ? 'In Progress' :
      activity.estado === 'Retrasada' ? 'Delayed' :
      'Pending',
    assignedTo: activity.responsable,
    category: activity.departamento,
    description: activity.descripcion,
    priority: activity.prioridad,
    displayOrder: activity.id,
  }));
};

const getBudgetUtilization = () => {
  // Example: hardcoded for demo, replace with real calculation if available
  const spent = 650000; // sum of presupuesto for completed/in-progress
  const total = 1150000; // sum of all presupuesto
  return { percent: Math.round((spent / total) * 100), spent, total };
};

const getCriticalTasks = (activities: Activity[]) => {
  // Next 3-5 tasks by fechaFin, not completed
  return activities
    .filter(a => a.estado !== 'Completada')
    .sort((a, b) => new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime())
    .slice(0, 5);
};

const getRiskTasks = (activities: Activity[]) => {
  // Delayed or overdue tasks
  const today = new Date();
  return activities.filter(a =>
    a.estado === 'Retrasada' ||
    (a.estado !== 'Completada' && new Date(a.fechaFin) < today)
  );
};

const getTasksDueThisWeek = (activities: Activity[]) => {
  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);
  return activities.filter(a =>
    a.estado !== 'Completada' &&
    new Date(a.fechaFin) >= today &&
    new Date(a.fechaFin) <= weekFromNow
  ).length;
};

const getCriticalPathLength = () => 4; // Placeholder

const ProyectosEstadoAvance: React.FC = () => {
  const [departamentoFilter, setDepartamentoFilter] = useState<string | undefined>(undefined);
  const [estadoFilter, setEstadoFilter] = useState<string | undefined>(undefined);
  const [prioridadFilter, setPrioridadFilter] = useState<string | undefined>(undefined);
  const [proyectoFilter, setProyectoFilter] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = activities.filter(a => {
    const matchesDepartamento = !departamentoFilter || a.departamento === departamentoFilter;
    const matchesEstado = !estadoFilter || a.estado === estadoFilter;
    const matchesPrioridad = !prioridadFilter || a.prioridad === prioridadFilter;
    const matchesProyecto = !proyectoFilter || a.proyecto === proyectoFilter;
    const matchesSearch = !searchTerm ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.proyecto.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartamento && matchesEstado && matchesPrioridad && matchesProyecto && matchesSearch;
  });

  const ganttCalendarTasks = convertToGanttCalendarTasks(filteredActivities);

  const budget = getBudgetUtilization();
  const criticalTasks = getCriticalTasks(filteredActivities);
  const riskTasks = getRiskTasks(filteredActivities);
  const tasksDueThisWeek = getTasksDueThisWeek(filteredActivities);
  const criticalPathLength = getCriticalPathLength();
  const overallProgress = Math.round(filteredActivities.reduce((acc, a) => acc + a.progreso, 0) / (filteredActivities.length || 1));

  // Enhanced KPI cards
  const enhancedKpiCards = [
    {
      label: 'Progreso General',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+3% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Utilización de Presupuesto',
      value: `${budget.percent}%`,
      icon: DollarSign,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+2% este mes',
      trendDirection: 'up'
    },
    {
      label: 'Tareas Retrasadas',
      value: riskTasks.length,
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200 text-red-700',
      trend: riskTasks.length > 0 ? '+1' : 'Sin cambios',
      trendDirection: riskTasks.length > 0 ? 'up' : 'neutral'
    },
    {
      label: 'Tareas Próximas (7d)',
      value: tasksDueThisWeek,
      icon: Clock,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      trend: '+1 esta semana',
      trendDirection: 'up'
    },
    {
      label: 'Longitud Ruta Crítica',
      value: criticalPathLength,
      icon: BarChart3,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: 'Sin cambios',
      trendDirection: 'neutral'
    },
    {
      label: 'Equipo Total',
      value: activities.reduce((acc, a) => acc + a.equipo, 0),
      icon: Users,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '45 personas',
      trendDirection: 'neutral'
    }
  ];

  const clearFilters = () => {
    setDepartamentoFilter(undefined);
    setEstadoFilter(undefined);
    setPrioridadFilter(undefined);
    setProyectoFilter(undefined);
    setSearchTerm('');
  };

  const hasActiveFilters = departamentoFilter || estadoFilter || prioridadFilter || proyectoFilter || searchTerm;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <BarChart3 className="text-white h-6 w-6" />
              </div>
              Estado de Avance (Cronograma/Gantt)
            </h1>
            <p className="text-gray-600">Gestión integral del cronograma y fases del proyecto</p>
          </div>
        </div>
      </div>
      {/* Filters Section - now below header */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Filter className="text-[#1e3269]" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={departamentoFilter} onValueChange={v => setDepartamentoFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Departamentos</SelectItem>
                {allDepartamentos.map(d => <SelectItem value={d} key={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={estadoFilter} onValueChange={v => setEstadoFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                {allEstados.map(e => <SelectItem value={e} key={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={prioridadFilter} onValueChange={v => setPrioridadFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Prioridades</SelectItem>
                {allPrioridades.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={proyectoFilter} onValueChange={v => setProyectoFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Proyectos</SelectItem>
                {allProyectos.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <input
              type="text"
              placeholder="Buscar actividades..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-64 border border-gray-200 rounded px-3 py-2 text-sm"
            />
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white"
              >
                Limpiar Filtros
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Executive Summary */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart3 className="text-[#1e3269] h-6 w-6" />
            Resumen Ejecutivo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-lg text-gray-700 font-semibold mb-1">Progreso General del Proyecto</div>
            <Progress value={overallProgress} className="h-3 bg-[#1e3269]" />
            <div className="text-sm text-gray-500 mt-1">{overallProgress}% completado</div>
          </div>
          <div>
            <div className="text-lg text-gray-700 font-semibold mb-1">Utilización de Presupuesto</div>
            <Progress value={budget.percent} className="h-3 bg-[#1e3269]" />
            <div className="text-sm text-gray-500 mt-1">{budget.spent.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })} de {budget.total.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })} ({budget.percent}%)</div>
          </div>
          <div>
            <div className="text-lg text-gray-700 font-semibold mb-1">Salud del Proyecto</div>
            <Badge variant={riskTasks.length > 0 ? 'destructive' : 'success'} className="px-4 py-2 text-base">
              {riskTasks.length > 0 ? '¡Riesgo!' : 'Óptimo'}
            </Badge>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Exportar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Imprimir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Compartir
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {enhancedKpiCards.map((kpi, idx) => (
          <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trendDirection === 'up' && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                    {kpi.trendDirection === 'down' && <ArrowDownRight className="h-3 w-3 text-red-500" />}
                    <p className="text-xs text-gray-500">{kpi.trend}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Next Deadlines & Risk Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Clock className="text-[#1e3269]" /> Próximos Vencimientos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {criticalTasks.length === 0 ? (
              <div className="text-gray-500">No hay tareas próximas.</div>
            ) : (
              <ul className="space-y-2">
                {criticalTasks.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Badge variant="secondary" className="min-w-[90px] text-center">{task.estado}</Badge>
                    <span className="font-medium text-gray-800">{task.name}</span>
                    <span className="text-gray-500 text-sm">{task.fechaFin}</span>
                    <span className="text-gray-500 text-sm">{task.responsable}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Alertas de Riesgo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {riskTasks.length === 0 ? (
              <div className="text-gray-500">No hay tareas en riesgo.</div>
            ) : (
              <ul className="space-y-2">
                {riskTasks.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Badge variant="destructive" className="min-w-[90px] text-center">{task.estado}</Badge>
                    <span className="font-medium text-gray-800">{task.name}</span>
                    <span className="text-gray-500 text-sm">{task.fechaFin}</span>
                    <span className="text-gray-500 text-sm">{task.responsable}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Gantt Calendar View */}
      <GanttCalendar tasks={ganttCalendarTasks} />
    </div>
  );
};

export default ProyectosEstadoAvance; 