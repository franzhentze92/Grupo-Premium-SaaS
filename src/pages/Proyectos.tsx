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
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ProyectosPremium />
      </div>
    </div>
  );
};

export default Proyectos; 