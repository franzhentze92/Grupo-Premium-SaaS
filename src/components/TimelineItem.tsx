import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User } from 'lucide-react';

export interface TimelineItemProps {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
  assignedTo: string;
  dueDate?: string;
}

const TimelineItem: React.FC<{ item: TimelineItemProps }> = ({ item }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  // Get a color based on the item id for visual variety
  const getAccentColor = () => {
    const colors = [
      'border-blue-500',
      'border-green-500',
      'border-purple-500',
      'border-orange-500',
      'border-pink-500',
      'border-indigo-500',
      'border-teal-500'
    ];
    return colors[item.id % colors.length];
  };

  return (
    <Card className={`mb-4 border-l-4 ${getAccentColor()} shadow-sm hover:shadow-md transition-shadow duration-200 relative`}>
      {/* Timeline connector dot and line */}
      <div className="absolute -left-2.5 top-6 w-5 h-5 rounded-full bg-white border-2 border-primary z-10"></div>
      <div className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-gray-200 -z-0"></div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <Badge className={getStatusColor(item.status)}>
            {getStatusText(item.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarDays size={16} className="mr-1 text-primary" />
            <span>{item.date}</span>
          </div>
          {item.dueDate && (
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-amber-500" />
              <span>Vence: {item.dueDate}</span>
            </div>
          )}
          <div className="flex items-center">
            <User size={16} className="mr-1 text-indigo-500" />
            <span>{item.assignedTo}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineItem;
