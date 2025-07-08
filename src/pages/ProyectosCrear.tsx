import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Calendar, PlusCircle, List, TrendingUp, Users, CheckCircle, Download, Printer, Share2, ArrowUpRight } from 'lucide-react';

const recentProjects = [
  { name: 'Torre Premium I', type: 'Residencial', status: 'Activo', start: '2024-01-10', end: '2025-01-10' },
  { name: 'Residencial Vista', type: 'Residencial', status: 'Finalizado', start: '2022-03-01', end: '2023-06-15' },
  { name: 'Edificio Central', type: 'Comercial', status: 'En Progreso', start: '2023-07-01', end: '2024-12-31' },
];

const total = 12;
const activos = 7;
const finalizados = 5;
const nuevos = 2;
const enProgreso = 3;
const percentFinalizados = Math.round((finalizados / total) * 100);

const kpiCards = [
  {
    label: 'Total Proyectos',
    value: total,
    icon: Users,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '+1 este mes',
  },
  {
    label: 'Activos',
    value: activos,
    icon: CheckCircle,
    color: 'bg-green-50 border-green-200 text-green-700',
    trend: '+1 este mes',
  },
  {
    label: 'En Progreso',
    value: enProgreso,
    icon: TrendingUp,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    trend: 'Sin cambios',
  },
  {
    label: 'Finalizados',
    value: finalizados,
    icon: Calendar,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    trend: '+1 este mes',
  },
  {
    label: '% Finalizados',
    value: percentFinalizados + '%',
    icon: CheckCircle,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    trend: '+5% vs mes anterior',
  },
  {
    label: 'Nuevos este año',
    value: nuevos,
    icon: PlusCircle,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    trend: '+2 este año',
  },
];

const statusOptions = ['Activo', 'Finalizado', 'En Progreso', 'Planificado'];
const typeOptions = ['Residencial', 'Comercial', 'Industrial'];

const ProyectosCrear: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    start: '',
    end: '',
    status: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to the backend
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <PlusCircle className="text-white h-6 w-6" />
              </div>
              Crear Nuevo Proyecto
            </h1>
            <p className="text-gray-600">Registra y gestiona nuevos proyectos de manera eficiente</p>
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
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
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
      {/* Project Creation Form */}
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-[#1e3269] text-lg flex items-center gap-2"><PlusCircle className="text-[#1e3269]" /> Nuevo Proyecto</CardTitle>
          <p className="text-gray-500 text-sm mt-1">Completa los campos obligatorios para crear un nuevo proyecto</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del Proyecto <span className="text-red-500">*</span></label>
              <Input value={form.name} onChange={e => handleChange('name', e.target.value)} required placeholder="Ej: Torre Premium II" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo <span className="text-red-500">*</span></label>
              <Select value={form.type} onValueChange={v => handleChange('type', v)}>
                <SelectTrigger><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger>
                <SelectContent>
                  {typeOptions.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Fecha de Inicio <span className="text-red-500">*</span></label>
                <Input type="date" value={form.start} onChange={e => handleChange('start', e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Fecha de Fin <span className="text-red-500">*</span></label>
                <Input type="date" value={form.end} onChange={e => handleChange('end', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estado <span className="text-red-500">*</span></label>
              <Select value={form.status} onValueChange={v => handleChange('status', v)}>
                <SelectTrigger><SelectValue placeholder="Selecciona un estado" /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map(s => <SelectItem value={s} key={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-[#1e3269] hover:bg-[#16224a] text-white mt-2">Crear Proyecto</Button>
            {submitted && <div className="text-green-600 text-center mt-2">¡Proyecto creado exitosamente! (simulado)</div>}
          </form>
        </CardContent>
      </Card>
      {/* Recent Projects List */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-2">
          <List className="text-[#1e3269]" />
          <CardTitle className="text-[#1e3269] text-lg">Proyectos Recientes</CardTitle>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Download className="h-4 w-4" /> Exportar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Printer className="h-4 w-4" /> Imprimir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Share2 className="h-4 w-4" /> Compartir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {recentProjects.map((p, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-700">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.type} • {p.start} - {p.end}</div>
                </div>
                <Badge variant={p.status === 'Activo' ? 'success' : p.status === 'Finalizado' ? 'secondary' : p.status === 'En Progreso' ? 'warning' : 'outline'}>{p.status}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProyectosCrear; 