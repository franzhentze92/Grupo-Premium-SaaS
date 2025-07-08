import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  Megaphone, 
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
  Heart,
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
  MousePointer2
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

interface MarketingCampaign {
  id: string;
  date: string;
  concept: string;
  type: 'social_media' | 'email' | 'digital_ads' | 'content' | 'events' | 'pr' | 'influencer' | 'traditional';
  category: 'awareness' | 'consideration' | 'conversion' | 'retention' | 'branding' | 'lead_generation' | 'sales' | 'engagement';
  budget: number;
  description: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  reference: string;
  tags: string[];
  notes: string;
  platform: string;
  target_audience: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roi: number;
}

interface MarketingMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  averageCTR: number;
  averageCPC: number;
  averageROI: number;
  engagementRate: number;
  leadGeneration: number;
  brandAwareness: number;
  conversionRate: number;
}

// Time series data for marketing trends
const marketingTrendData = [
  { month: 'Ene', campaigns: 8, impressions: 150000, clicks: 12000, conversions: 800, roi: 2.5 },
  { month: 'Feb', campaigns: 10, impressions: 180000, clicks: 15000, conversions: 1000, roi: 2.8 },
  { month: 'Mar', campaigns: 12, impressions: 200000, clicks: 18000, conversions: 1200, roi: 3.1 },
  { month: 'Abr', campaigns: 15, impressions: 250000, clicks: 22000, conversions: 1500, roi: 3.3 },
  { month: 'May', campaigns: 18, impressions: 300000, clicks: 25000, conversions: 1800, roi: 3.5 },
  { month: 'Jun', campaigns: 20, impressions: 350000, clicks: 28000, conversions: 2000, roi: 3.7 },
  { month: 'Jul', campaigns: 22, impressions: 400000, clicks: 32000, conversions: 2200, roi: 3.9 },
  { month: 'Ago', campaigns: 25, impressions: 450000, clicks: 35000, conversions: 2500, roi: 4.1 }
];

// Category distribution data
const categoryData = [
  { name: 'Redes Sociales', value: 35, fill: '#1e3269' },
  { name: 'Email Marketing', value: 25, fill: '#fbbf24' },
  { name: 'Publicidad Digital', value: 20, fill: '#eab308' },
  { name: 'Contenido', value: 12, fill: '#ef4444' },
  { name: 'Eventos', value: 5, fill: '#8b5cf6' },
  { name: 'PR', value: 3, fill: '#6b7280' }
];

// Campaign breakdown
const campaignBreakdown = [
  { category: 'Redes Sociales', count: 9, percentage: 36.0 },
  { category: 'Email Marketing', count: 6, percentage: 24.0 },
  { category: 'Publicidad Digital', count: 5, percentage: 20.0 },
  { category: 'Contenido', count: 3, percentage: 12.0 },
  { category: 'Eventos', count: 2, percentage: 8.0 }
];

// Team performance
const teamPerformance = [
  { member: 'María González', campaigns: 8, completed: 7, efficiency: 88, roi: 3.2 },
  { member: 'Carlos Ruiz', campaigns: 10, completed: 9, efficiency: 90, roi: 3.8 },
  { member: 'Ana Martínez', campaigns: 7, completed: 7, efficiency: 100, roi: 4.1 }
];

