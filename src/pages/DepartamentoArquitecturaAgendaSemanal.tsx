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
  Search,
  Ruler,
  DraftingCompass,
  Palette,
  Lightbulb
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
  type: 'meeting' | 'design-review' | 'client-presentation' | 'site-visit' | 'coordination' | 'deadline';
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  attendees: string[];
  location: string;
  budget: number;
  category: 'design' | 'review' | 'presentation' | 'coordination' | 'site-visit' | 'planning';
  tags: string[];
  notes: string;
}

interface WeeklyMetrics {
  totalEvents: number;
  completedEvents: number;
  criticalTasks: number;
  meetingsCount: number;
  deadlinesCount: number;
  averageDuration: number;
  completionRate: number;
  budgetUtilization: number;
}

// Time series data for weekly trends
const weeklyTrendData = [
  { week: 'Semana 20', events: 15, completed: 13, critical: 4, meetings: 6, budget: 18000 },
  { week: 'Semana 21', events: 18, completed: 16, critical: 5, meetings: 8, budget: 22000 },
  { week: 'Semana 22', events: 16, completed: 14, critical: 3, meetings: 7, budget: 19000 },
  { week: 'Semana 23', events: 20, completed: 18, critical: 6, meetings: 9, budget: 25000 },
  { week: 'Semana 24', events: 22, completed: 19, critical: 4, meetings: 10, budget: 28000 },
  { week: 'Semana 25', events: 25, completed: 22, critical: 5, meetings: 12, budget: 32000 }
];

// Event type distribution
const eventTypeData = [
  { name: 'Reuniones', value: 12, fill: '#3b82f6' },
  { name: 'Revisiones de Diseño', value: 5, fill: '#f59e0b' },
  { name: 'Presentaciones', value: 3, fill: '#ef4444' },
  { name: 'Visitas a Obra', value: 2, fill: '#10b981' },
  { name: 'Coordinaciones', value: 4, fill: '#8b5cf6' }
];

// Daily workload distribution
const dailyWorkloadData = [
  { day: 'Lunes', events: 5, hours: 7.5, critical: 2 },
  { day: 'Martes', events: 4, hours: 6.0, critical: 1 },
  { day: 'Miércoles', events: 6, hours: 8.5, critical: 3 },
  { day: 'Jueves', events: 5, hours: 7.0, critical: 1 },
  { day: 'Viernes', events: 3, hours: 5.0, critical: 0 }
];

// Team performance data
const teamPerformanceData = [
  { member: 'Carlos Mendoza', events: 10, completed: 9, efficiency: 90, critical: 3 },
  { member: 'Ana Rodríguez', events: 8, completed: 7, efficiency: 88, critical: 2 },
  { member: 'Luis Fernández', events: 6, completed: 5, efficiency: 83, critical: 1 },
  { member: 'María González', events: 4, completed: 4, efficiency: 100, critical: 0 }
];

// Sample agenda data
const agendaData: AgendaEvent[] = [
  {
    id: '1',
    title: 'Reunión de Diseño - Residencial Vista Sur',
    description: 'Revisión y aprobación de diseños para la fase 2 del proyecto residencial',
    day: 'Lunes',
    time: '09:00',
    duration: 90,
    responsible: 'Carlos Mendoza',
    type: 'meeting',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Carlos Mendoza', 'Ana Rodríguez', 'Luis Fernández', 'Cliente'],
    location: 'Sala de Conferencias A',
    budget: 5000,
    category: 'design',
    tags: ['diseño', 'residencial', 'revisión'],
    notes: 'Preparar presentación con planos actualizados'
  },
  {
    id: '2',
    title: 'Revisión de Planos - Torre Premium',
    description: 'Revisión técnica de planos estructurales del proyecto comercial',
    day: 'Martes',
    time: '11:00',
    duration: 120,
    responsible: 'Ana Rodríguez',
    type: 'design-review',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Ana Rodríguez', 'Carlos Mendoza', 'Ingeniero Estructural'],
    location: 'Oficina de Arquitectura',
    budget: 8000,
    category: 'review',
    tags: ['revisión', 'planos', 'estructural'],
    notes: 'Verificar cumplimiento de normativas antes de la revisión'
  },
  {
    id: '3',
    title: 'Presentación al Cliente - Centro Comercial',
    description: 'Presentación de conceptos arquitectónicos al cliente del centro comercial',
    day: 'Miércoles',
    time: '15:00',
    duration: 60,
    responsible: 'Luis Fernández',
    type: 'client-presentation',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Luis Fernández', 'Carlos Mendoza', 'Cliente', 'Director Comercial'],
    location: 'Sala de Presentaciones',
    budget: 3000,
    category: 'presentation',
    tags: ['presentación', 'cliente', 'conceptos'],
    notes: 'Preparar maquetas y renders para la presentación'
  },
  {
    id: '4',
    title: 'Visita a Obra - Proyecto Industrial',
    description: 'Inspección de avance de obra en el proyecto industrial',
    day: 'Jueves',
    time: '08:00',
    duration: 180,
    responsible: 'Carlos Mendoza',
    type: 'site-visit',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Carlos Mendoza', 'Supervisor de Obra', 'Ingeniero'],
    location: 'Sitio de Construcción',
    budget: 2000,
    category: 'site-visit',
    tags: ['visita', 'obra', 'inspección'],
    notes: 'Llevar cámara para documentar el avance'
  },
  {
    id: '5',
    title: 'Coordinación con Ingenieros - Edificio Corporativo',
    description: 'Coordinación técnica con equipo de ingeniería para el edificio corporativo',
    day: 'Viernes',
    time: '14:00',
    duration: 90,
    responsible: 'Ana Rodríguez',
    type: 'coordination',
    priority: 'low',
    status: 'scheduled',
    attendees: ['Ana Rodríguez', 'Ingeniero Mecánico', 'Ingeniero Eléctrico'],
    location: 'Sala de Coordinación',
    budget: 1500,
    category: 'coordination',
    tags: ['coordinación', 'ingeniería', 'técnica'],
    notes: 'Preparar agenda de puntos a coordinar'
  }
];

