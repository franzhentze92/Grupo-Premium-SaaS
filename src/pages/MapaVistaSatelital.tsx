import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Map as MapIcon, 
  Filter, 
  MapPin, 
  Eye, 
  Navigation, 
  Satellite, 
  Layers, 
  Search,
  Building2,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import ProjectMap from '@/components/ProjectMap';

const projects = [
  { 
    id: 1, 
    name: 'Torre Premium I', 
    status: 'Activo', 
    type: 'Residencial', 
    region: 'Norte', 
    lat: 14.6349, 
    lng: -90.5069,
    avance: 65,
    equipo: 12,
    presupuesto: '$2,500,000',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-12-31',
    prioridad: 'Alta',
    descripcion: 'Edificio residencial de lujo con 25 pisos',
    color: 'bg-green-500',
    coordenadas: '14.6349°N, 90.5069°W'
  },
  { 
    id: 2, 
    name: 'Residencial Vista', 
    status: 'Finalizado', 
    type: 'Residencial', 
    region: 'Sur', 
    lat: 14.6290, 
    lng: -90.5105,
    avance: 100,
    equipo: 8,
    presupuesto: '$1,800,000',
    fechaInicio: '2023-03-01',
    fechaFin: '2024-02-28',
    prioridad: 'Media',
    descripcion: 'Complejo residencial con 120 unidades',
    color: 'bg-blue-500',
    coordenadas: '14.6290°N, 90.5105°W'
  },
  { 
    id: 3, 
    name: 'Edificio Central', 
    status: 'Activo', 
    type: 'Comercial', 
    region: 'Centro', 
    lat: 14.6405, 
    lng: -90.5002,
    avance: 85,
    equipo: 15,
    presupuesto: '$3,200,000',
    fechaInicio: '2023-06-01',
    fechaFin: '2024-08-31',
    prioridad: 'Alta',
    descripcion: 'Edificio corporativo de 20 pisos',
    color: 'bg-green-500',
    coordenadas: '14.6405°N, 90.5002°W'
  },
  { 
    id: 4, 
    name: 'Residencial Sur', 
    status: 'Planificado', 
    type: 'Residencial', 
    region: 'Sur', 
    lat: 14.6372, 
    lng: -90.5150,
    avance: 10,
    equipo: 6,
    presupuesto: '$950,000',
    fechaInicio: '2024-05-01',
    fechaFin: '2025-06-30',
    prioridad: 'Baja',
    descripcion: 'Complejo de 80 unidades familiares',
    color: 'bg-yellow-500',
    coordenadas: '14.6372°N, 90.5150°W'
  },
  {
    id: 5,
    name: 'Centro Comercial Plaza',
    status: 'Activo',
    type: 'Comercial',
    region: 'Este',
    lat: 14.6315,
    lng: -90.5020,
    avance: 45,
    equipo: 20,
    presupuesto: '$4,500,000',
    fechaInicio: '2024-02-01',
    fechaFin: '2025-12-31',
    prioridad: 'Alta',
    descripcion: 'Centro comercial con 150 locales',
    color: 'bg-green-500',
    coordenadas: '14.6315°N, 90.5020°W'
  }
];

const allStatus = ['Activo', 'Finalizado', 'Planificado'];
const allTypes = Array.from(new Set(projects.map(p => p.type)));
const allRegions = Array.from(new Set(projects.map(p => p.region)));

const statusColors: Record<string, string> = {
  'Activo': 'bg-green-100 text-green-800 border-green-200',
  'Finalizado': 'bg-blue-100 text-blue-800 border-blue-200',
  'Planificado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const prioridadColors: Record<string, string> = {
  'Alta': 'bg-red-100 text-red-800 border-red-200',
  'Media': 'bg-orange-100 text-orange-800 border-orange-200',
  'Baja': 'bg-blue-100 text-blue-800 border-blue-200',
};

