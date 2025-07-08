import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_CONFIG } from '@/config/mapboxConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map as MapIcon, 
  Satellite, 
  Layers, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  MapPin,
  Eye,
  Navigation as NavigationIcon
} from 'lucide-react';
import './ProjectMap.css';

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_CONFIG.accessToken;

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

interface ProjectMapProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
  mapView: 'satellite' | 'terrain' | 'street';
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

const ProjectMap: React.FC<ProjectMapProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  mapView,
  zoomLevel,
  onZoomChange
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const popup = useRef<mapboxgl.Popup | null>(null);

  // Get map style based on view mode
  const getMapStyle = (view: string) => {
    switch (view) {
      case 'satellite':
        return MAPBOX_CONFIG.styles.satellite;
      case 'terrain':
        return MAPBOX_CONFIG.styles.outdoors;
      case 'street':
        return MAPBOX_CONFIG.styles.satelliteStreets;
      default:
        return MAPBOX_CONFIG.styles.satellite;
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: getMapStyle(mapView),
      center: [MAPBOX_CONFIG.defaultCenter.lng, MAPBOX_CONFIG.defaultCenter.lat],
      zoom: zoomLevel,
      minZoom: MAPBOX_CONFIG.minZoom,
      maxZoom: MAPBOX_CONFIG.maxZoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    // Handle map load
    map.current.on('load', () => {
      console.log('Map loaded successfully');
    });

    // Handle zoom changes
    map.current.on('zoom', () => {
      if (map.current) {
        onZoomChange(Math.round(map.current.getZoom()));
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update map style when view changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(getMapStyle(mapView));
    }
  }, [mapView]);

  // Update zoom when zoomLevel prop changes
  useEffect(() => {
    if (map.current && Math.abs(map.current.getZoom() - zoomLevel) > 0.1) {
      map.current.setZoom(zoomLevel);
    }
  }, [zoomLevel]);

  // Add/update markers when projects change
  useEffect(() => {
    if (!map.current) return;

    // Wait for map to load
    if (!map.current.isStyleLoaded()) {
      map.current.on('style.load', () => {
        addMarkers();
      });
      return;
    }

    addMarkers();
  }, [projects, selectedProject]);

  const addMarkers = useCallback(() => {
    if (!map.current) return;

    // Remove existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add new markers
    projects.forEach((project) => {
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'project-marker';
      markerEl.innerHTML = `
        <div class="marker-container">
          <div class="marker-pin ${project.status === 'Activo' ? 'active' : project.status === 'Finalizado' ? 'completed' : 'planned'}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
            </svg>
          </div>
          <div class="marker-label">${project.name}</div>
        </div>
      `;

      // Create popup
      const popupContent = `
        <div class="project-popup">
          <h3 class="popup-title">${project.name}</h3>
          <div class="popup-details">
            <p><strong>Estado:</strong> ${project.status}</p>
            <p><strong>Tipo:</strong> ${project.type}</p>
            <p><strong>Región:</strong> ${project.region}</p>
            <p><strong>Progreso:</strong> ${project.avance}%</p>
            <p><strong>Equipo:</strong> ${project.equipo} personas</p>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px'
      }).setHTML(popupContent);

      // Create marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([project.lng, project.lat])
        .setPopup(popup)
        .addTo(map.current);

      // Add click handler
      markerEl.addEventListener('click', () => {
        onProjectSelect(project);
      });

      // Store marker reference
      markers.current[project.id] = marker;

      // Highlight selected project
      if (selectedProject?.id === project.id) {
        markerEl.classList.add('selected');
      }
    });
  }, [projects, selectedProject, onProjectSelect]);

  // Fly to selected project
  useEffect(() => {
    if (map.current && selectedProject) {
      map.current.flyTo({
        center: [selectedProject.lng, selectedProject.lat],
        zoom: 14,
        duration: 2000
      });
    }
  }, [selectedProject]);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [MAPBOX_CONFIG.defaultCenter.lng, MAPBOX_CONFIG.defaultCenter.lat],
        zoom: MAPBOX_CONFIG.defaultZoom,
        duration: 1000
      });
    }
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
        <div 
          ref={mapContainer} 
          className="w-full h-96 rounded-lg overflow-hidden"
          style={{ minHeight: '400px' }}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectMap; 