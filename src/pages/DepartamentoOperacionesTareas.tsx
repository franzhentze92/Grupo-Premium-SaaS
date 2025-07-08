// This file is a duplicate of DepartamentoFinanzasTareas.tsx, adapted for the Operaciones department.
// ... (rest of the file will be copied and adapted accordingly) ...

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, ListChecks, Users, Star, BarChart2, LineChart, List, Eye, Plus, Edit, Trash2, X, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GanttCalendar, { GanttCalendarTask } from '@/components/GanttCalendar';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const responsables = ['Todos', 'Diego Morales', 'Ana Martínez', 'Roberto Silva'];
const estados = ['Todos', 'Completada', 'En Progreso', 'Pendiente'];
const prioridades = ['Todas', 'Alta', 'Media', 'Baja'];

const tareas = [
  { id: 1, titulo: 'Supervisión de obra', responsable: 'Diego Morales', estado: 'En Progreso', prioridad: 'Alta', fecha: '2024-06-10', inicio: '2024-06-01', fin: '2024-06-10' },
  { id: 2, titulo: 'Entrega de materiales', responsable: 'Ana Martínez', estado: 'Pendiente', prioridad: 'Media', fecha: '2024-06-12', inicio: '2024-06-11', fin: '2024-06-12' },
  { id: 3, titulo: 'Coordinación de equipos', responsable: 'Roberto Silva', estado: 'Completada', prioridad: 'Alta', fecha: '2024-06-08', inicio: '2024-06-05', fin: '2024-06-08' },
  { id: 4, titulo: 'Inspección de seguridad', responsable: 'Ana Martínez', estado: 'En Progreso', prioridad: 'Alta', fecha: '2024-06-15', inicio: '2024-06-13', fin: '2024-06-15' },
  { id: 5, titulo: 'Reporte de avance', responsable: 'Diego Morales', estado: 'Pendiente', prioridad: 'Baja', fecha: '2024-06-18', inicio: '2024-06-17', fin: '2024-06-18' },
];

const kpiCards = [
  { label: 'Tareas Totales', value: tareas.length, color: 'info', icon: ListChecks, trend: '+8% este mes', trendDir: 'up', secondary: 'Total registradas' },
  { label: 'Completadas', value: tareas.filter(t => t.estado === 'Completada').length, color: 'success', icon: TrendingUp, trend: '+2', trendDir: 'up', secondary: 'Finalizadas' },
  { label: 'En Progreso', value: tareas.filter(t => t.estado === 'En Progreso').length, color: 'warning', icon: LineChart, trend: '+1', trendDir: 'up', secondary: 'Actualmente activas' },
  { label: 'Pendientes', value: tareas.filter(t => t.estado === 'Pendiente').length, color: 'secondary', icon: BarChart2, trend: '-1', trendDir: 'down', secondary: 'Por iniciar' },
];

const ganttCalendarTasks: GanttCalendarTask[] = tareas.map(t => ({
  id: t.id.toString(),
  name: t.titulo,
  start: new Date(t.inicio),
  end: new Date(t.fin),
  type: 'task',
  progress: t.estado === 'Completada' ? 100 : t.estado === 'En Progreso' ? 50 : 0,
  status: t.estado === 'Completada' ? 'Completed' : t.estado === 'En Progreso' ? 'In Progress' : 'Pending',
  category: 'Operaciones',
  assignedTo: t.responsable,
  priority: t.prioridad,
  description: t.titulo,
}));

const DepartamentoOperacionesTareas: React.FC = () => {
  const [responsable, setResponsable] = useState<string>('Todos');
  const [estado, setEstado] = useState<string>('Todos');
  const [prioridad, setPrioridad] = useState<string>('Todas');
  const [tab, setTab] = useState<'detailed' | 'overview' | 'analytics' | 'gantt'>('detailed');

  const filteredTareas = tareas.filter(t =>
    (responsable === 'Todos' || t.responsable === responsable) &&
    (estado === 'Todos' || t.estado === estado) &&
    (prioridad === 'Todas' || t.prioridad === prioridad)
  );

  const analyticsData = [
    { name: 'Completadas', value: tareas.filter(t => t.estado === 'Completada').length },
    { name: 'En Progreso', value: tareas.filter(t => t.estado === 'En Progreso').length },
    { name: 'Pendientes', value: tareas.filter(t => t.estado === 'Pendiente').length },
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="p-2 bg-[#8cb43a] rounded-lg"><ListChecks className="text-white h-6 w-6" /></span>
          Operaciones - Tareas
        </h1>
        <p className="text-gray-600">Gestión y seguimiento de tareas del departamento de operaciones</p>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-5 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl" style={{ background: 'rgba(140,180,58,0.12)' }}>
                  <kpi.icon className="h-6 w-6 text-[#8cb43a]" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                {kpi.trendDir === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                {kpi.trendDir === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                <span className={kpi.trendDir === 'up' ? 'text-green-600' : kpi.trendDir === 'down' ? 'text-red-600' : 'text-gray-500'}>{kpi.trend}</span>
                <span className="text-gray-400">{kpi.secondary}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Filters Section */}
      <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Filter className="text-[#8cb43a]" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-center py-4">
          <div className="flex items-center gap-2">
            <Users className="text-gray-400 h-4 w-4" />
            <Select value={responsable} onValueChange={setResponsable}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Responsable" /></SelectTrigger>
              <SelectContent>
                {responsables.map(r => <SelectItem value={r} key={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <ListChecks className="text-gray-400 h-4 w-4" />
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                {estados.map(e => <SelectItem value={e} key={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 h-4 w-4" />
            <Select value={prioridad} onValueChange={setPrioridad}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Prioridad" /></SelectTrigger>
              <SelectContent>
                {prioridades.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Input className="w-64" placeholder="Buscar tareas..." />
          </div>
        </CardContent>
      </Card>
      {/* Tabs for dashboard views */}
      <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 rounded-full bg-gray-100 p-1">
          <TabsTrigger value="detailed" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#8cb43a] data-[state=active]:text-white transition px-4 py-2"><List className="h-4 w-4" />Detalle</TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#8cb43a] data-[state=active]:text-white transition px-4 py-2"><Eye className="h-4 w-4" />Resumen</TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#8cb43a] data-[state=active]:text-white transition px-4 py-2"><BarChart2 className="h-4 w-4" />Analytics</TabsTrigger>
          <TabsTrigger value="gantt" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#8cb43a] data-[state=active]:text-white transition px-4 py-2"><Calendar className="h-4 w-4" />Gantt</TabsTrigger>
        </TabsList>
        <TabsContent value="detailed" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><List className="text-[#8cb43a]" />Lista Detallada de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-blue-100 text-blue-800">
                      <th className="px-4 py-2">Título</th>
                      <th className="px-4 py-2">Responsable</th>
                      <th className="px-4 py-2">Estado</th>
                      <th className="px-4 py-2">Prioridad</th>
                      <th className="px-4 py-2">Fecha</th>
                      <th className="px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTareas.map(t => (
                      <tr key={t.id} className="border-b even:bg-gray-50 hover:bg-gray-100 transition">
                        <td className="px-4 py-2 font-medium">{t.titulo}</td>
                        <td className="px-4 py-2">{t.responsable}</td>
                        <td className="px-4 py-2">
                          <Badge variant={t.estado === 'Completada' ? 'success' : t.estado === 'En Progreso' ? 'warning' : 'secondary'}>{t.estado}</Badge>
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant={t.prioridad === 'Alta' ? 'destructive' : t.prioridad === 'Media' ? 'warning' : 'info'}>{t.prioridad}</Badge>
                        </td>
                        <td className="px-4 py-2">{t.fecha}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                          <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                          <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                    {filteredTareas.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
                          <ListChecks className="h-8 w-8 mb-2 text-[#8cb43a]" />
                          No hay tareas para los filtros seleccionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="overview" className="space-y-6">
          {/* Overview content */}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics content */}
        </TabsContent>
        <TabsContent value="gantt" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><Calendar className="text-[#8cb43a]" />Gantt</CardTitle>
            </CardHeader>
            <CardContent>
              <GanttCalendar tasks={ganttCalendarTasks} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartamentoOperacionesTareas; 