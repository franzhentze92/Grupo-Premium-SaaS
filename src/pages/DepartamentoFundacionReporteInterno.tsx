import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  Heart, 
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
  Search,
  Share,
  Heart as HeartIcon,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  Target as TargetIcon,
  DollarSign,
  BarChart,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon2,
  Eye as EyeIcon,
  MousePointer,
  MousePointerClick,
  MousePointer2,
  Gift,
  HandHeart,
  Users as UsersIcon3,
  BookOpen,
  GraduationCap,
  Home,
  Car,
  Utensils,
  Baby,
  School,
  Hospital,
  Shield,
  Star,
  Smile
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

interface FoundationProgram {
  id: string;
  date: string;
  concept: string;
  type: 'education' | 'health' | 'housing' | 'food' | 'transport' | 'social_services' | 'emergency' | 'community_development';
  category: 'children' | 'youth' | 'adults' | 'elderly' | 'families' | 'communities' | 'emergency_relief' | 'sustainable_development';
  budget: number;
  description: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  reference: string;
  tags: string[];
  notes: string;
  location: string;
  beneficiaries: number;
  volunteers: number;
  donations: number;
  impact_score: number;
  completion_rate: number;
  community_feedback: number;
}

interface FoundationMetrics {
  totalPrograms: number;
  activePrograms: number;
  totalBeneficiaries: number;
  totalVolunteers: number;
  totalDonations: number;
  averageImpactScore: number;
  averageCompletionRate: number;
  averageCommunityFeedback: number;
  emergencyReliefPrograms: number;
  sustainableDevelopmentPrograms: number;
  communityOutreach: number;
  volunteerEngagement: number;
}

// Time series data for foundation trends
const foundationTrendData = [
  { month: 'Ene', programs: 12, beneficiaries: 850, volunteers: 45, donations: 25000000, impact: 4.2 },
  { month: 'Feb', programs: 15, beneficiaries: 920, volunteers: 52, donations: 28000000, impact: 4.3 },
  { month: 'Mar', programs: 18, beneficiaries: 1100, volunteers: 58, donations: 32000000, impact: 4.4 },
  { month: 'Abr', programs: 20, beneficiaries: 1250, volunteers: 65, donations: 35000000, impact: 4.5 },
  { month: 'May', programs: 22, beneficiaries: 1400, volunteers: 72, donations: 38000000, impact: 4.6 },
  { month: 'Jun', programs: 25, beneficiaries: 1550, volunteers: 78, donations: 42000000, impact: 4.7 },
  { month: 'Jul', programs: 28, beneficiaries: 1700, volunteers: 85, donations: 45000000, impact: 4.8 },
  { month: 'Ago', programs: 30, beneficiaries: 1850, volunteers: 92, donations: 48000000, impact: 4.9 }
];

// Category distribution data
const categoryData = [
  { name: 'Educación', value: 30, fill: '#1e3269' },
  { name: 'Salud', value: 25, fill: '#fbbf24' },
  { name: 'Vivienda', value: 20, fill: '#eab308' },
  { name: 'Alimentación', value: 15, fill: '#ef4444' },
  { name: 'Servicios Sociales', value: 8, fill: '#8b5cf6' },
  { name: 'Desarrollo Comunitario', value: 2, fill: '#6b7280' }
];

// Program breakdown
const programBreakdown = [
  { category: 'Educación', count: 9, percentage: 30.0 },
  { category: 'Salud', count: 7, percentage: 23.3 },
  { category: 'Vivienda', count: 6, percentage: 20.0 },
  { category: 'Alimentación', count: 4, percentage: 13.3 },
  { category: 'Servicios Sociales', count: 3, percentage: 10.0 },
  { category: 'Desarrollo Comunitario', count: 1, percentage: 3.3 }
];

// Team performance
const teamPerformance = [
  { member: 'Ana Rodríguez', programs: 8, completed: 7, efficiency: 88, impact: 4.5 },
  { member: 'Carlos Mendoza', programs: 10, completed: 9, efficiency: 90, impact: 4.8 },
  { member: 'María López', programs: 7, completed: 7, efficiency: 100, impact: 4.9 },
  { member: 'Luis Torres', programs: 5, completed: 5, efficiency: 100, impact: 4.7 }
];

