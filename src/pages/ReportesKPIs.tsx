import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Search,
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
  AreaChart,
  Gauge,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  AlertTriangle,
  CheckSquare,
  Clock as ClockIcon,
  DollarSign as DollarSignIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus
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
  Radar,
  ScatterChart,
  Scatter as RechartsScatter
} from 'recharts';

interface KPIData {
  id: string;
  name: string;
  category: 'financial' | 'operational' | 'quality' | 'timeline' | 'team' | 'risk';
  currentValue: number;
  targetValue: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  department: string;
  lastUpdated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

interface KPICategory {
  name: string;
  icon: any;
  color: string;
  count: number;
  averageScore: number;
}

// Time series data for KPI trends
const kpiTrendData = [
  { month: 'Ene', projectProgress: 65, budgetUtilization: 78, teamEfficiency: 82, qualityScore: 85, riskLevel: 15, customerSatisfaction: 4.2 },
  { month: 'Feb', projectProgress: 68, budgetUtilization: 80, teamEfficiency: 84, qualityScore: 86, riskLevel: 12, customerSatisfaction: 4.3 },
  { month: 'Mar', projectProgress: 72, budgetUtilization: 82, teamEfficiency: 86, qualityScore: 87, riskLevel: 10, customerSatisfaction: 4.4 },
  { month: 'Abr', projectProgress: 75, budgetUtilization: 84, teamEfficiency: 88, qualityScore: 88, riskLevel: 8, customerSatisfaction: 4.5 },
  { month: 'May', projectProgress: 78, budgetUtilization: 85, teamEfficiency: 90, qualityScore: 89, riskLevel: 6, customerSatisfaction: 4.6 },
  { month: 'Jun', projectProgress: 82, budgetUtilization: 87, teamEfficiency: 92, qualityScore: 90, riskLevel: 5, customerSatisfaction: 4.7 },
  { month: 'Jul', projectProgress: 85, budgetUtilization: 88, teamEfficiency: 93, qualityScore: 91, riskLevel: 4, customerSatisfaction: 4.8 },
  { month: 'Ago', projectProgress: 88, budgetUtilization: 90, teamEfficiency: 94, qualityScore: 92, riskLevel: 3, customerSatisfaction: 4.9 }
];

// Department KPI performance
const departmentKPIData = [
  { department: 'Arquitectura', progress: 88, efficiency: 92, quality: 89, budget: 85, risk: 8 },
  { department: 'Operaciones', progress: 82, efficiency: 88, quality: 85, budget: 87, risk: 12 },
  { department: 'Mercadeo', progress: 75, efficiency: 78, quality: 82, budget: 80, risk: 15 },
  { department: 'Administración', progress: 95, efficiency: 96, quality: 94, budget: 92, risk: 5 },
  { department: 'Finanzas', progress: 78, efficiency: 85, quality: 88, budget: 83, risk: 10 },
  { department: 'Fundación', progress: 85, efficiency: 90, quality: 87, budget: 88, risk: 7 }
];

// KPI categories performance
const categoryData = [
  { category: 'Financieros', score: 87, target: 90, count: 8 },
  { category: 'Operacionales', score: 82, target: 85, count: 12 },
  { category: 'Calidad', score: 89, target: 92, count: 6 },
  { category: 'Cronograma', score: 85, target: 88, count: 10 },
  { category: 'Equipo', score: 91, target: 90, count: 5 },
  { category: 'Riesgo', score: 78, target: 85, count: 4 }
];

// Risk assessment data
const riskData = [
  { name: 'Bajo Riesgo', value: 15, fill: '#10b981' },
  { name: 'Riesgo Medio', value: 8, fill: '#f59e0b' },
  { name: 'Alto Riesgo', value: 3, fill: '#ef4444' }
];

// Sample KPI data
const kpiData: KPIData[] = [
  {
    id: '1',
    name: 'Avance Global de Proyectos',
    category: 'operational',
    currentValue: 88,
    targetValue: 90,
    previousValue: 85,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'Porcentaje promedio de avance de todos los proyectos activos',
    department: 'Todos',
    lastUpdated: '2024-08-15',
    frequency: 'weekly'
  },
  {
    id: '2',
    name: 'Utilización de Presupuesto',
    category: 'financial',
    currentValue: 87,
    targetValue: 85,
    previousValue: 84,
    unit: '%',
    trend: 'up',
    status: 'excellent',
    description: 'Porcentaje de presupuesto ejecutado vs planificado',
    department: 'Finanzas',
    lastUpdated: '2024-08-15',
    frequency: 'monthly'
  },
  {
    id: '3',
    name: 'Eficiencia del Equipo',
    category: 'team',
    currentValue: 92,
    targetValue: 90,
    previousValue: 89,
    unit: '%',
    trend: 'up',
    status: 'excellent',
    description: 'Productividad promedio del equipo de trabajo',
    department: 'Todos',
    lastUpdated: '2024-08-15',
    frequency: 'weekly'
  },
  {
    id: '4',
    name: 'Calidad de Entregables',
    category: 'quality',
    currentValue: 89,
    targetValue: 92,
    previousValue: 87,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'Satisfacción del cliente con la calidad de entregables',
    department: 'Todos',
    lastUpdated: '2024-08-15',
    frequency: 'monthly'
  },
  {
    id: '5',
    name: 'Proyectos en Riesgo',
    category: 'risk',
    currentValue: 3,
    targetValue: 2,
    previousValue: 5,
    unit: 'proyectos',
    trend: 'down',
    status: 'warning',
    description: 'Número de proyectos identificados con alto riesgo',
    department: 'Todos',
    lastUpdated: '2024-08-15',
    frequency: 'weekly'
  },
  {
    id: '6',
    name: 'Satisfacción del Cliente',
    category: 'quality',
    currentValue: 4.7,
    targetValue: 4.5,
    previousValue: 4.6,
    unit: '/5',
    trend: 'up',
    status: 'excellent',
    description: 'Puntuación promedio de satisfacción del cliente',
    department: 'Todos',
    lastUpdated: '2024-08-15',
    frequency: 'monthly'
  },
  {
    id: '7',
    name: 'Cumplimiento de Cronograma',
    category: 'timeline',
    currentValue: 85,
    targetValue: 88,
    previousValue: 82,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'Porcentaje de proyectos que cumplen con sus fechas planificadas',
    department: 'Todos',
    lastUpdated: '2024-08-15',
    frequency: 'weekly'
  },
  {
    id: '8',
    name: 'ROI Promedio',
    category: 'financial',
    currentValue: 1.8,
    targetValue: 1.5,
    previousValue: 1.6,
    unit: 'x',
    trend: 'up',
    status: 'excellent',
    description: 'Retorno de inversión promedio de todos los proyectos',
    department: 'Finanzas',
    lastUpdated: '2024-08-15',
    frequency: 'quarterly'
  }
];

const departments = ['Todos', 'Finanzas', 'Operaciones', 'Administración', 'Arquitectura', 'Mercadeo', 'Fundación'];
const periods = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Anual 2024'];
const categories = ['Todos', 'Financieros', 'Operacionales', 'Calidad', 'Cronograma', 'Equipo', 'Riesgo'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
    case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'financial': return DollarSignIcon;
    case 'operational': return BuildingIcon;
    case 'quality': return CheckSquare;
    case 'timeline': return ClockIcon;
    case 'team': return UsersIcon;
    case 'risk': return AlertTriangle;
    default: return TargetIcon;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'financial': return 'bg-green-50 border-green-200 text-green-700';
    case 'operational': return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'quality': return 'bg-purple-50 border-purple-200 text-purple-700';
    case 'timeline': return 'bg-orange-50 border-orange-200 text-orange-700';
    case 'team': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
    case 'risk': return 'bg-red-50 border-red-200 text-red-700';
    default: return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ReportesKPIs: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Q2 2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'performance' | 'departments' | 'detailed'>('overview');

  const filteredKPIs = kpiData.filter(kpi => {
    const matchesDepartment = selectedDepartment === 'Todos' || kpi.department === selectedDepartment;
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Financieros' && kpi.category === 'financial') ||
      (selectedCategory === 'Operacionales' && kpi.category === 'operational') ||
      (selectedCategory === 'Calidad' && kpi.category === 'quality') ||
      (selectedCategory === 'Cronograma' && kpi.category === 'timeline') ||
      (selectedCategory === 'Equipo' && kpi.category === 'team') ||
      (selectedCategory === 'Riesgo' && kpi.category === 'risk');
    const matchesSearch = !searchTerm || 
      kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedDepartment('Todos');
    setSelectedCategory('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedDepartment !== 'Todos' || selectedCategory !== 'Todos' || searchTerm;

  // Calculate summary metrics
  const totalKPIs = kpiData.length;
  const excellentKPIs = kpiData.filter(kpi => kpi.status === 'excellent').length;
  const goodKPIs = kpiData.filter(kpi => kpi.status === 'good').length;
  const warningKPIs = kpiData.filter(kpi => kpi.status === 'warning').length;
  const criticalKPIs = kpiData.filter(kpi => kpi.status === 'critical').length;
  const averageScore = Math.round(kpiData.reduce((acc, kpi) => acc + kpi.currentValue, 0) / totalKPIs);

  const kpiCards = [
    {
      label: 'KPIs Excelentes',
      value: excellentKPIs,
      total: totalKPIs,
      icon: Award,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: `${Math.round((excellentKPIs / totalKPIs) * 100)}% del total`,
      trendDirection: 'up'
    },
    {
      label: 'Puntuación Promedio',
      value: `${averageScore}%`,
      icon: Target,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+3% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'KPIs en Riesgo',
      value: warningKPIs + criticalKPIs,
      total: totalKPIs,
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200 text-red-700',
      trend: '-2 vs mes anterior',
      trendDirection: 'down'
    },
    {
      label: 'Cumplimiento Objetivos',
      value: `${Math.round((excellentKPIs + goodKPIs) / totalKPIs * 100)}%`,
      icon: CheckCircle,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: '85% de KPIs cumplen objetivos',
      trendDirection: 'up'
    },
    {
      label: 'Tendencia Positiva',
      value: kpiData.filter(kpi => kpi.trend === 'up').length,
      total: totalKPIs,
      icon: TrendingUp,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: '75% mejorando',
      trendDirection: 'up'
    },
    {
      label: 'Actualización Reciente',
      value: kpiData.filter(kpi => kpi.frequency === 'daily' || kpi.frequency === 'weekly').length,
      icon: Clock,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: 'Actualizados esta semana',
      trendDirection: 'neutral'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <Target className="text-white h-6 w-6" />
              </div>
              KPIs - Indicadores Clave de Rendimiento
            </h1>
            <p className="text-gray-600">Dashboard completo de métricas y indicadores de rendimiento organizacional</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Download className="h-4 w-4" />
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
                  {kpi.total && (
                    <p className="text-xs text-gray-500">de {kpi.total} total</p>
                  )}
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
            <Filter className="text-[#1e3269]" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400 h-4 w-4" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(d => <SelectItem value={d} key={d}>{d}</SelectItem>)}
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
              <Search className="text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar KPIs..."
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
            <LineChart className={`h-4 w-4 ${viewMode === 'trends' ? 'text-white' : 'text-[#1e3269]'}`} />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="performance" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart3 className={`h-4 w-4 ${viewMode === 'performance' ? 'text-white' : 'text-[#1e3269]'}`} />
            Rendimiento
          </TabsTrigger>
          <TabsTrigger value="departments" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <Building2 className={`h-4 w-4 ${viewMode === 'departments' ? 'text-white' : 'text-[#1e3269]'}`} />
            Departamentos
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPI Status Distribution */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <PieChart className="text-[#1e3269]" />
                  Distribución por Estado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Excelente', value: excellentKPIs, fill: '#1e3269' },
                        { name: 'Bueno', value: goodKPIs, fill: '#fbbf24' },
                        { name: 'Advertencia', value: warningKPIs, fill: '#eab308' },
                        { name: 'Crítico', value: criticalKPIs, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    />
                    <Tooltip formatter={(value) => [value, 'KPIs']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart3 className="text-[#1e3269]" />
                  Rendimiento por Categoría
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Puntuación']} />
                    <Legend />
                    <Bar dataKey="score" fill="#1e3269" name="Puntuación" />
                    <Bar dataKey="target" fill="#fbbf24" name="Objetivo" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <AlertTriangle className="text-[#1e3269]" />
                Evaluación de Riesgos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'KPIs']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* KPI Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main KPI Trends */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <LineChart className="text-[#1e3269]" />
                  Evolución de KPIs Principales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={kpiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="projectProgress" stroke="#1e3269" strokeWidth={2} name="Progreso Proyectos" />
                    <Line type="monotone" dataKey="budgetUtilization" stroke="#fbbf24" strokeWidth={2} name="Utilización Presupuesto" />
                    <Line type="monotone" dataKey="teamEfficiency" stroke="#10b981" strokeWidth={2} name="Eficiencia Equipo" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quality and Risk Trends */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <AreaChart className="text-[#1e3269]" />
                  Calidad y Riesgo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={kpiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="qualityScore" fill="#1e3269" fillOpacity={0.6} stroke="#1e3269" name="Calidad" />
                    <Bar yAxisId="right" dataKey="riskLevel" fill="#ef4444" name="Nivel de Riesgo" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Customer Satisfaction Trend */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <TrendingUp className="text-[#1e3269]" />
                Satisfacción del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsAreaChart data={kpiTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[4, 5]} />
                  <Tooltip formatter={(value) => [value, 'Puntuación']} />
                  <Legend />
                  <Area type="monotone" dataKey="customerSatisfaction" fill="#1e3269" fillOpacity={0.6} stroke="#1e3269" strokeWidth={2} name="Satisfacción del Cliente" />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Radar Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Target className="text-[#1e3269]" />
                  Análisis de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={categoryData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Puntuación Actual" dataKey="score" stroke="#1e3269" fill="#1e3269" fillOpacity={0.3} />
                    <Radar name="Objetivo" dataKey="target" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.1} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* KPI Achievement */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <CheckCircle className="text-[#1e3269]" />
                  Cumplimiento de Objetivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                    <Legend />
                    <Bar dataKey="score" fill="#1e3269" name="Puntuación" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          {/* Department Performance */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Building2 className="text-[#1e3269]" />
                Rendimiento por Departamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={departmentKPIData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="progress" fill="#1e3269" name="Progreso (%)" />
                  <Bar yAxisId="left" dataKey="efficiency" fill="#fbbf24" name="Eficiencia (%)" />
                  <Line yAxisId="right" type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} name="Riesgo" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed KPI Table */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BarChart2 className="text-[#1e3269]" />
                Tabla Detallada de KPIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">KPI</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Categoría</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Valor Actual</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Objetivo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tendencia</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Departamento</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Frecuencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKPIs.map((kpi) => {
                      const CategoryIcon = getCategoryIcon(kpi.category);
                      return (
                        <tr key={kpi.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{kpi.name}</p>
                              <p className="text-xs text-gray-500">{kpi.description}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <CategoryIcon className="h-4 w-4" />
                              <span className="text-sm">{categories.find(c => 
                                (c === 'Financieros' && kpi.category === 'financial') ||
                                (c === 'Operacionales' && kpi.category === 'operational') ||
                                (c === 'Calidad' && kpi.category === 'quality') ||
                                (c === 'Cronograma' && kpi.category === 'timeline') ||
                                (c === 'Equipo' && kpi.category === 'team') ||
                                (c === 'Riesgo' && kpi.category === 'risk')
                              )}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{kpi.currentValue}{kpi.unit}</span>
                              <div className="flex items-center gap-1">
                                {kpi.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                                {kpi.trend === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
                                {kpi.trend === 'stable' && <Minus className="h-3 w-3 text-gray-500" />}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{kpi.targetValue}{kpi.unit}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {kpi.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                              {kpi.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                              {kpi.trend === 'stable' && <Minus className="h-4 w-4 text-gray-500" />}
                              <span className="text-sm capitalize">{kpi.trend}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(kpi.status)}>
                              {kpi.status === 'excellent' ? 'Excelente' :
                               kpi.status === 'good' ? 'Bueno' :
                               kpi.status === 'warning' ? 'Advertencia' : 'Crítico'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{kpi.department}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm capitalize">{kpi.frequency}</span>
                          </td>
                        </tr>
                      );
                    })}
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

export default ReportesKPIs; 