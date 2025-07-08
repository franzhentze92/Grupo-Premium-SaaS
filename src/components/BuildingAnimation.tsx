import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AnimationFrame {
  id: number;
  description: string;
  progress: number;
}

const BuildingAnimation = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const frames: AnimationFrame[] = [
    { id: 0, description: 'Preparación del terreno', progress: 0 },
    { id: 1, description: 'Excavación de cimientos', progress: 15 },
    { id: 2, description: 'Construcción de cimientos', progress: 30 },
    { id: 3, description: 'Estructura del primer piso', progress: 45 },
    { id: 4, description: 'Estructura del segundo piso', progress: 60 },
    { id: 5, description: 'Estructura del tercer piso', progress: 75 },
    { id: 6, description: 'Acabados exteriores', progress: 90 },
    { id: 7, description: 'Proyecto completado', progress: 100 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  useEffect(() => {
    setProgress(frames[currentFrame]?.progress || 0);
  }, [currentFrame, frames]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Proceso de Construcción</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Animation Area */}
        <div className="relative h-64 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden">
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-8 bg-amber-600"></div>
          
          {/* Foundation */}
          {currentFrame >= 2 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-600 transition-all duration-1000"></div>
          )}
          
          {/* Building Structure */}
          {currentFrame >= 3 && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-28 h-12 bg-gray-400 border-2 border-gray-600 transition-all duration-1000"></div>
          )}
          
          {currentFrame >= 4 && (
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-28 h-12 bg-gray-400 border-2 border-gray-600 transition-all duration-1000"></div>
          )}
          
          {currentFrame >= 5 && (
            <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-28 h-12 bg-gray-400 border-2 border-gray-600 transition-all duration-1000"></div>
          )}
          
          {/* Roof */}
          {currentFrame >= 6 && (
            <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-red-600 transition-all duration-1000"></div>
          )}
          
          {/* Crane */}
          {currentFrame >= 1 && currentFrame < 7 && (
            <div className="absolute top-4 right-8 w-2 h-32 bg-yellow-500 transition-all duration-1000">
              <div className="absolute -top-2 -left-4 w-10 h-2 bg-yellow-500"></div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progreso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Current Phase */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            {frames[currentFrame]?.description}
          </p>
          <p className="text-sm text-gray-600">
            Fase {currentFrame + 1} de {frames.length}
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button onClick={handlePlay} variant="outline" size="sm">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildingAnimation;