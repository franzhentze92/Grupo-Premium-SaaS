import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Clock, PieChart as PieIcon, BarChart2, LineChart as LineIcon } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import * as Recharts from 'recharts';
import { Button } from '@/components/ui/button';

const kpiData = [
  { label: 'Proyectos en Riesgo', value: 2, icon: <AlertTriangle className="text-yellow-500" />, color: 'warning' },
  { label: 'Proyectos a Tiempo', value: 7, icon: <CheckCircle className="text-green-600" />, color: 'success' },
  { label: 'Proyectos Retrasados', value: 1, icon: <Clock className="text-red-500" />, color: 'destructive' },
  { label: 'Avance Promedio', value: '68%', icon: <TrendingUp className="text-blue-600" />, color: 'info' },
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

// Mock chart data
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
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Indicadores Clave (KPIs)</h1>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <Card key={idx} className="flex flex-col items-center justify-center bg-white border-2 border-gray-100 shadow hover:shadow-lg transition">
            <CardHeader className="flex flex-col items-center">
              <div className="mb-2">{kpi.icon}</div>
              <CardTitle className="text-lg text-gray-700 text-center">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={kpi.color as any} className="text-lg px-4 py-2 rounded-full">{kpi.value}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart: Avance por Proyecto */}
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="flex flex-row items-center gap-2">
            <BarChart2 className="text-blue-400" />
            <CardTitle className="text-blue-800 text-lg">Avance por Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
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
        <Card className="bg-green-50 border-green-100">
          <CardHeader className="flex flex-row items-center gap-2">
            <LineIcon className="text-green-400" />
            <CardTitle className="text-green-800 text-lg">Avance Mensual</CardTitle>
          </CardHeader>
          <CardContent>
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
        {/* Pie Chart: Distribución de Estados */}
        <Card className="bg-yellow-50 border-yellow-100 md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-2">
            <PieIcon className="text-yellow-400" />
            <CardTitle className="text-yellow-800 text-lg">Distribución de Estados</CardTitle>
          </CardHeader>
          <CardContent>
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
      </div>

      {/* KPIs Table */}
      <div className="flex justify-end mb-2">
        <Button variant="default">Agregar Nuevo</Button>
      </div>
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
  );
};

export default ProyectosKPIs; 