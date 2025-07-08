import React, { useState } from 'react';
import { Gantt, Task as GanttTask, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Calendar, Clock, User, Building, FileText, CheckCircle, AlertCircle, Clock as ClockIcon } from 'lucide-react';

export interface GanttCalendarTask extends GanttTask {
  status?: string;
  category?: string; // Add category (e.g., department)
  assignedTo?: string;
  description?: string;
  priority?: string;
  tags?: string[];
}

interface GanttCalendarProps {
  tasks: GanttCalendarTask[];
  onTaskClick?: (task: GanttCalendarTask) => void;
}

const statusColors: Record<string, string> = {
  Draft: '#f87171', // red
  'Ready to Check': '#fbbf24', // yellow
  'Checked Ready': '#3b82f6', // blue
  Emailed: '#22c55e', // green
  Completed: '#22c55e',
  'In Progress': '#3b82f6',
  Pending: '#fbbf24',
  Delayed: '#f87171',
};

const statusIcons: Record<string, React.ReactNode> = {
  Draft: <AlertCircle className="w-4 h-4" />,
  'Ready to Check': <ClockIcon className="w-4 h-4" />,
  'Checked Ready': <CheckCircle className="w-4 h-4" />,
  Emailed: <CheckCircle className="w-4 h-4" />,
  Completed: <CheckCircle className="w-4 h-4" />,
  'In Progress': <ClockIcon className="w-4 h-4" />,
  Pending: <ClockIcon className="w-4 h-4" />,
  Delayed: <AlertCircle className="w-4 h-4" />,
};

// Custom header for two columns
const TaskListHeader: React.FC<{ headerHeight: number; rowWidth: string; fontFamily: string; fontSize: string; }> = ({ headerHeight, rowWidth, fontFamily, fontSize }) => (
  <div
    style={{
      display: 'flex',
      height: headerHeight,
      fontFamily,
      fontSize,
      fontWeight: 600,
      background: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
    }}
  >
    <div style={{ width: '300px', padding: '0 12px', flexShrink: 0 }}>Actividad</div>
    <div style={{ width: '160px', padding: '0 12px', flexShrink: 0 }}>Department</div>
  </div>
);

// Custom table for two columns
const TaskListTable: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: GanttCalendarTask[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
}> = ({ rowHeight, fontFamily, fontSize, tasks, selectedTaskId, setSelectedTask }) => (
  <div>
    {tasks.map((task) => (
      <div
        key={task.id}
        style={{
          display: 'flex',
          height: rowHeight,
          alignItems: 'center',
          fontFamily,
          fontSize,
          background: selectedTaskId === task.id ? '#e5f4d3' : 'transparent',
          borderBottom: '1px solid #f1f5f9',
          cursor: 'pointer',
        }}
        onClick={() => setSelectedTask(task.id)}
      >
        <div style={{ width: '300px', padding: '0 12px', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.name}</div>
        <div style={{ width: '160px', padding: '0 12px', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.category || ''}</div>
      </div>
    ))}
  </div>
);

const GanttCalendar: React.FC<GanttCalendarProps> = ({ tasks, onTaskClick }) => {
  const [view, setView] = useState<ViewMode>(ViewMode.Week);
  const [selectedTask, setSelectedTask] = useState<GanttCalendarTask | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Set view date to today
  const today = new Date();

  // Colorize tasks
  const coloredTasks = tasks.map(task => ({
    ...task,
    styles: {
      progressColor: statusColors[task.status || 'In Progress'] || '#3b82f6',
      backgroundColor: statusColors[task.status || 'In Progress'] || '#3b82f6',
    },
  }));

  const handleTaskClick = (task: GanttCalendarTask) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
    onTaskClick?.(task);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDuration = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 día' : `${diffDays} días`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Gantt Calendar</h2>
          <p className="text-gray-500 text-sm">Visualiza el cronograma de actividades en formato Gantt.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm mr-2">Vista:</span>
          <button
            className={`px-3 py-1 rounded ${view === ViewMode.Day ? 'bg-[#8cb43a] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setView(ViewMode.Day)}
          >Día</button>
          <button
            className={`px-3 py-1 rounded ${view === ViewMode.Week ? 'bg-[#8cb43a] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setView(ViewMode.Week)}
          >Semana</button>
          <button
            className={`px-3 py-1 rounded ${view === ViewMode.Month ? 'bg-[#8cb43a] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setView(ViewMode.Month)}
          >Mes</button>
        </div>
      </div>
      <div className="mb-4 flex gap-4 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#f87171] inline-block"></span> Borrador</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#fbbf24] inline-block"></span> Listo para revisión</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#3b82f6] inline-block"></span> Revisado</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#22c55e] inline-block"></span> Enviado/Completado</span>
      </div>
      <div style={{ width: '100%', minHeight: 400 }}>
        <Gantt
          tasks={coloredTasks}
          viewMode={view}
          viewDate={today}
          listCellWidth={"460px"}
          ganttHeight={450}
          columnWidth={view === ViewMode.Day ? 60 : view === ViewMode.Week ? 150 : 250}
          rowHeight={44}
          headerHeight={50}
          barCornerRadius={4}
          barFill={70}
          handleWidth={8}
          fontFamily={"Inter, system-ui, sans-serif"}
          fontSize={"12px"}
          onSelect={handleTaskClick}
          TaskListHeader={TaskListHeader}
          TaskListTable={TaskListTable}
        />
      </div>

      {/* Task Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Detalles de la Actividad
            </DialogTitle>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-6">
              {/* Task Name and Status */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{selectedTask.name}</h3>
                <div className="flex items-center gap-2">
                  {statusIcons[selectedTask.status || 'In Progress']}
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                    style={{ 
                      backgroundColor: statusColors[selectedTask.status || 'In Progress'] || '#3b82f6',
                      color: 'white'
                    }}
                  >
                    {selectedTask.status || 'En Progreso'}
                  </Badge>
                  {selectedTask.priority && (
                    <Badge variant="outline" className="text-xs">
                      Prioridad: {selectedTask.priority}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-medium">{selectedTask.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#8cb43a] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${selectedTask.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Dates and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha de Inicio</span>
                  </div>
                  <p className="font-medium">{formatDate(selectedTask.start)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha de Fin</span>
                  </div>
                  <p className="font-medium">{formatDate(selectedTask.end)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Duración</span>
                  </div>
                  <p className="font-medium">{getDuration(selectedTask.start, selectedTask.end)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>Categoría</span>
                  </div>
                  <p className="font-medium">{selectedTask.category || 'No especificada'}</p>
                </div>
              </div>

              {/* Assigned To */}
              {selectedTask.assignedTo && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Asignado a</span>
                  </div>
                  <p className="font-medium">{selectedTask.assignedTo}</p>
                </div>
              )}

              {/* Description */}
              {selectedTask.description && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>Descripción</span>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedTask.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {selectedTask.tags && selectedTask.tags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-gray-600">Etiquetas</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Task ID */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">ID: {selectedTask.id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GanttCalendar; 