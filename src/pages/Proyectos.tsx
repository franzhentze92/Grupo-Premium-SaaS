import React from 'react';
import ProyectosPremium from './ProyectosPremium';
import ProyectosKPIs from './ProyectosKPIs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, BarChart3, Plus, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Proyectos: React.FC = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#8cb43a] rounded-lg">
                <Building2 className="text-white h-6 w-6" />
              </div>
              Gestión de Proyectos
            </h1>
            <p className="text-gray-600">Administra y monitorea todos los proyectos de la empresa</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-[#8cb43a] hover:bg-[#7ca02e] text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Proyecto
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Progreso</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Equipos Activos</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próximos Vencimientos</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <Tabs defaultValue="premium" className="w-full">
          <div className="border-b border-gray-200">
            <TabsList className="bg-transparent border-b-0 rounded-none h-auto p-0">
              <TabsTrigger 
                value="premium" 
                className="data-[state=active]:bg-[#8cb43a] data-[state=active]:text-white data-[state=active]:border-[#8cb43a] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Proyectos Premium
              </TabsTrigger>
              <TabsTrigger 
                value="kpis" 
                className="data-[state=active]:bg-[#8cb43a] data-[state=active]:text-white data-[state=active]:border-[#8cb43a] rounded-none border-b-2 border-transparent px-6 py-4 text-base font-medium"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Indicadores Clave (KPIs)
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="p-6">
            <TabsContent value="premium" className="mt-0">
              <ProyectosPremium />
            </TabsContent>
            <TabsContent value="kpis" className="mt-0">
              <ProyectosKPIs />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Proyectos; 