// Sample foundation programs data
const foundationPrograms: FoundationProgram[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Programa de Becas Educativas - Niños de Bajos Recursos',
    type: 'education',
    category: 'children',
    budget: 25000000,
    description: 'Programa integral de becas para niños de familias vulnerables',
    responsible: 'Ana Rodríguez',
    status: 'completed',
    priority: 'high',
    reference: 'FUN-2024-001',
    tags: ['educación', 'becas', 'niños', 'vulnerabilidad'],
    notes: 'Programa exitoso, 50 niños beneficiados',
    location: 'Barrios populares de Bogotá',
    beneficiaries: 50,
    volunteers: 12,
    donations: 30000000,
    impact_score: 4.8,
    completion_rate: 95,
    community_feedback: 4.7
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Clínica Móvil - Atención Médica Gratuita',
    type: 'health',
    category: 'families',
    budget: 18000000,
    description: 'Clínica móvil para atención médica gratuita en zonas rurales',
    responsible: 'Carlos Mendoza',
    status: 'in_progress',
    priority: 'high',
    reference: 'FUN-2024-002',
    tags: ['salud', 'clínica móvil', 'atención médica', 'zonas rurales'],
    notes: 'En proceso, excelente respuesta de la comunidad',
    location: 'Zonas rurales de Cundinamarca',
    beneficiaries: 120,
    volunteers: 8,
    donations: 20000000,
    impact_score: 4.6,
    completion_rate: 75,
    community_feedback: 4.8
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Construcción de Viviendas de Emergencia',
    type: 'housing',
    category: 'families',
    budget: 35000000,
    description: 'Construcción de viviendas temporales para familias afectadas por desastres',
    responsible: 'María López',
    status: 'completed',
    priority: 'high',
    reference: 'FUN-2024-003',
    tags: ['vivienda', 'emergencia', 'desastres', 'construcción'],
    notes: 'Proyecto completado exitosamente',
    location: 'Zona de desastre en Antioquia',
    beneficiaries: 25,
    volunteers: 20,
    donations: 40000000,
    impact_score: 4.9,
    completion_rate: 100,
    community_feedback: 4.9
  },
  {
    id: '4',
    date: '2024-05-12',
    concept: 'Programa de Alimentación Escolar',
    type: 'food',
    category: 'children',
    budget: 12000000,
    description: 'Programa de alimentación nutritiva para niños en escuelas públicas',
    responsible: 'Luis Torres',
    status: 'in_progress',
    priority: 'medium',
    reference: 'FUN-2024-004',
    tags: ['alimentación', 'escolar', 'nutrición', 'niños'],
    notes: 'Programa en desarrollo, buena aceptación',
    location: 'Escuelas públicas de Cali',
    beneficiaries: 200,
    volunteers: 15,
    donations: 15000000,
    impact_score: 4.4,
    completion_rate: 60,
    community_feedback: 4.5
  },
  {
    id: '5',
    date: '2024-05-11',
    concept: 'Transporte Escolar para Zonas Rurales',
    type: 'transport',
    category: 'children',
    budget: 15000000,
    description: 'Servicio de transporte escolar para niños de zonas rurales',
    responsible: 'Ana Rodríguez',
    status: 'pending',
    priority: 'medium',
    reference: 'FUN-2024-005',
    tags: ['transporte', 'escolar', 'zonas rurales', 'acceso'],
    notes: 'Programa programado para próximo mes',
    location: 'Zonas rurales de Boyacá',
    beneficiaries: 80,
    volunteers: 6,
    donations: 18000000,
    impact_score: 4.3,
    completion_rate: 0,
    community_feedback: 0
  }
];

