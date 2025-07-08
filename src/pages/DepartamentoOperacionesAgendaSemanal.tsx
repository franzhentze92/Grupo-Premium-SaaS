import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  CalendarDays, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Building2,
  PieChart,
  Activity,
  Award,
  Zap,
  Eye,
  Download as DownloadIcon,
  Printer,
  Share2,
  Filter as FilterIcon,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  LineChart,
  BarChart2,
  BarChart3,
  AreaChart,
  Plus,
  Edit,
  Trash2,
  Bell,
  Clock as ClockIcon,
  User,
  Target,
  Building,
  FileText,
  AlertTriangle,
  CheckSquare,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Mail,
  Video,
  Users as UsersIcon,
  Building as BuildingIcon,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreHorizontal,
  ExternalLink,
  List,
  Wrench,
  HardHat,
  Shield,
  Truck,
  Cog,
  Settings,

  Hammer,
  Scale,
  Search
} from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  day: string;
  time: string;
  duration: number; // in minutes
  responsible: string;
  type: 'meeting' | 'supervision' | 'maintenance' | 'inspection' | 'coordination' | 'training';
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  attendees: string[];
  location: string;
  equipment: string[];
  category: 'construction' | 'maintenance' | 'safety' | 'logistics' | 'quality' | 'planning';
  tags: string[];
  notes: string;
  safety_required: boolean;
}

interface WeeklyMetrics {
  totalEvents: number;
  completedEvents: number;
  criticalTasks: number;
  meetingsCount: number;
  supervisionCount: number;
  averageDuration: number;
  completionRate: number;
  safetyCompliance: number;
}

// Time series data for weekly trends
const weeklyTrendData = [
  { week: 'Semana 20', events: 15, completed: 13, critical: 4, meetings: 6, safety: 95 },
  { week: 'Semana 21', events: 18, completed: 16, critical: 5, meetings: 7, safety: 96 },
  { week: 'Semana 22', events: 16, completed: 14, critical: 3, meetings: 8, safety: 94 },
  { week: 'Semana 23', events: 20, completed: 18, critical: 6, meetings: 9, safety: 97 },
  { week: 'Semana 24', events: 22, completed: 20, critical: 4, meetings: 10, safety: 98 },
  { week: 'Semana 25', events: 25, completed: 23, critical: 5, meetings: 12, safety: 99 }
];

// Event type distribution
const eventTypeData = [
  { name: 'Supervisiones', value: 8, fill: '#1e3269' },
  { name: 'Mantenimiento', value: 5, fill: '#fbbf24' },
  { name: 'Inspecciones', value: 4, fill: '#ef4444' },
  { name: 'Coordinación', value: 3, fill: '#eab308' },
  { name: 'Capacitación', value: 2, fill: '#8b5cf6' },
  { name: 'Reuniones', value: 3, fill: '#6b7280' }
];

// Daily workload distribution
const dailyWorkloadData = [
  { day: 'Lunes', events: 5, hours: 7.5, critical: 2 },
  { day: 'Martes', events: 4, hours: 6.0, critical: 1 },
  { day: 'Miércoles', events: 6, hours: 8.5, critical: 2 },
  { day: 'Jueves', events: 5, hours: 7.0, critical: 1 },
  { day: 'Viernes', events: 3, hours: 5.0, critical: 0 }
];

// Team performance data
const teamPerformanceData = [
  { member: 'Diego Morales', events: 10, completed: 9, efficiency: 90, critical: 3 },
  { member: 'Ana Martínez', events: 8, completed: 7, efficiency: 88, critical: 2 },
  { member: 'Roberto Silva', events: 6, completed: 6, efficiency: 100, critical: 1 },
  { member: 'Carlos López', events: 7, completed: 6, efficiency: 86, critical: 2 }
];

