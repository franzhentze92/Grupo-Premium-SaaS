import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileCheck, FileClock, FileX, FileText, Filter } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
// import { DatePicker } from '@/components/ui/datepicker'; // Uncomment if you have a DatePicker component

const licenses = [
  { id: 1, tipo: 'Construcción', nombre: 'Licencia Municipal', estado: 'Aprobada', fecha: '2024-01-15', vencimiento: '2025-01-15' },
  { id: 2, tipo: 'Ambiental', nombre: 'Permiso Ambiental', estado: 'Pendiente', fecha: '2024-02-10', vencimiento: '2025-02-10' },
  { id: 3, tipo: 'Bomberos', nombre: 'Certificado Bomberos', estado: 'Vencida', fecha: '2023-03-01', vencimiento: '2024-03-01' },
  { id: 4, tipo: 'Construcción', nombre: 'Permiso de Obra', estado: 'Aprobada', fecha: '2024-01-20', vencimiento: '2025-01-20' },
  { id: 5, tipo: 'Ambiental', nombre: 'Certificado Ambiental', estado: 'Pendiente', fecha: '2024-04-05', vencimiento: '2025-04-05' },
];

const statusBadge: Record<string, string> = {
  'Aprobada': 'success',
  'Pendiente': 'warning',
  'Vencida': 'destructive',
};
const statusIcon: Record<string, React.ReactNode> = {
  'Aprobada': <FileCheck className="text-green-600" size={18} />,
  'Pendiente': <FileClock className="text-yellow-600" size={18} />,
  'Vencida': <FileX className="text-red-600" size={18} />,
};
const allEstados = ['Aprobada', 'Pendiente', 'Vencida'];
const allTipos = Array.from(new Set(licenses.map(l => l.tipo)));

const kpiCards = [
  { label: 'Total Licencias', value: licenses.length, color: 'info' },
  { label: 'Aprobadas', value: licenses.filter(l => l.estado === 'Aprobada').length, color: 'success' },
  { label: 'Pendientes', value: licenses.filter(l => l.estado === 'Pendiente').length, color: 'warning' },
  { label: 'Vencidas', value: licenses.filter(l => l.estado === 'Vencida').length, color: 'destructive' },
];

const ProyectosLicencias: React.FC = () => {
  const [estadoFilter, setEstadoFilter] = useState<string | undefined>(undefined);
  const [tipoFilter, setTipoFilter] = useState<string | undefined>(undefined);
  // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const filteredLicenses = licenses.filter(l =>
    (!estadoFilter || l.estado === estadoFilter) &&
    (!tipoFilter || l.tipo === tipoFilter)
    // && (dateRange[0] && dateRange[1] ? (new Date(l.fecha) >= dateRange[0] && new Date(l.vencimiento) <= dateRange[1]) : true)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <FileText className="text-[#8cb43a]" /> Licencias y Permisos
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
          <Select value={tipoFilter} onValueChange={v => setTipoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allTipos.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {/*
        <div className="flex items-center gap-2">
          <DatePicker value={dateRange} onChange={setDateRange} range />
        </div>
        */}
        {(estadoFilter || tipoFilter) && (
          <button className="ml-2 text-sm text-blue-600 underline" onClick={() => { setEstadoFilter(undefined); setTipoFilter(undefined); }}>Limpiar Filtros</button>
        )}
      </div>
      {/* Licenses Table */}
      <div className="flex justify-end mb-2">
        <Button variant="default">Agregar Nuevo</Button>
      </div>
      <div className="bg-white rounded-xl shadow border p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Emisión</TableHead>
              <TableHead>Vencimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLicenses.map((l, idx) => (
              <TableRow key={l.id}>
                <TableCell className="flex items-center gap-2">{l.tipo}</TableCell>
                <TableCell>{l.nombre}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    {statusIcon[l.estado]} <Badge variant={statusBadge[l.estado] as any}>{l.estado}</Badge>
                  </span>
                </TableCell>
                <TableCell>{l.fecha}</TableCell>
                <TableCell>{l.vencimiento}</TableCell>
              </TableRow>
            ))}
            {filteredLicenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400">No hay licencias que coincidan con los filtros.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProyectosLicencias; 