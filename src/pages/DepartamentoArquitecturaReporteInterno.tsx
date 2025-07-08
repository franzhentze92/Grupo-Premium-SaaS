import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  FileText, 
  BarChart4, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  Target,
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
  Clock,
  User,
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

interface ArchitectureProject {
  id: string;
  date: string;
  concept: string;
  type: 'design' | 'review' | 'presentation' | 'coordination' | 'site_visit' | 'analysis';
  category: 'residential' | 'commercial' | 'industrial' | 'institutional' | 'landscape' | 'interior';
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  responsible: string;
  client: string;
  budget: number;
  hours: number;
  priority: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  tags: string[];
  notes: string;
  attachments: string[];
  collaborators: string[];
}

interface ArchitectureMetrics {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  pendingProjects: number;
  totalHours: number;
  averageProjectDuration: number;
  clientSatisfaction: number;
  budgetUtilization: number;
  designEfficiency: number;
  coordinationScore: number;
}

// Time series data for architecture trends
const architectureTrendData = [
  { month: 'Ene', projects: 8, completed: 6, satisfaction: 92, efficiency: 88 },
  { month: 'Feb', projects: 10, completed: 8, satisfaction: 94, efficiency: 90 },
  { month: 'Mar', projects: 12, completed: 10, satisfaction: 91, efficiency: 92 },
  { month: 'Abr', projects: 15, completed: 13, satisfaction: 93, efficiency: 94 },
  { month: 'May', projects: 18, completed: 16, satisfaction: 95, efficiency: 96 },
  { month: 'Jun', projects: 20, completed: 18, satisfaction: 96, efficiency: 97 },
  { month: 'Jul', projects: 22, completed: 20, satisfaction: 97, efficiency: 98 },
  { month: 'Ago', projects: 25, completed: 23, satisfaction: 98, efficiency: 99 }
];

// Category distribution data
const categoryData = [
  { name: 'Residencial', value: 40, fill: '#1e3269' },
  { name: 'Comercial', value: 25, fill: '#fbbf24' },
  { name: 'Industrial', value: 15, fill: '#eab308' },
  { name: 'Institucional', value: 12, fill: '#ef4444' },
  { name: 'Paisajismo', value: 5, fill: '#8b5cf6' },
  { name: 'Interiorismo', value: 3, fill: '#6b7280' }
];

// Project breakdown
const projectBreakdown = [
  { category: 'Residencial', count: 10, percentage: 40.0 },
  { category: 'Comercial', count: 6, percentage: 24.0 },
  { category: 'Industrial', count: 4, percentage: 16.0 },
  { category: 'Institucional', count: 3, percentage: 12.0 },
  { category: 'Paisajismo', count: 2, percentage: 8.0 }
];

// Team performance
const teamPerformance = [
  { member: 'Carlos Mendoza', projects: 8, completed: 7, efficiency: 88, satisfaction: 95 },
  { member: 'Ana Rodríguez', projects: 10, completed: 9, efficiency: 90, satisfaction: 92 },
  { member: 'Luis Fernández', projects: 7, completed: 7, efficiency: 100, satisfaction: 98 }
];

// Client satisfaction data
const clientSatisfactionData = [
  { client: 'Residencial Vista Sur', satisfaction: 95, projects: 3 },
  { client: 'Torre Premium', satisfaction: 88, projects: 2 },
  { client: 'Centro Comercial Plaza', satisfaction: 92, projects: 4 },
  { client: 'Edificio Corporativo', satisfaction: 85, projects: 1 },
  { client: 'Proyecto Industrial', satisfaction: 90, projects: 2 }
];

