import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Clock, BarChart2, LineChart as LineIcon, PieChart as PieIcon, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import * as Recharts from 'recharts';

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const years = ['2023', '2024', '2025'];

const kpiCards = [
  {
    label: 'Proyectos en Riesgo',
    value: 2,
    icon: AlertTriangle,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    trend: '+1 vs mes anterior',
    trendDirection: 'up'
  },
  {
    label: 'Proyectos a Tiempo',
    value: 7,
    icon: CheckCircle,
    color: 'bg-green-50 border-green-200 text-green-700',
    trend: '+2 vs mes anterior',
    trendDirection: 'up'
  },
  {
    label: 'Proyectos Retrasados',
    value: 1,
    icon: Clock,
    color: 'bg-red-50 border-red-200 text-red-700',
    trend: '-1 vs mes anterior',
    trendDirection: 'down'
  },
  {
    label: 'Avance Promedio',
    value: '68%',
    icon: TrendingUp,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '+5% vs mes anterior',
    trendDirection: 'up'
  },
  {
    label: 'Proyectos Totales',
    value: 10,
    icon: BarChart2,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    trend: '+1 vs mes anterior',
    trendDirection: 'up'
  },
  {
    label: 'Proyectos Finalizados',
    value: 3,
    icon: CheckCircle,
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    trend: '+1 vs mes anterior',
    trendDirection: 'up'
  }
];

const indicadores = [
  { nombre: 'Torre Premium I', kpi: 'Avance', valor: '65%', tendencia: 'up', status: 'success' },
  { nombre: 'Residencial Vista', kpi: 'Presupuesto', valor: 'Media', tendencia: 'down', status: 'warning' },
  { nombre: 'Edificio Central', kpi: 'Tiempo', valor: 'A Tiempo', tendencia: 'up', status: 'success' },
  { nombre: 'Residencial Sur', kpi: 'Avance', valor: '40%', tendencia: 'down', status: 'destructive' },
];

const tendenciaIcon = {
  up: <TrendingUp className="text-green-600" size={18} />,
  down: <TrendingDown className="text-red-500" size={18} />,
};

const statusBadge: Record<string, string> = {
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  info: 'info',
};

const avancePorProyecto = [
  { name: 'Torre Premium I', avance: 65 },
  { name: 'Residencial Vista', avance: 10 },
  { name: 'Edificio Central', avance: 100 },
  { name: 'Residencial Sur', avance: 40 },
];
const avanceMensual = [
  { mes: 'Ene', avance: 10 },
  { mes: 'Feb', avance: 20 },
  { mes: 'Mar', avance: 35 },
  { mes: 'Abr', avance: 50 },
  { mes: 'May', avance: 60 },
  { mes: 'Jun', avance: 68 },
];
const estados = [
  { name: 'A Tiempo', value: 7 },
  { name: 'En Riesgo', value: 2 },
  { name: 'Retrasado', value: 1 },
];

const ProyectosKPIs: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [tab, setTab] = useState('overview');

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <BarChart2 className="text-white h-6 w-6" />
              </div>
              Indicadores Clave (KPIs)
            </h1>
            <p className="text-gray-600">Monitorea el desempeño y estado clave de los proyectos en curso</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-[#1e3269] hover:bg-[#16224a] text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Agregar Nuevo
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <CalendarIcon className="text-[#1e3269]" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
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

      {/* Tabs Section */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="bg-transparent border-b-0 rounded-none h-auto p-0">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Visión General</TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Tendencias</TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Análisis</TabsTrigger>
              <TabsTrigger value="movements" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Movimientos</TabsTrigger>
              <TabsTrigger value="detailed" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Detallado</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {/* Overview Tab */}
          {tab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bar Chart: Avance por Proyecto */}
              <Card className="bg-blue-50 border-blue-100 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2 pb-0">
                  <BarChart2 className="text-blue-400" />
                  <CardTitle className="text-blue-800 text-lg">Avance por Proyecto</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ChartContainer config={{ avance: { color: '#8cb43a', label: 'Avance' } }}>
                    <Recharts.BarChart data={avancePorProyecto} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                      <Recharts.CartesianGrid strokeDasharray="3 3" />
                      <Recharts.XAxis dataKey="name" />
                      <Recharts.YAxis />
                      <Recharts.Tooltip />
                      <Recharts.Bar dataKey="avance" fill="#8cb43a" radius={[6, 6, 0, 0]} />
                    </Recharts.BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              {/* Line Chart: Avance Mensual */}
              <Card className="bg-green-50 border-green-100 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2 pb-0">
                  <LineIcon className="text-green-400" />
                  <CardTitle className="text-green-800 text-lg">Avance Mensual</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ChartContainer config={{ avance: { color: '#8cb43a', label: 'Avance' } }}>
                    <Recharts.LineChart data={avanceMensual} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                      <Recharts.CartesianGrid strokeDasharray="3 3" />
                      <Recharts.XAxis dataKey="mes" />
                      <Recharts.YAxis />
                      <Recharts.Tooltip />
                      <Recharts.Line type="monotone" dataKey="avance" stroke="#8cb43a" strokeWidth={3} dot={{ r: 5 }} />
                    </Recharts.LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Trends Tab */}
          {tab === 'trends' && (
            <Card className="bg-yellow-50 border-yellow-100 shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2 pb-0">
                <PieIcon className="text-yellow-400" />
                <CardTitle className="text-yellow-800 text-lg">Distribución de Estados</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div style={{ height: 300 }} className="flex items-center justify-center">
                  <ChartContainer config={{ 'A Tiempo': { color: '#8cb43a' }, 'En Riesgo': { color: '#facc15' }, 'Retrasado': { color: '#ef4444' } }}>
                    <Recharts.PieChart width={350} height={300}>
                      <Recharts.Pie data={estados} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {estados.map((entry, idx) => (
                          <Recharts.Cell key={`cell-${idx}`} fill={['#8cb43a', '#facc15', '#ef4444'][idx]} />
                        ))}
                      </Recharts.Pie>
                      <Recharts.Tooltip />
                      <Recharts.Legend />
                    </Recharts.PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Analysis Tab */}
          {tab === 'analysis' && (
            <div className="text-gray-500 text-center py-12">(Espacio para análisis avanzado de KPIs, correlaciones, etc.)</div>
          )}
          {/* Movements Tab */}
          {tab === 'movements' && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Indicador</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Tendencia</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicadores.map((ind, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {ind.nombre}
                      </TableCell>
                      <TableCell>{ind.kpi}</TableCell>
                      <TableCell>{ind.valor}</TableCell>
                      <TableCell>{tendenciaIcon[ind.tendencia]}</TableCell>
                      <TableCell>
                        <Badge variant={statusBadge[ind.status] as any} className="px-3 py-1 rounded-full capitalize">
                          {ind.status === 'success' && 'Óptimo'}
                          {ind.status === 'warning' && 'Atención'}
                          {ind.status === 'destructive' && 'Riesgo'}
                          {ind.status === 'info' && 'Info'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {/* Detailed Tab */}
          {tab === 'detailed' && (
            <div className="text-gray-500 text-center py-12">(Espacio para vista detallada de KPIs por proyecto, exportación, etc.)</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProyectosKPIs; 