// Sample agenda data
const agendaData: AgendaEvent[] = [
  {
    id: '1',
    title: 'Supervisión de obra - Torre Premium',
    description: 'Supervisión y control de calidad en construcción de Torre Premium',
    day: 'Lunes',
    time: '08:00',
    duration: 120,
    responsible: 'Diego Morales',
    type: 'supervision',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Diego Morales', 'Ana Martínez', 'Roberto Silva'],
    location: 'Sitio Torre Premium',
    equipment: ['Excavadora', 'Grúa', 'Andamios'],
    category: 'construction',
    tags: ['supervisión', 'construcción', 'calidad'],
    notes: 'Verificar progreso según cronograma',
    safety_required: true
  },
  {
    id: '2',
    title: 'Mantenimiento preventivo - Equipos',
    description: 'Mantenimiento preventivo de equipos de construcción',
    day: 'Martes',
    time: '10:00',
    duration: 180,
    responsible: 'Ana Martínez',
    type: 'maintenance',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Ana Martínez', 'Carlos López'],
    location: 'Taller Central',
    equipment: ['Excavadora', 'Retroexcavadora', 'Compresor'],
    category: 'maintenance',
    tags: ['mantenimiento', 'equipos', 'preventivo'],
    notes: 'Todos los equipos deben estar operativos',
    safety_required: true
  },
  {
    id: '3',
    title: 'Inspección de seguridad',
    description: 'Inspección de seguridad en todos los sitios de trabajo',
    day: 'Miércoles',
    time: '14:00',
    duration: 90,
    responsible: 'Roberto Silva',
    type: 'inspection',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Roberto Silva', 'Diego Morales'],
    location: 'Todos los sitios',
    equipment: ['EPP', 'Señalización'],
    category: 'safety',
    tags: ['seguridad', 'inspección', 'sitios'],
    notes: 'Verificar cumplimiento de protocolos',
    safety_required: true
  },
  {
    id: '4',
    title: 'Coordinación de equipos',
    description: 'Coordinación de equipos para proyecto residencial',
    day: 'Jueves',
    time: '09:00',
    duration: 60,
    responsible: 'Carlos López',
    type: 'coordination',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Carlos López', 'Diego Morales', 'Ana Martínez'],
    location: 'Oficina Operaciones',
    equipment: [],
    category: 'planning',
    tags: ['coordinación', 'equipos', 'planificación'],
    notes: 'Definir asignaciones para la semana',
    safety_required: false
  },
  {
    id: '5',
    title: 'Capacitación en seguridad',
    description: 'Capacitación en protocolos de seguridad para el equipo',
    day: 'Viernes',
    time: '15:00',
    duration: 120,
    responsible: 'Roberto Silva',
    type: 'training',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Roberto Silva', 'Diego Morales', 'Ana Martínez', 'Carlos López'],
    location: 'Sala de Capacitación',
    equipment: ['Presentación', 'EPP'],
    category: 'safety',
    tags: ['capacitación', 'seguridad', 'protocolos'],
    notes: 'Actualización de procedimientos',
    safety_required: true
  }
];

const calculateWeeklyMetrics = (events: AgendaEvent[]): WeeklyMetrics => {
  const total = events.length;
  const completed = events.filter(e => e.status === 'completed').length;
  const critical = events.filter(e => e.priority === 'high').length;
  const meetings = events.filter(e => e.type === 'meeting').length;
  const supervision = events.filter(e => e.type === 'supervision').length;
  const avgDuration = events.reduce((sum, e) => sum + e.duration, 0) / total;
  const safetyCompliance = events.filter(e => e.safety_required).length;

  return {
    totalEvents: total,
    completedEvents: completed,
    criticalTasks: critical,
    meetingsCount: meetings,
    supervisionCount: supervision,
    averageDuration: Math.round(avgDuration),
    completionRate: Math.round((completed / total) * 100),
    safetyCompliance: Math.round((safetyCompliance / total) * 100)
  };
};

