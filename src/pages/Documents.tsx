import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  FileText, 
  FileImage, 
  FileSpreadsheet,
  Download,
  Eye,
  Trash2,
  Edit,
  Share2
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'spreadsheet' | 'document';
  size: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  tags: string[];
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample documents data
  const documents: Document[] = [
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

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'image':
        return <FileImage className="h-8 w-8 text-green-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
      case 'document':
        return <FileText className="h-8 w-8 text-blue-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || doc.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión Documental</h1>
        <p className="text-gray-500 mt-1">Administra y organiza todos los documentos del proyecto</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Subir Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Arrastra y suelta archivos aquí o haz clic para seleccionar
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Seleccionar Archivos
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              PDF, DOC, XLS, JPG, PNG hasta 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar documentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="approved">Aprobados</option>
              <option value="pending">Pendientes</option>
              <option value="rejected">Rechazados</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getFileIcon(doc.type)}
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
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status === 'approved' ? 'Aprobado' : 
                     doc.status === 'pending' ? 'Pendiente' : 'Rechazado'}
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron documentos que coincidan con la búsqueda.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
