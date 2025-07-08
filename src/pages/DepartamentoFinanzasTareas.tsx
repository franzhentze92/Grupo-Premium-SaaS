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

const responsables = ['Todos', 'Ana López', 'Carlos Pérez', 'María Gómez'];
const estados = ['Todos', 'Completada', 'En Progreso', 'Pendiente'];
const prioridades = ['Todas', 'Alta', 'Media', 'Baja'];

const tareas = [
  { id: 1, titulo: 'Preparar informe mensual', responsable: 'Ana López', estado: 'Completada', prioridad: 'Alta', fecha: '2024-05-10', inicio: '2024-05-01', fin: '2024-05-10' },
  { id: 2, titulo: 'Pago proveedores', responsable: 'Carlos Pérez', estado: 'En Progreso', prioridad: 'Alta', fecha: '2024-05-12', inicio: '2024-05-08', fin: '2024-05-12' },
  { id: 3, titulo: 'Revisión ingresos', responsable: 'María Gómez', estado: 'Pendiente', prioridad: 'Media', fecha: '2024-05-14', inicio: '2024-05-13', fin: '2024-05-14' },
  { id: 4, titulo: 'Actualizar presupuesto', responsable: 'Ana López', estado: 'En Progreso', prioridad: 'Baja', fecha: '2024-05-15', inicio: '2024-05-12', fin: '2024-05-15' },
  { id: 5, titulo: 'Conciliación bancaria', responsable: 'Carlos Pérez', estado: 'Pendiente', prioridad: 'Alta', fecha: '2024-05-16', inicio: '2024-05-15', fin: '2024-05-16' },
];

const kpiCards = [
  { label: 'Tareas Totales', value: tareas.length, color: 'info', icon: ListChecks, trend: '+5% este mes', trendDir: 'up', secondary: 'Total registradas' },
  { label: 'Completadas', value: tareas.filter(t => t.estado === 'Completada').length, color: 'success', icon: TrendingUp, trend: '+1', trendDir: 'up', secondary: 'Finalizadas' },
  { label: 'En Progreso', value: tareas.filter(t => t.estado === 'En Progreso').length, color: 'warning', icon: LineChart, trend: '0', trendDir: 'neutral', secondary: 'Actualmente activas' },
  { label: 'Pendientes', value: tareas.filter(t => t.estado === 'Pendiente').length, color: 'secondary', icon: BarChart2, trend: '-1', trendDir: 'down', secondary: 'Por iniciar' },
];

// Map tareas to GanttCalendarTask format
const ganttCalendarTasks: GanttCalendarTask[] = tareas.map(t => ({
  id: t.id.toString(),
  name: t.titulo,
  start: new Date(t.inicio),
  end: new Date(t.fin),
  type: 'task',
  progress: t.estado === 'Completada' ? 100 : t.estado === 'En Progreso' ? 50 : 0,
  status: t.estado === 'Completada' ? 'Completed' : t.estado === 'En Progreso' ? 'In Progress' : 'Pending',
  category: 'Finanzas',
  assignedTo: t.responsable,
  priority: t.prioridad,
  description: t.titulo,
}));

const DepartamentoFinanzasTareas: React.FC = () => {
  const [responsable, setResponsable] = useState<string>('Todos');
  const [estado, setEstado] = useState<string>('Todos');
  const [prioridad, setPrioridad] = useState<string>('Todas');
  const [tab, setTab] = useState<'detailed' | 'overview' | 'analytics' | 'gantt'>('detailed');

  const filteredTareas = tareas.filter(t =>
    (responsable === 'Todos' || t.responsable === responsable) &&
    (estado === 'Todos' || t.estado === estado) &&
    (prioridad === 'Todas' || t.prioridad === prioridad)
  );

  // Example analytics data for bar chart
  const analyticsData = [
    { name: 'Completadas', value: tareas.filter(t => t.estado === 'Completada').length },
    { name: 'En Progreso', value: tareas.filter(t => t.estado === 'En Progreso').length },
    { name: 'Pendientes', value: tareas.filter(t => t.estado === 'Pendiente').length },
  ];

  const handleTaskClick = (task: GanttCalendarTask) => {
    // TODO: Replace with custom dialog/modal for task details
    alert(`Tarea: ${task.name}\nEstado: ${task.progress}%`);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="p-2 bg-[#1e3269] rounded-lg"><ListChecks className="text-white h-6 w-6" /></span>
          Finanzas - Tareas
        </h1>
        <p className="text-gray-600">Gestión y seguimiento de tareas del departamento de finanzas</p>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-5 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl" style={{ background: 'rgba(30,50,105,0.12)' }}>
                  <kpi.icon className="h-6 w-6 text-[#1e3269]" />
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
            <Filter className="text-[#1e3269]" />
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
          <TabsTrigger value="detailed" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#1e3269] data-[state=active]:text-white transition px-4 py-2"><List className="h-4 w-4" />Detalle</TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#1e3269] data-[state=active]:text-white transition px-4 py-2"><Eye className="h-4 w-4" />Resumen</TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#1e3269] data-[state=active]:text-white transition px-4 py-2"><BarChart2 className="h-4 w-4" />Analytics</TabsTrigger>
          <TabsTrigger value="gantt" className="flex items-center gap-2 rounded-full data-[state=active]:bg-[#1e3269] data-[state=active]:text-white transition px-4 py-2"><Calendar className="h-4 w-4" />Gantt</TabsTrigger>
        </TabsList>
        <TabsContent value="detailed" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><List className="text-[#1e3269]" />Lista Detallada de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#1e3269] text-white">
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
                          <ListChecks className="h-8 w-8 mb-2 text-[#1e3269]" />
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
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><ListChecks className="text-[#1e3269]" />Resumen de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700 text-lg">Total de tareas: {filteredTareas.length}</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><BarChart2 className="text-[#1e3269]" />Estado de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1e3269" name="Cantidad" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gantt" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl relative">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><Calendar className="text-[#1e3269]" />Calendario de Gantt</CardTitle>
            </CardHeader>
            <CardContent>
              <GanttCalendar tasks={ganttCalendarTasks} />
              <Button className="absolute top-6 right-6 bg-[#1e3269] text-white rounded-full shadow-lg hover:bg-[#1a2b5b] transition" size="icon"><Plus className="h-5 w-5" /></Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartamentoFinanzasTareas; 