import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { GanttChart as GanttIcon, DollarSign, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import GanttChart from '@/components/GanttChart';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
// import { DatePicker } from '@/components/ui/datepicker'; // Uncomment if you have a DatePicker component

const budgetSummary = [
  { label: 'Presupuesto Total', value: '$2,500,000', icon: <DollarSign className="text-green-600" />, color: 'success' },
  { label: 'Costos Ejecutados', value: '$1,200,000', icon: <TrendingUp className="text-blue-600" />, color: 'info' },
  { label: 'Costos Pendientes', value: '$1,300,000', icon: <TrendingDown className="text-yellow-600" />, color: 'warning' },
  { label: 'Desviación', value: '+2.5%', icon: <TrendingUp className="text-red-500" />, color: 'destructive' },
];

const milestones = [
  { fase: 'Excavación', inicio: '2024-01-10', fin: '2024-02-15', estado: 'Finalizado' },
  { fase: 'Cimentación', inicio: '2024-02-16', fin: '2024-03-10', estado: 'En Progreso' },
  { fase: 'Estructura', inicio: '2024-03-11', fin: '2024-05-01', estado: 'Planificado' },
  { fase: 'Acabados', inicio: '2024-05-02', fin: '2024-06-30', estado: 'Planificado' },
];

const ganttTasks = [
  {
    id: '1',
    name: 'Excavación',
    project: 'Torre Premium I',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-02-15'),
    progress: 100,
    status: 'completed',
    assignedTo: 'Juan Pérez',
  },
  {
    id: '2',
    name: 'Cimentación',
    project: 'Torre Premium I',
    startDate: new Date('2024-02-16'),
    endDate: new Date('2024-03-10'),
    progress: 60,
    status: 'in-progress',
    assignedTo: 'Ana Gómez',
  },
  {
    id: '3',
    name: 'Estructura',
    project: 'Torre Premium I',
    startDate: new Date('2024-03-11'),
    endDate: new Date('2024-05-01'),
    progress: 0,
    status: 'pending',
    assignedTo: 'Carlos Ruiz',
  },
  {
    id: '4',
    name: 'Acabados',
    project: 'Torre Premium I',
    startDate: new Date('2024-05-02'),
    endDate: new Date('2024-06-30'),
    progress: 0,
    status: 'pending',
    assignedTo: 'Laura Díaz',
  },
];

const estadoBadge: Record<string, string> = {
  'Finalizado': 'success',
  'En Progreso': 'warning',
  'Planificado': 'secondary',
};

const allEstados = ['Finalizado', 'En Progreso', 'Planificado'];
const allFases = milestones.map(m => m.fase);

const kpiCards = [
  { label: 'Total Fases', value: milestones.length, color: 'info' },
  { label: 'Finalizadas', value: milestones.filter(m => m.estado === 'Finalizado').length, color: 'success' },
  { label: 'En Progreso', value: milestones.filter(m => m.estado === 'En Progreso').length, color: 'warning' },
  { label: 'Planificadas', value: milestones.filter(m => m.estado === 'Planificado').length, color: 'secondary' },
];

const ProyectosEstadoAvance: React.FC = () => {
  const [estadoFilter, setEstadoFilter] = useState<string | undefined>(undefined);
  const [faseFilter, setFaseFilter] = useState<string | undefined>(undefined);
  // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const filteredMilestones = milestones.filter(m =>
    (!estadoFilter || m.estado === estadoFilter) &&
    (!faseFilter || m.fase === faseFilter)
    // && (dateRange[0] && dateRange[1] ? (new Date(m.inicio) >= dateRange[0] && new Date(m.fin) <= dateRange[1]) : true)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <GanttIcon className="text-[#8cb43a]" /> Estado de Avance (Cronograma/Gantt) Presupuesto y Costos
      </h1>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="flex flex-col items-center justify-center bg-white border-2 border-gray-100 shadow hover:shadow-lg transition">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-lg text-gray-700 text-center">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={kpi.color as any} className="text-lg px-4 py-2 rounded-full">{kpi.value}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400" />
          <Select value={estadoFilter} onValueChange={v => setEstadoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allEstados.map(e => <SelectItem value={e} key={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select value={faseFilter} onValueChange={v => setFaseFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Fase" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {allFases.map(f => <SelectItem value={f} key={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {/*
        <div className="flex items-center gap-2">
          <DatePicker value={dateRange} onChange={setDateRange} range />
        </div>
        */}
        {(estadoFilter || faseFilter) && (
          <button className="ml-2 text-sm text-blue-600 underline" onClick={() => { setEstadoFilter(undefined); setFaseFilter(undefined); }}>Limpiar Filtros</button>
        )}
      </div>
      {/* Gantt Chart */}
      <Card className="bg-blue-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-800 text-lg flex items-center gap-2"><GanttIcon className="text-blue-400" /> Cronograma de Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <GanttChart tasks={ganttTasks} />
          </div>
        </CardContent>
      </Card>
      {/* Milestones Table */}
      <div className="flex justify-end mb-2">
        <Button variant="default">Agregar Nuevo</Button>
      </div>
      <div className="bg-white rounded-xl shadow border p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fase</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMilestones.map((m, idx) => (
              <TableRow key={idx}>
                <TableCell>{m.fase}</TableCell>
                <TableCell>{m.inicio}</TableCell>
                <TableCell>{m.fin}</TableCell>
                <TableCell><Badge variant={estadoBadge[m.estado] as any}>{m.estado}</Badge></TableCell>
              </TableRow>
            ))}
            {filteredMilestones.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">No hay fases que coincidan con los filtros.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProyectosEstadoAvance; 