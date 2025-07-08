import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectTabsProps {
  children: React.ReactNode;
  buildings: Array<{
    id: string;
    name: string;
  }>;
  activeBuilding: string;
  onBuildingChange: (buildingId: string) => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  children,
  buildings,
  activeBuilding,
  onBuildingChange,
}) => {
  return (
    <Tabs
      defaultValue={activeBuilding}
      onValueChange={onBuildingChange}
      className="w-full"
    >
      <div className="border-b mb-4">
        <TabsList className="bg-transparent">
          {buildings.map((building) => (
            <TabsTrigger 
              key={building.id} 
              value={building.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {building.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {buildings.map((building) => (
        <TabsContent key={building.id} value={building.id}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProjectTabs;
