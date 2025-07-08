import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Calendar, PlusCircle, List } from 'lucide-react';

const recentProjects = [
  { name: 'Torre Premium I', type: 'Residencial', status: 'Activo', start: '2024-01-10', end: '2025-01-10' },
  { name: 'Residencial Vista', type: 'Residencial', status: 'Finalizado', start: '2022-03-01', end: '2023-06-15' },
  { name: 'Edificio Central', type: 'Comercial', status: 'Activo', start: '2023-07-01', end: '2024-12-31' },
];

const kpiCards = [
  { label: 'Total Proyectos', value: 12, color: 'info' },
  { label: 'Activos', value: 7, color: 'success' },
  { label: 'Finalizados', value: 5, color: 'secondary' },
  { label: 'Nuevos este año', value: 2, color: 'warning' },
];

const statusOptions = ['Activo', 'Finalizado', 'Planificado'];
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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <PlusCircle className="text-[#8cb43a]" /> Crear Nuevo Proyecto
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
      {/* Project Creation Form */}
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-blue-800 text-lg flex items-center gap-2"><PlusCircle className="text-blue-400" /> Nuevo Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del Proyecto</label>
              <Input value={form.name} onChange={e => handleChange('name', e.target.value)} required placeholder="Ej: Torre Premium II" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <Select value={form.type} onValueChange={v => handleChange('type', v)}>
                <SelectTrigger><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger>
                <SelectContent>
                  {typeOptions.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
                <Input type="date" value={form.start} onChange={e => handleChange('start', e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Fecha de Fin</label>
                <Input type="date" value={form.end} onChange={e => handleChange('end', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <Select value={form.status} onValueChange={v => handleChange('status', v)}>
                <SelectTrigger><SelectValue placeholder="Selecciona un estado" /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map(s => <SelectItem value={s} key={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-[#8cb43a] hover:bg-[#7ca02e] text-white mt-2">Crear Proyecto</Button>
            {submitted && <div className="text-green-600 text-center mt-2">¡Proyecto creado exitosamente! (simulado)</div>}
          </form>
        </CardContent>
      </Card>
      {/* Recent Projects List */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-2">
          <List className="text-blue-400" />
          <CardTitle className="text-blue-800 text-lg">Proyectos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {recentProjects.map((p, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-700">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.type} • {p.start} - {p.end}</div>
                </div>
                <Badge variant={p.status === 'Activo' ? 'success' : p.status === 'Finalizado' ? 'secondary' : 'warning'}>{p.status}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProyectosCrear; 