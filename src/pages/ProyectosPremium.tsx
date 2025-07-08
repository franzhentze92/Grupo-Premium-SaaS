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
  BarChart3
} from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

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
  'Alta': 'bg-red-100 text-red-800 border-red-200',
  'Media': 'bg-orange-100 text-orange-800 border-orange-200',
  'Baja': 'bg-blue-100 text-blue-800 border-blue-200',
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
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      trend: '+2 este mes'
    },
    {
      label: 'En Progreso',
      value: enProgreso,
      icon: TrendingUp,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      trend: '+1 esta semana'
    },
    {
      label: 'Avance Promedio',
      value: `${avancePromedio}%`,
      icon: BarChart3,
      color: 'bg-green-50 border-green-200 text-green-700',
      trend: '+5% vs mes anterior'
    },
    {
      label: 'Presupuesto Utilizado',
      value: `${Math.round((presupuestoGastado / presupuestoTotal) * 100)}%`,
      icon: DollarSign,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      trend: 'Dentro del presupuesto'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="text-[#8cb43a]" />
            Proyectos Premium
          </h2>
          <p className="text-gray-600 mt-1">Gestiona los proyectos de mayor valor y prioridad</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="flex items-center gap-2"
          >
            <Table className="h-4 w-4" />
            Tabla
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            Tarjetas
          </Button>
          <Button className="gap-2 bg-[#8cb43a] hover:bg-[#7ca02e] text-white">
            <Plus size={18} />
            Crear Proyecto
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={idx} className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${kpi.color.split(' ')[0]}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-green-600">{kpi.trend}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800 mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="text-[#8cb43a] h-5 w-5" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={v => setStatusFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Estados</SelectItem>
              {allStatuses.map(status => (
                <SelectItem value={status} key={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={presupuestoFilter} onValueChange={v => setPresupuestoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Presupuesto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Presupuestos</SelectItem>
              {allPresupuestos.map(pres => (
                <SelectItem value={pres} key={pres}>{pres}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={prioridadFilter} onValueChange={v => setPrioridadFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Prioridades</SelectItem>
              {allPrioridades.map(pri => (
                <SelectItem value={pri} key={pri}>{pri}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(statusFilter || presupuestoFilter || prioridadFilter || searchTerm) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => { 
                setStatusFilter(undefined); 
                setPresupuestoFilter(undefined); 
                setPrioridadFilter(undefined);
                setSearchTerm('');
              }}
              className="text-[#8cb43a] border-[#8cb43a] hover:bg-[#8cb43a] hover:text-white"
            >
              Limpiar Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Projects Content */}
      {viewMode === 'table' ? (
        // Table View
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Proyecto</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold">Avance</TableHead>
                <TableHead className="font-semibold">Presupuesto</TableHead>
                <TableHead className="font-semibold">Prioridad</TableHead>
                <TableHead className="font-semibold">Equipo</TableHead>
                <TableHead className="font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className={`inline-block w-3 h-3 rounded-full ${project.color}`}></span>
                      <div>
                        <div className="font-semibold text-gray-800">{project.name}</div>
                        <div className="text-sm text-gray-600">{project.ubicacion}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.avance} className="w-20 h-2" />
                      <span className="text-sm font-medium">{project.avance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant={presupuestoColors[project.presupuesto]}>{project.presupuesto}</Badge>
                      <div className="text-xs text-gray-600 mt-1">
                        {project.presupuestoGastado} / {project.presupuestoTotal}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${prioridadColors[project.prioridad]}`}>
                      {project.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{project.equipo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
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
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No hay proyectos que coincidan con los filtros seleccionados.</p>
              <p className="text-gray-500 text-sm mt-2">Intenta ajustar los filtros para ver más resultados.</p>
            </div>
          )}
        </div>
      ) : (
        // Cards View
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
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProyectosPremium; 