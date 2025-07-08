import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  Building, 
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
  UserCheck,
  Clipboard,
  Settings,
  Search,
  Briefcase,
  FileCheck,
  PhoneCall,
  Mail as MailIcon
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

interface AdministrativeActivity {
  id: string;
  date: string;
  concept: string;
  type: 'hr' | 'documentation' | 'office' | 'supplier' | 'compliance' | 'communication' | 'planning' | 'coordination';
  category: 'personnel' | 'documents' | 'office_management' | 'suppliers' | 'legal' | 'communication' | 'planning' | 'coordination';
  progress: number;
  description: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  reference: string;
  tags: string[];
  notes: string;
  department: string;
  documents: string[];
  compliance_score: number;
}

interface AdministrativeMetrics {
  totalActivities: number;
  completedActivities: number;
  efficiencyRate: number;
  complianceScore: number;
  documentAccuracy: number;
  hrSatisfaction: number;
  supplierPerformance: number;
  officeEfficiency: number;
  communicationEffectiveness: number;
  riskLevel: number;
}

// Time series data for administrative trends
const administrativeTrendData = [
  { month: 'Ene', activities: 12, completed: 10, efficiency: 83, compliance: 95, satisfaction: 88 },
  { month: 'Feb', activities: 15, completed: 13, efficiency: 87, compliance: 96, satisfaction: 90 },
  { month: 'Mar', activities: 18, completed: 16, efficiency: 89, compliance: 94, satisfaction: 92 },
  { month: 'Abr', activities: 20, completed: 18, efficiency: 90, compliance: 97, satisfaction: 94 },
  { month: 'May', activities: 22, completed: 20, efficiency: 91, compliance: 98, satisfaction: 95 },
  { month: 'Jun', activities: 25, completed: 23, efficiency: 92, compliance: 99, satisfaction: 96 },
  { month: 'Jul', activities: 28, completed: 26, efficiency: 93, compliance: 99, satisfaction: 97 },
  { month: 'Ago', activities: 30, completed: 28, efficiency: 93, compliance: 100, satisfaction: 98 }
];

// Category distribution data
const categoryData = [
  { name: 'Gestión de Personal', value: 35, fill: '#10b981' },
  { name: 'Documentación', value: 25, fill: '#3b82f6' },
  { name: 'Administración de Oficina', value: 20, fill: '#f59e0b' },
  { name: 'Gestión de Proveedores', value: 12, fill: '#ef4444' },
  { name: 'Cumplimiento Legal', value: 5, fill: '#8b5cf6' },
  { name: 'Comunicación', value: 3, fill: '#6b7280' }
];

// Activity breakdown
const activityBreakdown = [
  { category: 'Gestión de Personal', count: 10, percentage: 33.3 },
  { category: 'Documentación', count: 8, percentage: 26.7 },
  { category: 'Administración de Oficina', count: 6, percentage: 20.0 },
  { category: 'Gestión de Proveedores', count: 4, percentage: 13.3 },
  { category: 'Cumplimiento Legal', count: 2, percentage: 6.7 }
];

// Team performance
const teamPerformance = [
  { member: 'Laura Sánchez', activities: 12, completed: 11, efficiency: 92, satisfaction: 95 },
  { member: 'Miguel Torres', activities: 10, completed: 9, efficiency: 90, satisfaction: 93 },
  { member: 'Carmen Ruiz', activities: 8, completed: 8, efficiency: 100, satisfaction: 98 }
];

