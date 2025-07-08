import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Building, 
  Users, 
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  // If not logged in, redirect to login page
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  // Show loading state
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const stats = [
    {
      title: "Proyectos Activos",
      value: "12",
      change: "+2",
      icon: Building,
      color: "text-blue-600"
    },
    {
      title: "Ingresos Mensuales",
      value: "$2.4M",
      change: "+12%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Clientes Activos",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Tareas Pendientes",
      value: "89",
      change: "-5%",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido al panel de control de Grupo Premium</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} desde el mes pasado</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <Building className="h-6 w-6" />
              <span>Nuevo Proyecto</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Ver Reportes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6" />
              <span>Documentos</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Proyecto Alena - Fase 2 completada</p>
                <p className="text-sm text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Nuevo cliente registrado</p>
                <p className="text-sm text-gray-500">Hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Revisión de presupuesto pendiente</p>
                <p className="text-sm text-gray-500">Hace 1 día</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;