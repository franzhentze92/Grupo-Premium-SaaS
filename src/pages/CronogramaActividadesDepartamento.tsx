import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Filter, List, Users, Calendar, Clock, CheckCircle, AlertCircle, PlayCircle, TrendingUp, BarChart3 } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const activities = [
  { id: 1, name: 'Reunión de Kickoff', departamento: 'Finanzas', estado: 'Completada', fecha: '2024-01-10', prioridad: 'Alta', duracion: '2 horas' },
  { id: 2, name: 'Entrega de Planos', departamento: 'Arquitectura', estado: 'En Progreso', fecha: '2024-02-15', prioridad: 'Media', duracion: '1 día' },
  { id: 3, name: 'Inspección de Obra', departamento: 'Operaciones', estado: 'Pendiente', fecha: '2024-03-01', prioridad: 'Alta', duracion: '4 horas' },
  { id: 4, name: 'Revisión de Presupuesto', departamento: 'Finanzas', estado: 'Completada', fecha: '2024-03-10', prioridad: 'Alta', duracion: '6 horas' },
  { id: 5, name: 'Presentación a Clientes', departamento: 'Mercadeo', estado: 'En Progreso', fecha: '2024-04-05', prioridad: 'Media', duracion: '3 horas' },
  { id: 6, name: 'Auditoría Interna', departamento: 'Administración', estado: 'Pendiente', fecha: '2024-04-20', prioridad: 'Baja', duracion: '2 días' },
  { id: 7, name: 'Campaña Publicitaria', departamento: 'Mercadeo', estado: 'Completada', fecha: '2024-05-01', prioridad: 'Alta', duracion: '1 semana' },
];

const allDepartamentos = Array.from(new Set(activities.map(a => a.departamento)));
const allEstados = Array.from(new Set(activities.map(a => a.estado)));

const kpiCards = [
  { 
    label: 'Total Actividades', 
    value: activities.length, 
    icon: BarChart3,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '+12%'
  },
  { 
    label: 'Completadas', 
    value: activities.filter(a => a.estado === 'Completada').length, 
    icon: CheckCircle,
    color: 'bg-green-50 border-green-200 text-green-700',
    trend: '+8%'
  },
  { 
    label: 'En Progreso', 
    value: activities.filter(a => a.estado === 'En Progreso').length, 
    icon: PlayCircle,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    trend: '+5%'
  },
  { 
    label: 'Pendientes', 
    value: activities.filter(a => a.estado === 'Pendiente').length, 
    icon: AlertCircle,
    color: 'bg-gray-50 border-gray-200 text-gray-700',
    trend: '-3%'
  },
];

const groupByDepartamento = (acts: typeof activities) => {
  const grouped: { [dep: string]: typeof activities } = {};
  acts.forEach(a => {
    if (!grouped[a.departamento]) grouped[a.departamento] = [];
    grouped[a.departamento].push(a);
  });
  return grouped;
};

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'Completada': return 'bg-green-100 text-green-800 border-green-200';
    case 'En Progreso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Pendiente': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case 'Alta': return 'bg-red-100 text-red-800 border-red-200';
    case 'Media': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Baja': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const CronogramaActividadesDepartamento: React.FC = () => {
  const [departamentoFilter, setDepartamentoFilter] = useState<string | undefined>(undefined);
  const [estadoFilter, setEstadoFilter] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');

  const filteredActivities = activities.filter(a =>
    (!departamentoFilter || a.departamento === departamentoFilter) &&
    (!estadoFilter || a.estado === estadoFilter)
  );

  const grouped = groupByDepartamento(filteredActivities);

  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.estado === 'Completada').length;
  const progressPercentage = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <Users className="text-white h-6 w-6" />
              </div>
              Actividades por Departamento
            </h1>
            <p className="text-gray-600">Gestiona y monitorea las actividades organizadas por departamento</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={viewMode === 'grouped' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grouped')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Agrupado
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Progreso General</h2>
          <span className="text-2xl font-bold text-[#8cb43a]">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{completedActivities} de {totalActivities} actividades completadas</span>
          <span>{totalActivities - completedActivities} pendientes</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={idx} className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${kpi.color.split(' ')[0]}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {kpi.trend}
                  </span>
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

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="text-[#8cb43a] h-5 w-5" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          <Select value={departamentoFilter} onValueChange={v => setDepartamentoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Departamentos</SelectItem>
              {allDepartamentos.map(d => <SelectItem value={d} key={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={estadoFilter} onValueChange={v => setEstadoFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Estados</SelectItem>
              {allEstados.map(e => <SelectItem value={e} key={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
          {(departamentoFilter || estadoFilter) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => { setDepartamentoFilter(undefined); setEstadoFilter(undefined); }}
              className="text-[#8cb43a] border-[#8cb43a] hover:bg-[#8cb43a] hover:text-white"
            >
              Limpiar Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {Object.keys(grouped).length === 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <p className="text-blue-600 font-medium">No hay actividades que coincidan con los filtros seleccionados.</p>
              <p className="text-blue-500 text-sm mt-2">Intenta ajustar los filtros para ver más resultados.</p>
            </CardContent>
          </Card>
        )}

        {viewMode === 'grouped' ? (
          // Grouped View
          Object.entries(grouped).map(([dep, acts]) => {
            const deptProgress = acts.length > 0 ? (acts.filter(a => a.estado === 'Completada').length / acts.length) * 100 : 0;
            return (
              <Card key={dep} className="border-l-4 border-[#8cb43a] bg-white shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#8cb43a] rounded-lg">
                        <Users className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-800">{dep}</CardTitle>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline" className="text-[#8cb43a] border-[#8cb43a]">
                            {acts.length} actividades
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {acts.filter(a => a.estado === 'Completada').length} completadas
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#8cb43a]">{Math.round(deptProgress)}%</div>
                        <div className="text-sm text-gray-600">Progreso</div>
                      </div>
                      <Progress value={deptProgress} className="w-24 h-2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {acts.map(a => (
                      <div key={a.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-800">{a.name}</h4>
                            <Badge className={`text-xs ${getPrioridadColor(a.prioridad)}`}>
                              {a.prioridad}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {a.fecha}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {a.duracion}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getEstadoColor(a.estado)}`}>
                          {a.estado}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          // List View
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Todas las Actividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredActivities.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-800">{a.name}</h4>
                        <Badge className={`text-xs ${getPrioridadColor(a.prioridad)}`}>
                          {a.prioridad}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {a.departamento}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {a.fecha}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {a.duracion}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getEstadoColor(a.estado)}`}>
                      {a.estado}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CronogramaActividadesDepartamento; 