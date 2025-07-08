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
  DollarSign,
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
  Megaphone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MousePointer,
  MousePointerClick,
  Eye as EyeIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon2,
  Building as BuildingIcon2,
  Home as HomeIcon,
  Car as CarIcon,
  Briefcase,
  Handshake,
  PhoneCall,
  Mail as MailIcon,
  Calendar as CalendarIcon2,
  CheckCircle as CheckCircleIcon,
  XCircle,
  AlertTriangle as AlertTriangleIcon,
  Info,
  HelpCircle,
  Settings,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  UserCog,
  UserSearch
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
  type: 'meeting' | 'critical-task' | 'deadline' | 'review' | 'presentation' | 'call';
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  attendees: string[];
  location: string;
  budget: number;
  category: 'social_media' | 'email_marketing' | 'digital_ads' | 'content' | 'events' | 'pr' | 'analytics' | 'planning';
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
  { week: 'Semana 20', events: 14, completed: 12, critical: 4, meetings: 6, budget: 18000 },
  { week: 'Semana 21', events: 16, completed: 14, critical: 5, meetings: 7, budget: 22000 },
  { week: 'Semana 22', events: 15, completed: 13, critical: 3, meetings: 8, budget: 20000 },
  { week: 'Semana 23', events: 18, completed: 16, critical: 6, meetings: 9, budget: 25000 },
  { week: 'Semana 24', events: 20, completed: 18, critical: 4, meetings: 10, budget: 28000 },
  { week: 'Semana 25', events: 22, completed: 20, critical: 5, meetings: 11, budget: 32000 }
];

// Event type distribution
const eventTypeData = [
  { name: 'Reuniones', value: 11, fill: '#3b82f6' },
  { name: 'Tareas Críticas', value: 5, fill: '#f59e0b' },
  { name: 'Deadlines', value: 3, fill: '#ef4444' },
  { name: 'Revisiones', value: 4, fill: '#10b981' },
  { name: 'Presentaciones', value: 2, fill: '#8b5cf6' }
];

// Daily workload distribution
const dailyWorkloadData = [
  { day: 'Lunes', events: 5, hours: 7.0, critical: 2 },
  { day: 'Martes', events: 4, hours: 6.5, critical: 1 },
  { day: 'Miércoles', events: 6, hours: 8.0, critical: 2 },
  { day: 'Jueves', events: 5, hours: 7.5, critical: 1 },
  { day: 'Viernes', events: 3, hours: 5.5, critical: 0 }
];

// Team performance data
const teamPerformanceData = [
  { member: 'María González', events: 10, completed: 9, efficiency: 90, critical: 3 },
  { member: 'Carlos Ruiz', events: 8, completed: 7, efficiency: 88, critical: 2 },
  { member: 'Ana Martínez', events: 6, completed: 6, efficiency: 100, critical: 1 },
  { member: 'Luis Torres', events: 7, completed: 6, efficiency: 86, critical: 2 }
];