// Sample marketing campaigns data
const marketingCampaigns: MarketingCampaign[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Campaña Redes Sociales - Lanzamiento Torre Premium',
    type: 'social_media',
    category: 'awareness',
    budget: 15000,
    description: 'Campaña integral en redes sociales para el lanzamiento del proyecto Torre Premium',
    responsible: 'María González',
    status: 'completed',
    priority: 'high',
    reference: 'MKT-2024-001',
    tags: ['redes sociales', 'lanzamiento', 'torre premium'],
    notes: 'Campaña exitosa, alcance superior al esperado',
    platform: 'Instagram, Facebook, LinkedIn',
    target_audience: 'Profesionales 25-45 años',
    impressions: 85000,
    clicks: 4200,
    conversions: 180,
    ctr: 4.94,
    cpc: 3.57,
    roi: 3.2
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Email Marketing - Newsletter Mensual',
    type: 'email',
    category: 'engagement',
    budget: 5000,
    description: 'Newsletter mensual para mantener engagement con clientes existentes',
    responsible: 'Carlos Ruiz',
    status: 'in_progress',
    priority: 'medium',
    reference: 'MKT-2024-002',
    tags: ['email', 'newsletter', 'engagement'],
    notes: 'En proceso de diseño y segmentación',
    platform: 'Mailchimp',
    target_audience: 'Clientes existentes',
    impressions: 25000,
    clicks: 1800,
    conversions: 45,
    ctr: 7.2,
    cpc: 2.78,
    roi: 4.1
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Google Ads - Búsqueda Residencial',
    type: 'digital_ads',
    category: 'conversion',
    budget: 8000,
    description: 'Campaña de Google Ads enfocada en búsquedas de proyectos residenciales',
    responsible: 'Ana Martínez',
    status: 'completed',
    priority: 'high',
    reference: 'MKT-2024-003',
    tags: ['google ads', 'búsqueda', 'residencial'],
    notes: 'Excelente rendimiento, CPC optimizado',
    platform: 'Google Ads',
    target_audience: 'Interesados en vivienda',
    impressions: 120000,
    clicks: 8500,
    conversions: 320,
    ctr: 7.08,
    cpc: 0.94,
    roi: 4.8
  },
  {
    id: '4',
    date: '2024-05-12',
    concept: 'Contenido Blog - Tendencias Arquitectura',
    type: 'content',
    category: 'branding',
    budget: 3000,
    description: 'Serie de artículos sobre tendencias en arquitectura y construcción',
    responsible: 'María González',
    status: 'in_progress',
    priority: 'medium',
    reference: 'MKT-2024-004',
    tags: ['contenido', 'blog', 'tendencias'],
    notes: 'Contenido en desarrollo, SEO optimizado',
    platform: 'Website, LinkedIn',
    target_audience: 'Profesionales del sector',
    impressions: 45000,
    clicks: 3200,
    conversions: 85,
    ctr: 7.11,
    cpc: 0.94,
    roi: 2.8
  },
  {
    id: '5',
    date: '2024-05-11',
    concept: 'Evento Networking - Expo Construcción',
    type: 'events',
    category: 'lead_generation',
    budget: 12000,
    description: 'Participación en Expo Construcción para generar leads cualificados',
    responsible: 'Carlos Ruiz',
    status: 'pending',
    priority: 'high',
    reference: 'MKT-2024-005',
    tags: ['evento', 'networking', 'expo'],
    notes: 'Evento programado para próximo mes',
    platform: 'Presencial',
    target_audience: 'Profesionales construcción',
    impressions: 8000,
    clicks: 600,
    conversions: 45,
    ctr: 7.5,
    cpc: 26.67,
    roi: 1.8
  }
];

const calculateMarketingMetrics = (campaigns: MarketingCampaign[]): MarketingMetrics => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'in_progress').length;
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const totalCost = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const averageCPC = totalClicks > 0 ? totalCost / totalClicks : 0;
  const totalRevenue = totalConversions * 5000; // Assuming $5000 average conversion value
  const averageROI = totalCost > 0 ? (totalRevenue - totalCost) / totalCost : 0;
  const engagementRate = totalImpressions > 0 ? ((totalClicks + totalConversions) / totalImpressions) * 100 : 0;
  const leadGeneration = totalConversions;
  const brandAwareness = totalImpressions;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  return {
    totalCampaigns,
    activeCampaigns,
    totalImpressions,
    totalClicks,
    totalConversions,
    averageCTR,
    averageCPC,
    averageROI,
    engagementRate,
    leadGeneration,
    brandAwareness,
    conversionRate
  };
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'social_media': return 'bg-blue-100 text-blue-800';
    case 'email': return 'bg-green-100 text-green-800';
    case 'digital_ads': return 'bg-purple-100 text-purple-800';
    case 'content': return 'bg-orange-100 text-orange-800';
    case 'events': return 'bg-red-100 text-red-800';
    case 'pr': return 'bg-pink-100 text-pink-800';
    case 'influencer': return 'bg-indigo-100 text-indigo-800';
    case 'traditional': return 'bg-gray-100 text-gray-800';
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
    case 'awareness': return 'bg-blue-100 text-blue-800';
    case 'consideration': return 'bg-green-100 text-green-800';
    case 'conversion': return 'bg-purple-100 text-purple-800';
    case 'retention': return 'bg-orange-100 text-orange-800';
    case 'branding': return 'bg-pink-100 text-pink-800';
    case 'lead_generation': return 'bg-indigo-100 text-indigo-800';
    case 'sales': return 'bg-red-100 text-red-800';
    case 'engagement': return 'bg-emerald-100 text-emerald-800';
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

const DepartamentoMercadeoReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredCampaigns = marketingCampaigns.filter(campaign => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Conciencia' && campaign.category === 'awareness') ||
      (selectedCategory === 'Consideración' && campaign.category === 'consideration') ||
      (selectedCategory === 'Conversión' && campaign.category === 'conversion') ||
      (selectedCategory === 'Retención' && campaign.category === 'retention') ||
      (selectedCategory === 'Branding' && campaign.category === 'branding') ||
      (selectedCategory === 'Generación de Leads' && campaign.category === 'lead_generation') ||
      (selectedCategory === 'Ventas' && campaign.category === 'sales') ||
      (selectedCategory === 'Engagement' && campaign.category === 'engagement');
    const matchesPaymentMethod = selectedPaymentMethod === 'Todos' || 
      (selectedPaymentMethod === 'Efectivo' && campaign.status === 'completed') ||
      (selectedPaymentMethod === 'Transferencia' && campaign.status === 'in_progress') ||
      (selectedPaymentMethod === 'Tarjeta de Crédito' && campaign.status === 'pending') ||
      (selectedPaymentMethod === 'Cheque' && campaign.status === 'cancelled');
    const matchesSearch = !searchTerm || 
      campaign.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPaymentMethod && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPaymentMethod('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedPaymentMethod !== 'Todos' || searchTerm;

  const metrics = calculateMarketingMetrics(filteredCampaigns);

  const kpiCards = [
    {
      label: 'Campañas Totales',
      value: metrics.totalCampaigns,
      icon: Megaphone,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+3 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Campañas Activas',
      value: metrics.activeCampaigns,
      icon: Activity,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+1 vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Impresiones Totales',
      value: metrics.totalImpressions.toLocaleString(),
      icon: Eye,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: '+15% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'CTR Promedio',
      value: `${metrics.averageCTR.toFixed(2)}%`,
      icon: MousePointerClick,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: '+0.5% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'ROI Promedio',
      value: `${(metrics.averageROI * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      trend: 'Excelente',
      trendDirection: 'neutral'
    },
    {
      label: 'Conversiones',
      value: metrics.totalConversions,
      icon: Target,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      trend: '+12% vs mes anterior',
      trendDirection: 'up'
    }
  ];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const years = ['2023', '2024', '2025'];
  const categories = ['Todos', 'Conciencia', 'Consideración', 'Conversión', 'Retención', 'Branding', 'Generación de Leads', 'Ventas', 'Engagement'];
  const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <Megaphone className="text-white h-6 w-6" />
              </div>
              Mercadeo - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis de mercadeo completo y gestión de campañas del departamento</p>
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
                placeholder="Buscar campañas..."
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
            Campañas
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Marketing Trends Chart */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Tendencias de Mercadeo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={marketingTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="campaigns" stroke="#1e3269" strokeWidth={2} name="Campañas" />
                    <Line type="monotone" dataKey="impressions" stroke="#10b981" strokeWidth={2} name="Impresiones" />
                    <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} name="Clicks" />
                    <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} name="Conversiones" />
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
                <RechartsAreaChart data={marketingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="campaigns" stackId="1" stroke="#1e3269" fill="#1e3269" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="impressions" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="clicks" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Analysis Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Breakdown */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart2 className="text-[#1e3269]" />
                  Desglose de Campañas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={campaignBreakdown}>
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
                        <p className="text-sm text-gray-600">{member.campaigns} campañas</p>
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
                Lista de Campañas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCampaigns.map(campaign => (
                  <div key={campaign.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm font-medium text-gray-600">{campaign.date}</div>
                          <Badge className={getTypeColor(campaign.type)}>
                            {campaign.type === 'social_media' ? 'Redes Sociales' :
                             campaign.type === 'email' ? 'Email Marketing' :
                             campaign.type === 'digital_ads' ? 'Publicidad Digital' :
                             campaign.type === 'content' ? 'Contenido' :
                             campaign.type === 'events' ? 'Eventos' :
                             campaign.type === 'pr' ? 'PR' :
                             campaign.type === 'influencer' ? 'Influencer' : 'Tradicional'}
                          </Badge>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status === 'completed' ? 'Completada' :
                             campaign.status === 'in_progress' ? 'En Progreso' :
                             campaign.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{campaign.concept}</h3>
                        <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {campaign.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {campaign.platform}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {campaign.ctr.toFixed(2)}% CTR
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
                    <span className="text-sm font-medium text-gray-700">Tasa de Engagement</span>
                    <span className="text-lg font-bold text-green-600">{metrics.engagementRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Generación de Leads</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.leadGeneration}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Conciencia de Marca</span>
                    <span className="text-lg font-bold text-orange-600">{metrics.brandAwareness.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Tasa de Conversión</span>
                    <span className="text-lg font-bold text-red-600">{metrics.conversionRate.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Analysis */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Análisis de ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">ROI Promedio</span>
                    <span className="text-lg font-bold text-[#1e3269]">{(metrics.averageROI * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(metrics.averageROI * 100, 100)} className="w-full" />
                  <div className="text-xs text-gray-500">
                    {metrics.averageROI >= 3 ? 'Excelente ROI' :
                     metrics.averageROI >= 2 ? 'Buen ROI' :
                     metrics.averageROI >= 1 ? 'ROI moderado' : 'ROI bajo'}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-gray-700">CPC Promedio</span>
                    <span className="text-lg font-bold text-blue-600">{formatCurrency(metrics.averageCPC)}</span>
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

export default DepartamentoMercadeoReporteInterno; 