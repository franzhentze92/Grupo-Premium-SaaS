import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  ShoppingCart, 
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
  Building,
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
  Smile,
  CreditCard,
  Receipt,
  Package,
  Truck,
  Store,
  ShoppingBag,
  Tag,
  Percent as PercentIcon,
  TrendingUp as TrendingUpIcon2,
  Users as UsersIcon4,
  Building as BuildingIcon2,
  Home as HomeIcon,
  Car as CarIcon,
  Briefcase,
  Handshake,
  PhoneCall,
  Mail as MailIcon,
  Calendar as CalendarIcon2,
  Clock,
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
  UserSearch,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  UserCog as UserCogIcon,
  UserSearch as UserSearchIcon
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

interface SalesOpportunity {
  id: string;
  date: string;
  concept: string;
  type: 'residential' | 'commercial' | 'industrial' | 'land' | 'investment' | 'rental' | 'consulting' | 'development';
  category: 'prospect' | 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost' | 'follow_up';
  value: number;
  description: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  reference: string;
  tags: string[];
  notes: string;
  client: string;
  contact_person: string;
  contact_phone: string;
  contact_email: string;
  probability: number;
  expected_close_date: string;
  sales_stage: string;
  commission_rate: number;
  deal_size: 'small' | 'medium' | 'large' | 'enterprise';
}

interface SalesMetrics {
  totalOpportunities: number;
  activeOpportunities: number;
  totalValue: number;
  closedWonValue: number;
  closedLostValue: number;
  averageDealSize: number;
  winRate: number;
  averageSalesCycle: number;
  conversionRate: number;
  pipelineValue: number;
  quotaAttainment: number;
  averageCommission: number;
}

// Time series data for sales trends
const salesTrendData = [
  { month: 'Ene', opportunities: 45, value: 850000000, closed_won: 320000000, conversion_rate: 68, avg_cycle: 45 },
  { month: 'Feb', opportunities: 52, value: 920000000, closed_won: 380000000, conversion_rate: 71, avg_cycle: 42 },
  { month: 'Mar', opportunities: 58, value: 1100000000, closed_won: 450000000, conversion_rate: 73, avg_cycle: 40 },
  { month: 'Abr', opportunities: 65, value: 1250000000, closed_won: 520000000, conversion_rate: 75, avg_cycle: 38 },
  { month: 'May', opportunities: 72, value: 1400000000, closed_won: 580000000, conversion_rate: 76, avg_cycle: 35 },
  { month: 'Jun', opportunities: 78, value: 1550000000, closed_won: 650000000, conversion_rate: 78, avg_cycle: 33 },
  { month: 'Jul', opportunities: 85, value: 1700000000, closed_won: 720000000, conversion_rate: 79, avg_cycle: 32 },
  { month: 'Ago', opportunities: 92, value: 1850000000, closed_won: 780000000, conversion_rate: 81, avg_cycle: 30 }
];

// Category distribution data
const categoryData = [
  { name: 'Residencial', value: 40, fill: '#1e3269' },
  { name: 'Comercial', value: 30, fill: '#fbbf24' },
  { name: 'Industrial', value: 15, fill: '#eab308' },
  { name: 'Terrenos', value: 10, fill: '#ef4444' },
  { name: 'Inversión', value: 3, fill: '#8b5cf6' },
  { name: 'Consultoría', value: 2, fill: '#6b7280' }
];

// Sales breakdown
const salesBreakdown = [
  { category: 'Residencial', count: 37, percentage: 40.2 },
  { category: 'Comercial', count: 28, percentage: 30.4 },
  { category: 'Industrial', count: 14, percentage: 15.2 },
  { category: 'Terrenos', count: 9, percentage: 9.8 },
  { category: 'Inversión', count: 3, percentage: 3.3 },
  { category: 'Consultoría', count: 1, percentage: 1.1 }
];

// Team performance
const teamPerformance = [
  { member: 'Carlos Ramírez', opportunities: 25, closed: 18, efficiency: 72, value: 450000000 },
  { member: 'Ana Morales', opportunities: 22, closed: 17, efficiency: 77, value: 380000000 },
  { member: 'Luis Fernández', opportunities: 20, closed: 15, efficiency: 75, value: 320000000 },
  { member: 'María Jiménez', opportunities: 18, closed: 14, efficiency: 78, value: 280000000 },
  { member: 'Roberto Silva', opportunities: 15, closed: 12, efficiency: 80, value: 220000000 }
];