// Sample agenda data
const agendaData: AgendaEvent[] = [
  {
    id: '1',
    title: 'Reunión de Estrategia de Redes Sociales',
    description: 'Planificación de contenido y estrategia para redes sociales del mes',
    day: 'Lunes',
    time: '09:00',
    duration: 90,
    responsible: 'María González',
    type: 'meeting',
    priority: 'high',
    status: 'scheduled',
    attendees: ['María González', 'Carlos Ruiz', 'Ana Martínez', 'Director de Marketing'],
    location: 'Sala de Conferencias B',
    budget: 8000,
    category: 'social_media',
    tags: ['redes sociales', 'estrategia', 'contenido'],
    notes: 'Preparar calendario de contenido y métricas del mes anterior'
  },
  {
    id: '2',
    title: 'Lanzamiento Campaña Google Ads',
    description: 'Configuración y lanzamiento de nueva campaña publicitaria digital',
    day: 'Martes',
    time: '11:00',
    duration: 120,
    responsible: 'Carlos Ruiz',
    type: 'critical-task',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Carlos Ruiz', 'María González'],
    location: 'Oficina Marketing',
    budget: 15000,
    category: 'digital_ads',
    tags: ['google ads', 'campaña', 'digital'],
    notes: 'Verificar presupuesto y segmentación antes del lanzamiento'
  },
  {
    id: '3',
    title: 'Revisión de Métricas de Campañas',
    description: 'Análisis de rendimiento de campañas activas',
    day: 'Miércoles',
    time: '15:00',
    duration: 60,
    responsible: 'Ana Martínez',
    type: 'review',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Ana Martínez', 'María González', 'Carlos Ruiz'],
    location: 'Sala de Análisis',
    budget: 2000,
    category: 'analytics',
    tags: ['métricas', 'análisis', 'rendimiento'],
    notes: 'Preparar reporte con KPIs principales'
  },
  {
    id: '4',
    title: 'Presentación de Resultados a Dirección',
    description: 'Presentación mensual de resultados de marketing',
    day: 'Jueves',
    time: '14:00',
    duration: 75,
    responsible: 'María González',
    type: 'presentation',
    priority: 'high',
    status: 'scheduled',
    attendees: ['María González', 'Director de Marketing', 'CEO', 'CFO'],
    location: 'Sala de Juntas Principal',
    budget: 5000,
    category: 'analytics',
    tags: ['presentación', 'resultados', 'dirección'],
    notes: 'Preparar presentación con datos actualizados y proyecciones'
  },
  {
    id: '5',
    title: 'Evento Networking - Expo Construcción',
    description: 'Participación en evento de networking del sector',
    day: 'Viernes',
    time: '10:00',
    duration: 240,
    responsible: 'Luis Torres',
    type: 'meeting',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Luis Torres', 'María González'],
    location: 'Centro de Convenciones',
    budget: 12000,
    category: 'events',
    tags: ['evento', 'networking', 'expo'],
    notes: 'Llevar material promocional y tarjetas de presentación'
  },
  {
    id: '6',
    title: 'Creación de Contenido Blog',
    description: 'Desarrollo de artículos para blog corporativo',
    day: 'Miércoles',
    time: '10:00',
    duration: 180,
    responsible: 'Ana Martínez',
    type: 'critical-task',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Ana Martínez'],
    location: 'Oficina Marketing',
    budget: 3000,
    category: 'content',
    tags: ['contenido', 'blog', 'artículos'],
    notes: 'Investigar keywords y tendencias del sector'
  },
  {
    id: '7',
    title: 'Reunión con Agencia de PR',
    description: 'Coordinación de estrategia de relaciones públicas',
    day: 'Martes',
    time: '16:00',
    duration: 60,
    responsible: 'Carlos Ruiz',
    type: 'meeting',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Carlos Ruiz', 'Representante Agencia PR'],
    location: 'Sala de Reuniones A',
    budget: 8000,
    category: 'pr',
    tags: ['pr', 'agencia', 'estrategia'],
    notes: 'Revisar propuestas de medios y timing'
  },
  {
    id: '8',
    title: 'Deadline - Campaña Email Marketing',
    description: 'Fecha límite para envío de newsletter mensual',
    day: 'Jueves',
    time: '17:00',
    duration: 45,
    responsible: 'María González',
    type: 'deadline',
    priority: 'high',
    status: 'scheduled',
    attendees: ['María González', 'Ana Martínez'],
    location: 'Oficina Marketing',
    budget: 2000,
    category: 'email_marketing',
    tags: ['email', 'newsletter', 'deadline'],
    notes: 'Verificar lista de suscriptores y contenido final'
  }
];

const calculateWeeklyMetrics = (events: AgendaEvent[]): WeeklyMetrics => {
  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.status === 'completed').length;
  const criticalTasks = events.filter(e => e.type === 'critical-task').length;
  const meetingsCount = events.filter(e => e.type === 'meeting').length;
  const deadlinesCount = events.filter(e => e.type === 'deadline').length;
  const totalDuration = events.reduce((acc, e) => acc + e.duration, 0);
  const averageDuration = totalEvents > 0 ? Math.round(totalDuration / totalEvents) : 0;
  const completionRate = totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0;
  const totalBudget = events.reduce((acc, e) => acc + e.budget, 0);
  const budgetUtilization = Math.round(totalBudget / 1000);

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
    case 'critical-task': return 'bg-yellow-100 text-yellow-800';
    case 'deadline': return 'bg-red-100 text-red-800';
    case 'review': return 'bg-green-100 text-green-800';
    case 'presentation': return 'bg-purple-100 text-purple-800';
    case 'call': return 'bg-indigo-100 text-indigo-800';
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