// Sample architecture projects data
const architectureProjects: ArchitectureProject[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Diseño Residencial Vista Sur - Fase 2',
    type: 'design',
    category: 'residential',
    status: 'completed',
    responsible: 'Carlos Mendoza',
    client: 'Residencial Vista Sur',
    budget: 25000,
    hours: 80,
    priority: 'high',
    description: 'Diseño completo de planos arquitectónicos para la segunda fase del proyecto residencial',
    location: 'Oficina Principal',
    tags: ['residencial', 'diseño', 'planos'],
    notes: 'Proyecto completado exitosamente, cliente satisfecho',
    attachments: ['planos_fase2.pdf', 'memoria_descriptiva.pdf'],
    collaborators: ['Ana Rodríguez', 'Luis Fernández']
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Revisión Torre Premium - Estructura',
    type: 'review',
    category: 'commercial',
    status: 'in_progress',
    responsible: 'Ana Rodríguez',
    client: 'Torre Premium',
    budget: 15000,
    hours: 45,
    priority: 'high',
    description: 'Revisión técnica de la estructura del proyecto comercial',
    location: 'Sala de Revisión',
    tags: ['comercial', 'revisión', 'estructura'],
    notes: 'En proceso de revisión con ingenieros',
    attachments: ['revision_estructura.pdf'],
    collaborators: ['Carlos Mendoza']
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Presentación Centro Comercial Plaza',
    type: 'presentation',
    category: 'commercial',
    status: 'completed',
    responsible: 'Luis Fernández',
    client: 'Centro Comercial Plaza',
    budget: 8000,
    hours: 20,
    priority: 'medium',
    description: 'Presentación de conceptos arquitectónicos al cliente',
    location: 'Sala de Conferencias',
    tags: ['comercial', 'presentación', 'conceptos'],
    notes: 'Presentación exitosa, cliente aprobó el diseño',
    attachments: ['presentacion_conceptos.pdf'],
    collaborators: ['Carlos Mendoza', 'Ana Rodríguez']
  },
  {
    id: '4',
    date: '2024-05-12',
    concept: 'Coordinación Proyecto Industrial',
    type: 'coordination',
    category: 'industrial',
    status: 'pending',
    responsible: 'Carlos Mendoza',
    client: 'Proyecto Industrial',
    budget: 12000,
    hours: 30,
    priority: 'high',
    description: 'Coordinación técnica con equipo de ingeniería industrial',
    location: 'Oficina de Ingeniería',
    tags: ['industrial', 'coordinación', 'ingeniería'],
    notes: 'Pendiente de programación',
    attachments: ['coordinacion_industrial.pdf'],
    collaborators: ['Ana Rodríguez']
  },
  {
    id: '5',
    date: '2024-05-11',
    concept: 'Análisis Edificio Corporativo',
    type: 'analysis',
    category: 'institutional',
    status: 'in_progress',
    responsible: 'Ana Rodríguez',
    client: 'Edificio Corporativo',
    budget: 18000,
    hours: 60,
    priority: 'medium',
    description: 'Análisis de viabilidad técnica y económica del proyecto',
    location: 'Oficina de Análisis',
    tags: ['institucional', 'análisis', 'viabilidad'],
    notes: 'Análisis en progreso, resultados preliminares positivos',
    attachments: ['analisis_viabilidad.pdf'],
    collaborators: ['Luis Fernández']
  }
];

