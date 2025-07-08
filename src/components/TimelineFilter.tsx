import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimelineFilterProps {
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

const TimelineFilter: React.FC<TimelineFilterProps> = ({ 
  onSearch, 
  onStatusChange, 
  onSortChange 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="text-sm font-medium block mb-2">Buscar</label>
          <Input
            id="search"
            placeholder="Buscar tareas..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="text-sm font-medium block mb-2">Estado</label>
          <Select onValueChange={onStatusChange} defaultValue="all">
            <SelectTrigger id="status">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
              <SelectItem value="in-progress">En Progreso</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="sort" className="text-sm font-medium block mb-2">Ordenar por</label>
          <Select onValueChange={onSortChange} defaultValue="date-desc">
            <SelectTrigger id="sort">
              <SelectValue placeholder="Fecha (Reciente primero)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Fecha (Reciente primero)</SelectItem>
              <SelectItem value="date-asc">Fecha (Antiguo primero)</SelectItem>
              <SelectItem value="status">Estado</SelectItem>
              <SelectItem value="title">Título</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm">Hoy</Button>
        <Button variant="outline" size="sm">Esta semana</Button>
        <Button variant="outline" size="sm">Este mes</Button>
      </div>
    </div>
  );
};

export default TimelineFilter;
