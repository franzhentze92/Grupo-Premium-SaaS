import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationCard from '@/components/LocationCard';

// Updated building locations with the new coordinates
const buildingLocations = [
  { 
    id: 1, 
    name: 'Edificio Alena', 
    position: { lat: 14.6093, lng: -90.4947 } // Updated coordinates
  },
  { 
    id: 2, 
    name: 'Edificio Alessa', 
    position: { lat: 14.5890, lng: -90.5165 } // Updated coordinates
  },
  { 
    id: 3, 
    name: 'Edificio Valtaro', 
    position: { lat: 14.5885, lng: -90.5080 } // Updated coordinates
  }
];

const DashboardMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  // Function to zoom to a specific location
  const zoomToLocation = (locationId: number) => {
    const location = buildingLocations.find(loc => loc.id === locationId);
    if (!location || !mapInstanceRef.current) return;

    // Zoom to the location
    mapInstanceRef.current.setCenter(location.position);
    mapInstanceRef.current.setZoom(15);
    
    // Update selected location
    setSelectedLocation(locationId);

    // Show info window
    if (infoWindowRef.current) {
      const content = `
        <div style="padding: 10px; max-width: 200px;">
          <h3 style="margin: 0 0 10px; font-weight: bold;">${location.name}</h3>
        </div>
      `;
      infoWindowRef.current.setContent(content);
      infoWindowRef.current.setPosition(location.position);
      infoWindowRef.current.open(mapInstanceRef.current);
    }
  };

  useEffect(() => {
    // Cargar script de Google Maps
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      // Usando la API key proporcionada
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJXqKdiVJ1N71KsrM6AkKeRWfsDYV_Fa4&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Definir la función de callback
      window.initMap = initMap;
    };

    // Inicializar el mapa
    const initMap = () => {
      if (!mapRef.current) return;

      // Crear la instancia del mapa
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 14.5950, lng: -90.5050 }, // Center of Guatemala City
        zoom: 12,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      // Crear el mapa
      const map = new google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // Crear una ventana de información
      infoWindowRef.current = new google.maps.InfoWindow();

      // Añadir marcadores para los edificios
      buildingLocations.forEach(location => {
        const marker = new google.maps.Marker({
          position: location.position,
          map: map,
          title: location.name,
          animation: google.maps.Animation.DROP
        });

        // Añadir evento de clic para mostrar ventana de información
        marker.addListener('click', () => {
          zoomToLocation(location.id);
        });

        markersRef.current.push(marker);
      });
    };

    // Verificar si la API de Google Maps ya está cargada
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }

    // Limpieza
    return () => {
      // Eliminar la función global initMap
      if (window.initMap) {
        delete window.initMap;
      }
      
      // Limpiar marcadores
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Mapa de Proyectos</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        {/* Location cards */}
        <div className="p-4 flex flex-wrap gap-2 bg-gray-50 overflow-x-auto">
          {buildingLocations.map(location => (
            <LocationCard
              key={location.id}
              name={location.name}
              isActive={selectedLocation === location.id}
              onClick={() => zoomToLocation(location.id)}
            />
          ))}
        </div>
        
        <div 
          ref={mapRef} 
          className="w-full h-[500px]" 
          style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
        />
        <div className="p-4 bg-gray-50 text-sm text-gray-500">
          Haga clic en las tarjetas superiores o en los marcadores para ver datos de cada edificio.
        </div>
      </CardContent>
    </Card>
  );
};

// Añadir la función global initMap al objeto window
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default DashboardMap;
