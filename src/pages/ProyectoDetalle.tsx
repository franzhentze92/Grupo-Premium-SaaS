import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building2, Edit, Archive, Share2, Printer, Download, Users, Calendar, TrendingUp, AlertTriangle, FileText, Image, Folder, BarChart3, Settings, BookOpen, CheckCircle, Filter, FileCheck, FileClock, FileX, ArrowUpRight, Upload, Search, FileSpreadsheet, Eye, Trash2, Image as ImageIcon, CalendarDays, User, Mail, ArrowLeft } from 'lucide-react';
import TimelineItem, { TimelineItemProps } from '@/components/TimelineItem';
import TimelineFilter from '@/components/TimelineFilter';
import GanttCalendar, { GanttCalendarTask } from '@/components/GanttCalendar';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const kpiCards = [
  { label: 'Avance Físico', value: '68%', icon: TrendingUp, color: 'bg-blue-100 text-blue-700', trend: '+3% este mes' },
  { label: 'Avance Financiero', value: '62%', icon: BarChart3, color: 'bg-green-100 text-green-700', trend: '+2% este mes' },
  { label: 'Presupuesto Ejecutado', value: '$2.4M', icon: FileText, color: 'bg-yellow-100 text-yellow-700', trend: '+$200K' },
  { label: 'Desviación Presup.', value: '-3%', icon: AlertTriangle, color: 'bg-red-100 text-red-700', trend: 'Mejoró 1%' },
  { label: 'Días de Atraso', value: '12', icon: Calendar, color: 'bg-orange-100 text-orange-700', trend: '+2 días' },
  { label: 'Riesgos Activos', value: '2', icon: AlertTriangle, color: 'bg-pink-100 text-pink-700', trend: 'Sin cambios' },
  { label: 'Licencias Pendientes', value: '1', icon: Folder, color: 'bg-purple-100 text-purple-700', trend: '-1' },
  { label: 'Documentos Críticos', value: '3', icon: FileText, color: 'bg-indigo-100 text-indigo-700', trend: '+1' },
];

const sampleTimeline: TimelineItemProps[] = [
  {
    id: 1,
    title: 'Inicio de obra',
    date: '01/03/2024',
    status: 'completed',
    description: 'Se da inicio formal a la construcción del proyecto.',
    assignedTo: 'Ing. Juan Pérez',
    dueDate: '01/03/2024',
  },
  {
    id: 2,
    title: 'Excavación de cimientos',
    date: '15/03/2024',
    status: 'completed',
    description: 'Excavación y preparación de cimientos.',
    assignedTo: 'Equipo de Excavación',
    dueDate: '20/03/2024',
  },
  {
    id: 3,
    title: 'Estructura principal',
    date: '10/04/2024',
    status: 'in-progress',
    description: 'Montaje de la estructura principal del edificio.',
    assignedTo: 'Equipo Estructural',
    dueDate: '30/04/2024',
  },
  {
    id: 4,
    title: 'Instalación eléctrica',
    date: '05/05/2024',
    status: 'pending',
    description: 'Inicio de instalaciones eléctricas.',
    assignedTo: 'Equipo Eléctrico',
    dueDate: '20/05/2024',
  },
];

const sampleActivity: TimelineItemProps[] = [
  {
    id: 1,
    title: 'Documento "Planos Fase 1" subido',
    date: '12/06/2024',
    status: 'completed',
    description: 'Se subió el documento de planos de la Fase 1.',
    assignedTo: 'Arq. María López',
    dueDate: '12/06/2024',
  },
  {
    id: 2,
    title: 'Nueva licencia aprobada',
    date: '10/06/2024',
    status: 'completed',
    description: 'Licencia ambiental aprobada por el ayuntamiento.',
    assignedTo: 'Gestor Licencias',
    dueDate: '10/06/2024',
  },
  {
    id: 3,
    title: 'Reunión de avance',
    date: '08/06/2024',
    status: 'completed',
    description: 'Reunión semanal de avance de obra.',
    assignedTo: 'Equipo Proyecto',
    dueDate: '08/06/2024',
  },
];