// Sample administrative activities data
const administrativeActivities: AdministrativeActivity[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Gestión de personal - Contrataciones',
    type: 'hr',
    category: 'personnel',
    progress: 80,
    description: 'Proceso de contratación de nuevos empleados para el departamento de operaciones',
    responsible: 'Laura Sánchez',
    status: 'in_progress',
    priority: 'high',
    reference: 'ADM-2024-001',
    tags: ['personal', 'contratación', 'recursos humanos'],
    notes: 'Entrevistas programadas para la próxima semana',
    department: 'Recursos Humanos',
    documents: ['CVs', 'Contratos', 'Evaluaciones'],
    compliance_score: 95
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Control de documentos legales',
    type: 'documentation',
    category: 'documents',
    progress: 100,
    description: 'Revisión y actualización de documentos legales de la empresa',
    responsible: 'Miguel Torres',
    status: 'completed',
    priority: 'medium',
    reference: 'ADM-2024-002',
    tags: ['documentos', 'legales', 'cumplimiento'],
    notes: 'Todos los documentos actualizados y archivados',
    department: 'Legal',
    documents: ['Contratos', 'Permisos', 'Licencias'],
    compliance_score: 98
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Gestión de proveedores',
    type: 'supplier',
    category: 'suppliers',
    progress: 90,
    description: 'Evaluación y renovación de contratos con proveedores',
    responsible: 'Carmen Ruiz',
    status: 'in_progress',
    priority: 'high',
    reference: 'ADM-2024-003',
    tags: ['proveedores', 'contratos', 'evaluación'],
    notes: '2 contratos pendientes de renovación',
    department: 'Compras',
    documents: ['Contratos', 'Evaluaciones', 'Propuestas'],
    compliance_score: 92
  }
];

const calculateAdministrativeMetrics = (activities: AdministrativeActivity[]): AdministrativeMetrics => {
  const total = activities.length;
  const completed = activities.filter(a => a.status === 'completed').length;
  const avgCompliance = activities.reduce((sum, a) => sum + a.compliance_score, 0) / total;
  const avgProgress = activities.reduce((sum, a) => sum + a.progress, 0) / total;

  return {
    totalActivities: total,
    completedActivities: completed,
    efficiencyRate: Math.round(avgProgress),
    complianceScore: Math.round(avgCompliance),
    documentAccuracy: 96,
    hrSatisfaction: 94,
    supplierPerformance: 89,
    officeEfficiency: 91,
    communicationEffectiveness: 93,
    riskLevel: 8
  };
};

