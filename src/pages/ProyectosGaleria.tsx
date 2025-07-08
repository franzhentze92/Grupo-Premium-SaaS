import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Filter, Eye, Download, Printer, Share2, CalendarDays, TrendingUp, FileText, ArrowUpRight } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const gallery = [
  { id: 1, type: 'Plano', project: 'Torre Premium I', name: 'Plano Arquitectónico', date: '2024-01-10', url: '/public/placeholder.svg' },
  { id: 2, type: 'Foto', project: 'Torre Premium I', name: 'Avance de Obra', date: '2024-02-15', url: '/public/placeholder.svg' },
  { id: 3, type: 'Plano', project: 'Residencial Vista', name: 'Plano Estructural', date: '2024-03-01', url: '/public/placeholder.svg' },
  { id: 4, type: 'Foto', project: 'Residencial Vista', name: 'Terreno', date: '2024-03-10', url: '/public/placeholder.svg' },
  { id: 5, type: 'Foto', project: 'Edificio Central', name: 'Entrega Final', date: '2024-04-05', url: '/public/placeholder.svg' },
];

const allTypes = ['Plano', 'Foto'];
const allProjects = Array.from(new Set(gallery.map(g => g.project)));

const today = new Date();
const isNewThisMonth = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};
const newThisMonth = gallery.filter(g => isNewThisMonth(g.date)).length;
const percentPlanos = Math.round((gallery.filter(g => g.type === 'Plano').length / gallery.length) * 100);

const kpiCards = [
  {
    label: 'Total Archivos',
    value: gallery.length,
    icon: CalendarDays,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '+1 este mes',
  },
  {
    label: 'Planos',
    value: gallery.filter(g => g.type === 'Plano').length,
    icon: FileText,
    color: 'bg-green-50 border-green-200 text-green-700',
    trend: '+1 este mes',
  },
  {
    label: 'Fotos',
    value: gallery.filter(g => g.type === 'Foto').length,
    icon: ImageIcon,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    trend: 'Sin cambios',
  },
  {
    label: 'Nuevos este mes',
    value: newThisMonth,
    icon: TrendingUp,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    trend: '+2 este mes',
  },
  {
    label: '% Planos',
    value: percentPlanos + '%',
    icon: FileText,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    trend: '+5% vs mes anterior',
  },
];

const ProyectosGaleria: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [projectFilter, setProjectFilter] = useState<string | undefined>(undefined);
  // Placeholder for modal/preview
  const [preview, setPreview] = useState<{ open: boolean; item?: typeof gallery[0] }>({ open: false });

  const filteredGallery = gallery.filter(g =>
    (!typeFilter || g.type === typeFilter) &&
    (!projectFilter || g.project === projectFilter)
  );

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <ImageIcon className="text-white h-6 w-6" />
              </div>
              Galería de Planos y Fotos
            </h1>
            <p className="text-gray-600">Visualiza, filtra y gestiona los planos y fotos de tus proyectos</p>
          </div>
        </div>
      </div>
      {/* Filters Section */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Filter className="text-[#1e3269]" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-center">
          <Select value={typeFilter} onValueChange={v => setTypeFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allTypes.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={projectFilter} onValueChange={v => setProjectFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Proyecto" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allProjects.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          {(typeFilter || projectFilter) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setTypeFilter(undefined); setProjectFilter(undefined); }}
              className="flex items-center gap-2"
            >
              Limpiar Filtros
            </Button>
          )}
        </CardContent>
      </Card>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
      {/* Gallery Grid in Card */}
      <Card className="bg-white rounded-xl shadow border p-4">
        <div className="flex justify-between items-center mb-4">
          <Button className="bg-[#1e3269] hover:bg-[#16224a] text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-colors">Agregar Nuevo</Button>
          <div className="flex gap-2">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((g, idx) => (
            <Card key={g.id} className="p-0 overflow-hidden shadow hover:shadow-lg transition flex flex-col">
              <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                <img src={g.url} alt={g.name} className="object-contain h-full w-full" />
                <Badge variant={g.type === 'Plano' ? 'success' : 'warning'} className="absolute top-2 left-2 px-3 py-1 rounded-full">
                  {g.type}
                </Badge>
              </div>
              <CardContent className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <div className="font-semibold text-gray-700 mb-1">{g.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{g.project} • {g.date}</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="secondary" className="gap-1" onClick={() => setPreview({ open: true, item: g })}><Eye size={16} /> Ver</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredGallery.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">No hay archivos que coincidan con los filtros.</div>
          )}
        </div>
      </Card>
      {/* Modal/Preview placeholder */}
      {/* {preview.open && (
        <YourModalComponent item={preview.item} onClose={() => setPreview({ open: false })} />
      )} */}
    </div>
  );
};

export default ProyectosGaleria; 