const calculateArchitectureMetrics = (projects: ArchitectureProject[]): ArchitectureMetrics => {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
  const pendingProjects = projects.filter(p => p.status === 'pending').length;
  const totalHours = projects.reduce((acc, p) => acc + p.hours, 0);
  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const averageProjectDuration = totalHours / totalProjects;
  const budgetUtilization = (totalBudget / 100000) * 100; // Assuming 100k budget
  const clientSatisfaction = 92; // Mock data
  const designEfficiency = 88; // Mock data
  const coordinationScore = 85; // Mock data

  return {
    totalProjects,
    completedProjects,
    inProgressProjects,
    pendingProjects,
    totalHours,
    averageProjectDuration,
    clientSatisfaction,
    budgetUtilization,
    designEfficiency,
    coordinationScore
  };
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'design': return 'bg-blue-100 text-blue-800';
    case 'review': return 'bg-green-100 text-green-800';
    case 'presentation': return 'bg-purple-100 text-purple-800';
    case 'coordination': return 'bg-orange-100 text-orange-800';
    case 'site_visit': return 'bg-red-100 text-red-800';
    case 'analysis': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in_progress': return 'bg-yellow-100 text-yellow-800';
    case 'pending': return 'bg-blue-100 text-blue-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'residential': return 'bg-green-100 text-green-800';
    case 'commercial': return 'bg-blue-100 text-blue-800';
    case 'industrial': return 'bg-orange-100 text-orange-800';
    case 'institutional': return 'bg-purple-100 text-purple-800';
    case 'landscape': return 'bg-emerald-100 text-emerald-800';
    case 'interior': return 'bg-pink-100 text-pink-800';
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

const DepartamentoArquitecturaReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredProjects = architectureProjects.filter(project => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Residencial' && project.category === 'residential') ||
      (selectedCategory === 'Comercial' && project.category === 'commercial') ||
      (selectedCategory === 'Industrial' && project.category === 'industrial') ||
      (selectedCategory === 'Institucional' && project.category === 'institutional') ||
      (selectedCategory === 'Paisajismo' && project.category === 'landscape') ||
      (selectedCategory === 'Interior' && project.category === 'interior');
    const matchesPaymentMethod = selectedPaymentMethod === 'Todos' || 
      (selectedPaymentMethod === 'Efectivo' && project.status === 'completed') ||
      (selectedPaymentMethod === 'Transferencia' && project.status === 'in_progress') ||
      (selectedPaymentMethod === 'Tarjeta de Crédito' && project.status === 'pending') ||
      (selectedPaymentMethod === 'Cheque' && project.status === 'cancelled');
    const matchesSearch = !searchTerm || 
      project.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPaymentMethod && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPaymentMethod('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedPaymentMethod !== 'Todos' || searchTerm;

  const metrics = calculateArchitectureMetrics(filteredProjects);

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
      label: 'En Progreso',
      value: metrics.inProgressProjects,
      icon: Clock,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+1 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Satisfacción Cliente',
      value: `${metrics.clientSatisfaction}%`,
      icon: Target,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: '+5% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Eficiencia de Diseño',
      value: `${metrics.designEfficiency}%`,
      icon: FileText,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: 'Excelente',
      trendDirection: 'neutral'
    },
    {
      label: 'Coordinación',
      value: `${metrics.coordinationScore}%`,
      icon: Users,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+3% vs mes anterior',
      trendDirection: 'up'
    }
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const years = ['2023', '2024', '2025'];
  const categories = ['Todos', 'Residencial', 'Comercial', 'Industrial', 'Institucional', 'Paisajismo', 'Interior'];
  const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <FileText className="text-white h-6 w-6" />
              </div>
              Arquitectura - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis arquitectónico completo y gestión de proyectos del departamento</p>
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
                placeholder="Buscar proyectos..."
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
            Proyectos
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Architecture Trends Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Tendencias Arquitectónicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={architectureTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="projects" stroke="#1e3269" strokeWidth={2} name="Proyectos" />
                    <Line type="monotone" dataKey="completed" stroke="#1e3269" strokeWidth={2} name="Completados" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#1e3269" strokeWidth={2} name="Satisfacción" />
                    <Line type="monotone" dataKey="efficiency" stroke="#1e3269" strokeWidth={2} name="Eficiencia" />
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
                <RechartsAreaChart data={architectureTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="projects" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="completed" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="satisfaction" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
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
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{member.member}</p>
                        <p className="text-sm text-gray-600">{member.projects} proyectos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#1e3269]">{member.efficiency}%</p>
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
                Lista de Proyectos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.map(project => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm font-medium text-gray-600">{project.date}</div>
                          <Badge className={getTypeColor(project.type)}>
                            {project.type === 'design' ? 'Diseño' :
                             project.type === 'review' ? 'Revisión' :
                             project.type === 'presentation' ? 'Presentación' :
                             project.type === 'coordination' ? 'Coordinación' :
                             project.type === 'site_visit' ? 'Visita a Obra' : 'Análisis'}
                          </Badge>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === 'completed' ? 'Completado' :
                             project.status === 'in_progress' ? 'En Progreso' :
                             project.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{project.concept}</h3>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {project.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {project.hours} horas
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
                    <span className="text-sm font-medium text-gray-700">Horas Totales</span>
                    <span className="text-lg font-bold text-green-600">{metrics.totalHours}h</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Duración Promedio</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.averageProjectDuration} días</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Utilización de Presupuesto</span>
                    <span className="text-lg font-bold text-orange-600">{metrics.budgetUtilization}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Proyectos Pendientes</span>
                    <span className="text-lg font-bold text-red-600">{metrics.pendingProjects}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Efficiency */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <FileText className="text-[#1e3269]" />
                  Eficiencia de Diseño
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Eficiencia Actual</span>
                    <span className="text-lg font-bold text-[#1e3269]">{metrics.designEfficiency}%</span>
                  </div>
                  <Progress value={metrics.designEfficiency} className="w-full" />
                  <div className="text-xs text-gray-500">
                    {metrics.designEfficiency >= 90 ? 'Excelente eficiencia' :
                     metrics.designEfficiency >= 75 ? 'Buena eficiencia' :
                     metrics.designEfficiency >= 60 ? 'Eficiencia moderada' : 'Baja eficiencia'}
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

export default DepartamentoArquitecturaReporteInterno; 