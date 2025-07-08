import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileCheck, FileClock, FileX, FileText, Filter, Download, Printer, Share2, AlertTriangle, CalendarDays, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
// import { DatePicker } from '@/components/ui/datepicker'; // Uncomment if you have a DatePicker component
import { Progress } from '@/components/ui/progress';

const licenses = [
  { id: 1, tipo: 'Construcción', nombre: 'Licencia Municipal', estado: 'Aprobada', fecha: '2024-01-15', vencimiento: '2025-01-15', proyecto: 'Torre Premium I' },
  { id: 2, tipo: 'Ambiental', nombre: 'Permiso Ambiental', estado: 'Pendiente', fecha: '2024-02-10', vencimiento: '2025-02-10', proyecto: 'Residencial Vista' },
  { id: 3, tipo: 'Bomberos', nombre: 'Certificado Bomberos', estado: 'Vencida', fecha: '2023-03-01', vencimiento: '2024-03-01', proyecto: 'Edificio Central' },
  { id: 4, tipo: 'Construcción', nombre: 'Permiso de Obra', estado: 'Aprobada', fecha: '2024-01-20', vencimiento: '2025-01-20', proyecto: 'Torre Premium I' },
  { id: 5, tipo: 'Ambiental', nombre: 'Certificado Ambiental', estado: 'Pendiente', fecha: '2024-04-05', vencimiento: '2025-04-05', proyecto: 'Residencial Sur' },
];
const allEstados = ['Aprobada', 'Pendiente', 'Vencida'];
const allTipos = Array.from(new Set(licenses.map(l => l.tipo)));
const allProyectos = Array.from(new Set(licenses.map(l => l.proyecto))).filter(Boolean);

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

const today = new Date();
const daysBetween = (date1: Date, date2: Date) => Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
const licensesExpiringSoon = licenses.filter(l => {
  const venc = new Date(l.vencimiento);
  return l.estado !== 'Vencida' && daysBetween(today, venc) <= 30 && daysBetween(today, venc) >= 0;
});
const expiredLicenses = licenses.filter(l => l.estado === 'Vencida');
const percentAprobadas = Math.round((licenses.filter(l => l.estado === 'Aprobada').length / licenses.length) * 100);

const kpiCards = [
  {
    label: 'Total Licencias',
    value: licenses.length,
    icon: CalendarDays,
    color: 'bg-blue-100 text-blue-700',
    trend: '+1 este mes',
  },
  {
    label: 'Aprobadas',
    value: licenses.filter(l => l.estado === 'Aprobada').length,
    icon: FileCheck,
    color: 'bg-green-100 text-green-700',
    trend: '+1 este mes',
  },
  {
    label: 'Pendientes',
    value: licenses.filter(l => l.estado === 'Pendiente').length,
    icon: FileClock,
    color: 'bg-yellow-100 text-yellow-700',
    trend: 'Sin cambios',
  },
  {
    label: 'Vencidas',
    value: licenses.filter(l => l.estado === 'Vencida').length,
    icon: FileX,
    color: 'bg-red-100 text-red-700',
    trend: '+1 este mes',
  },
  {
    label: 'Por vencer (30d)',
    value: licensesExpiringSoon.length,
    icon: FileClock,
    color: 'bg-orange-100 text-orange-700',
    trend: '+1 este mes',
  },
  {
    label: '% Aprobadas',
    value: percentAprobadas + '%',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-700',
    trend: '+5% vs mes anterior',
  },
];

const ProyectosLicencias: React.FC = () => {
  const [estadoFilter, setEstadoFilter] = useState<string | undefined>(undefined);
  const [tipoFilter, setTipoFilter] = useState<string | undefined>(undefined);
  const [proyectoFilter, setProyectoFilter] = useState<string | undefined>(undefined);
  // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const filteredLicenses = licenses.filter(l =>
    (!estadoFilter || l.estado === estadoFilter) &&
    (!tipoFilter || l.tipo === tipoFilter) &&
    (!proyectoFilter || l.proyecto === proyectoFilter)
    // && (dateRange[0] && dateRange[1] ? (new Date(l.fecha) >= dateRange[0] && new Date(l.vencimiento) <= dateRange[1]) : true)
  );

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#1e3269] rounded-lg">
                <FileText className="text-white h-6 w-6" />
              </div>
              Licencias y Permisos
            </h1>
            <p className="text-gray-600">Gestión y control de licencias y permisos de los proyectos</p>
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
          <Select value={estadoFilter} onValueChange={v => setEstadoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allEstados.map(e => <SelectItem value={e} key={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={tipoFilter} onValueChange={v => setTipoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allTipos.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={proyectoFilter} onValueChange={v => setProyectoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Proyecto" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {allProyectos.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          {(estadoFilter || tipoFilter || proyectoFilter) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setEstadoFilter(undefined); setTipoFilter(undefined); setProyectoFilter(undefined); }}
              className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white"
            >
              Limpiar Filtros
            </Button>
          )}
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
      {/* Next Expirations & Risk Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <FileClock className="text-[#1e3269]" /> Próximos Vencimientos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {licensesExpiringSoon.length === 0 ? (
              <div className="text-gray-500">No hay licencias próximas a vencer.</div>
            ) : (
              <ul className="space-y-2">
                {licensesExpiringSoon.map((l, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Badge variant="secondary" className="min-w-[90px] text-center">{l.estado}</Badge>
                    <span className="font-medium text-gray-800">{l.nombre}</span>
                    <span className="text-gray-500 text-sm">{l.vencimiento}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Alertas de Riesgo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expiredLicenses.length === 0 ? (
              <div className="text-gray-500">No hay licencias vencidas.</div>
            ) : (
              <ul className="space-y-2">
                {expiredLicenses.map((l, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Badge variant="destructive" className="min-w-[90px] text-center">{l.estado}</Badge>
                    <span className="font-medium text-gray-800">{l.nombre}</span>
                    <span className="text-gray-500 text-sm">{l.vencimiento}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Licenses Table */}
      <Card className="bg-white rounded-xl shadow border p-4">
        <div className="flex justify-between items-center mb-2">
          <Button className="bg-[#1e3269] hover:bg-[#16224a] text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-colors">
            Agregar Nuevo
          </Button>
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
      </Card>
    </div>
  );
};

export default ProyectosLicencias; 