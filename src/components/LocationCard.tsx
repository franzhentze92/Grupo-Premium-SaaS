import React from 'react';
import { Button } from '@/components/ui/button';

interface LocationCardProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ name, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={onClick}
      className={`text-xs font-medium whitespace-nowrap ${isActive ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-primary/10'}`}
    >
      {name}
    </Button>
  );
};

export default LocationCard;