const getTypeColor = (type: string) => {
  const colors = {
    meeting: 'bg-blue-100 text-blue-800',
    supervision: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    inspection: 'bg-red-100 text-red-800',
    coordination: 'bg-purple-100 text-purple-800',
    training: 'bg-indigo-100 text-indigo-800'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getPriorityColor = (priority: string) => {
  const colors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getStatusColor = (status: string) => {
  const colors = {
    scheduled: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const formatTime = (time: string) => {
  return time;
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const DepartamentoOperacionesAgendaSemanal: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('Semana 24');
  const [selectedResponsible, setSelectedResponsible] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPriority, setSelectedPriority] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'analytics' | 'team' | 'detailed'>('calendar');

  const filteredAgenda = agendaData.filter(event => {
    const matchesResponsible = selectedResponsible === 'Todos' || event.responsible === selectedResponsible;
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Construcción' && event.category === 'construction') ||
      (selectedCategory === 'Mantenimiento' && event.category === 'maintenance') ||
      (selectedCategory === 'Seguridad' && event.category === 'safety') ||
      (selectedCategory === 'Logística' && event.category === 'logistics') ||
      (selectedCategory === 'Calidad' && event.category === 'quality') ||
      (selectedCategory === 'Planificación' && event.category === 'planning');
    const matchesPriority = selectedPriority === 'Todos' || 
      (selectedPriority === 'Alta' && event.priority === 'high') ||
      (selectedPriority === 'Media' && event.priority === 'medium') ||
      (selectedPriority === 'Baja' && event.priority === 'low');
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesResponsible && matchesCategory && matchesPriority && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedResponsible('Todos');
    setSelectedCategory('Todos');
    setSelectedPriority('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedResponsible !== 'Todos' || selectedCategory !== 'Todos' || selectedPriority !== 'Todos' || searchTerm;

  const metrics = calculateWeeklyMetrics(filteredAgenda);

  const kpiCards = [
    {
      label: 'Total de Eventos',
      value: metrics.totalEvents,
      icon: Calendar,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+2 vs semana anterior',
      trendDirection: 'up'
    },
    {
      label: 'Tareas Críticas',
      value: metrics.criticalTasks,
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200 text-red-700',
      trend: '-1 vs semana anterior',
      trendDirection: 'down'
    },
    {
      label: 'Tasa de Completación',
      value: `${metrics.completionRate}%`,
      icon: CheckCircle,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+5% vs semana anterior',
      trendDirection: 'up'
    },
    {
      label: 'Duración Promedio',
      value: `${metrics.averageDuration}m`,
      icon: Clock,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: 'Optimizada',
      trendDirection: 'neutral'
    },
    {
      label: 'Cumplimiento Seguridad',
      value: `${metrics.safetyCompliance}%`,
      icon: Shield,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: 'Dentro de estándares',
      trendDirection: 'neutral'
    },
    {
      label: 'Supervisiones',
      value: metrics.supervisionCount,
      icon: Eye,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+1 vs semana anterior',
      trendDirection: 'up'
    }
  ];

  const weeks = ['Semana 20', 'Semana 21', 'Semana 22', 'Semana 23', 'Semana 24', 'Semana 25'];
  const responsibles = ['Todos', 'Diego Morales', 'Ana Martínez', 'Roberto Silva', 'Carlos López'];
  const categories = ['Todos', 'Construcción', 'Mantenimiento', 'Seguridad', 'Logística', 'Calidad', 'Planificación'];
  const priorities = ['Todos', 'Alta', 'Media', 'Baja'];
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <CalendarDays className="text-white h-6 w-6" />
              </div>
              Operaciones - Agenda Semanal Interna
            </h1>
            <p className="text-gray-600">Gestión y seguimiento de actividades semanales del departamento de operaciones</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <DownloadIcon className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Share2 className="h-4 w-4" />
              Compartir
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
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trendDirection === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {kpi.trendDirection === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
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

      {/* Filters Section */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <FilterIcon className="text-[#1e3269]" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-gray-400 h-4 w-4" />
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Semana" />
                </SelectTrigger>
                <SelectContent>
                  {weeks.map(w => <SelectItem value={w} key={w}>{w}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="text-gray-400 h-4 w-4" />
              <Select value={selectedResponsible} onValueChange={setSelectedResponsible}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Responsable" />
                </SelectTrigger>
                <SelectContent>
                  {responsibles.map(r => <SelectItem value={r} key={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem value={c} key={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <FilterIcon className="text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calendar" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <CalendarIcon className={`h-4 w-4 ${viewMode === 'calendar' ? 'text-white' : 'text-[#1e3269]'}`} />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="list" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-white' : 'text-[#1e3269]'}`} />
            Lista
          </TabsTrigger>
          <TabsTrigger value="analytics" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart3 className={`h-4 w-4 ${viewMode === 'analytics' ? 'text-white' : 'text-[#1e3269]'}`} />
            Análisis
          </TabsTrigger>
          <TabsTrigger value="team" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <UsersIcon className={`h-4 w-4 ${viewMode === 'team' ? 'text-white' : 'text-[#1e3269]'}`} />
            Equipo
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar View */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <CalendarDays className="text-[#8cb43a]" />
                Vista de Calendario Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="space-y-3">
                    <div className="text-center font-semibold text-gray-800 bg-gray-50 p-2 rounded-lg">
                      {day}
                    </div>
                    <div className="space-y-2">
                      {filteredAgenda
                        .filter(event => event.day === day)
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map(event => (
                          <div
                            key={event.id}
                            className={`p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
                              event.type === 'meeting' ? 'bg-blue-50 border-blue-400' :
                              event.type === 'supervision' ? 'bg-yellow-50 border-yellow-400' :
                              event.type === 'maintenance' ? 'bg-green-50 border-green-400' :
                              event.type === 'inspection' ? 'bg-red-50 border-red-400' :
                              event.type === 'coordination' ? 'bg-purple-50 border-purple-400' :
                              'bg-gray-50 border-gray-400'
                            }`}
                          >
                            <div className="text-sm font-medium text-gray-800">{event.time}</div>
                            <div className="text-xs font-semibold text-gray-700">{event.title}</div>
                            <div className="text-xs text-gray-600">{event.responsible}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Badge className={getPriorityColor(event.priority)} size="sm">
                                {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Media' : 'Baja'}
                              </Badge>
                              <Badge className={getTypeColor(event.type)} size="sm">
                                {event.type === 'meeting' ? 'Reunión' :
                                 event.type === 'supervision' ? 'Supervisión' :
                                 event.type === 'maintenance' ? 'Mantenimiento' :
                                 event.type === 'inspection' ? 'Inspección' :
                                 event.type === 'coordination' ? 'Coordinación' : 'Capacitación'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          {/* List View */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <List className="text-[#8cb43a]" />
                Vista de Lista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {daysOfWeek.map(day => {
                  const dayEvents = filteredAgenda.filter(event => event.day === day);
                  if (dayEvents.length === 0) return null;
                  
                  return (
                    <div key={day} className="space-y-3">
                      <div className="font-semibold text-lg text-[#8cb43a] border-b border-gray-200 pb-2">
                        {day}
                      </div>
                      <div className="space-y-3">
                        {dayEvents
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map(event => (
                            <div key={event.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="text-sm font-medium text-gray-600">{event.time}</div>
                                    <div className="text-sm text-gray-500">({formatDuration(event.duration)})</div>
                                    <Badge className={getTypeColor(event.type)}>
                                      {event.type === 'meeting' ? 'Reunión' :
                                       event.type === 'supervision' ? 'Supervisión' :
                                       event.type === 'maintenance' ? 'Mantenimiento' :
                                       event.type === 'inspection' ? 'Inspección' :
                                       event.type === 'coordination' ? 'Coordinación' : 'Capacitación'}
                                    </Badge>
                                    <Badge className={getPriorityColor(event.priority)}>
                                      {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Media' : 'Baja'}
                                    </Badge>
                                  </div>
                                  <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <User className="h-3 w-3" />
                                      {event.responsible}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {event.location}
                                    </div>
                                    {event.equipment.length > 0 && (
                                      <div className="flex items-center gap-1">
                                        <Wrench className="h-3 w-3" />
                                        {event.equipment.length} equipos
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Trends */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <LineChart className="text-[#8cb43a]" />
                  Tendencias Semanales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="events" stroke="#8cb43a" strokeWidth={2} name="Eventos" />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completados" />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Críticos" />
                    <Line type="monotone" dataKey="meetings" stroke="#3b82f6" strokeWidth={2} name="Reuniones" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Event Type Distribution */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <PieChart className="text-[#8cb43a]" />
                  Distribución por Tipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={eventTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {/* Team Performance */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <UsersIcon className="text-[#8cb43a]" />
                Rendimiento del Equipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformanceData.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8cb43a] rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{member.member}</p>
                        <p className="text-sm text-gray-600">{member.events} eventos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#8cb43a]">{member.efficiency}%</p>
                      <p className="text-sm text-gray-600">Eficiencia</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Workload */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart2 className="text-[#8cb43a]" />
                  Carga de Trabajo Diaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={dailyWorkloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="events" fill="#8cb43a" name="Eventos" />
                    <Bar dataKey="hours" fill="#3b82f6" name="Horas" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Activity className="text-[#8cb43a]" />
                  Métricas de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Tasa de Completación</span>
                    <span className="text-lg font-bold text-green-600">{metrics.completionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Duración Promedio</span>
                    <span className="text-lg font-bold text-blue-600">{Math.round(metrics.averageDuration)}m</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Cumplimiento Seguridad</span>
                    <span className="text-lg font-bold text-orange-600">{metrics.safetyCompliance}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Eventos Críticos</span>
                    <span className="text-lg font-bold text-red-600">{metrics.criticalTasks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartamentoOperacionesAgendaSemanal; 