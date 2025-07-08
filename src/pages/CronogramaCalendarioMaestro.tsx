import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import GanttCalendar, { GanttCalendarTask } from '@/components/GanttCalendar';
import { 
  Calendar, 
  Filter, 
  List, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  CalendarDays,
  Users,
  Target,
  Search,
  X,
  ChevronRight,
  Building2,
  FileText,
  DollarSign,
  Hammer,
  BarChart3
} from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

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

interface GanttTask {
  id: string;
  name: string;
  project: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  assignedTo: string;
  dependencies?: string[];
}

const activities: Activity[] = [
  {
    id: 1,
    name: 'Reunión de Kickoff del Proyecto',
    departamento: 'Finanzas',
    estado: 'Completada',
    fecha: '2024-01-10',
    fechaFin: '2024-01-15',
    prioridad: 'Alta',
    progreso: 100,
    responsable: 'María González',
    descripcion: 'Reunión inicial para definir objetivos, presupuesto y cronograma del proyecto',
    proyecto: 'Torre Premium I',
    presupuesto: '$50,000',
    equipo: 8,
    dependencias: []
  },
  {
    id: 2,
    name: 'Entrega de Planos Arquitectónicos',
    departamento: 'Arquitectura',
    estado: 'En Progreso',
    fecha: '2024-02-15',
    fechaFin: '2024-03-15',
    prioridad: 'Alta',
    progreso: 75,
    responsable: 'Carlos Rodríguez',
    descripcion: 'Desarrollo y entrega de planos arquitectónicos detallados',
    proyecto: 'Residencial Vista',
    presupuesto: '$120,000',
    equipo: 12,
    dependencias: ['Reunión de Kickoff del Proyecto']
  },
  {
    id: 3,
    name: 'Inspección de Obra y Permisos',
    departamento: 'Operaciones',
    estado: 'Pendiente',
    fecha: '2024-03-01',
    fechaFin: '2024-03-30',
    prioridad: 'Media',
    progreso: 0,
    responsable: 'Ana Martínez',
    descripcion: 'Inspección técnica de la obra y gestión de permisos municipales',
    proyecto: 'Edificio Central',
    presupuesto: '$80,000',
    equipo: 6,
    dependencias: ['Entrega de Planos Arquitectónicos']
  },
  {
    id: 4,
    name: 'Revisión y Aprobación de Presupuesto',
    departamento: 'Finanzas',
    estado: 'Completada',
    fecha: '2024-03-10',
    fechaFin: '2024-03-20',
    prioridad: 'Alta',
    progreso: 100,
    responsable: 'Luis Fernández',
    descripcion: 'Revisión detallada del presupuesto y aprobación final',
    proyecto: 'Centro Comercial Plaza',
    presupuesto: '$200,000',
    equipo: 10,
    dependencias: ['Reunión de Kickoff del Proyecto']
  },
  {
    id: 5,
    name: 'Presentación a Clientes y Stakeholders',
    departamento: 'Mercadeo',
    estado: 'En Progreso',
    fecha: '2024-04-05',
    fechaFin: '2024-04-25',
    prioridad: 'Media',
    progreso: 45,
    responsable: 'Sofia Herrera',
    descripcion: 'Presentación del proyecto a clientes potenciales y stakeholders',
    proyecto: 'Torre Premium I',
    presupuesto: '$75,000',
    equipo: 15,
    dependencias: ['Revisión y Aprobación de Presupuesto']
  },
  {
    id: 6,
    name: 'Contratación de Personal Técnico',
    departamento: 'Administración',
    estado: 'Pendiente',
    fecha: '2024-04-15',
    fechaFin: '2024-05-15',
    prioridad: 'Alta',
    progreso: 0,
    responsable: 'Roberto Silva',
    descripcion: 'Proceso de contratación de personal técnico especializado',
    proyecto: 'Residencial Sur',
    presupuesto: '$150,000',
    equipo: 20,
    dependencias: ['Inspección de Obra y Permisos']
  },
  {
    id: 7,
    name: 'Instalación de Infraestructura Básica',
    departamento: 'Operaciones',
    estado: 'Retrasada',
    fecha: '2024-03-20',
    fechaFin: '2024-04-20',
    prioridad: 'Alta',
    progreso: 30,
    responsable: 'Diego Morales',
    descripcion: 'Instalación de servicios básicos y infraestructura inicial',
    proyecto: 'Edificio Central',
    presupuesto: '$300,000',
    equipo: 25,
    dependencias: ['Inspección de Obra y Permisos']
  },
  {
    id: 8,
    name: 'Desarrollo de Material Promocional',
    departamento: 'Mercadeo',
    estado: 'En Progreso',
    fecha: '2024-04-01',
    fechaFin: '2024-05-01',
    prioridad: 'Baja',
    progreso: 60,
    responsable: 'Carmen Vega',
    descripcion: 'Creación de material promocional y campañas de marketing',
    proyecto: 'Centro Comercial Plaza',
    presupuesto: '$90,000',
    equipo: 8,
    dependencias: ['Presentación a Clientes y Stakeholders']
  }
];

const allDepartamentos = Array.from(new Set(activities.map(a => a.departamento)));
const allEstados = Array.from(new Set(activities.map(a => a.estado)));
const allPrioridades = Array.from(new Set(activities.map(a => a.prioridad)));
const allProyectos = Array.from(new Set(activities.map(a => a.proyecto)));

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'Completada': return 'bg-green-100 text-green-800 border-green-200';
    case 'En Progreso': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Retrasada': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case 'Alta': return 'bg-red-100 text-red-800 border-red-200';
    case 'Media': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Baja': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getProgresoColor = (progreso: number) => {
  if (progreso >= 80) return 'bg-green-500';
  if (progreso >= 50) return 'bg-blue-500';
  if (progreso >= 20) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Convert activities to GanttCalendarTask format for gantt-task-react
