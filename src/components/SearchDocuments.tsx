import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchDocumentsProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'manual', label: 'Manuales' },
  { value: 'policy', label: 'Políticas' },
  { value: 'regulation', label: 'Reglamentos' },
  { value: 'contract', label: 'Contratos' },
  { value: 'plan', label: 'Planes' }
];

const SearchDocuments: React.FC<SearchDocumentsProps> = ({ 
  onSearch, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Input
          placeholder="Buscar documentos..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>
      <Select onValueChange={onCategoryChange} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchDocuments;