const kpiCards = [
  { 
    label: 'Total Proyectos', 
    value: projects.length, 
    icon: Building2,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    trend: '+2 este mes'
  },
  { 
    label: 'Activos', 
    value: projects.filter(p => p.status === 'Activo').length, 
    icon: TrendingUp,
    color: 'bg-green-50 border-green-200 text-green-700',
    trend: '+1 esta semana'
  },
  { 
    label: 'Avance Promedio', 
    value: `${Math.round(projects.reduce((acc, p) => acc + p.avance, 0) / projects.length)}%`, 
    icon: BarChart3,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    trend: '+8% vs mes anterior'
  },
  { 
    label: 'Regiones', 
    value: allRegions.length, 
    icon: MapPin,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    trend: '4 zonas activas'
  }
];

const MapaVistaSatelital: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [regionFilter, setRegionFilter] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'terrain' | 'street'>('satellite');
  const [zoomLevel, setZoomLevel] = useState(10);

  const filteredProjects = projects.filter(p => {
    const matchesStatus = !statusFilter || p.status === statusFilter;
    const matchesType = !typeFilter || p.type === typeFilter;
    const matchesRegion = !regionFilter || p.region === regionFilter;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesRegion && matchesSearch;
  });

  const getMapIcon = (status: string) => {
    switch (status) {
      case 'Activo': return 'text-green-600';
      case 'Finalizado': return 'text-blue-600';
      case 'Planificado': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <Satellite className="text-white h-6 w-6" />
              </div>
              Vista Satelital de Proyectos
            </h1>
            <p className="text-gray-600">Visualiza la ubicación geográfica de todos los proyectos en vista satelital</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
              className="flex items-center gap-2"
            >
              <Satellite className="h-4 w-4" />
              Satelital
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
              className="flex items-center gap-2"
            >
              <Layers className="h-4 w-4" />
              Terreno
            </Button>
            <Button
              variant={mapView === 'street' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('street')}
              className="flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              Callejero
            </Button>
          </div>
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
              {allStatus.map(s => <SelectItem value={s} key={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={v => setTypeFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Tipos</SelectItem>
              {allTypes.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={v => setRegionFilter(v === 'all' ? undefined : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Regiones</SelectItem>
              {allRegions.map(r => <SelectItem value={r} key={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          {(statusFilter || typeFilter || regionFilter || searchTerm) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => { 
                setStatusFilter(undefined); 
                setTypeFilter(undefined); 
                setRegionFilter(undefined);
                setSearchTerm('');
              }}
              className="text-[#8cb43a] border-[#8cb43a] hover:bg-[#8cb43a] hover:text-white"
            >
              Limpiar Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Map and Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <ProjectMap
            projects={filteredProjects}
            selectedProject={selectedProject}
            onProjectSelect={setSelectedProject}
            mapView={mapView}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
          />
        </div>

        {/* Project Details Panel */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Detalles del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProject ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedProject.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{selectedProject.descripcion}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Estado:</span>
                      <Badge className={statusColors[selectedProject.status]}>
                        {selectedProject.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Tipo:</span>
                      <span className="text-sm text-gray-600">{selectedProject.type}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Región:</span>
                      <span className="text-sm text-gray-600">{selectedProject.region}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Prioridad:</span>
                      <Badge className={`text-xs ${prioridadColors[selectedProject.prioridad]}`}>
                        {selectedProject.prioridad}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progreso</span>
                        <span className="text-sm font-bold text-gray-800">{selectedProject.avance}%</span>
                      </div>
                      <Progress value={selectedProject.avance} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{selectedProject.equipo} personas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{selectedProject.fechaFin}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Presupuesto:</span>
                      <span className="text-gray-600 ml-2">{selectedProject.presupuesto}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Coordenadas:</span>
                      <span className="text-gray-600 ml-2">{selectedProject.coordenadas}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button size="sm" className="flex-1 bg-[#8cb43a] hover:bg-[#7ca02e]">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      Navegar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Selecciona un proyecto</p>
                  <p className="text-gray-500 text-sm mt-2">Haz clic en un marcador del mapa para ver los detalles</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project List */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Lista de Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProject?.id === project.id 
                        ? 'border-[#8cb43a] bg-green-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-block w-3 h-3 rounded-full ${project.color}`}></span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{project.name}</div>
                        <div className="text-xs text-gray-600">{project.region} • {project.type}</div>
                      </div>
                      <Badge className={`text-xs ${statusColors[project.status]}`}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapaVistaSatelital; 