const sampleGanttTasks: GanttCalendarTask[] = [
  {
    id: '1',
    name: 'Inicio de obra',
    type: 'task',
    start: new Date('2024-03-01'),
    end: new Date('2024-03-05'),
    progress: 100,
    status: 'Completed',
    category: 'General',
    assignedTo: 'Ing. Juan Pérez',
    description: 'Inicio formal del proyecto.',
  },
  {
    id: '2',
    name: 'Excavación de cimientos',
    type: 'task',
    start: new Date('2024-03-06'),
    end: new Date('2024-03-20'),
    progress: 100,
    status: 'Completed',
    category: 'Obra Civil',
    assignedTo: 'Equipo de Excavación',
    description: 'Excavación y preparación de cimientos.',
  },
  {
    id: '3',
    name: 'Estructura principal',
    type: 'task',
    start: new Date('2024-03-21'),
    end: new Date('2024-04-30'),
    progress: 60,
    status: 'In Progress',
    category: 'Estructura',
    assignedTo: 'Equipo Estructural',
    description: 'Montaje de la estructura principal del edificio.',
  },
  {
    id: '4',
    name: 'Instalación eléctrica',
    type: 'task',
    start: new Date('2024-05-01'),
    end: new Date('2024-05-20'),
    progress: 0,
    status: 'Pending',
    category: 'Instalaciones',
    assignedTo: 'Equipo Eléctrico',
    description: 'Inicio de instalaciones eléctricas.',
  },
];

const avanceData = [
  { mes: 'Ene', fisico: 10, financiero: 8 },
  { mes: 'Feb', fisico: 22, financiero: 18 },
  { mes: 'Mar', fisico: 35, financiero: 30 },
  { mes: 'Abr', fisico: 48, financiero: 42 },
  { mes: 'May', fisico: 60, financiero: 55 },
  { mes: 'Jun', fisico: 68, financiero: 62 },
];

const presupuestoData = [
  { mes: 'Ene', planificado: 200000, ejecutado: 180000 },
  { mes: 'Feb', planificado: 400000, ejecutado: 350000 },
  { mes: 'Mar', planificado: 600000, ejecutado: 520000 },
  { mes: 'Abr', planificado: 900000, ejecutado: 800000 },
  { mes: 'May', planificado: 1200000, ejecutado: 1100000 },
  { mes: 'Jun', planificado: 1500000, ejecutado: 1350000 },
];

const kpiAlerts = [
  { icon: AlertTriangle, color: 'text-red-600', text: 'Desviación presupuestaria superior al 5% en mayo.' },
  { icon: AlertTriangle, color: 'text-yellow-600', text: 'Riesgo de atraso en instalaciones eléctricas.' },
];

const budgetSummary = [
  { label: 'Presupuesto Total', value: '$3,800,000', color: 'bg-blue-50 text-blue-700', icon: FileText },
  { label: 'Ejecutado', value: '$2,400,000', color: 'bg-green-50 text-green-700', icon: CheckCircle },
  { label: 'Por Ejecutar', value: '$1,400,000', color: 'bg-yellow-50 text-yellow-700', icon: Calendar },
  { label: 'Variación', value: '-3%', color: 'bg-red-50 text-red-700', icon: AlertTriangle },
];

const budgetTable = [
  { partida: 'Obra Civil', planificado: 1200000, ejecutado: 1100000, variacion: -8.3 },
  { partida: 'Estructura', planificado: 900000, ejecutado: 850000, variacion: -5.6 },
  { partida: 'Instalaciones', planificado: 700000, ejecutado: 690000, variacion: -1.4 },
  { partida: 'Acabados', planificado: 600000, ejecutado: 540000, variacion: -10 },
  { partida: 'Licencias', planificado: 200000, ejecutado: 210000, variacion: 5 },
  { partida: 'Otros', planificado: 400000, ejecutado: 400000, variacion: 0 },
];

const variacionData = budgetTable.map(row => ({ partida: row.partida, variacion: row.variacion }));

const licenses = [
  { id: 1, tipo: 'Construcción', nombre: 'Licencia Municipal', estado: 'Aprobada', fecha: '2024-01-15', vencimiento: '2025-01-15' },
  { id: 2, tipo: 'Ambiental', nombre: 'Permiso Ambiental', estado: 'Pendiente', fecha: '2024-02-10', vencimiento: '2025-02-10' },
  { id: 3, tipo: 'Bomberos', nombre: 'Certificado Bomberos', estado: 'Vencida', fecha: '2023-03-01', vencimiento: '2024-03-01' },
  { id: 4, tipo: 'Construcción', nombre: 'Permiso de Obra', estado: 'Aprobada', fecha: '2024-01-20', vencimiento: '2025-01-20' },
  { id: 5, tipo: 'Ambiental', nombre: 'Certificado Ambiental', estado: 'Pendiente', fecha: '2024-04-05', vencimiento: '2025-04-05' },
];

const statusBadge: Record<string, string> = {
  'Aprobada': 'success',
  'Pendiente': 'warning',
  'Vencida': 'destructive',
};

const statusIcon: Record<string, React.ReactNode> = {
  'Aprobada': <FileCheck className="text-green-600" size={18} />,
  'Pendiente': <FileClock className="text-yellow-600" size={18} />,
  'Vencida': <FileX className="text-red-600" size={18} />,
};

const allEstados = ['Aprobada', 'Pendiente', 'Vencida'];
const allTipos = Array.from(new Set(licenses.map(l => l.tipo)));
const today = new Date();
const daysBetween = (date1: Date, date2: Date) => Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
const licensesExpiringSoon = licenses.filter(l => {
  const venc = new Date(l.vencimiento);
  return l.estado !== 'Vencida' && daysBetween(today, venc) <= 30 && daysBetween(today, venc) >= 0;
});
const expiredLicenses = licenses.filter(l => l.estado === 'Vencida');
const percentAprobadas = Math.round((licenses.filter(l => l.estado === 'Aprobada').length / licenses.length) * 100);
const kpiLicCards = [
  { label: 'Total Licencias', value: licenses.length, icon: Calendar, color: 'bg-blue-50 border-blue-200 text-blue-700', trend: '+1 este mes' },
  { label: 'Aprobadas', value: licenses.filter(l => l.estado === 'Aprobada').length, icon: FileCheck, color: 'bg-green-50 border-green-200 text-green-700', trend: '+1 este mes' },
  { label: 'Pendientes', value: licenses.filter(l => l.estado === 'Pendiente').length, icon: FileClock, color: 'bg-yellow-50 border-yellow-200 text-yellow-700', trend: 'Sin cambios' },
  { label: 'Vencidas', value: licenses.filter(l => l.estado === 'Vencida').length, icon: FileX, color: 'bg-red-50 border-red-200 text-red-700', trend: '+1 este mes' },
  { label: 'Por vencer (30d)', value: licensesExpiringSoon.length, icon: FileClock, color: 'bg-orange-50 border-orange-200 text-orange-700', trend: '+1 este mes' },
  { label: '% Aprobadas', value: percentAprobadas + '%', icon: TrendingUp, color: 'bg-purple-50 border-purple-200 text-purple-700', trend: '+5% vs mes anterior' },
];

// Sample documents data for the Documentos tab
const documentosProyecto = [
  {
    id: '1',
    name: 'Planos_Edificio_Alena.pdf',
    type: 'pdf',
    size: '2.5 MB',
    uploadedBy: 'Arquitecto Juan Pérez',
    uploadDate: '2024-01-15',
    status: 'approved',
    tags: ['planos', 'edificio alena', 'arquitectura']
  },
  {
    id: '2',
    name: 'Presupuesto_Proyecto_2024.xlsx',
    type: 'spreadsheet',
    size: '1.8 MB',
    uploadedBy: 'Contador María García',
    uploadDate: '2024-01-14',
    status: 'pending',
    tags: ['presupuesto', 'finanzas', '2024']
  },
  {
    id: '3',
    name: 'Fotos_Avance_Construccion.jpg',
    type: 'image',
    size: '3.2 MB',
    uploadedBy: 'Ingeniero Carlos López',
    uploadDate: '2024-01-13',
    status: 'approved',
    tags: ['fotos', 'construcción', 'avance']
  },
  {
    id: '4',
    name: 'Contrato_Cliente_001.docx',
    type: 'document',
    size: '0.8 MB',
    uploadedBy: 'Abogado Ana Rodríguez',
    uploadDate: '2024-01-12',
    status: 'approved',
    tags: ['contrato', 'cliente', 'legal']
  }
];

const gallery = [
  { id: 1, type: 'Plano', project: 'Torre Premium II', name: 'Plano Arquitectónico', date: '2024-01-10', url: '/public/placeholder.svg' },
  { id: 2, type: 'Foto', project: 'Torre Premium II', name: 'Avance de Obra', date: '2024-02-15', url: '/public/placeholder.svg' },
  { id: 3, type: 'Plano', project: 'Torre Premium II', name: 'Plano Estructural', date: '2024-03-01', url: '/public/placeholder.svg' },
  { id: 4, type: 'Foto', project: 'Torre Premium II', name: 'Terreno', date: '2024-03-10', url: '/public/placeholder.svg' },
  { id: 5, type: 'Foto', project: 'Torre Premium II', name: 'Entrega Final', date: '2024-04-05', url: '/public/placeholder.svg' },
];

