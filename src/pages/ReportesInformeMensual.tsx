import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  FileText, 
  BarChart2, 
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
  BarChart3,
  AreaChart
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
  ScatterChart,
  Scatter as RechartsScatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  Treemap
} from 'recharts';

interface ProjectData {
  id: string;
  name: string;
  department: string;
  progress: number;
  budget: number;
  spent: number;
  teamSize: number;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'delayed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  issues: number;
  milestones: number;
  completedMilestones: number;
}

interface MonthlyMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  averageProgress: number;
  totalBudget: number;
  totalSpent: number;
  totalTeamSize: number;
  issuesCount: number;
  onTimeProjects: number;
  delayedProjects: number;
  budgetUtilization: number;
}

// Time series data for the last 12 months
const timeSeriesData = [
  { month: 'Ene', projects: 8, progress: 45, budget: 1200000, issues: 5, teamSize: 45 },
  { month: 'Feb', projects: 10, progress: 52, budget: 1500000, issues: 4, teamSize: 52 },
  { month: 'Mar', projects: 12, progress: 58, budget: 1800000, issues: 6, teamSize: 58 },
  { month: 'Abr', projects: 11, progress: 62, budget: 2000000, issues: 3, teamSize: 62 },
  { month: 'May', projects: 13, progress: 68, budget: 2200000, issues: 2, teamSize: 65 },
  { month: 'Jun', projects: 15, progress: 72, budget: 2500000, issues: 4, teamSize: 68 },
  { month: 'Jul', projects: 14, progress: 75, budget: 2800000, issues: 3, teamSize: 70 },
  { month: 'Ago', projects: 16, progress: 78, budget: 3000000, issues: 5, teamSize: 72 },
  { month: 'Sep', projects: 18, progress: 82, budget: 3200000, issues: 2, teamSize: 75 },
  { month: 'Oct', projects: 17, progress: 85, budget: 3500000, issues: 4, teamSize: 78 },
  { month: 'Nov', projects: 19, progress: 88, budget: 3800000, issues: 3, teamSize: 80 },
  { month: 'Dic', projects: 20, progress: 92, budget: 4000000, issues: 1, teamSize: 82 }
];

// Department performance data
const departmentData = [
  { name: 'Arquitectura', projects: 6, progress: 85, budget: 1200000, teamSize: 25, issues: 2 },
  { name: 'Operaciones', projects: 4, progress: 72, budget: 800000, teamSize: 18, issues: 1 },
  { name: 'Mercadeo', projects: 3, progress: 68, budget: 600000, teamSize: 12, issues: 3 },
  { name: 'Administración', projects: 2, progress: 95, budget: 400000, teamSize: 8, issues: 0 },
  { name: 'Finanzas', projects: 3, progress: 58, budget: 500000, teamSize: 10, issues: 4 },
  { name: 'Fundación', projects: 2, progress: 78, budget: 300000, teamSize: 6, issues: 1 }
];

// Project status distribution
const statusData = [
  { name: 'Completados', value: 4, fill: '#10b981' },
  { name: 'En Progreso', value: 12, fill: '#3b82f6' },
  { name: 'Retrasados', value: 2, fill: '#ef4444' },
  { name: 'En Espera', value: 1, fill: '#f59e0b' }
];

// Budget vs Actual spending
const budgetData = [
  { name: 'Arquitectura', budget: 1200000, actual: 1100000, variance: 100000 },
  { name: 'Operaciones', budget: 800000, actual: 750000, variance: 50000 },
  { name: 'Mercadeo', budget: 600000, actual: 580000, variance: 20000 },
  { name: 'Administración', budget: 400000, actual: 400000, variance: 0 },
  { name: 'Finanzas', budget: 500000, actual: 520000, variance: -20000 },
  { name: 'Fundación', budget: 300000, actual: 280000, variance: 20000 }
];

// Team productivity metrics
const productivityData = [
  { name: 'Eficiencia', value: 85, target: 90 },
  { name: 'Calidad', value: 92, target: 95 },
  { name: 'Velocidad', value: 78, target: 85 },
  { name: 'Colaboración', value: 88, target: 90 },
  { name: 'Innovación', value: 75, target: 80 }
];

// Risk assessment data
const riskData = [
  { name: 'Bajo Riesgo', value: 12, fill: '#10b981' },
  { name: 'Riesgo Medio', value: 5, fill: '#f59e0b' },
  { name: 'Alto Riesgo', value: 2, fill: '#ef4444' }
];

