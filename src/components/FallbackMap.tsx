import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map as MapIcon, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  MapPin,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  status: string;
  type: string;
  region: string;
  lat: number;
  lng: number;
  avance: number;
  equipo: number;
  presupuesto: string;
  fechaInicio: string;
  fechaFin: string;
  prioridad: string;
  descripcion: string;
  color: string;
  coordenadas: string;
}

interface FallbackMapProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
  mapView: 'satellite' | 'terrain' | 'street';
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

const FallbackMap: React.FC<FallbackMapProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  mapView,
  zoomLevel,
  onZoomChange
}) => {
  const getMapIcon = (status: string) => {
    switch (status) {
      case 'Activo': return 'text-green-600';
      case 'Finalizado': return 'text-blue-600';
      case 'Planificado': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-100 text-green-800 border-green-200';
      case 'Finalizado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Planificado': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleZoomIn = () => {
    onZoomChange(Math.min(18, zoomLevel + 1));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(5, zoomLevel - 1));
  };

  const handleResetView = () => {
    onZoomChange(10);
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <MapIcon className="text-[#8cb43a]" />
            Mapa de Proyectos - {mapView.charAt(0).toUpperCase() + mapView.slice(1)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-600">Zoom: {zoomLevel}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetView}
              title="Reset View"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96 rounded-lg relative overflow-hidden border-2 border-gray-200">
          {/* Map title overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            <div className="text-sm font-semibold text-gray-800">Vista de Desarrollo</div>
            <div className="text-xs text-gray-600">Guatemala, Ciudad de Guatemala</div>
          </div>

          {projects.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No hay proyectos que coincidan con los filtros seleccionados.</p>
                <p className="text-gray-500 text-sm mt-2">Intenta ajustar los filtros para ver más resultados.</p>
              </div>
            </div>
          ) : (
            projects.map((project, idx) => (
              <div 
                key={project.id} 
                className="absolute cursor-pointer transform hover:scale-110 transition-transform duration-200"
                style={{ 
                  left: `${20 + (idx * 15) % 60}%`, 
                  top: `${30 + (idx * 20) % 50}%`,
                  zIndex: selectedProject?.id === project.id ? 10 : 1
                }}
                onClick={() => onProjectSelect(project)}
              >
                <div className="relative">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className={`rounded-full shadow-lg border-2 ${selectedProject?.id === project.id ? 'border-[#8cb43a] ring-2 ring-[#8cb43a]' : 'border-white'}`}
                  >
                    <MapPin className={`h-5 w-5 ${getMapIcon(project.status)}`} />
                  </Button>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="text-xs font-semibold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">
                      {project.name}
                    </div>
                    <Badge className={`text-xs mt-1 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            <div className="text-xs font-semibold text-gray-800 mb-2">Leyenda</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Activo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Finalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Planificado</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FallbackMap; 