const allTypes = ['Plano', 'Foto'];
const allProjects = Array.from(new Set(gallery.map(g => g.project)));
const isNewThisMonth = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};
const newThisMonth = gallery.filter(g => isNewThisMonth(g.date)).length;
const percentPlanos = Math.round((gallery.filter(g => g.type === 'Plano').length / gallery.length) * 100);
const kpiGaleria = [
  { label: 'Total Archivos', value: gallery.length, icon: CalendarDays, color: 'bg-blue-50 border-blue-200 text-blue-700', trend: '+1 este mes' },
  { label: 'Planos', value: gallery.filter(g => g.type === 'Plano').length, icon: FileText, color: 'bg-green-50 border-green-200 text-green-700', trend: '+1 este mes' },
  { label: 'Fotos', value: gallery.filter(g => g.type === 'Foto').length, icon: ImageIcon, color: 'bg-yellow-50 border-yellow-200 text-yellow-700', trend: 'Sin cambios' },
  { label: 'Nuevos este mes', value: newThisMonth, icon: TrendingUp, color: 'bg-purple-50 border-purple-200 text-purple-700', trend: '+2 este mes' },
  { label: '% Planos', value: percentPlanos + '%', icon: FileText, color: 'bg-orange-50 border-orange-200 text-orange-700', trend: '+5% vs mes anterior' },
];

const equipoProyecto = [
  { id: 1, nombre: 'Ing. Juan Pérez', rol: 'Director de Proyecto', asignacion: 'Supervisión general', correo: 'juan.perez@grupo.com' },
  { id: 2, nombre: 'Arq. María López', rol: 'Arquitecta Principal', asignacion: 'Diseño y planos', correo: 'maria.lopez@grupo.com' },
  { id: 3, nombre: 'Carlos Mendoza', rol: 'Jefe de Obra', asignacion: 'Ejecución en sitio', correo: 'carlos.mendoza@grupo.com' },
  { id: 4, nombre: 'Ana Rodríguez', rol: 'Coordinadora Administrativa', asignacion: 'Gestión documental y licencias', correo: 'ana.rodriguez@grupo.com' },
  { id: 5, nombre: 'Luis Torres', rol: 'Contador', asignacion: 'Presupuesto y costos', correo: 'luis.torres@grupo.com' },
];

