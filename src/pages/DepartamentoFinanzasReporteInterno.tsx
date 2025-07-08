import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Filter, 
  DollarSign, 
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
  CreditCard,
  Banknote,
  Receipt,
  Calculator,
  TrendingUp as TrendingUpIcon,
  Wallet,
  PiggyBank,
  Coins,
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

interface FinancialMovement {
  id: string;
  date: string;
  concept: string;
  type: 'income' | 'expense';
  category: 'sales' | 'services' | 'payroll' | 'suppliers' | 'utilities' | 'taxes' | 'investments' | 'loans';
  amount: number;
  description: string;
  responsible: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card' | 'check';
  reference: string;
  tags: string[];
  notes: string;
}

interface FinancialMetrics {
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  budgetUtilization: number;
  profitMargin: number;
  expenseRatio: number;
  cashReserve: number;
  accountsReceivable: number;
  accountsPayable: number;
  workingCapital: number;
}

// Time series data for financial trends
const financialTrendData = [
  { month: 'Ene', income: 1200000, expenses: 800000, cashFlow: 400000, budget: 1000000 },
  { month: 'Feb', income: 950000, expenses: 750000, cashFlow: 200000, budget: 1000000 },
  { month: 'Mar', income: 1100000, expenses: 850000, cashFlow: 250000, budget: 1000000 },
  { month: 'Abr', income: 1300000, expenses: 900000, cashFlow: 400000, budget: 1000000 },
  { month: 'May', income: 1400000, expenses: 950000, cashFlow: 450000, budget: 1000000 },
  { month: 'Jun', income: 1250000, expenses: 880000, cashFlow: 370000, budget: 1000000 },
  { month: 'Jul', income: 1350000, expenses: 920000, cashFlow: 430000, budget: 1000000 },
  { month: 'Ago', income: 1500000, expenses: 980000, cashFlow: 520000, budget: 1000000 }
];

// Category distribution data
const categoryData = [
  { name: 'Ventas', value: 45, fill: '#1e3269' },
  { name: 'Servicios', value: 25, fill: '#fbbf24' },
  { name: 'Nómina', value: 15, fill: '#eab308' },
  { name: 'Proveedores', value: 10, fill: '#ef4444' },
  { name: 'Servicios Públicos', value: 3, fill: '#8b5cf6' },
  { name: 'Impuestos', value: 2, fill: '#6b7280' }
];

// Expense breakdown
const expenseBreakdown = [
  { category: 'Nómina', amount: 450000, percentage: 47.4 },
  { category: 'Proveedores', amount: 300000, percentage: 31.6 },
  { category: 'Servicios Públicos', amount: 80000, percentage: 8.4 },
  { category: 'Impuestos', amount: 60000, percentage: 6.3 },
  { category: 'Marketing', amount: 40000, percentage: 4.2 },
  { category: 'Otros', amount: 20000, percentage: 2.1 }
];

// Income sources
const incomeSources = [
  { source: 'Ventas de Productos', amount: 800000, percentage: 57.1 },
  { source: 'Servicios Profesionales', amount: 350000, percentage: 25.0 },
  { source: 'Consultoría', amount: 150000, percentage: 10.7 },
  { source: 'Inversiones', amount: 70000, percentage: 5.0 },
  { source: 'Otros Ingresos', amount: 30000, percentage: 2.2 }
];

