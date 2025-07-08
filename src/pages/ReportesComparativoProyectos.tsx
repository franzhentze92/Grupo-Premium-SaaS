import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  BarChart, 
  BarChart2,
  FileBarChart, 
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
  AreaChart,
  Scale,
  GitCompare,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  Equal
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
  efficiency: number;
  quality: number;
  risk: 'low' | 'medium' | 'high';
  roi: number;
  customerSatisfaction: number;
}

interface ComparisonMetrics {
  progressDifference: number;
  budgetVariance: number;
  teamEfficiency: number;
  riskComparison: number;
  timelineAccuracy: number;
  qualityScore: number;
  costPerMilestone: number;
  overallScore: number;
}

// Sample project data
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
    completedMilestones: 6,
    efficiency: 92,
    quality: 88,
    risk: 'low',
    roi: 1.8,
    customerSatisfaction: 4.5
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
    completedMilestones: 4,
    efficiency: 78,
    quality: 82,
    risk: 'medium',
    roi: 1.4,
    customerSatisfaction: 4.2
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
    completedMilestones: 4,
    efficiency: 68,
    quality: 75,
    risk: 'high',
    roi: 1.2,
    customerSatisfaction: 3.8
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
    completedMilestones: 5,
    efficiency: 95,
    quality: 94,
    risk: 'low',
    roi: 2.1,
    customerSatisfaction: 4.8
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
    completedMilestones: 2,
    efficiency: 55,
    quality: 62,
    risk: 'high',
    roi: 0.9,
    customerSatisfaction: 3.5
  }
];

// Time series data for comparison
const timeSeriesData = [
  { month: 'Ene', torrePremium: 15, residencialVista: 10, centroComercial: 5 },
  { month: 'Feb', torrePremium: 25, residencialVista: 20, centroComercial: 12 },
  { month: 'Mar', torrePremium: 35, residencialVista: 30, centroComercial: 18 },
  { month: 'Abr', torrePremium: 45, residencialVista: 40, centroComercial: 25 },
  { month: 'May', torrePremium: 55, residencialVista: 50, centroComercial: 32 },
  { month: 'Jun', torrePremium: 65, residencialVista: 60, centroComercial: 38 },
  { month: 'Jul', torrePremium: 75, residencialVista: 65, centroComercial: 42 },
  { month: 'Ago', torrePremium: 85, residencialVista: 70, centroComercial: 45 }
];

// Performance metrics comparison
const performanceData = [
  { metric: 'Progreso', torrePremium: 85, residencialVista: 65, centroComercial: 45 },
  { metric: 'Eficiencia', torrePremium: 92, residencialVista: 78, centroComercial: 68 },
  { metric: 'Calidad', torrePremium: 88, residencialVista: 82, centroComercial: 75 },
  { metric: 'ROI', torrePremium: 1.8, residencialVista: 1.4, centroComercial: 1.2 },
  { metric: 'Satisfacción', torrePremium: 4.5, residencialVista: 4.2, centroComercial: 3.8 }
];

// Risk assessment comparison
const riskData = [
  { name: 'Torre Premium I', low: 70, medium: 20, high: 10 },
  { name: 'Residencial Vista Sur', low: 50, medium: 35, high: 15 },
  { name: 'Centro Comercial', low: 30, medium: 40, high: 30 }
];

// Budget comparison data
const budgetData = [
  { month: 'Ene', torrePremium: 200000, residencialVista: 150000, centroComercial: 100000 },
  { month: 'Feb', torrePremium: 400000, residencialVista: 300000, centroComercial: 200000 },
  { month: 'Mar', torrePremium: 600000, residencialVista: 450000, centroComercial: 300000 },
  { month: 'Abr', torrePremium: 800000, residencialVista: 600000, centroComercial: 400000 },
  { month: 'May', torrePremium: 1000000, residencialVista: 750000, centroComercial: 500000 },
  { month: 'Jun', torrePremium: 1200000, residencialVista: 900000, centroComercial: 600000 },
  { month: 'Jul', torrePremium: 1400000, residencialVista: 1050000, centroComercial: 700000 },
  { month: 'Ago', torrePremium: 1600000, residencialVista: 1200000, centroComercial: 800000 }
];

const projects = ['Torre Premium I', 'Residencial Vista Sur', 'Centro Comercial Plaza Central', 'Edificio Corporativo Norte', 'Complejo Residencial Este'];
const departments = ['Todos', 'Finanzas', 'Operaciones', 'Administración', 'Arquitectura', 'Mercadeo', 'Fundación'];
const periods = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Anual 2024'];

