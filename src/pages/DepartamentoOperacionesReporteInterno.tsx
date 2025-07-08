import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  Building2, 
  BarChart4, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  X,
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
  TrendingUp as TrendingUpIcon,
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

interface OperationalActivity {
  id: string;
  date: string;
  concept: string;
  type: 'project' | 'maintenance' | 'safety' | 'logistics' | 'quality' | 'training' | 'inspection' | 'coordination';
  category: 'construction' | 'equipment' | 'safety' | 'transport' | 'quality_control' | 'training' | 'inspection' | 'planning';
  progress: number;
  description: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  reference: string;
  tags: string[];
  notes: string;
  location: string;
  equipment: string[];
  safety_score: number;
}

interface OperationalMetrics {
  totalProjects: number;
  completedProjects: number;
  efficiencyRate: number;
  safetyScore: number;
  equipmentUtilization: number;
  qualityScore: number;
  onTimeDelivery: number;
  costEfficiency: number;
  teamProductivity: number;
  riskLevel: number;
}

// Time series data for operational trends
const operationalTrendData = [
  { month: 'Ene', projects: 8, completed: 6, efficiency: 85, safety: 92, quality: 88 },
  { month: 'Feb', projects: 10, completed: 8, efficiency: 87, safety: 94, quality: 90 },
  { month: 'Mar', projects: 12, completed: 10, efficiency: 89, safety: 91, quality: 92 },
  { month: 'Abr', projects: 15, completed: 13, efficiency: 91, safety: 93, quality: 94 },
  { month: 'May', projects: 18, completed: 16, efficiency: 93, safety: 95, quality: 96 },
  { month: 'Jun', projects: 20, completed: 18, efficiency: 94, safety: 96, quality: 97 },
  { month: 'Jul', projects: 22, completed: 20, efficiency: 95, safety: 97, quality: 98 },
  { month: 'Ago', projects: 25, completed: 23, efficiency: 96, safety: 98, quality: 99 }
];

// Category distribution data
const categoryData = [
  { name: 'Construcción', value: 40, fill: '#1e3269' },
  { name: 'Mantenimiento', value: 25, fill: '#fbbf24' },
  { name: 'Seguridad', value: 15, fill: '#eab308' },
  { name: 'Logística', value: 10, fill: '#ef4444' },
  { name: 'Control de Calidad', value: 6, fill: '#8b5cf6' },
  { name: 'Capacitación', value: 4, fill: '#6b7280' }
];

// Project breakdown
const projectBreakdown = [
  { category: 'Construcción', count: 12, percentage: 48.0 },
  { category: 'Mantenimiento', count: 8, percentage: 32.0 },
  { category: 'Seguridad', count: 3, percentage: 12.0 },
  { category: 'Logística', count: 2, percentage: 8.0 }
];

// Team performance
const teamPerformance = [
  { team: 'Equipo Construcción', projects: 12, completed: 11, efficiency: 92, safety: 95 },
  { team: 'Equipo Mantenimiento', projects: 8, completed: 7, efficiency: 88, safety: 97 },
  { team: 'Equipo Seguridad', projects: 3, completed: 3, efficiency: 100, safety: 99 },
  { team: 'Equipo Logística', projects: 2, completed: 2, efficiency: 100, safety: 94 }
];

// Sample operational activities data
const operationalActivities: OperationalActivity[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Supervisión de obra - Torre Premium',
    type: 'project',
    category: 'construction',
    progress: 75,
    description: 'Supervisión y control de calidad en construcción de Torre Premium',
    responsible: 'Diego Morales',
    status: 'in_progress',
    priority: 'high',
    reference: 'OP-2024-001',
    tags: ['construcción', 'supervisión', 'calidad'],
    notes: 'Progreso según cronograma, materiales disponibles',
    location: 'Sitio Torre Premium',
    equipment: ['Excavadora', 'Grúa', 'Andamios'],
    safety_score: 95
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Mantenimiento preventivo - Equipos',
    type: 'maintenance',
    category: 'equipment',
    progress: 100,
    description: 'Mantenimiento preventivo de equipos de construcción',
    responsible: 'Ana Martínez',
    status: 'completed',
    priority: 'medium',
    reference: 'OP-2024-002',
    tags: ['mantenimiento', 'equipos', 'preventivo'],
    notes: 'Todos los equipos operativos',
    location: 'Taller Central',
    equipment: ['Excavadora', 'Retroexcavadora', 'Compresor'],
    safety_score: 98
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Inspección de seguridad',
    type: 'safety',
    category: 'safety',
    progress: 90,
    description: 'Inspección de seguridad en todos los sitios de trabajo',
    responsible: 'Roberto Silva',
    status: 'in_progress',
    priority: 'high',
    reference: 'OP-2024-003',
    tags: ['seguridad', 'inspección', 'sitios'],
    notes: 'Identificadas 2 áreas de mejora',
    location: 'Todos los sitios',
    equipment: ['EPP', 'Señalización'],
    safety_score: 92
  }
];