const calculateFoundationMetrics = (programs: FoundationProgram[]): FoundationMetrics => {
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'in_progress').length;
  const totalBeneficiaries = programs.reduce((acc, p) => acc + p.beneficiaries, 0);
  const totalVolunteers = programs.reduce((acc, p) => acc + p.volunteers, 0);
  const totalDonations = programs.reduce((acc, p) => acc + p.donations, 0);
  const averageImpactScore = programs.length > 0 ? programs.reduce((acc, p) => acc + p.impact_score, 0) / programs.length : 0;
  const averageCompletionRate = programs.length > 0 ? programs.reduce((acc, p) => acc + p.completion_rate, 0) / programs.length : 0;
  const averageCommunityFeedback = programs.length > 0 ? programs.reduce((acc, p) => acc + p.community_feedback, 0) / programs.length : 0;
  const emergencyReliefPrograms = programs.filter(p => p.type === 'housing' || p.category === 'emergency_relief').length;
  const sustainableDevelopmentPrograms = programs.filter(p => p.type === 'community_development' || p.category === 'sustainable_development').length;
  const communityOutreach = totalBeneficiaries;
  const volunteerEngagement = totalVolunteers;

  return {
    totalPrograms,
    activePrograms,
    totalBeneficiaries,
    totalVolunteers,
    totalDonations,
    averageImpactScore,
    averageCompletionRate,
    averageCommunityFeedback,
    emergencyReliefPrograms,
    sustainableDevelopmentPrograms,
    communityOutreach,
    volunteerEngagement
  };
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'education': return 'bg-blue-100 text-blue-800';
    case 'health': return 'bg-green-100 text-green-800';
    case 'housing': return 'bg-purple-100 text-purple-800';
    case 'food': return 'bg-orange-100 text-orange-800';
    case 'transport': return 'bg-red-100 text-red-800';
    case 'social_services': return 'bg-pink-100 text-pink-800';
    case 'emergency': return 'bg-yellow-100 text-yellow-800';
    case 'community_development': return 'bg-indigo-100 text-indigo-800';
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
    case 'children': return 'bg-blue-100 text-blue-800';
    case 'youth': return 'bg-green-100 text-green-800';
    case 'adults': return 'bg-purple-100 text-purple-800';
    case 'elderly': return 'bg-orange-100 text-orange-800';
    case 'families': return 'bg-pink-100 text-pink-800';
    case 'communities': return 'bg-indigo-100 text-indigo-800';
    case 'emergency_relief': return 'bg-red-100 text-red-800';
    case 'sustainable_development': return 'bg-emerald-100 text-emerald-800';
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

const DepartamentoFundacionReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredPrograms = foundationPrograms.filter(program => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Niños' && program.category === 'children') ||
      (selectedCategory === 'Jóvenes' && program.category === 'youth') ||
      (selectedCategory === 'Adultos' && program.category === 'adults') ||
      (selectedCategory === 'Adultos Mayores' && program.category === 'elderly') ||
      (selectedCategory === 'Familias' && program.category === 'families') ||
      (selectedCategory === 'Comunidades' && program.category === 'communities') ||
      (selectedCategory === 'Ayuda de Emergencia' && program.category === 'emergency_relief') ||
      (selectedCategory === 'Desarrollo Sostenible' && program.category === 'sustainable_development');
    const matchesPaymentMethod = selectedPaymentMethod === 'Todos' || 
      (selectedPaymentMethod === 'Efectivo' && program.status === 'completed') ||
      (selectedPaymentMethod === 'Transferencia' && program.status === 'in_progress') ||
      (selectedPaymentMethod === 'Tarjeta de Crédito' && program.status === 'pending') ||
      (selectedPaymentMethod === 'Cheque' && program.status === 'cancelled');
    const matchesSearch = !searchTerm || 
      program.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPaymentMethod && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPaymentMethod('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedPaymentMethod !== 'Todos' || searchTerm;

  const metrics = calculateFoundationMetrics(filteredPrograms);

  const kpiCards = [
    {
      label: 'Programas Totales',
      value: metrics.totalPrograms,
      icon: Heart,
      color: 'bg-red-50 border-red-200 text-red-700',
      trend: '+3 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Programas Activos',
      value: metrics.activePrograms,
      icon: Activity,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+1 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Beneficiarios',
      value: metrics.totalBeneficiaries.toLocaleString(),
      icon: Users,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: '+15% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Voluntarios',
      value: metrics.totalVolunteers,
      icon: UsersIcon,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+8 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Puntuación de Impacto',
      value: `${metrics.averageImpactScore.toFixed(1)}/5.0`,
      icon: Star,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: 'Excelente',
      trendDirection: 'neutral'
    },
    {
      label: 'Donaciones',
      value: formatCurrency(metrics.totalDonations),
      icon: Gift,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+12% vs mes anterior',
      trendDirection: 'up'
    }
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const years = ['2023', '2024', '2025'];
  const categories = ['Todos', 'Niños', 'Jóvenes', 'Adultos', 'Adultos Mayores', 'Familias', 'Comunidades', 'Ayuda de Emergencia', 'Desarrollo Sostenible'];
  const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <Heart className="text-white h-6 w-6" />
              </div>
              Fundación - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis de programas sociales y gestión de impacto del departamento</p>
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
                placeholder="Buscar programas..."
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
            Programas
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Foundation Trends Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Tendencias de la Fundación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={foundationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="programs" stroke="#1e3269" strokeWidth={2} name="Programas" />
                    <Line type="monotone" dataKey="beneficiaries" stroke="#10b981" strokeWidth={2} name="Beneficiarios" />
                    <Line type="monotone" dataKey="volunteers" stroke="#3b82f6" strokeWidth={2} name="Voluntarios" />
                    <Line type="monotone" dataKey="impact" stroke="#f59e0b" strokeWidth={2} name="Impacto" />
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
                <RechartsAreaChart data={foundationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="programs" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="beneficiaries" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="volunteers" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Analysis Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program Breakdown */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart2 className="text-[#1e3269]" />
                  Desglose de Programas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={programBreakdown}>
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
                        <p className="text-sm text-gray-600">{member.programs} programas</p>
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
                Lista de Programas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPrograms.map(program => (
                  <div key={program.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm font-medium text-gray-600">{program.date}</div>
                          <Badge className={getTypeColor(program.type)}>
                            {program.type === 'education' ? 'Educación' :
                             program.type === 'health' ? 'Salud' :
                             program.type === 'housing' ? 'Vivienda' :
                             program.type === 'food' ? 'Alimentación' :
                             program.type === 'transport' ? 'Transporte' :
                             program.type === 'social_services' ? 'Servicios Sociales' :
                             program.type === 'emergency' ? 'Emergencia' : 'Desarrollo Comunitario'}
                          </Badge>
                          <Badge className={getStatusColor(program.status)}>
                            {program.status === 'completed' ? 'Completado' :
                             program.status === 'in_progress' ? 'En Progreso' :
                             program.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{program.concept}</h3>
                        <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {program.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {program.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {program.beneficiaries} beneficiarios
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
            {/* Impact Metrics */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Activity className="text-[#1e3269]" />
                  Métricas de Impacto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Puntuación de Impacto</span>
                    <span className="text-lg font-bold text-green-600">{metrics.averageImpactScore.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Tasa de Finalización</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.averageCompletionRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Feedback Comunitario</span>
                    <span className="text-lg font-bold text-orange-600">{metrics.averageCommunityFeedback.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Alcance Comunitario</span>
                    <span className="text-lg font-bold text-red-600">{metrics.communityOutreach.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donations Analysis */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Gift className="text-[#1e3269]" />
                  Análisis de Donaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Total Donaciones</span>
                    <span className="text-lg font-bold text-[#1e3269]">{formatCurrency(metrics.totalDonations)}</span>
                  </div>
                  <Progress value={Math.min((metrics.totalDonations / 50000000) * 100, 100)} className="w-full" />
                  <div className="text-xs text-gray-500">
                    {metrics.totalDonations >= 45000000 ? 'Excelente recaudación' :
                     metrics.totalDonations >= 35000000 ? 'Buena recaudación' :
                     metrics.totalDonations >= 25000000 ? 'Recaudación moderada' : 'Recaudación baja'}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-gray-700">Voluntarios Activos</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.volunteerEngagement}</span>
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

export default DepartamentoFundacionReporteInterno; 