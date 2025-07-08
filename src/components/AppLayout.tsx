import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
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
        {/* Top bar (desktop & mobile) */}
        <header className="sticky top-0 z-30 flex items-center justify-end p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
              <Bell className="h-5 w-5 text-gray-500" />
              {/* Notification badge (hidden for now) */}
              <span className="sr-only">Notificaciones</span>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="cursor-pointer">
                  <Avatar size="sm">
                    <AvatarFallback>
                      {user?.name
                        ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                        : user?.email
                          ? user.email[0].toUpperCase()
                          : '?'}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-semibold text-gray-800">{user?.name || user?.email || 'Usuario'}</span>
                  {user?.email && user?.name && <span className="text-xs text-gray-500">{user.email}</span>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { /* TODO: Open profile settings */ }}>
                  Configuración de Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { 
  if (typeof logout === 'function') { 
    logout(); 
  }
  navigate('/login', { replace: true });
}}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

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