const ProyectoDetalle: React.FC = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Title, Subtitle, and Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Detalle del Proyecto</h1>
          <p className="text-gray-600">Panel ejecutivo con toda la información y gestión del proyecto seleccionado</p>
        </div>
        <Link to="/proyectos">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Volver a Proyectos
          </Button>
        </Link>
      </div>
      {/* Header & Executive Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#1e3269] rounded-lg">
              <Building2 className="text-white h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Torre Premium II</h1>
              <p className="text-gray-600">Residencial • Santo Domingo, RD</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Activo</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Cliente: Grupo Premium</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start lg:items-end">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2"><Edit className="h-4 w-4" /> Editar</Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2"><Archive className="h-4 w-4" /> Archivar</Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2"><Share2 className="h-4 w-4" /> Compartir</Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2"><Printer className="h-4 w-4" /> Imprimir</Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar</Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">Última actualización: 12/06/2024</div>
          </div>
        </div>
        {/* Executive Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-700"><Calendar className="h-4 w-4" /> Inicio: <span className="font-semibold">01/03/2024</span></div>
                <div className="flex items-center gap-2 text-gray-700"><Calendar className="h-4 w-4" /> Fin estimado: <span className="font-semibold">30/06/2025</span></div>
                <div className="flex items-center gap-2 text-gray-700"><Users className="h-4 w-4" /> Responsable: <span className="font-semibold">Ing. Juan Pérez</span></div>
                <div className="flex items-center gap-2 text-gray-700"><FileText className="h-4 w-4" /> Contrato: <span className="font-semibold">#PR-2024-001</span></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-700"><BarChart3 className="h-4 w-4" /> Presupuesto: <span className="font-semibold">$3,800,000</span></div>
                <div className="flex items-center gap-2 text-gray-700"><TrendingUp className="h-4 w-4" /> Avance físico: <span className="font-semibold">68%</span></div>
                <div className="flex items-center gap-2 text-gray-700"><AlertTriangle className="h-4 w-4 text-red-500" /> Riesgos: <span className="font-semibold text-red-600">2 activos</span></div>
                <div className="flex items-center gap-2 text-gray-700"><CheckCircle className="h-4 w-4 text-green-500" /> Licencias: <span className="font-semibold text-green-600">Al día</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-500">{kpi.trend}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Tabs for all project management sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b border-gray-200">
            <TabsList className="bg-transparent border-b-0 rounded-none h-auto p-0 overflow-x-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><BookOpen className="h-4 w-4 mr-2" />Visión General</TabsTrigger>
              <TabsTrigger value="gantt" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><Calendar className="h-4 w-4 mr-2" />Cronograma</TabsTrigger>
              <TabsTrigger value="kpis" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><BarChart3 className="h-4 w-4 mr-2" />KPIs</TabsTrigger>
              <TabsTrigger value="presupuesto" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><FileText className="h-4 w-4 mr-2" />Presupuesto</TabsTrigger>
              <TabsTrigger value="licencias" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><Folder className="h-4 w-4 mr-2" />Licencias</TabsTrigger>
              <TabsTrigger value="documentos" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><FileText className="h-4 w-4 mr-2" />Documentos</TabsTrigger>
              <TabsTrigger value="galeria" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><Image className="h-4 w-4 mr-2" />Galería</TabsTrigger>
              <TabsTrigger value="equipo" className="data-[state=active]:bg-[#1e3269] data-[state=active]:text-white data-[state=active]:border-[#1e3269] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"><Users className="h-4 w-4 mr-2" />Equipo</TabsTrigger>
            </TabsList>
          </div>
          <div className="p-6">
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Hitos del Proyecto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TimelineFilter
                      onSearch={() => {}}
                      onStatusChange={() => {}}
                      onSortChange={() => {}}
                    />
                    <div className="mt-2">
                      {sampleTimeline.map(item => (
                        <TimelineItem key={item.id} item={item} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Actividad Reciente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2">
                      {sampleActivity.map(item => (
                        <TimelineItem key={item.id} item={item} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="gantt" className="mt-0">
              <GanttCalendar tasks={sampleGanttTasks} />
            </TabsContent>
            <TabsContent value="kpis" className="mt-0">
              <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6">
                  {kpiCards.map((kpi, idx) => (
                    <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-gray-500">{kpi.trend}</span>
                            </div>
                          </div>
                          <div className={`p-2 rounded-lg ${kpi.color}`}>
                            <kpi.icon className="h-5 w-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Avance Físico y Financiero</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{ fisico: { color: '#3b82f6', label: 'Físico' }, financiero: { color: '#22c55e', label: 'Financiero' } }}>
                        <LineChart data={avanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mes" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="fisico" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="financiero" stroke="#22c55e" strokeWidth={2} />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Presupuesto vs Ejecutado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{ planificado: { color: '#fbbf24', label: 'Planificado' }, ejecutado: { color: '#8cb43a', label: 'Ejecutado' } }}>
                        <BarChart data={presupuestoData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mes" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="planificado" fill="#fbbf24" />
                          <Bar dataKey="ejecutado" fill="#8cb43a" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
                {/* KPI Alerts/Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Alertas y Tendencias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {kpiAlerts.map((alert, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <alert.icon className={`h-5 w-5 ${alert.color}`} />
                          <span className="text-gray-700">{alert.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="presupuesto" className="mt-0">
              <div className="space-y-8">
                {/* Budget Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {budgetSummary.map((item, idx) => (
                    <Card key={idx} className="flex flex-col items-center justify-center bg-white border-2 border-gray-100 shadow hover:shadow-lg transition">
                      <CardContent className="flex flex-col items-center p-6">
                        <div className={`p-2 rounded-lg mb-2 ${item.color}`}><item.icon className="h-6 w-6" /></div>
                        <div className="text-lg font-semibold text-gray-700 text-center">{item.label}</div>
                        <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Export/Share/Print Buttons */}
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar</Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><Printer className="h-4 w-4" /> Imprimir</Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><Share2 className="h-4 w-4" /> Compartir</Button>
                </div>
                {/* Budget Breakdown Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Desglose Presupuestario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Partida</TableHead>
                          <TableHead>Planificado</TableHead>
                          <TableHead>Ejecutado</TableHead>
                          <TableHead>Variación (%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {budgetTable.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.partida}</TableCell>
                            <TableCell>${row.planificado.toLocaleString()}</TableCell>
                            <TableCell>${row.ejecutado.toLocaleString()}</TableCell>
                            <TableCell className={row.variacion < 0 ? 'text-red-600' : row.variacion > 0 ? 'text-green-600' : ''}>{row.variacion}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                {/* Variance Analysis Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis de Variación por Partida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{ variacion: { color: '#f87171', label: 'Variación (%)' } }}>
                      <BarChart data={variacionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="partida" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="variacion" fill="#f87171" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="licencias" className="mt-0">
              <div className="space-y-8">
                {/* Filters Section */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <Filter className="text-[#1e3269]" />
                      Filtros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4 items-center">
                    <Select /* Estado */>
                      <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Estado" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {allEstados.map(e => <SelectItem value={e} key={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select /* Tipo */>
                      <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Tipo" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {allTipos.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {kpiLicCards.map((kpi, idx) => (
                    <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <ArrowUpRight className="h-3 w-3 text-green-500" />
                              <p className="text-xs text-gray-500">{kpi.trend}</p>
                            </div>
                          </div>
                          <div className={`p-2 rounded-lg ${kpi.color}`}>
                            <kpi.icon className="h-5 w-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Next Expirations & Risk Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-sm border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                        <FileClock className="text-[#1e3269]" /> Próximos Vencimientos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {licensesExpiringSoon.length === 0 ? (
                        <div className="text-gray-500">No hay licencias próximas a vencer.</div>
                      ) : (
                        <ul className="space-y-2">
                          {licensesExpiringSoon.map((l, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <Badge variant="secondary" className="min-w-[90px] text-center">{l.estado}</Badge>
                              <span className="font-medium text-gray-800">{l.nombre}</span>
                              <span className="text-gray-500 text-sm">{l.vencimiento}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-sm border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" /> Alertas de Riesgo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {expiredLicenses.length === 0 ? (
                        <div className="text-gray-500">No hay licencias vencidas.</div>
                      ) : (
                        <ul className="space-y-2">
                          {expiredLicenses.map((l, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <Badge variant="destructive" className="min-w-[90px] text-center">{l.estado}</Badge>
                              <span className="font-medium text-gray-800">{l.nombre}</span>
                              <span className="text-gray-500 text-sm">{l.vencimiento}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>
                {/* Licenses Table */}
                <Card className="bg-white rounded-xl shadow border p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Button variant="default">Agregar Nuevo</Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" /> Exportar
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> Compartir
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha Emisión</TableHead>
                        <TableHead>Vencimiento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {licenses.map((l, idx) => (
                        <TableRow key={l.id}>
                          <TableCell className="flex items-center gap-2">{l.tipo}</TableCell>
                          <TableCell>{l.nombre}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1">
                              {statusIcon[l.estado]} <Badge variant={statusBadge[l.estado] as any}>{l.estado}</Badge>
                            </span>
                          </TableCell>
                          <TableCell>{l.fecha}</TableCell>
                          <TableCell>{l.vencimiento}</TableCell>
                        </TableRow>
                      ))}
                      {licenses.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-400">No hay licencias que coincidan con los filtros.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="documentos" className="mt-0">
              <div className="space-y-8">
                {/* Critical Document Alerts */}
                <Alert variant="warning">
                  <AlertTitle>Documentos Críticos Pendientes</AlertTitle>
                  <AlertDescription>
                    2 documentos clave requieren revisión urgente: <b>Contrato_Cliente_001.docx</b> y <b>Presupuesto_Proyecto_2024.xlsx</b>.
                  </AlertDescription>
                </Alert>
                {/* Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" /> Subir Documentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Arrastra y suelta archivos aquí o haz clic para seleccionar</p>
                      <Button><Upload className="h-4 w-4 mr-2" /> Seleccionar Archivos</Button>
                      <p className="text-sm text-gray-500 mt-2">PDF, DOC, XLS, JPG, PNG hasta 10MB</p>
                    </div>
                  </CardContent>
                </Card>
                {/* Search and Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input placeholder="Buscar documentos..." className="pl-10" />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Estado" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los estados</SelectItem>
                          <SelectItem value="approved">Aprobados</SelectItem>
                          <SelectItem value="pending">Pendientes</SelectItem>
                          <SelectItem value="rejected">Rechazados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                {/* Export/Share/Print Buttons */}
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar</Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><Printer className="h-4 w-4" /> Imprimir</Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><Share2 className="h-4 w-4" /> Compartir</Button>
                </div>
                {/* Documents List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos ({documentosProyecto.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documentosProyecto.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            {doc.type === 'pdf' && <FileText className="h-8 w-8 text-red-500" />}
                            {doc.type === 'image' && <Image className="h-8 w-8 text-green-500" />}
                            {doc.type === 'spreadsheet' && <FileSpreadsheet className="h-8 w-8 text-green-600" />}
                            {doc.type === 'document' && <FileText className="h-8 w-8 text-blue-500" />}
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>Subido por {doc.uploadedBy}</span>
                                <span>•</span>
                                <span>{doc.uploadDate}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                {doc.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={doc.status === 'approved' ? 'bg-green-100 text-green-800' : doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                              {doc.status === 'approved' ? 'Aprobado' : doc.status === 'pending' ? 'Pendiente' : 'Rechazado'}
                            </Badge>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {documentosProyecto.length === 0 && (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No se encontraron documentos que coincidan con la búsqueda.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="galeria" className="mt-0">
              <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {kpiGaleria.map((kpi, idx) => (
                    <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <ArrowUpRight className="h-3 w-3 text-green-500" />
                              <p className="text-xs text-gray-500">{kpi.trend}</p>
                            </div>
                          </div>
                          <div className={`p-2 rounded-lg ${kpi.color}`}>
                            <kpi.icon className="h-5 w-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Filters Section */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <Filter className="text-[#1e3269]" /> Filtros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4 items-center">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Tipo" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {allTypes.map(t => <SelectItem value={t} key={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar por Proyecto" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {allProjects.map(p => <SelectItem value={p} key={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">Limpiar Filtros</Button>
                  </CardContent>
                </Card>
                {/* Upload and Export/Share/Print Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <Button variant="default">Agregar Nuevo</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar</Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2"><Printer className="h-4 w-4" /> Imprimir</Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2"><Share2 className="h-4 w-4" /> Compartir</Button>
                  </div>
                </div>
                {/* Gallery Grid */}
                <Card className="bg-white rounded-xl shadow border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gallery.map((g, idx) => (
                      <Card key={g.id} className="p-0 overflow-hidden shadow hover:shadow-lg transition flex flex-col">
                        <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                          <img src={g.url} alt={g.name} className="object-contain h-full w-full" />
                          <Badge variant={g.type === 'Plano' ? 'success' : 'warning'} className="absolute top-2 left-2 px-3 py-1 rounded-full">{g.type}</Badge>
                        </div>
                        <CardContent className="flex-1 flex flex-col justify-between p-4">
                          <div>
                            <div className="font-semibold text-gray-700 mb-1">{g.name}</div>
                            <div className="text-xs text-gray-500 mb-2">{g.project} • {g.date}</div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="secondary" className="gap-1"><Eye size={16} /> Ver</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {gallery.length === 0 && (
                      <div className="col-span-full text-center text-gray-400 py-8">No hay archivos que coincidan con los filtros.</div>
                    )}
                  </div>
                </Card>
                {/* Modal/Preview placeholder */}
                {/* <div>Modal/Preview aquí</div> */}
              </div>
            </TabsContent>
            <TabsContent value="equipo" className="mt-0">
              <div className="space-y-8">
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <Users className="text-[#1e3269]" /> Equipo y Responsables
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {equipoProyecto.map((m) => (
                        <Card key={m.id} className="flex flex-col items-center p-6 bg-gray-50 border border-gray-200 rounded-xl shadow hover:shadow-lg transition">
                          <div className="w-14 h-14 bg-[#1e3269] rounded-full flex items-center justify-center mb-3">
                            <User className="h-7 w-7 text-white" />
                          </div>
                          <div className="text-lg font-semibold text-gray-800 text-center">{m.nombre}</div>
                          <div className="text-sm text-gray-600 text-center mb-1">{m.rol}</div>
                          <div className="text-xs text-gray-500 text-center mb-2">{m.asignacion}</div>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1"><Mail className="h-4 w-4" /> Mensaje</Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1"><Edit className="h-4 w-4" /> Editar</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProyectoDetalle; 