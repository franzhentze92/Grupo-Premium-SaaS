import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Filter, Eye } from 'lucide-react';
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

const kpiCards = [
  { label: 'Total Archivos', value: gallery.length, color: 'info' },
  { label: 'Planos', value: gallery.filter(g => g.type === 'Plano').length, color: 'success' },
  { label: 'Fotos', value: gallery.filter(g => g.type === 'Foto').length, color: 'warning' },
  { label: 'Recientes', value: gallery.filter(g => new Date(g.date) > new Date('2024-03-01')).length, color: 'secondary' },
];

const ProyectosGaleria: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [projectFilter, setProjectFilter] = useState<string | undefined>(undefined);

  const filteredGallery = gallery.filter(g =>
    (!typeFilter || g.type === typeFilter) &&
    (!projectFilter || g.project === projectFilter)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <ImageIcon className="text-[#8cb43a]" /> Galería de Planos y Fotos
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
          <Select value={typeFilter} onValueChange={v => setTypeFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allTypes.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select value={projectFilter} onValueChange={v => setProjectFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Proyecto" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allProjects.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {(typeFilter || projectFilter) && (
          <button className="ml-2 text-sm text-blue-600 underline" onClick={() => { setTypeFilter(undefined); setProjectFilter(undefined); }}>Limpiar Filtros</button>
        )}
      </div>
      {/* Gallery Grid */}
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
                <Button size="sm" variant="secondary" className="gap-1"><Eye size={16} /> Ver</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredGallery.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-8">No hay archivos que coincidan con los filtros.</div>
        )}
      </div>
    </div>
  );
};

export default ProyectosGaleria; 