// Project complexity vs progress
const complexityData = [
  { name: 'Torre Premium I', complexity: 85, progress: 85, teamSize: 15 },
  { name: 'Residencial Vista Sur', complexity: 65, progress: 65, teamSize: 12 },
  { name: 'Centro Comercial', complexity: 90, progress: 45, teamSize: 20 },
  { name: 'Edificio Corporativo', complexity: 45, progress: 100, teamSize: 8 },
  { name: 'Complejo Residencial', complexity: 75, progress: 30, teamSize: 18 }
];

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const years = ['2023', '2024', '2025'];
const departments = ['Todos', 'Finanzas', 'Operaciones', 'Administración', 'Arquitectura', 'Mercadeo', 'Fundación'];

// Sample data
const projectsData: ProjectData[] = [
  {
    id: '1',
    name: 'Torre Premium I',
    department: 'Arquitectura',
    progress: 85,
    budget: 2500000,
    spent: 2100000,
    teamSize: 15,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'in-progress',
    priority: 'high',
    issues: 2,
    milestones: 8,
    completedMilestones: 6
  },
  {
    id: '2',
    name: 'Residencial Vista Sur',
    department: 'Operaciones',
    progress: 65,
    budget: 1800000,
    spent: 1200000,
    teamSize: 12,
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    status: 'in-progress',
    priority: 'medium',
    issues: 1,
    milestones: 6,
    completedMilestones: 4
  },
  {
    id: '3',
    name: 'Centro Comercial Plaza Central',
    department: 'Mercadeo',
    progress: 45,
    budget: 3200000,
    spent: 1400000,
    teamSize: 20,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    status: 'in-progress',
    priority: 'high',
    issues: 3,
    milestones: 10,
    completedMilestones: 4
  },
  {
    id: '4',
    name: 'Edificio Corporativo Norte',
    department: 'Administración',
    progress: 100,
    budget: 1500000,
    spent: 1500000,
    teamSize: 8,
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    status: 'completed',
    priority: 'medium',
    issues: 0,
    milestones: 5,
    completedMilestones: 5
  },
  {
    id: '5',
    name: 'Complejo Residencial Este',
    department: 'Finanzas',
    progress: 30,
    budget: 2800000,
    spent: 800000,
    teamSize: 18,
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    status: 'delayed',
    priority: 'high',
    issues: 4,
    milestones: 7,
    completedMilestones: 2
  }
];

const calculateMetrics = (projects: ProjectData[]): MonthlyMetrics => {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const averageProgress = Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / totalProjects);
  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
  const totalTeamSize = projects.reduce((acc, p) => acc + p.teamSize, 0);
  const issuesCount = projects.reduce((acc, p) => acc + p.issues, 0);
  const onTimeProjects = projects.filter(p => p.progress >= 80).length;
  const delayedProjects = projects.filter(p => p.status === 'delayed').length;
  const budgetUtilization = Math.round((totalSpent / totalBudget) * 100);

  return {
    totalProjects,
    activeProjects,
    completedProjects,
    averageProgress,
    totalBudget,
    totalSpent,
    totalTeamSize,
    issuesCount,
    onTimeProjects,
    delayedProjects,
    budgetUtilization
  };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
    case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

