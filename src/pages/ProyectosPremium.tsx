import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Building2, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  DownloadIcon,
  Printer,
  Share2,
  X
} from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const mockProjects = [
  {
    id: 1,
    name: 'Torre Premium I',
    status: 'En Progreso',
    avance: 65,
    presupuesto: 'Alta',
    color: 'bg-green-500',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-12-31',
    equipo: 12,
    presupuestoTotal: '$2,500,000',
    presupuestoGastado: '$1,625,000',
    prioridad: 'Alta',
    ubicacion: 'Centro Comercial',
    descripcion: 'Edificio residencial de lujo con 25 pisos'
  },
  {
    id: 2,
    name: 'Residencial Vista',
    status: 'Planificado',
    avance: 10,
    presupuesto: 'Media',
    color: 'bg-yellow-500',
    fechaInicio: '2024-03-01',
    fechaFin: '2025-06-30',
    equipo: 8,
    presupuestoTotal: '$1,800,000',
    presupuestoGastado: '$180,000',
    prioridad: 'Media',
    ubicacion: 'Zona Residencial Norte',
    descripcion: 'Complejo residencial con 120 unidades'
  },
  {
    id: 3,
    name: 'Edificio Central',
    status: 'Finalizado',
    avance: 100,
    presupuesto: 'Alta',
    color: 'bg-blue-500',
    fechaInicio: '2023-06-01',
    fechaFin: '2024-02-28',
    equipo: 15,
    presupuestoTotal: '$3,200,000',
    presupuestoGastado: '$3,200,000',
    prioridad: 'Alta',
    ubicacion: 'Centro de Negocios',
    descripcion: 'Edificio corporativo de 20 pisos'
  },
  {
    id: 4,
    name: 'Residencial Sur',
    status: 'En Progreso',
    avance: 40,
    presupuesto: 'Baja',
    color: 'bg-purple-500',
    fechaInicio: '2024-02-01',
    fechaFin: '2024-11-30',
    equipo: 6,
    presupuestoTotal: '$950,000',
    presupuestoGastado: '$380,000',
    prioridad: 'Baja',
    ubicacion: 'Zona Residencial Sur',
    descripcion: 'Complejo de 80 unidades familiares'
  },
  {
    id: 5,
    name: 'Centro Comercial Plaza',
    status: 'Planificado',
    avance: 5,
    presupuesto: 'Alta',
    color: 'bg-orange-500',
    fechaInicio: '2024-05-01',
    fechaFin: '2025-12-31',
    equipo: 20,
    presupuestoTotal: '$4,500,000',
    presupuestoGastado: '$225,000',
    prioridad: 'Alta',
    ubicacion: 'Zona Comercial Este',
    descripcion: 'Centro comercial con 150 locales'
  }
];

const statusColors: Record<string, BadgeVariant> = {
  'En Progreso': 'warning',
  'Planificado': 'secondary',
  'Finalizado': 'success',
};

const presupuestoColors: Record<string, BadgeVariant> = {
  'Alta': 'info',
  'Media': 'warning',
  'Baja': 'secondary',
};

const prioridadColors: Record<string, string> = {
  'Alta': 'bg-gold-100 text-gold-800 border-gold-200',
  'Media': 'bg-[#fbbf24]/20 text-[#b58500] border-[#fbbf24]/40',
  'Baja': 'bg-[#1e3269]/10 text-[#1e3269] border-[#1e3269]/30',
};

const allStatuses = ['En Progreso', 'Planificado', 'Finalizado'];
const allPresupuestos = ['Alta', 'Media', 'Baja'];
const allPrioridades = ['Alta', 'Media', 'Baja'];