const calculateComparisonMetrics = (project1: ProjectData, project2: ProjectData): ComparisonMetrics => {
  const progressDifference = project1.progress - project2.progress;
  const budgetVariance = ((project1.spent / project1.budget) - (project2.spent / project2.budget)) * 100;
  const teamEfficiency = project1.efficiency - project2.efficiency;
  const riskComparison = (project1.risk === 'low' ? 1 : project1.risk === 'medium' ? 2 : 3) - 
                        (project2.risk === 'low' ? 1 : project2.risk === 'medium' ? 2 : 3);
  const timelineAccuracy = project1.progress - project2.progress;
  const qualityScore = project1.quality - project2.quality;
  const costPerMilestone = (project1.spent / project1.completedMilestones) - (project2.spent / project2.completedMilestones);
  const overallScore = (project1.progress + project1.efficiency + project1.quality) / 3 - 
                      (project2.progress + project2.efficiency + project2.quality) / 3;

  return {
    progressDifference,
    budgetVariance,
    teamEfficiency,
    riskComparison,
    timelineAccuracy,
    qualityScore,
    costPerMilestone,
    overallScore
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

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
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

const ReportesComparativoProyectos: React.FC = () => {
  const [selectedProject1, setSelectedProject1] = useState<string>('Torre Premium I');
  const [selectedProject2, setSelectedProject2] = useState<string>('Residencial Vista Sur');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Q2 2024');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'performance' | 'financial' | 'timeline' | 'detailed'>('overview');

  const project1 = projectsData.find(p => p.name === selectedProject1);
  const project2 = projectsData.find(p => p.name === selectedProject2);
  
  const comparisonMetrics = project1 && project2 ? calculateComparisonMetrics(project1, project2) : null;

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
      label: 'Diferencia de Progreso',
      value: comparisonMetrics ? `${comparisonMetrics.progressDifference > 0 ? '+' : ''}${comparisonMetrics.progressDifference}%` : 'N/A',
      icon: TrendingUp,
      color: comparisonMetrics?.progressDifference > 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: comparisonMetrics?.progressDifference > 0 ? 'Proyecto 1 lidera' : 'Proyecto 2 lidera'
    },
    {
      label: 'Varianza Presupuestaria',
      value: comparisonMetrics ? `${comparisonMetrics.budgetVariance > 0 ? '+' : ''}${comparisonMetrics.budgetVariance.toFixed(1)}%` : 'N/A',
      icon: DollarSign,
      color: comparisonMetrics?.budgetVariance <= 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: comparisonMetrics?.budgetVariance <= 0 ? 'Mejor control' : 'Sobre presupuesto'
    },
    {
      label: 'Eficiencia del Equipo',
      value: comparisonMetrics ? `${comparisonMetrics.teamEfficiency > 0 ? '+' : ''}${comparisonMetrics.teamEfficiency}%` : 'N/A',
      icon: Users,
      color: comparisonMetrics?.teamEfficiency > 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: comparisonMetrics?.teamEfficiency > 0 ? 'Equipo más eficiente' : 'Menor eficiencia'
    },
    {
      label: 'Puntuación General',
      value: comparisonMetrics ? `${comparisonMetrics.overallScore > 0 ? '+' : ''}${comparisonMetrics.overallScore.toFixed(1)}` : 'N/A',
      icon: Award,
      color: comparisonMetrics?.overallScore > 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: comparisonMetrics?.overallScore > 0 ? 'Mejor rendimiento' : 'Rendimiento inferior'
    },
    {
      label: 'Calidad del Proyecto',
      value: comparisonMetrics ? `${comparisonMetrics.qualityScore > 0 ? '+' : ''}${comparisonMetrics.qualityScore}%` : 'N/A',
      icon: CheckCircle,
      color: comparisonMetrics?.qualityScore > 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: comparisonMetrics?.qualityScore > 0 ? 'Mayor calidad' : 'Calidad inferior'
    },
    {
      label: 'Nivel de Riesgo',
      value: comparisonMetrics ? (comparisonMetrics.riskComparison < 0 ? 'Menor' : comparisonMetrics.riskComparison > 0 ? 'Mayor' : 'Igual') : 'N/A',
      icon: AlertCircle,
      color: comparisonMetrics?.riskComparison <= 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: comparisonMetrics?.riskComparison <= 0 ? 'Riesgo controlado' : 'Mayor riesgo'
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
                <GitCompare className="text-white h-6 w-6" />
              </div>
              Comparativo de Proyectos - Análisis Detallado
            </h1>
            <p className="text-gray-600">Análisis comparativo completo entre proyectos con métricas avanzadas</p>
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

      {/* Project Selection */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Scale className="text-[#8cb43a]" />
            Selección de Proyectos para Comparación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8cb43a] rounded-full"></div>
                <label className="font-medium">Proyecto 1</label>
              </div>
              <Select value={selectedProject1} onValueChange={setSelectedProject1}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Proyecto 1" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#3b82f6] rounded-full"></div>
                <label className="font-medium">Proyecto 2</label>
              </div>
              <Select value={selectedProject2} onValueChange={setSelectedProject2}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Proyecto 2" />
                </SelectTrigger>
                <SelectContent>
                  {projects.filter(p => p !== selectedProject1).map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
                    {kpi.trend.includes('lidera') || kpi.trend.includes('Mejor') || kpi.trend.includes('Mayor') ? 
                      <TrendingUp className="h-3 w-3 text-green-500" /> : 
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    }
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
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Rendimiento
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financiero
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Cronología
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Comparison Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart3 className="text-[#8cb43a]" />
                  Comparación de Métricas Clave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="torrePremium" fill="#8cb43a" name="Torre Premium I" />
                    <Bar dataKey="residencialVista" fill="#3b82f6" name="Residencial Vista Sur" />
                    <Bar dataKey="centroComercial" fill="#ef4444" name="Centro Comercial" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

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
                  <RechartsBarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="low" stackId="a" fill="#10b981" name="Bajo Riesgo" />
                    <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Riesgo Medio" />
                    <Bar dataKey="high" stackId="a" fill="#ef4444" name="Alto Riesgo" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Project Details Comparison */}
          {project1 && project2 && (
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <GitCompare className="text-[#8cb43a]" />
                  Detalles de Comparación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Project 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#8cb43a] rounded-full"></div>
                      <h3 className="font-semibold text-lg">{project1.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progreso:</span>
                        <span className="font-medium">{project1.progress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Presupuesto:</span>
                        <span className="font-medium">{formatCurrency(project1.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gastado:</span>
                        <span className="font-medium">{formatCurrency(project1.spent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipo:</span>
                        <span className="font-medium">{project1.teamSize} personas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Eficiencia:</span>
                        <span className="font-medium">{project1.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calidad:</span>
                        <span className="font-medium">{project1.quality}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI:</span>
                        <span className="font-medium">{project1.roi}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#3b82f6] rounded-full"></div>
                      <h3 className="font-semibold text-lg">{project2.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progreso:</span>
                        <span className="font-medium">{project2.progress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Presupuesto:</span>
                        <span className="font-medium">{formatCurrency(project2.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gastado:</span>
                        <span className="font-medium">{formatCurrency(project2.spent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipo:</span>
                        <span className="font-medium">{project2.teamSize} personas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Eficiencia:</span>
                        <span className="font-medium">{project2.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calidad:</span>
                        <span className="font-medium">{project2.quality}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI:</span>
                        <span className="font-medium">{project2.roi}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Radar Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Target className="text-[#8cb43a]" />
                  Análisis de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Torre Premium I" dataKey="torrePremium" stroke="#8cb43a" fill="#8cb43a" fillOpacity={0.3} />
                    <Radar name="Residencial Vista Sur" dataKey="residencialVista" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Centro Comercial" dataKey="centroComercial" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Efficiency Comparison */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Activity className="text-[#8cb43a]" />
                  Comparación de Eficiencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="torrePremium" fill="#8cb43a" name="Torre Premium I" />
                    <Line type="monotone" dataKey="residencialVista" stroke="#3b82f6" strokeWidth={2} name="Residencial Vista Sur" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Financial Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Comparison */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <DollarSign className="text-[#8cb43a]" />
                  Comparación de Presupuestos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsAreaChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Monto']} />
                    <Legend />
                    <Area type="monotone" dataKey="torrePremium" fill="#8cb43a" fillOpacity={0.6} stroke="#8cb43a" name="Torre Premium I" />
                    <Area type="monotone" dataKey="residencialVista" fill="#3b82f6" fillOpacity={0.6} stroke="#3b82f6" name="Residencial Vista Sur" />
                    <Area type="monotone" dataKey="centroComercial" fill="#ef4444" fillOpacity={0.6} stroke="#ef4444" name="Centro Comercial" />
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* ROI Comparison */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#8cb43a]" />
                  Análisis de ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={performanceData.filter(d => d.metric === 'ROI')}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="torrePremium" fill="#8cb43a" name="Torre Premium I" />
                    <Bar dataKey="residencialVista" fill="#3b82f6" name="Residencial Vista Sur" />
                    <Bar dataKey="centroComercial" fill="#ef4444" name="Centro Comercial" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {/* Timeline Analysis */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <LineChart className="text-[#8cb43a]" />
                Evolución Temporal de Proyectos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsLineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="torrePremium" stroke="#8cb43a" strokeWidth={3} name="Torre Premium I" />
                  <Line type="monotone" dataKey="residencialVista" stroke="#3b82f6" strokeWidth={3} name="Residencial Vista Sur" />
                  <Line type="monotone" dataKey="centroComercial" stroke="#ef4444" strokeWidth={3} name="Centro Comercial" />
                </RechartsLineChart>
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
                Tabla Comparativa Detallada
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
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Gastado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Equipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Eficiencia</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Calidad</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">ROI</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Riesgo</th>
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
                        <td className="py-3 px-4">{formatCurrency(project.budget)}</td>
                        <td className="py-3 px-4">{formatCurrency(project.spent)}</td>
                        <td className="py-3 px-4">{project.teamSize} personas</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === 'completed' ? 'Completado' :
                             project.status === 'in-progress' ? 'En Progreso' :
                             project.status === 'delayed' ? 'Retrasado' : 'En Espera'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{project.efficiency}%</td>
                        <td className="py-3 px-4">{project.quality}%</td>
                        <td className="py-3 px-4">{project.roi}x</td>
                        <td className="py-3 px-4">
                          <Badge className={getRiskColor(project.risk)}>
                            {project.risk === 'low' ? 'Bajo' :
                             project.risk === 'medium' ? 'Medio' : 'Alto'}
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

export default ReportesComparativoProyectos; 