const DepartamentoMercadeoAgendaSemanal: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('Semana 24');
  const [selectedResponsible, setSelectedResponsible] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPriority, setSelectedPriority] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'analytics' | 'team' | 'detailed'>('calendar');

  const filteredAgenda = agendaData.filter(event => {
    const matchesResponsible = selectedResponsible === 'Todos' || event.responsible === selectedResponsible;
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Redes Sociales' && event.category === 'social_media') ||
      (selectedCategory === 'Email Marketing' && event.category === 'email_marketing') ||
      (selectedCategory === 'Publicidad Digital' && event.category === 'digital_ads') ||
      (selectedCategory === 'Contenido' && event.category === 'content') ||
      (selectedCategory === 'Eventos' && event.category === 'events') ||
      (selectedCategory === 'PR' && event.category === 'pr') ||
      (selectedCategory === 'Analytics' && event.category === 'analytics') ||
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
      trend: '+1 vs semana anterior',
      trendDirection: 'up'
    },
    {
      label: 'Tasa de Completación',
      value: `${metrics.completionRate}%`,
      icon: CheckCircle,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+3% vs semana anterior',
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
      icon: DollarSign,
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
  const responsibles = ['Todos', 'María González', 'Carlos Ruiz', 'Ana Martínez', 'Luis Torres'];
  const categories = ['Todos', 'Redes Sociales', 'Email Marketing', 'Publicidad Digital', 'Contenido', 'Eventos', 'PR', 'Analytics', 'Planificación'];
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
              Mercadeo - Agenda Semanal Interna
            </h1>
            <p className="text-gray-600">Gestión y seguimiento de actividades semanales del departamento de mercadeo</p>
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
                              event.type === 'critical-task' ? 'bg-yellow-50 border-yellow-400' :
                              event.type === 'deadline' ? 'bg-red-50 border-red-400' :
                              event.type === 'review' ? 'bg-green-50 border-green-400' :
                              event.type === 'presentation' ? 'bg-purple-50 border-purple-400' :
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
                                 event.type === 'critical-task' ? 'Crítica' :
                                 event.type === 'deadline' ? 'Deadline' :
                                 event.type === 'review' ? 'Revisión' :
                                 event.type === 'presentation' ? 'Presentación' : 'Llamada'}
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
                                       event.type === 'critical-task' ? 'Tarea Crítica' :
                                       event.type === 'deadline' ? 'Deadline' :
                                       event.type === 'review' ? 'Revisión' :
                                       event.type === 'presentation' ? 'Presentación' : 'Llamada'}
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
                                        <DollarSign className="h-3 w-3" />
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
                    <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} name="Completados" />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Críticos" />
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
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Eventos']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Workload */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BarChart3 className="text-[#8cb43a]" />
                Carga de Trabajo Diaria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={dailyWorkloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="events" fill="#8cb43a" name="Eventos" />
                  <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} name="Horas" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="member" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="events" fill="#8cb43a" name="Eventos" />
                  <Bar yAxisId="left" dataKey="completed" fill="#3b82f6" name="Completados" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Eficiencia (%)" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Table */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BarChart2 className="text-[#8cb43a]" />
                Tabla Detallada de Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Día</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Hora</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Evento</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Responsable</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Prioridad</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Duración</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Presupuesto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Ubicación</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgenda.map((event) => (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{event.day}</td>
                        <td className="py-3 px-4">{event.time}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-xs text-gray-500">{event.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{event.responsible}</td>
                        <td className="py-3 px-4">
                          <Badge className={getTypeColor(event.type)}>
                            {event.type === 'meeting' ? 'Reunión' :
                             event.type === 'critical-task' ? 'Tarea Crítica' :
                             event.type === 'deadline' ? 'Deadline' :
                             event.type === 'review' ? 'Revisión' :
                             event.type === 'presentation' ? 'Presentación' : 'Llamada'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getPriorityColor(event.priority)}>
                            {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{formatDuration(event.duration)}</td>
                        <td className="py-3 px-4">{event.budget > 0 ? formatCurrency(event.budget) : '-'}</td>
                        <td className="py-3 px-4">{event.location}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartamentoMercadeoAgendaSemanal; 