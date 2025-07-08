import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

interface PowerBIReportProps {
  title: string;
  reportUrl?: string;
}

const PowerBIReport: React.FC<PowerBIReportProps> = ({ 
  title,
  reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiM2MzYzZkOGQtNDA1YS00ODdmLTkzMTItMDE0ZDQxYzE1NGUxIiwidCI6IjlmMmQzMzdhLTQ5Y2QtNDczZi1iZDI4LTI5NGNkNWYzMThhYiIsImMiOjR9"
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Card className={`h-full ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleFullScreen}
          className="ml-auto"
        >
          {isFullScreen ? <Minimize2Icon size={18} /> : <Maximize2Icon size={18} />}
        </Button>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        <div className={`w-full ${isFullScreen ? 'h-[calc(100vh-4rem)]' : 'h-[600px]'}`}>
          <iframe 
            title={title}
            width="100%" 
            height="100%" 
            src={reportUrl}
            frameBorder="0" 
            allowFullScreen={true}
            style={{ border: 'none' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerBIReport;