const calculateWeeklyMetrics = (events: AgendaEvent[]): WeeklyMetrics => {
  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.status === 'completed').length;
  const criticalTasks = events.filter(e => e.priority === 'high').length;
  const meetingsCount = events.filter(e => e.type === 'meeting').length;
  const deadlinesCount = events.filter(e => e.type === 'deadline').length;
  const totalDuration = events.reduce((acc, e) => acc + e.duration, 0);
  const averageDuration = totalDuration / totalEvents;
  const completionRate = (completedEvents / totalEvents) * 100;
  const totalBudget = events.reduce((acc, e) => acc + e.budget, 0);
  const budgetUtilization = (totalBudget / 50000) * 100; // Assuming 50k weekly budget

  return {
    totalEvents,
    completedEvents,
    criticalTasks,
    meetingsCount,
    deadlinesCount,
    averageDuration,
    completionRate,
    budgetUtilization
  };
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'meeting': return 'bg-blue-100 text-blue-800';
    case 'design-review': return 'bg-green-100 text-green-800';
    case 'client-presentation': return 'bg-purple-100 text-purple-800';
    case 'site-visit': return 'bg-orange-100 text-orange-800';
    case 'coordination': return 'bg-yellow-100 text-yellow-800';
    case 'deadline': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatTime = (time: string) => {
  return time;
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const DepartamentoArquitecturaAgendaSemanal: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('Semana 24');
  const [selectedResponsible, setSelectedResponsible] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPriority, setSelectedPriority] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'analytics' | 'team' | 'detailed'>('calendar');

  const filteredAgenda = agendaData.filter(event => {
    const matchesResponsible = selectedResponsible === 'Todos' || event.responsible === selectedResponsible;
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Diseño' && event.category === 'design') ||
      (selectedCategory === 'Revisión' && event.category === 'review') ||
      (selectedCategory === 'Presentación' && event.category === 'presentation') ||
      (selectedCategory === 'Coordinación' && event.category === 'coordination') ||
      (selectedCategory === 'Visita a Obra' && event.category === 'site-visit') ||
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
      label: 'Presupuesto Utilizado',
      value: formatCurrency(metrics.budgetUtilization * 1000),
      icon: Building2,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: 'Dentro del presupuesto',
      trendDirection: 'neutral'
    },
    {
      label: 'Reuniones Programadas',
      value: metrics.meetingsCount,
      icon: Users,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+1 vs semana anterior',
      trendDirection: 'up'
    }
  ];

  const weeks = ['Semana 20', 'Semana 21', 'Semana 22', 'Semana 23', 'Semana 24', 'Semana 25'];
  const responsibles = ['Todos', 'Carlos Mendoza', 'Ana Rodríguez', 'Luis Fernández', 'María González'];
  const categories = ['Todos', 'Diseño', 'Revisión', 'Presentación', 'Coordinación', 'Visita a Obra', 'Planificación'];
  const priorities = ['Todos', 'Alta', 'Media', 'Baja'];
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <CalendarDays className="text-white h-6 w-6" />
              </div>
              Arquitectura - Agenda Semanal Interna
            </h1>
            <p className="text-gray-600">Gestión y seguimiento de actividades semanales del departamento de arquitectura</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
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
            <FilterIcon className="text-[#8cb43a]" />
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
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Lista
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Análisis
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Equipo
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
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
                              event.type === 'design-review' ? 'bg-yellow-50 border-yellow-400' :
                              event.type === 'client-presentation' ? 'bg-purple-50 border-purple-400' :
                              event.type === 'site-visit' ? 'bg-orange-50 border-orange-400' :
                              event.type === 'coordination' ? 'bg-green-50 border-green-400' :
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
                                 event.type === 'design-review' ? 'Revisión' :
                                 event.type === 'client-presentation' ? 'Presentación' :
                                 event.type === 'site-visit' ? 'Visita' :
                                 event.type === 'coordination' ? 'Coordinación' : 'Deadline'}
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
                                       event.type === 'design-review' ? 'Revisión de Diseño' :
                                       event.type === 'client-presentation' ? 'Presentación' :
                                       event.type === 'site-visit' ? 'Visita a Obra' :
                                       event.type === 'coordination' ? 'Coordinación' : 'Deadline'}
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
                                    {event.budget > 0 && (
                                      <div className="flex items-center gap-1">
                                        <Building2 className="h-3 w-3" />
                                        {formatCurrency(event.budget)}
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
                    <span className="text-sm font-medium text-gray-700">Presupuesto Utilizado</span>
                    <span className="text-lg font-bold text-orange-600">{formatCurrency(metrics.budgetUtilization * 1000)}</span>
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

export default DepartamentoArquitecturaAgendaSemanal; 