const ProyectosPremium: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [presupuestoFilter, setPresupuestoFilter] = useState<string | undefined>(undefined);
  const [prioridadFilter, setPrioridadFilter] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredProjects = mockProjects.filter(p => {
    const matchesStatus = !statusFilter || p.status === statusFilter;
    const matchesPresupuesto = !presupuestoFilter || p.presupuesto === presupuestoFilter;
    const matchesPrioridad = !prioridadFilter || p.prioridad === prioridadFilter;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPresupuesto && matchesPrioridad && matchesSearch;
  });

  // KPI calculations
  const total = mockProjects.length;
  const enProgreso = mockProjects.filter(p => p.status === 'En Progreso').length;
  const planificados = mockProjects.filter(p => p.status === 'Planificado').length;
  const finalizados = mockProjects.filter(p => p.status === 'Finalizado').length;
  const avancePromedio = total > 0 ? Math.round(mockProjects.reduce((acc, p) => acc + p.avance, 0) / total) : 0;
  const presupuestoTotal = mockProjects.reduce((acc, p) => acc + parseFloat(p.presupuestoTotal.replace(/[$,]/g, '')), 0);
  const presupuestoGastado = mockProjects.reduce((acc, p) => acc + parseFloat(p.presupuestoGastado.replace(/[$,]/g, '')), 0);

  const kpiCards = [
    {
      label: 'Total Proyectos',
      value: total,
      icon: Building2,
      color: 'bg-blue-100 text-blue-700',
      trend: '+2 este mes'
    },
    {
      label: 'En Progreso',
      value: enProgreso,
      icon: TrendingUp,
      color: 'bg-yellow-100 text-yellow-700',
      trend: '+1 esta semana'
    },
    {
      label: 'Avance Promedio',
      value: `${avancePromedio}%`,
      icon: BarChart3,
      color: 'bg-purple-100 text-purple-700',
      trend: '+5% vs mes anterior'
    },
    {
      label: 'Presupuesto Utilizado',
      value: `${Math.round((presupuestoGastado / presupuestoTotal) * 100)}%`,
      icon: DollarSign,
      color: 'bg-green-100 text-green-700',
      trend: 'Dentro del presupuesto'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <span className="p-2 bg-[#1e3269] rounded-lg"><Building2 className="text-white h-6 w-6" /></span>
              Proyectos de Premium
            </h1>
            <p className="text-gray-600">Gestión y monitoreo de proyectos premium en curso</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <DownloadIcon className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#1e3269] text-[#1e3269] hover:bg-[#1e3269] hover:text-white">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-gold-500" />
                    <p className="text-xs text-gray-500">{kpi.trend}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color.split(' ').filter(cls => cls.startsWith('text-')).join(' ')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Filter className="text-[#1e3269]" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={statusFilter ?? 'all'} onValueChange={v => setStatusFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {allStatuses.map(s => <SelectItem value={s} key={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={presupuestoFilter ?? 'all'} onValueChange={v => setPresupuestoFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Presupuesto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {allPresupuestos.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={prioridadFilter ?? 'all'} onValueChange={v => setPrioridadFilter(v === 'all' ? undefined : v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Prioridad" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {allPrioridades.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-64"
            />
            {(statusFilter || presupuestoFilter || prioridadFilter || searchTerm) && (
              <Button variant="outline" size="sm" onClick={() => { setStatusFilter(undefined); setPresupuestoFilter(undefined); setPrioridadFilter(undefined); setSearchTerm(''); }} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={viewMode} onValueChange={v => setViewMode(v as 'table' | 'cards')} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table" className="flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Tabla</TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2 data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium">Tarjetas</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl mt-4">
            <CardContent>
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-gray-50 text-gray-700">
                    <TableHead className="px-4 w-56">Proyecto</TableHead>
                    <TableHead className="px-4 w-24 whitespace-nowrap">Estado</TableHead>
                    <TableHead className="px-4 w-20 whitespace-nowrap">Avance</TableHead>
                    <TableHead className="px-4 w-32 whitespace-nowrap">Presupuesto</TableHead>
                    <TableHead className="px-4 w-28 whitespace-nowrap">Prioridad</TableHead>
                    <TableHead className="px-4 w-28 whitespace-nowrap">Fechas</TableHead>
                    <TableHead className="px-4 w-20 whitespace-nowrap">Equipo</TableHead>
                    <TableHead className="px-4 w-32">Ubicación</TableHead>
                    <TableHead className="px-4 w-32 whitespace-nowrap">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} className="hover:bg-gray-50">
                      <TableCell className="px-4 w-56">
                        <div className="flex items-center gap-3">
                          <span className={`inline-block w-3 h-3 rounded-full ${project.color}`}></span>
                          <div>
                            <div className="font-semibold text-gray-800">{project.name}</div>
                            <div className="text-sm text-gray-600">{project.ubicacion}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 w-24 whitespace-nowrap truncate">
                        <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                      </TableCell>
                      <TableCell className="px-4 w-20 whitespace-nowrap truncate">
                        <div className="flex items-center gap-2">
                          <Progress value={project.avance} className="w-20 h-2" />
                          <span className="text-sm font-medium">{project.avance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 w-32 whitespace-nowrap truncate">
                        <div>
                          <Badge variant={presupuestoColors[project.presupuesto]}>{project.presupuesto}</Badge>
                          <div className="text-xs text-gray-600 mt-1">
                            {project.presupuestoGastado} / {project.presupuestoTotal}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 w-28 whitespace-nowrap truncate">
                        <Badge className={`text-xs ${prioridadColors[project.prioridad]}`}>{project.prioridad}</Badge>
                      </TableCell>
                      <TableCell className="px-4 w-28 whitespace-nowrap truncate">
                        <div className="text-sm text-gray-700">
                          {project.fechaInicio} - {project.fechaFin}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 w-20 whitespace-nowrap truncate">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{project.equipo}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 w-32">
                        <div className="text-sm text-gray-700">{project.ubicacion}</div>
                      </TableCell>
                      <TableCell className="px-4 w-32 whitespace-nowrap truncate">
                        <div className="flex items-center gap-2">
                          <Link to="/proyectos/detalle">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards">
          {/* Cards View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block w-3 h-3 rounded-full ${project.color}`}></span>
                      <div>
                        <CardTitle className="text-lg text-gray-800">{project.name}</CardTitle>
                        <p className="text-sm text-gray-600">{project.ubicacion}</p>
                      </div>
                    </div>
                    <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{project.descripcion}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso</span>
                      <span className="text-sm font-bold text-gray-800">{project.avance}%</span>
                    </div>
                    <Progress value={project.avance} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{project.equipo} personas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{project.fechaFin}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${prioridadColors[project.prioridad]}`}>
                      {project.prioridad}
                    </Badge>
                    <Badge variant={presupuestoColors[project.presupuesto]}>
                      {project.presupuesto}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-600">
                      {project.presupuestoGastado} / {project.presupuestoTotal}
                    </div>
                    <div className="flex items-center gap-1">
                      <Link to="/proyectos/detalle">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProyectosPremium; 