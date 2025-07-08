import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/use-mobile';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isMobile = useMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Debug logging
  console.log('AppLayout - User:', user);
  console.log('AppLayout - Loading:', loading);
  console.log('AppLayout - IsMobile:', isMobile);

  // Effect to redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      console.log('AppLayout - Redirecting to login');
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Effect to handle sidebar state on mobile/desktop switch
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Show loading state
  if (loading) {
    console.log('AppLayout - Showing loading state');
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  // Don't render anything if not authenticated (redirect will happen)
  if (!user) {
    console.log('AppLayout - No user, not rendering');
    return null;
  }

  console.log('AppLayout - Rendering main layout');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        {isMobile && (
          <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="mr-2"
              >
                <Menu size={20} />
              </Button>
              <h1 className="text-lg font-semibold">Grupo Premium</h1>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto text-sm text-gray-500">
            © 2025 Grupo Premium. Todos los derechos reservados.
          </div>
        </footer>
      </div>

      {/* Overlay for mobile */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AppLayout;