const ReportesInformeMensual: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'performance' | 'financial' | 'detailed'>('overview');

  const metrics = calculateMetrics(projectsData);

  const filteredProjects = projectsData.filter(project => {
    const matchesDepartment = selectedDepartment === 'Todos' || project.department === selectedDepartment;
    const matchesSearch = !searchTerm || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedDepartment('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedDepartment !== 'Todos' || searchTerm;

  const kpiCards = [
    {
      label: 'Proyectos Activos',
      value: metrics.activeProjects,
      total: metrics.totalProjects,
      icon: Building2,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+2 este mes',
      trendDirection: 'up'
    },
    {
      label: 'Avance Promedio',
      value: `${metrics.averageProgress}%`,
      icon: Target,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+5% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Presupuesto Utilizado',
      value: `${metrics.budgetUtilization}%`,
      icon: DollarSign,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: `${formatCurrency(metrics.totalSpent)}`,
      trendDirection: 'neutral'
    },
    {
      label: 'Equipo Total',
      value: metrics.totalTeamSize,
      icon: Users,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+8 personas',
      trendDirection: 'up'
    },
    {
      label: 'Proyectos a Tiempo',
      value: metrics.onTimeProjects,
      total: metrics.totalProjects,
      icon: CheckCircle,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: '80% tasa de éxito',
      trendDirection: 'up'
    },
    {
      label: 'Incidencias',
      value: metrics.issuesCount,
      icon: AlertCircle,
      color: 'bg-red-50 border-red-200 text-red-700',
      trend: '-3 vs mes anterior',
      trendDirection: 'down'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <FileText className="text-white h-6 w-6" />
              </div>
              Informe Mensual - Análisis Avanzado
            </h1>
            <p className="text-gray-600">Dashboard analítico completo con métricas de rendimiento y tendencias</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar PDF
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
            <Filter className="text-[#8cb43a]" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400 h-4 w-4" />
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
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Rendimiento
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financiero
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Status Distribution */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <PieChart className="text-[#8cb43a]" />
                  Distribución de Estados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Proyectos']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart3 className="text-[#8cb43a]" />
                  Rendimiento por Departamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Progreso']} />
                    <Legend />
                    <Bar dataKey="progress" fill="#8cb43a" name="Progreso (%)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <AlertCircle className="text-[#8cb43a]" />
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
                  <Tooltip formatter={(value) => [value, 'Proyectos']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Time Series Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projects and Progress Trend */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <LineChart className="text-[#8cb43a]" />
                  Evolución de Proyectos y Progreso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="projects" stroke="#8cb43a" strokeWidth={2} name="Proyectos" />
                    <Line yAxisId="right" type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} name="Progreso (%)" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Budget and Issues Trend */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <AreaChart className="text-[#8cb43a]" />
                  Presupuesto vs Incidencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="budget" fill="#8cb43a" fillOpacity={0.3} stroke="#8cb43a" name="Presupuesto" />
                    <Bar yAxisId="right" dataKey="issues" fill="#ef4444" name="Incidencias" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Team Size Trend */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Users className="text-[#8cb43a]" />
                Crecimiento del Equipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsAreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Personas']} />
                  <Legend />
                  <Area type="monotone" dataKey="teamSize" fill="#8cb43a" fillOpacity={0.6} stroke="#8cb43a" strokeWidth={2} name="Tamaño del Equipo" />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Productivity Radar */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Target className="text-[#8cb43a]" />
                  Productividad del Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={productivityData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Actual" dataKey="value" stroke="#8cb43a" fill="#8cb43a" fillOpacity={0.3} />
                    <Radar name="Objetivo" dataKey="target" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

                         {/* Project Complexity vs Progress */}
             <Card className="bg-white shadow-sm border border-gray-200">
               <CardHeader>
                 <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                   <BarChart3 className="text-[#8cb43a]" />
                   Complejidad vs Progreso
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <ResponsiveContainer width="100%" height={300}>
                   <ComposedChart data={complexityData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis yAxisId="left" />
                     <YAxis yAxisId="right" orientation="right" />
                     <Tooltip />
                     <Legend />
                     <Bar yAxisId="left" dataKey="complexity" fill="#8cb43a" name="Complejidad" />
                     <Line yAxisId="right" type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} name="Progreso (%)" />
                   </ComposedChart>
                 </ResponsiveContainer>
               </CardContent>
             </Card>
          </div>

          {/* Department Comparison */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BarChart3 className="text-[#8cb43a]" />
                Comparación de Departamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="projects" fill="#8cb43a" name="Proyectos" />
                  <Line yAxisId="right" type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} name="Progreso (%)" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Financial Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget vs Actual */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <DollarSign className="text-[#8cb43a]" />
                  Presupuesto vs Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Monto']} />
                    <Legend />
                    <Bar dataKey="budget" fill="#8cb43a" name="Presupuesto" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Real" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Budget Variance */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#8cb43a]" />
                  Variación Presupuestaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Variación']} />
                    <Legend />
                                         <Bar dataKey="variance" fill="#8cb43a" name="Variación" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <PieChart className="text-[#8cb43a]" />
                Distribución Presupuestaria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Presupuesto']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Projects Table */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BarChart2 className="text-[#8cb43a]" />
                Detalle de Proyectos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Proyecto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Departamento</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Progreso</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Presupuesto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Equipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Prioridad</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Incidencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{project.name}</td>
                        <td className="py-3 px-4">{project.department}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="w-20 h-2" />
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{formatCurrency(project.spent)}</div>
                            <div className="text-xs text-gray-500">de {formatCurrency(project.budget)}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{project.teamSize} personas</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === 'completed' ? 'Completado' :
                             project.status === 'in-progress' ? 'En Progreso' :
                             project.status === 'delayed' ? 'Retrasado' : 'En Espera'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getPriorityColor(project.priority)}>
                            {project.priority === 'high' ? 'Alta' :
                             project.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={project.issues > 0 ? 'destructive' : 'secondary'}>
                            {project.issues}
                          </Badge>
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

export default ReportesInformeMensual; 