const calculateOperationalMetrics = (activities: OperationalActivity[]): OperationalMetrics => {
  const total = activities.length;
  const completed = activities.filter(a => a.status === 'completed').length;
  const avgSafety = activities.reduce((sum, a) => sum + a.safety_score, 0) / total;
  const avgProgress = activities.reduce((sum, a) => sum + a.progress, 0) / total;

  return {
    totalProjects: total,
    completedProjects: completed,
    efficiencyRate: Math.round(avgProgress),
    safetyScore: Math.round(avgSafety),
    equipmentUtilization: 87,
    qualityScore: 94,
    onTimeDelivery: 92,
    costEfficiency: 89,
    teamProductivity: 91,
    riskLevel: 12
  };
};

const getTypeColor = (type: string) => {
  const colors = {
    project: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-green-100 text-green-800',
    safety: 'bg-yellow-100 text-yellow-800',
    logistics: 'bg-purple-100 text-purple-800',
    quality: 'bg-indigo-100 text-indigo-800',
    training: 'bg-pink-100 text-pink-800',
    inspection: 'bg-orange-100 text-orange-800',
    coordination: 'bg-gray-100 text-gray-800'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getStatusColor = (status: string) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    delayed: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getCategoryColor = (category: string) => {
  const colors = {
    construction: 'bg-green-100 text-green-800',
    equipment: 'bg-blue-100 text-blue-800',
    safety: 'bg-yellow-100 text-yellow-800',
    transport: 'bg-purple-100 text-purple-800',
    quality_control: 'bg-indigo-100 text-indigo-800',
    training: 'bg-pink-100 text-pink-800',
    inspection: 'bg-orange-100 text-orange-800',
    planning: 'bg-gray-100 text-gray-800'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

const DepartamentoOperacionesReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredActivities = operationalActivities.filter(activity => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Construcción' && activity.category === 'construction') ||
      (selectedCategory === 'Equipos' && activity.category === 'equipment') ||
      (selectedCategory === 'Seguridad' && activity.category === 'safety') ||
      (selectedCategory === 'Transporte' && activity.category === 'transport') ||
      (selectedCategory === 'Control de Calidad' && activity.category === 'quality_control') ||
      (selectedCategory === 'Capacitación' && activity.category === 'training') ||
      (selectedCategory === 'Inspección' && activity.category === 'inspection') ||
      (selectedCategory === 'Planificación' && activity.category === 'planning');
    const matchesPaymentMethod = selectedPaymentMethod === 'Todos' || 
      (selectedPaymentMethod === 'Efectivo' && activity.status === 'completed') ||
      (selectedPaymentMethod === 'Transferencia' && activity.status === 'in_progress') ||
      (selectedPaymentMethod === 'Tarjeta de Crédito' && activity.status === 'pending') ||
      (selectedPaymentMethod === 'Cheque' && activity.status === 'delayed');
    const matchesSearch = !searchTerm || 
      activity.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPaymentMethod && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPaymentMethod('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedPaymentMethod !== 'Todos' || searchTerm;

  const metrics = calculateOperationalMetrics(filteredActivities);

  const kpiCards = [
    {
      label: 'Proyectos Totales',
      value: metrics.totalProjects,
      icon: Building2,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+3 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Proyectos Completados',
      value: metrics.completedProjects,
      icon: CheckCircle,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+2 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Eficiencia Operativa',
      value: `${metrics.efficiencyRate}%`,
      icon: TrendingUp,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: '+2% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Puntuación de Seguridad',
      value: `${metrics.safetyScore}%`,
      icon: Shield,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+1% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Utilización de Equipos',
      value: `${metrics.equipmentUtilization}%`,
      icon: Wrench,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: 'Optimizada',
      trendDirection: 'neutral'
    },
    {
      label: 'Calidad General',
      value: `${metrics.qualityScore}%`,
      icon: Award,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+3% vs mes anterior',
      trendDirection: 'up'
    }
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const years = ['2023', '2024', '2025'];
  const categories = ['Todos', 'Construcción', 'Equipos', 'Seguridad', 'Transporte', 'Control de Calidad', 'Capacitación', 'Inspección', 'Planificación'];
  const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <Building2 className="text-white h-6 w-6" />
              </div>
              Operaciones - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis operacional completo y gestión de actividades del departamento</p>
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
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(m => <SelectItem value={m} key={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(y => <SelectItem value={y} key={y}>{y}</SelectItem>)}
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
              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Search className="text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar actividades..."
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
          <TabsTrigger value="overview" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <Eye className={`h-4 w-4 ${viewMode === 'overview' ? 'text-white' : 'text-[#1e3269]'}`} />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="trends" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <TrendingUp className={`h-4 w-4 ${viewMode === 'trends' ? 'text-white' : 'text-[#1e3269]'}`} />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="analysis" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart3 className={`h-4 w-4 ${viewMode === 'analysis' ? 'text-white' : 'text-[#1e3269]'}`} />
            Análisis
          </TabsTrigger>
          <TabsTrigger value="movements" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <List className={`h-4 w-4 ${viewMode === 'movements' ? 'text-white' : 'text-[#1e3269]'}`} />
            Actividades
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Operational Trends Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Tendencias Operacionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={operationalTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="projects" stroke="#1e3269" strokeWidth={2} name="Proyectos" />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completados" />
                    <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="Eficiencia" />
                    <Line type="monotone" dataKey="safety" stroke="#f59e0b" strokeWidth={2} name="Seguridad" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <PieChart className="text-[#1e3269]" />
                  Distribución por Categoría
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
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

        <TabsContent value="trends" className="space-y-6">
          {/* Trends Content */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <LineChart className="text-[#1e3269]" />
                Análisis de Tendencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsAreaChart data={operationalTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="projects" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="completed" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Analysis Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Breakdown */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart2 className="text-[#1e3269]" />
                  Desglose de Proyectos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={projectBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1e3269" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Users className="text-[#1e3269]" />
                  Rendimiento del Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((team, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{team.team}</p>
                        <p className="text-sm text-gray-600">{team.projects} proyectos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#1e3269]">{team.efficiency}%</p>
                        <p className="text-sm text-gray-600">Eficiencia</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          {/* Movements Content */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <List className="text-[#1e3269]" />
                Lista de Actividades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivities.map(activity => (
                  <div key={activity.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm font-medium text-gray-600">{activity.date}</div>
                          <Badge className={getTypeColor(activity.type)}>
                            {activity.type === 'project' ? 'Proyecto' :
                             activity.type === 'maintenance' ? 'Mantenimiento' :
                             activity.type === 'safety' ? 'Seguridad' :
                             activity.type === 'logistics' ? 'Logística' :
                             activity.type === 'quality' ? 'Calidad' :
                             activity.type === 'training' ? 'Capacitación' :
                             activity.type === 'inspection' ? 'Inspección' : 'Coordinación'}
                          </Badge>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status === 'completed' ? 'Completado' :
                             activity.status === 'in_progress' ? 'En Progreso' :
                             activity.status === 'pending' ? 'Pendiente' : 'Retrasado'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{activity.concept}</h3>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {activity.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {activity.safety_score}% seguridad
                          </div>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Activity className="text-[#1e3269]" />
                  Métricas de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Entrega a Tiempo</span>
                    <span className="text-lg font-bold text-green-600">{metrics.onTimeDelivery}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Eficiencia de Costos</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.costEfficiency}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Productividad del Equipo</span>
                    <span className="text-lg font-bold text-orange-600">{metrics.teamProductivity}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Nivel de Riesgo</span>
                    <span className="text-lg font-bold text-red-600">{metrics.riskLevel}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Utilization */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Wrench className="text-[#1e3269]" />
                  Utilización de Equipos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Utilización Actual</span>
                    <span className="text-lg font-bold text-[#1e3269]">{metrics.equipmentUtilization}%</span>
                  </div>
                  <Progress value={metrics.equipmentUtilization} className="w-full" />
                  <div className="text-xs text-gray-500">
                    {metrics.equipmentUtilization >= 80 ? 'Excelente utilización' :
                     metrics.equipmentUtilization >= 60 ? 'Buena utilización' :
                     metrics.equipmentUtilization >= 40 ? 'Utilización moderada' : 'Baja utilización'}
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

export default DepartamentoOperacionesReporteInterno; 