// Sample sales opportunities data
const salesOpportunities: SalesOpportunity[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Torre Residencial Premium - Apartamentos de Lujo',
    type: 'residential',
    category: 'negotiation',
    value: 850000000,
    description: 'Venta de 20 apartamentos de lujo en Torre Premium',
    responsible: 'Carlos Ramírez',
    status: 'in_progress',
    priority: 'high',
    reference: 'VENT-2024-001',
    tags: ['residencial', 'lujo', 'torre premium', 'apartamentos'],
    notes: 'Negociación avanzada, cliente muy interesado',
    client: 'Inversiones del Norte S.A.',
    contact_person: 'Dr. Roberto Mendoza',
    contact_phone: '+57 300 123 4567',
    contact_email: 'rmendoza@inversionesdelnorte.com',
    probability: 85,
    expected_close_date: '2024-06-30',
    sales_stage: 'Negociación Final',
    commission_rate: 3.5,
    deal_size: 'enterprise'
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Centro Comercial Plaza Central - Locales Comerciales',
    type: 'commercial',
    category: 'proposal',
    value: 420000000,
    description: 'Venta de 15 locales comerciales en centro comercial',
    responsible: 'Ana Morales',
    status: 'in_progress',
    priority: 'high',
    reference: 'VENT-2024-002',
    tags: ['comercial', 'locales', 'centro comercial', 'plaza central'],
    notes: 'Propuesta enviada, esperando respuesta',
    client: 'Grupo Comercial del Sur',
    contact_person: 'Sra. Patricia López',
    contact_phone: '+57 310 987 6543',
    contact_email: 'plopez@grupocomercial.com',
    probability: 70,
    expected_close_date: '2024-07-15',
    sales_stage: 'Propuesta Enviada',
    commission_rate: 3.0,
    deal_size: 'large'
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Bodega Industrial - Zona Franca',
    type: 'industrial',
    category: 'closed_won',
    value: 280000000,
    description: 'Venta de bodega industrial en zona franca',
    responsible: 'Luis Fernández',
    status: 'completed',
    priority: 'medium',
    reference: 'VENT-2024-003',
    tags: ['industrial', 'bodega', 'zona franca', 'logística'],
    notes: 'Venta cerrada exitosamente',
    client: 'Logística Internacional Ltda.',
    contact_person: 'Ing. Jorge Herrera',
    contact_phone: '+57 315 456 7890',
    contact_email: 'jherrera@logisticainternacional.com',
    probability: 100,
    expected_close_date: '2024-05-10',
    sales_stage: 'Cerrado Ganado',
    commission_rate: 2.5,
    deal_size: 'large'
  },
  {
    id: '4',
    date: '2024-05-12',
    concept: 'Terreno Residencial - Urbanización El Bosque',
    type: 'land',
    category: 'qualified',
    value: 95000000,
    description: 'Venta de terreno para construcción residencial',
    responsible: 'María Jiménez',
    status: 'in_progress',
    priority: 'medium',
    reference: 'VENT-2024-004',
    tags: ['terreno', 'residencial', 'urbanización', 'construcción'],
    notes: 'Cliente calificado, en proceso de evaluación',
    client: 'Constructora El Bosque S.A.',
    contact_person: 'Arq. Sandra Ruiz',
    contact_phone: '+57 320 111 2222',
    contact_email: 'sruiz@constructoraelbosque.com',
    probability: 60,
    expected_close_date: '2024-08-20',
    sales_stage: 'Cliente Calificado',
    commission_rate: 2.0,
    deal_size: 'medium'
  },
  {
    id: '5',
    date: '2024-05-11',
    concept: 'Consultoría en Desarrollo Inmobiliario',
    type: 'consulting',
    category: 'prospect',
    value: 25000000,
    description: 'Servicios de consultoría para desarrollo de proyecto inmobiliario',
    responsible: 'Roberto Silva',
    status: 'pending',
    priority: 'low',
    reference: 'VENT-2024-005',
    tags: ['consultoría', 'desarrollo', 'inmobiliario', 'asesoría'],
    notes: 'Prospecto inicial, primera reunión programada',
    client: 'Desarrollos Urbanos del Este',
    contact_person: 'Dr. Miguel Torres',
    contact_phone: '+57 325 333 4444',
    contact_email: 'mtorres@desarrollosurbanos.com',
    probability: 30,
    expected_close_date: '2024-09-30',
    sales_stage: 'Prospecto',
    commission_rate: 1.5,
    deal_size: 'small'
  }
];

const calculateSalesMetrics = (opportunities: SalesOpportunity[]): SalesMetrics => {
  const totalOpportunities = opportunities.length;
  const activeOpportunities = opportunities.filter(o => o.status === 'in_progress').length;
  const totalValue = opportunities.reduce((acc, o) => acc + o.value, 0);
  const closedWonValue = opportunities.filter(o => o.category === 'closed_won').reduce((acc, o) => acc + o.value, 0);
  const closedLostValue = opportunities.filter(o => o.category === 'closed_lost').reduce((acc, o) => acc + o.value, 0);
  const averageDealSize = totalOpportunities > 0 ? totalValue / totalOpportunities : 0;
  const winRate = totalValue > 0 ? (closedWonValue / totalValue) * 100 : 0;
  const averageSalesCycle = 35; // Average days
  const conversionRate = totalOpportunities > 0 ? (opportunities.filter(o => o.category === 'closed_won').length / totalOpportunities) * 100 : 0;
  const pipelineValue = opportunities.filter(o => o.category !== 'closed_won' && o.category !== 'closed_lost').reduce((acc, o) => acc + o.value, 0);
  const quotaAttainment = 85; // Percentage
  const averageCommission = opportunities.length > 0 ? opportunities.reduce((acc, o) => acc + o.commission_rate, 0) / opportunities.length : 0;

  return {
    totalOpportunities,
    activeOpportunities,
    totalValue,
    closedWonValue,
    closedLostValue,
    averageDealSize,
    winRate,
    averageSalesCycle,
    conversionRate,
    pipelineValue,
    quotaAttainment,
    averageCommission
  };
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'residential': return 'bg-blue-100 text-blue-800';
    case 'commercial': return 'bg-green-100 text-green-800';
    case 'industrial': return 'bg-purple-100 text-purple-800';
    case 'land': return 'bg-orange-100 text-orange-800';
    case 'investment': return 'bg-red-100 text-red-800';
    case 'rental': return 'bg-pink-100 text-pink-800';
    case 'consulting': return 'bg-indigo-100 text-indigo-800';
    case 'development': return 'bg-emerald-100 text-emerald-800';
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
    case 'prospect': return 'bg-gray-100 text-gray-800';
    case 'lead': return 'bg-blue-100 text-blue-800';
    case 'qualified': return 'bg-green-100 text-green-800';
    case 'proposal': return 'bg-yellow-100 text-yellow-800';
    case 'negotiation': return 'bg-orange-100 text-orange-800';
    case 'closed_won': return 'bg-emerald-100 text-emerald-800';
    case 'closed_lost': return 'bg-red-100 text-red-800';
    case 'follow_up': return 'bg-purple-100 text-purple-800';
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

const DepartamentoVentasReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredOpportunities = salesOpportunities.filter(opportunity => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Prospecto' && opportunity.category === 'prospect') ||
      (selectedCategory === 'Lead' && opportunity.category === 'lead') ||
      (selectedCategory === 'Calificado' && opportunity.category === 'qualified') ||
      (selectedCategory === 'Propuesta' && opportunity.category === 'proposal') ||
      (selectedCategory === 'Negociación' && opportunity.category === 'negotiation') ||
      (selectedCategory === 'Cerrado Ganado' && opportunity.category === 'closed_won') ||
      (selectedCategory === 'Cerrado Perdido' && opportunity.category === 'closed_lost') ||
      (selectedCategory === 'Seguimiento' && opportunity.category === 'follow_up');
    const matchesPaymentMethod = selectedPaymentMethod === 'Todos' || 
      (selectedPaymentMethod === 'Efectivo' && opportunity.status === 'completed') ||
      (selectedPaymentMethod === 'Transferencia' && opportunity.status === 'in_progress') ||
      (selectedPaymentMethod === 'Tarjeta de Crédito' && opportunity.status === 'pending') ||
      (selectedPaymentMethod === 'Cheque' && opportunity.status === 'cancelled');
    const matchesSearch = !searchTerm || 
      opportunity.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPaymentMethod && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPaymentMethod('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedPaymentMethod !== 'Todos' || searchTerm;

  const metrics = calculateSalesMetrics(filteredOpportunities);

  const kpiCards = [
    {
      label: 'Oportunidades Totales',
      value: metrics.totalOpportunities,
      icon: ShoppingCart,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+7 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Oportunidades Activas',
      value: metrics.activeOpportunities,
      icon: Activity,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+3 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Valor Total',
      value: formatCurrency(metrics.totalValue),
      icon: DollarSign,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: '+18% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Tasa de Conversión',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      icon: Percent,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+2.5% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Valor Pipeline',
      value: formatCurrency(metrics.pipelineValue),
      icon: TrendingUp,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: 'Excelente',
      trendDirection: 'neutral'
    },
    {
      label: 'Cumplimiento Cuota',
      value: `${metrics.quotaAttainment}%`,
      icon: Target,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+5% vs mes anterior',
      trendDirection: 'up'
    }
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const years = ['2023', '2024', '2025'];
  const categories = ['Todos', 'Prospecto', 'Lead', 'Calificado', 'Propuesta', 'Negociación', 'Cerrado Ganado', 'Cerrado Perdido', 'Seguimiento'];
  const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <ShoppingCart className="text-white h-6 w-6" />
              </div>
              Ventas - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis de ventas completo y gestión de oportunidades del departamento</p>
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
                placeholder="Buscar oportunidades..."
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
            Oportunidades
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trends Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Tendencias de Ventas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="opportunities" stroke="#1e3269" strokeWidth={2} name="Oportunidades" />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="Valor" />
                    <Line type="monotone" dataKey="closed_won" stroke="#3b82f6" strokeWidth={2} name="Cerrado Ganado" />
                    <Line type="monotone" dataKey="conversion_rate" stroke="#f59e0b" strokeWidth={2} name="Tasa Conversión" />
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
                <RechartsAreaChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="opportunities" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="value" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="closed_won" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Analysis Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Breakdown */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart2 className="text-[#1e3269]" />
                  Desglose de Ventas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={salesBreakdown}>
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
                        <p className="text-sm text-gray-600">{member.opportunities} oportunidades</p>
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
                Lista de Oportunidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOpportunities.map(opportunity => (
                  <div key={opportunity.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm font-medium text-gray-600">{opportunity.date}</div>
                          <Badge className={getTypeColor(opportunity.type)}>
                            {opportunity.type === 'residential' ? 'Residencial' :
                             opportunity.type === 'commercial' ? 'Comercial' :
                             opportunity.type === 'industrial' ? 'Industrial' :
                             opportunity.type === 'land' ? 'Terrenos' :
                             opportunity.type === 'investment' ? 'Inversión' :
                             opportunity.type === 'rental' ? 'Arriendo' :
                             opportunity.type === 'consulting' ? 'Consultoría' : 'Desarrollo'}
                          </Badge>
                          <Badge className={getStatusColor(opportunity.status)}>
                            {opportunity.status === 'completed' ? 'Completado' :
                             opportunity.status === 'in_progress' ? 'En Progreso' :
                             opportunity.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{opportunity.concept}</h3>
                        <p className="text-sm text-gray-600 mb-2">{opportunity.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {opportunity.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {opportunity.client}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {formatCurrency(opportunity.value)}
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
            {/* Sales Performance Metrics */}
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
                    <span className="text-sm font-medium text-gray-700">Tasa de Ganancia</span>
                    <span className="text-lg font-bold text-green-600">{metrics.winRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Ciclo de Ventas Promedio</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.averageSalesCycle} días</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Tamaño Promedio de Oportunidad</span>
                    <span className="text-lg font-bold text-orange-600">{formatCurrency(metrics.averageDealSize)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Comisión Promedio</span>
                    <span className="text-lg font-bold text-red-600">{metrics.averageCommission.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Analysis */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Análisis de Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Valor del Pipeline</span>
                    <span className="text-lg font-bold text-[#1e3269]">{formatCurrency(metrics.pipelineValue)}</span>
                  </div>
                  <Progress value={Math.min((metrics.pipelineValue / 2000000000) * 100, 100)} className="w-full" />
                  <div className="text-xs text-gray-500">
                    {metrics.pipelineValue >= 1500000000 ? 'Pipeline excelente' :
                     metrics.pipelineValue >= 1000000000 ? 'Pipeline bueno' :
                     metrics.pipelineValue >= 500000000 ? 'Pipeline moderado' : 'Pipeline bajo'}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-gray-700">Cumplimiento de Cuota</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.quotaAttainment}%</span>
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

export default DepartamentoVentasReporteInterno; 