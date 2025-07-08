import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, ZoomIn, ZoomOut } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  project: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  assignedTo: string;
  dependencies?: string[];
}

interface GanttData {
  task: string;
  project: string;
  start: number; // days from project start
  end: number; // days from project start
  duration: number;
  progress: number;
  status: string;
  assignedTo: string;
}

interface GanttChartProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, onTaskClick }) => {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Get unique projects
  const projects = useMemo(() => {
    const uniqueProjects = [...new Set(tasks.map(task => task.project))];
    return uniqueProjects;
  }, [tasks]);

  // Get project start date (earliest task start date)
  const projectStartDate = useMemo(() => {
    if (tasks.length === 0) return new Date();
    const startDate = new Date(Math.min(...tasks.map(task => task.startDate.getTime())));
    return startDate;
  }, [tasks]);

  // Convert tasks to Gantt data format
  const ganttData: GanttData[] = useMemo(() => {
    const filteredTasks = tasks
      .filter(task => selectedProject === 'all' || task.project === selectedProject)
      .filter(task => selectedStatus === 'all' || task.status === selectedStatus);
    
    const data = filteredTasks.map(task => {
      const startDays = Math.floor((task.startDate.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));
      const endDays = Math.floor((task.endDate.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        task: task.name,
        project: task.project,
        start: startDays,
        end: endDays,
        duration: Math.max(1, endDays - startDays), // Ensure minimum duration of 1 day
        progress: task.progress,
        status: task.status,
        assignedTo: task.assignedTo
      };
    }).sort((a, b) => a.start - b.start);
    
    return data;
  }, [tasks, selectedProject, selectedStatus, projectStartDate]);

  // Color scheme for different statuses
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981'; // Green
      case 'in-progress':
        return '#3B82F6'; // Blue
      case 'pending':
        return '#F59E0B'; // Yellow
      case 'delayed':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.task}</p>
          <p className="text-sm text-gray-600">Project: {data.project}</p>
          <p className="text-sm text-gray-600">Duration: {data.duration} days</p>
          <p className="text-sm text-gray-600">Progress: {data.progress}%</p>
          <p className="text-sm text-gray-600">Assigned to: {data.assignedTo}</p>
          <Badge 
            variant="secondary" 
            style={{ 
              backgroundColor: getStatusColor(data.status) + '20',
              color: getStatusColor(data.status)
            }}
          >
            {data.status}
          </Badge>
        </div>
      );
    }
    return null;
  };

  // If no data, show empty state
  if (ganttData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Gantt Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <p className="text-gray-500">No tasks available for the selected filters.</p>
            <p className="text-sm text-gray-400 mt-2">Tasks received: {tasks.length}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Gantt Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-500"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500"></div>
            <span>Delayed</span>
          </div>
        </div>

        {/* Gantt Chart */}
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={Math.max(300, ganttData.length * 40) * zoomLevel}>
            <BarChart
              data={ganttData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(value) => {
                  const date = new Date(projectStartDate);
                  date.setDate(date.getDate() + value);
                  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis 
                type="category" 
                dataKey="task" 
                width={200}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="duration" 
                fill="#8884d8"
                onClick={(data) => {
                  const task = tasks.find(t => t.name === data.task);
                  if (task && onTaskClick) {
                    onTaskClick(task);
                  }
                }}
                cursor="pointer"
              >
                {ganttData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getStatusColor(entry.status)}
                    opacity={entry.progress / 100}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter(t => t.status === 'delayed').length}
            </div>
            <div className="text-sm text-gray-500">Delayed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart; 