const getTypeColor = (type: string) => {
  const colors = {
    hr: 'bg-blue-100 text-blue-800',
    documentation: 'bg-green-100 text-green-800',
    office: 'bg-yellow-100 text-yellow-800',
    supplier: 'bg-purple-100 text-purple-800',
    compliance: 'bg-red-100 text-red-800',
    communication: 'bg-indigo-100 text-indigo-800',
    planning: 'bg-pink-100 text-pink-800',
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
    personnel: 'bg-blue-100 text-blue-800',
    documents: 'bg-green-100 text-green-800',
    office_management: 'bg-yellow-100 text-yellow-800',
    suppliers: 'bg-purple-100 text-purple-800',
    legal: 'bg-red-100 text-red-800',
    communication: 'bg-indigo-100 text-indigo-800',
    planning: 'bg-pink-100 text-pink-800',
    coordination: 'bg-gray-100 text-gray-800'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

const DepartamentoAdministracionReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredActivities = administrativeActivities.filter(activity => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Gestión de Personal' && activity.category === 'personnel') ||
      (selectedCategory === 'Documentación' && activity.category === 'documents') ||
      (selectedCategory === 'Administración de Oficina' && activity.category === 'office_management') ||
      (selectedCategory === 'Gestión de Proveedores' && activity.category === 'suppliers') ||
      (selectedCategory === 'Cumplimiento Legal' && activity.category === 'legal') ||
      (selectedCategory === 'Comunicación' && activity.category === 'communication') ||
      (selectedCategory === 'Planificación' && activity.category === 'planning') ||
      (selectedCategory === 'Coordinación' && activity.category === 'coordination');
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

  const metrics = calculateAdministrativeMetrics(filteredActivities);

  const kpiCards = [
    {
      label: 'Actividades Totales',
      value: metrics.totalActivities,
      icon: Building,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+3 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Actividades Completadas',
      value: metrics.completedActivities,
      icon: CheckCircle,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+2 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Eficiencia Administrativa',
      value: `${metrics.efficiencyRate}%`,
      icon: TrendingUp,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: '+2% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Cumplimiento Legal',
      value: `${metrics.complianceScore}%`,
      icon: FileCheck,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+1% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Precisión Documental',
      value: `${metrics.documentAccuracy}%`,
      icon: Clipboard,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: 'Excelente',
      trendDirection: 'neutral'
    },
    {
      label: 'Satisfacción RRHH',
      value: `${metrics.hrSatisfaction}%`,
      icon: UserCheck,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+3% vs mes anterior',
      trendDirection: 'up'
    }
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const years = ['2023', '2024', '2025'];
  const categories = ['Todos', 'Gestión de Personal', 'Documentación', 'Administración de Oficina', 'Gestión de Proveedores', 'Cumplimiento Legal', 'Comunicación', 'Planificación', 'Coordinación'];
  const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <Building className="text-white h-6 w-6" />
              </div>
              Administración - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis administrativo completo y gestión de actividades del departamento</p>
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
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Análisis
          </TabsTrigger>
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Actividades
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Administrative Trends Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#8cb43a]" />
                  Tendencias Administrativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={administrativeTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="activities" stroke="#8cb43a" strokeWidth={2} name="Actividades" />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completadas" />
                    <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="Eficiencia" />
                    <Line type="monotone" dataKey="compliance" stroke="#f59e0b" strokeWidth={2} name="Cumplimiento" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <PieChart className="text-[#8cb43a]" />
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
                <LineChart className="text-[#8cb43a]" />
                Análisis de Tendencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsAreaChart data={administrativeTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="activities" stackId="1" stroke="#8cb43a" fill="#8cb43a" fillOpacity={0.6} />
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
            {/* Activity Breakdown */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart2 className="text-[#8cb43a]" />
                  Desglose de Actividades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={activityBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8cb43a" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Users className="text-[#8cb43a]" />
                  Rendimiento del Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{member.member}</p>
                        <p className="text-sm text-gray-600">{member.activities} actividades</p>
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
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          {/* Movements Content */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <List className="text-[#8cb43a]" />
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
                            {activity.type === 'hr' ? 'RRHH' :
                             activity.type === 'documentation' ? 'Documentación' :
                             activity.type === 'office' ? 'Oficina' :
                             activity.type === 'supplier' ? 'Proveedores' :
                             activity.type === 'compliance' ? 'Cumplimiento' :
                             activity.type === 'communication' ? 'Comunicación' :
                             activity.type === 'planning' ? 'Planificación' : 'Coordinación'}
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
                            <BuildingIcon className="h-3 w-3" />
                            {activity.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileCheck className="h-3 w-3" />
                            {activity.compliance_score}% cumplimiento
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
                  <Activity className="text-[#8cb43a]" />
                  Métricas de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Rendimiento de Proveedores</span>
                    <span className="text-lg font-bold text-green-600">{metrics.supplierPerformance}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Eficiencia de Oficina</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.officeEfficiency}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Efectividad de Comunicación</span>
                    <span className="text-lg font-bold text-orange-600">{metrics.communicationEffectiveness}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Nivel de Riesgo</span>
                    <span className="text-lg font-bold text-red-600">{metrics.riskLevel}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Accuracy */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Clipboard className="text-[#8cb43a]" />
                  Precisión Documental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Precisión Actual</span>
                    <span className="text-lg font-bold text-[#8cb43a]">{metrics.documentAccuracy}%</span>
                  </div>
                  <Progress value={metrics.documentAccuracy} className="w-full" />
                  <div className="text-xs text-gray-500">
                    {metrics.documentAccuracy >= 95 ? 'Excelente precisión' :
                     metrics.documentAccuracy >= 85 ? 'Buena precisión' :
                     metrics.documentAccuracy >= 75 ? 'Precisión moderada' : 'Baja precisión'}
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

export default DepartamentoAdministracionReporteInterno; 