// Sample financial movements data
const financialMovements: FinancialMovement[] = [
  {
    id: '1',
    date: '2024-05-15',
    concept: 'Pago a Proveedores - Materiales',
    type: 'expense',
    category: 'suppliers',
    amount: 120000,
    description: 'Pago por materiales de construcción para proyecto Torre Premium',
    responsible: 'Ana López',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2024-001',
    tags: ['proveedores', 'materiales', 'construcción'],
    notes: 'Pago procesado exitosamente'
  },
  {
    id: '2',
    date: '2024-05-14',
    concept: 'Cobro de Clientes - Residencial Vista Sur',
    type: 'income',
    category: 'sales',
    amount: 200000,
    description: 'Pago de cuota mensual del proyecto residencial',
    responsible: 'Carlos Pérez',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2024-002',
    tags: ['clientes', 'residencial', 'cuota'],
    notes: 'Pago recibido a tiempo'
  },
  {
    id: '3',
    date: '2024-05-13',
    concept: 'Pago de Nómina - Mayo 2024',
    type: 'expense',
    category: 'payroll',
    amount: 80000,
    description: 'Pago de salarios del personal administrativo',
    responsible: 'María Gómez',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2024-003',
    tags: ['nómina', 'personal', 'salarios'],
    notes: 'Nómina procesada correctamente'
  },
  {
    id: '4',
    date: '2024-05-12',
    concept: 'Servicios de Consultoría',
    type: 'income',
    category: 'services',
    amount: 50000,
    description: 'Servicios de consultoría financiera prestados',
    responsible: 'Ana López',
    status: 'completed',
    paymentMethod: 'credit_card',
    reference: 'REF-2024-004',
    tags: ['consultoría', 'servicios', 'financiero'],
    notes: 'Servicio completado satisfactoriamente'
  },
  {
    id: '5',
    date: '2024-05-11',
    concept: 'Pago de Servicios Públicos',
    type: 'expense',
    category: 'utilities',
    amount: 15000,
    description: 'Pago de electricidad, agua e internet',
    responsible: 'Carlos Pérez',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2024-005',
    tags: ['servicios', 'públicos', 'utilities'],
    notes: 'Pagos al día'
  },
  {
    id: '6',
    date: '2024-05-10',
    concept: 'Venta de Activo Fijo',
    type: 'income',
    category: 'sales',
    amount: 75000,
    description: 'Venta de equipo de oficina obsoleto',
    responsible: 'María Gómez',
    status: 'completed',
    paymentMethod: 'cash',
    reference: 'REF-2024-006',
    tags: ['venta', 'activo', 'equipo'],
    notes: 'Equipo vendido a precio de mercado'
  },
  {
    id: '7',
    date: '2024-05-09',
    concept: 'Pago de Impuestos',
    type: 'expense',
    category: 'taxes',
    amount: 25000,
    description: 'Pago de impuestos municipales y estatales',
    responsible: 'Ana López',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2024-007',
    tags: ['impuestos', 'municipales', 'estatales'],
    notes: 'Impuestos pagados a tiempo'
  },
  {
    id: '8',
    date: '2024-05-08',
    concept: 'Ingreso por Inversiones',
    type: 'income',
    category: 'investments',
    amount: 30000,
    description: 'Rendimientos de inversiones en fondos',
    responsible: 'Carlos Pérez',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2024-008',
    tags: ['inversiones', 'rendimientos', 'fondos'],
    notes: 'Rendimientos superiores al esperado'
  }
];

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const years = ['2023', '2024', '2025'];
const categories = ['Todos', 'Ventas', 'Servicios', 'Nómina', 'Proveedores', 'Servicios Públicos', 'Impuestos', 'Inversiones', 'Préstamos'];
const paymentMethods = ['Todos', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Cheque'];

const calculateFinancialMetrics = (movements: FinancialMovement[]): FinancialMetrics => {
  const totalIncome = movements.filter(m => m.type === 'income').reduce((acc, m) => acc + m.amount, 0);
  const totalExpenses = movements.filter(m => m.type === 'expense').reduce((acc, m) => acc + m.amount, 0);
  const netCashFlow = totalIncome - totalExpenses;
  const budgetUtilization = Math.round((totalExpenses / (totalIncome + totalExpenses)) * 100);
  const profitMargin = totalIncome > 0 ? Math.round((netCashFlow / totalIncome) * 100) : 0;
  const expenseRatio = totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 0;
  const cashReserve = 500000; // Mock data
  const accountsReceivable = 300000; // Mock data
  const accountsPayable = 150000; // Mock data
  const workingCapital = cashReserve + accountsReceivable - accountsPayable;

  return {
    totalIncome,
    totalExpenses,
    netCashFlow,
    budgetUtilization,
    profitMargin,
    expenseRatio,
    cashReserve,
    accountsReceivable,
    accountsPayable,
    workingCapital
  };
};

const getTypeColor = (type: string) => {
  return type === 'income' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'sales': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'services': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'payroll': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'suppliers': return 'bg-red-100 text-red-800 border-red-200';
    case 'utilities': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'taxes': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'investments': return 'bg-green-100 text-green-800 border-green-200';
    case 'loans': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

const DepartamentoFinanzasReporteInterno: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'analysis' | 'movements' | 'detailed'>('overview');

  const filteredMovements = financialMovements.filter(movement => {
    const matchesCategory = selectedCategory === 'Todos' || 
      (selectedCategory === 'Ventas' && movement.category === 'sales') ||
      (selectedCategory === 'Servicios' && movement.category === 'services') ||
      (selectedCategory === 'Nómina' && movement.category === 'payroll') ||
      (selectedCategory === 'Proveedores' && movement.category === 'suppliers') ||
      (selectedCategory === 'Servicios Públicos' && movement.category === 'utilities') ||
      (selectedCategory === 'Impuestos' && movement.category === 'taxes') ||
      (selectedCategory === 'Inversiones' && movement.category === 'investments') ||
      (selectedCategory === 'Préstamos' && movement.category === 'loans');
    const matchesPaymentMethod = selectedPaymentMethod === 'Todos' || 
      (selectedPaymentMethod === 'Efectivo' && movement.paymentMethod === 'cash') ||
      (selectedPaymentMethod === 'Transferencia' && movement.paymentMethod === 'bank_transfer') ||
      (selectedPaymentMethod === 'Tarjeta de Crédito' && movement.paymentMethod === 'credit_card') ||
      (selectedPaymentMethod === 'Cheque' && movement.paymentMethod === 'check');
    const matchesSearch = !searchTerm || 
      movement.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPaymentMethod && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPaymentMethod('Todos');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedPaymentMethod !== 'Todos' || searchTerm;

  const metrics = calculateFinancialMetrics(filteredMovements);

  const kpiCards = [
    {
      label: 'Ingresos Totales',
      value: formatCurrency(metrics.totalIncome),
      icon: TrendingUp,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+12% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Egresos Totales',
      value: formatCurrency(metrics.totalExpenses),
      icon: TrendingDown,
      color: 'bg-red-50 border-red-200 text-red-700',
      trend: '+8% vs mes anterior',
      trendDirection: 'up'
    },
    {
      label: 'Flujo de Caja',
      value: formatCurrency(metrics.netCashFlow),
      icon: DollarSign,
      color: metrics.netCashFlow >= 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: metrics.netCashFlow >= 0 ? 'Positivo' : 'Negativo',
      trendDirection: metrics.netCashFlow >= 0 ? 'up' : 'down'
    },
    {
      label: 'Margen de Ganancia',
      value: `${metrics.profitMargin}%`,
      icon: Percent,
      color: metrics.profitMargin >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700',
      trend: metrics.profitMargin >= 0 ? 'Rentable' : 'Pérdida',
      trendDirection: metrics.profitMargin >= 0 ? 'up' : 'down'
    },
    {
      label: 'Capital de Trabajo',
      value: formatCurrency(metrics.workingCapital),
      icon: Wallet,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: 'Disponible para operaciones',
      trendDirection: 'neutral'
    },
    {
      label: 'Reserva de Efectivo',
      value: formatCurrency(metrics.cashReserve),
      icon: PiggyBank,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      trend: 'Fondo de emergencia',
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
                <DollarSign className="text-white h-6 w-6" />
              </div>
              Finanzas - Reporte Interno
            </h1>
            <p className="text-gray-600">Análisis financiero completo y gestión de movimientos del departamento</p>
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
                  <SelectValue placeholder="Método de Pago" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Search className="text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar movimientos..."
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
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'overview' | 'trends' | 'analysis' | 'movements' | 'detailed')} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <Eye className={`h-4 w-4 ${viewMode === 'overview' ? 'text-white' : 'text-[#1e3269]'}`} />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="trends" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <LineChart className={`h-4 w-4 ${viewMode === 'trends' ? 'text-white' : 'text-[#1e3269]'}`} />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="analysis" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart3 className={`h-4 w-4 ${viewMode === 'analysis' ? 'text-white' : 'text-[#1e3269]'}`} />
            Análisis
          </TabsTrigger>
          <TabsTrigger value="movements" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <List className={`h-4 w-4 ${viewMode === 'movements' ? 'text-white' : 'text-[#1e3269]'}`} />
            Movimientos
          </TabsTrigger>
          <TabsTrigger value="detailed" className={`flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium`}>
            <BarChart2 className={`h-4 w-4 ${viewMode === 'detailed' ? 'text-white' : 'text-[#1e3269]'}`} />
            Detalle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart4 className="text-[#1e3269]" />
                  Ingresos vs Egresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={financialTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Monto']} />
                    <Legend />
                    <Bar dataKey="income" fill="#1e3269" name="Ingresos" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Egresos" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cash Flow Trend */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <LineChart className="text-[#1e3269]" />
                  Flujo de Caja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={financialTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Flujo de Caja']} />
                    <Legend />
                    <Line type="monotone" dataKey="cashFlow" stroke="#3b82f6" strokeWidth={3} name="Flujo de Caja" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

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
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Distribución']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Financial Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget vs Actual */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Target className="text-[#1e3269]" />
                  Presupuesto vs Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={financialTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Monto']} />
                    <Legend />
                    <Bar dataKey="expenses" fill="#ef4444" name="Gastos Reales" />
                    <Line type="monotone" dataKey="budget" stroke="#1e3269" strokeWidth={2} name="Presupuesto" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Income Trend */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-[#1e3269]" />
                  Tendencia de Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsAreaChart data={financialTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Ingresos']} />
                    <Legend />
                    <Area type="monotone" dataKey="income" fill="#1e3269" fillOpacity={0.6} stroke="#1e3269" strokeWidth={2} name="Ingresos" />
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Financial Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Breakdown */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Calculator className="text-[#1e3269]" />
                  Desglose de Gastos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={expenseBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Monto']} />
                    <Legend />
                    <Bar dataKey="amount" fill="#ef4444" name="Monto" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Income Sources */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Coins className="text-[#1e3269]" />
                  Fuentes de Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={incomeSources}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Monto']} />
                    <Legend />
                    <Bar dataKey="amount" fill="#1e3269" name="Monto" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          {/* Financial Movements */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <List className="text-[#1e3269]" />
                Movimientos Financieros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMovements.map(movement => (
                  <div key={movement.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm font-medium text-gray-600">{movement.date}</div>
                          <Badge className={getTypeColor(movement.type)}>
                            {movement.type === 'income' ? 'Ingreso' : 'Egreso'}
                          </Badge>
                          <Badge className={getCategoryColor(movement.category)}>
                            {movement.category === 'sales' ? 'Ventas' :
                             movement.category === 'services' ? 'Servicios' :
                             movement.category === 'payroll' ? 'Nómina' :
                             movement.category === 'suppliers' ? 'Proveedores' :
                             movement.category === 'utilities' ? 'Servicios Públicos' :
                             movement.category === 'taxes' ? 'Impuestos' :
                             movement.category === 'investments' ? 'Inversiones' : 'Préstamos'}
                          </Badge>
                          <Badge className={getStatusColor(movement.status)}>
                            {movement.status === 'completed' ? 'Completado' :
                             movement.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{movement.concept}</h3>
                        <p className="text-sm text-gray-600 mb-2">{movement.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {movement.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            {movement.paymentMethod === 'cash' ? 'Efectivo' :
                             movement.paymentMethod === 'bank_transfer' ? 'Transferencia' :
                             movement.paymentMethod === 'credit_card' ? 'Tarjeta' : 'Cheque'}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {formatCurrency(movement.amount)}
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
          {/* Detailed Table */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <BarChart2 className="text-[#1e3269]" />
                Tabla Detallada de Movimientos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Concepto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Categoría</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Monto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Responsable</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Método</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Referencia</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovements.map((movement) => (
                      <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{movement.date}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{movement.concept}</p>
                            <p className="text-xs text-gray-500">{movement.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getTypeColor(movement.type)}>
                            {movement.type === 'income' ? 'Ingreso' : 'Egreso'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getCategoryColor(movement.category)}>
                            {movement.category === 'sales' ? 'Ventas' :
                             movement.category === 'services' ? 'Servicios' :
                             movement.category === 'payroll' ? 'Nómina' :
                             movement.category === 'suppliers' ? 'Proveedores' :
                             movement.category === 'utilities' ? 'Servicios Públicos' :
                             movement.category === 'taxes' ? 'Impuestos' :
                             movement.category === 'investments' ? 'Inversiones' : 'Préstamos'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-medium">{formatCurrency(movement.amount)}</td>
                        <td className="py-3 px-4">{movement.responsible}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(movement.status)}>
                            {movement.status === 'completed' ? 'Completado' :
                             movement.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {movement.paymentMethod === 'cash' ? 'Efectivo' :
                           movement.paymentMethod === 'bank_transfer' ? 'Transferencia' :
                           movement.paymentMethod === 'credit_card' ? 'Tarjeta' : 'Cheque'}
                        </td>
                        <td className="py-3 px-4 text-xs">{movement.reference}</td>
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

export default DepartamentoFinanzasReporteInterno; 