const convertToGanttCalendarTasks = (activities: Activity[]): GanttCalendarTask[] => {
  return activities.map(activity => ({
    id: activity.id.toString(),
    name: activity.name,
    start: new Date(activity.fecha),
    end: new Date(activity.fechaFin),
    type: 'task',
    progress: activity.progreso,
    project: activity.proyecto,
    dependencies: activity.dependencias.map((dep, i) => (activities.find(a => a.name === dep)?.id.toString() || '')),
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

const kpiCards = [
  {
    label: 'Total Actividades',
    value: activities.length,
    icon: CalendarDays,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '+3 este mes'
  },
  {
    label: 'Completadas',
    value: activities.filter(a => a.estado === 'Completada').length,
    icon: CheckCircle,
    color: 'bg-green-50 border-green-200 text-green-700',
    trend: '+2 esta semana'
  },
  {
    label: 'En Progreso',
    value: activities.filter(a => a.estado === 'En Progreso').length,
    icon: Clock,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '3 activas'
  },
  {
    label: 'Retrasadas',
    value: activities.filter(a => a.estado === 'Retrasada').length,
    icon: AlertCircle,
    color: 'bg-red-50 border-red-200 text-red-700',
    trend: 'Requiere atención'
  },
  {
    label: 'Progreso Promedio',
    value: `${Math.round(activities.reduce((acc, a) => acc + a.progreso, 0) / activities.length)}%`,
    icon: TrendingUp,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    trend: '+12% vs mes anterior'
  },
  {
    label: 'Equipo Total',
    value: activities.reduce((acc, a) => acc + a.equipo, 0),
    icon: Users,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    trend: '104 personas'
  }
];

const CronogramaCalendarioMaestro: React.FC = () => {
  const [departamentoFilter, setDepartamentoFilter] = useState<string | undefined>(undefined);
  const [estadoFilter, setEstadoFilter] = useState<string | undefined>(undefined);
  const [prioridadFilter, setPrioridadFilter] = useState<string | undefined>(undefined);
  const [proyectoFilter, setProyectoFilter] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'list' | 'gantt'>('timeline');

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
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <Calendar className="text-white h-6 w-6" />
              </div>
              Calendario Maestro (Timeline)
            </h1>
            <p className="text-gray-600">Gestión integral del cronograma maestro de todos los proyectos</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('timeline')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Timeline
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Lista
            </Button>
            <Button
              variant={viewMode === 'gantt' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('gantt')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Gantt
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{kpi.trend}</p>
                </div>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Section */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Filter className="text-[#8cb43a]" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar actividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
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
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Limpiar Filtros
              </Button>
            )}
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {departamentoFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Departamento: {departamentoFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setDepartamentoFilter(undefined)} />
                </Badge>
              )}
              {estadoFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Estado: {estadoFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setEstadoFilter(undefined)} />
                </Badge>
              )}
              {prioridadFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Prioridad: {prioridadFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPrioridadFilter(undefined)} />
                </Badge>
              )}
              {proyectoFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Proyecto: {proyectoFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setProyectoFilter(undefined)} />
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Búsqueda: "{searchTerm}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activities View */}
      {viewMode === 'gantt' ? (
        <GanttCalendar
          tasks={ganttCalendarTasks}
          onTaskClick={(task) => {
            const activity = activities.find(a => a.id.toString() === task.id);
            if (activity) {
              // You can add a modal or expand the activity details here
              console.log('Activity clicked:', activity);
            }
          }}
        />
      ) : (
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <List className="text-[#8cb43a]" />
                Actividades ({filteredActivities.length})
              </CardTitle>
              <div className="text-sm text-gray-500">
                Mostrando {filteredActivities.length} de {activities.length} actividades
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'timeline' ? (
              <div className="space-y-4">
                {filteredActivities.map((activity, idx) => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-800 text-lg">{activity.name}</h3>
                          <Badge className={getEstadoColor(activity.estado)}>{activity.estado}</Badge>
                          <Badge className={getPrioridadColor(activity.prioridad)}>{activity.prioridad}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{activity.descripcion}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {activity.proyecto}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {activity.responsable}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {activity.fecha} - {activity.fechaFin}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {activity.presupuesto}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {activity.equipo} personas
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{activity.progreso}%</div>
                        <div className="text-sm text-gray-500">Progreso</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="text-gray-800 font-medium">{activity.progreso}%</span>
                      </div>
                      <Progress value={activity.progreso} className="h-2" />
                    </div>
                    {activity.dependencias.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Dependencias:</div>
                        <div className="flex flex-wrap gap-1">
                          {activity.dependencias.map((dep, depIdx) => (
                            <Badge key={depIdx} variant="outline" className="text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="font-semibold text-gray-800">{activity.name}</div>
                        <div className="text-sm text-gray-500">{activity.proyecto} • {activity.responsable}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getEstadoColor(activity.estado)}>{activity.estado}</Badge>
                      <Badge className={getPrioridadColor(activity.prioridad)}>{activity.prioridad}</Badge>
                      <div className="text-sm text-gray-600">{activity.progreso}%</div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No hay actividades que coincidan con los filtros seleccionados.</p>
                <p className="text-gray-500 text-sm mt-2">Intenta ajustar los filtros para ver más resultados.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CronogramaCalendarioMaestro; 