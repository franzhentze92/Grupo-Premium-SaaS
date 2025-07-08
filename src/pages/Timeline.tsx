import React, { useState, useMemo } from 'react';
import TimelineFilter from '@/components/TimelineFilter';
import TimelineItem, { TimelineItemProps } from '@/components/TimelineItem';
import ProjectTabs from '@/components/ProjectTabs';
import GanttChart from '@/components/GanttChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, BarChart3 } from 'lucide-react';

// Sample timeline data for each building
const timelineData: Record<string, TimelineItemProps[]> = {
  'alena': [
    {
      id: 1,
      title: 'Instalación de ventanas',
      date: '15/05/2023',
      status: 'completed',
      description: 'Instalación de ventanas en los pisos 1-5 del Edificio Alena',
      assignedTo: 'Equipo de Instalación A',
      dueDate: '10/05/2023'
    },
    {
      id: 2,
      title: 'Cableado eléctrico',
      date: '22/05/2023',
      status: 'in-progress',
      description: 'Instalación del cableado eléctrico en los pisos 6-10',
      assignedTo: 'Equipo Eléctrico B',
      dueDate: '30/05/2023'
    },
    {
      id: 3,
      title: 'Pintura interior',
      date: '01/06/2023',
      status: 'pending',
      description: 'Pintura de paredes interiores en apartamentos modelo',
      assignedTo: 'Equipo de Acabados C',
      dueDate: '15/06/2023'
    },
  ],
  'alessa': [
    {
      id: 1,
      title: 'Construcción de lobby',
      date: '10/04/2023',
      status: 'completed',
      description: 'Finalización de la construcción del lobby principal',
      assignedTo: 'Equipo de Construcción D',
      dueDate: '05/04/2023'
    },
    {
      id: 2,
      title: 'Instalación de ascensores',
      date: '20/04/2023',
      status: 'in-progress',
      description: 'Instalación y prueba de los ascensores principales',
      assignedTo: 'Equipo Técnico E',
      dueDate: '01/05/2023'
    },
  ],
  'valtaro': [
    {
      id: 1,
      title: 'Excavación de cimientos',
      date: '05/03/2023',
      status: 'completed',
      description: 'Excavación y preparación de cimientos para la torre principal',
      assignedTo: 'Equipo de Excavación F',
      dueDate: '01/03/2023'
    },
    {
      id: 2,
      title: 'Estructura metálica',
      date: '15/03/2023',
      status: 'completed',
      description: 'Instalación de la estructura metálica principal',
      assignedTo: 'Equipo Estructural G',
      dueDate: '20/03/2023'
    },
    {
      id: 3,
      title: 'Instalación de plomería',
      date: '01/04/2023',
      status: 'in-progress',
      description: 'Instalación de sistemas de plomería en los pisos 1-10',
      assignedTo: 'Equipo de Plomería H',
      dueDate: '15/04/2023'
    },
    {
      id: 4,
      title: 'Instalación de fachada',
      date: '20/04/2023',
      status: 'pending',
      description: 'Instalación de paneles de fachada exterior',
      assignedTo: 'Equipo de Fachada I',
      dueDate: '10/05/2023'
    },
  ],
};

const buildings = [
  { id: 'alena', name: 'Edificio Alena' },
  { id: 'alessa', name: 'Edificio Alessa' },
  { id: 'valtaro', name: 'Edificio Valtaro' },
];

const Timeline = () => {
  const [activeBuilding, setActiveBuilding] = useState('alena');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('date-desc');
  const [viewMode, setViewMode] = useState<'list' | 'gantt'>('list');

  // Convert timeline data to Gantt chart format
  const ganttTasks = useMemo(() => {
    const tasks: any[] = [];
    
    Object.entries(timelineData).forEach(([buildingId, buildingTasks]) => {
      buildingTasks.forEach(task => {
        // Parse dates (assuming DD/MM/YYYY format)
        const [day, month, year] = task.date.split('/');
        const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        
        // Calculate end date based on due date or add 7 days if no due date
        let endDate: Date;
        if (task.dueDate) {
          const [dueDay, dueMonth, dueYear] = task.dueDate.split('/');
          endDate = new Date(parseInt(dueYear), parseInt(dueMonth) - 1, parseInt(dueDay));
        } else {
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
        }

        // Calculate progress based on status
        let progress = 0;
        switch (task.status) {
          case 'completed':
            progress = 100;
            break;
          case 'in-progress':
            progress = 50;
            break;
          case 'pending':
            progress = 0;
            break;
          default:
            progress = 0;
        }

        const ganttTask = {
          id: `${buildingId}-${task.id}`,
          name: task.title,
          project: buildings.find(b => b.id === buildingId)?.name || buildingId,
          startDate,
          endDate,
          progress,
          status: task.status,
          assignedTo: task.assignedTo,
          description: task.description
        };
        
        tasks.push(ganttTask);
      });
    });
    
    return tasks;
  }, [timelineData]);

  // Filter and sort timeline items
  const filteredItems = timelineData[activeBuilding].filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortOption === 'date-desc') {
      return new Date(b.date.split('/').reverse().join('-')).getTime() - 
             new Date(a.date.split('/').reverse().join('-')).getTime();
    } else if (sortOption === 'date-asc') {
      return new Date(a.date.split('/').reverse().join('-')).getTime() - 
             new Date(b.date.split('/').reverse().join('-')).getTime();
    } else if (sortOption === 'status') {
      const statusOrder = { completed: 1, 'in-progress': 2, pending: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    } else if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleTaskClick = (task: any) => {
    console.log('Task clicked:', task);
    // You can add a modal or navigation here to show task details
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Project Timeline</h1>
        <p className="text-gray-500 mt-1">Seguimiento de tareas y actividades en los proyectos</p>
      </div>

      <ProjectTabs
        buildings={buildings}
        activeBuilding={activeBuilding}
        onBuildingChange={setActiveBuilding}
      >
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'gantt')} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="gantt" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Gantt Chart
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list" className="space-y-4">
            <TimelineFilter 
              onSearch={setSearchQuery}
              onStatusChange={setStatusFilter}
              onSortChange={setSortOption}
            />
            
            <div className="space-y-4">
              {filteredItems.map(item => (
                <TimelineItem key={item.id} item={item} />
              ))}
              
              {filteredItems.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No se encontraron tareas que coincidan con los filtros.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gantt" className="space-y-4">
            <GanttChart 
              tasks={ganttTasks} 
              onTaskClick={handleTaskClick}
            />
          </TabsContent>
        </Tabs>
      </ProjectTabs>
    </div>
  );
};

export default Timeline;
