import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  Building,
  Map,
  Calendar,
  FileText,
  Briefcase,
  Folder,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { menuConfig, MenuItem } from '@/config/menuConfig';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

// Simplified icon mapping - using only definitely existing icons
const iconMap: Record<string, React.ComponentType<any>> = {
  dashboard: LayoutDashboard,
  building: Building,
  map: Map,
  calendar: Calendar,
  'file-text': FileText,
  briefcase: Briefcase,
  folder: Folder,
  'bar-chart': BarChart3,
  users: Users,
  settings: Settings,
  // Fallback icons for missing ones
  'dollar-sign': FileText,
  'trending-up': BarChart3,
  megaphone: FileText,
  hammer: Building,
  ruler: FileText,
  scale: Settings,
  calculator: FileText,
  cog: Settings,
  headphones: Users,
  heart: Users,
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const IconComponent = iconMap[item.icon] || LayoutDashboard;
    const isExpanded = expandedItems.has(item.title);
    const hasChildren = item.children && item.children.length > 0;
    const isActiveItem = isActive(item.path);

    return (
      <div key={item.title}>
        <div className="relative">
          {item.path ? (
            <Link to={item.path}>
              <Button
                variant={isActiveItem ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 h-10 px-3",
                  level > 0 && "ml-4",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <IconComponent className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.title}</span>
                    {hasChildren && (
                      <ChevronRight className="h-3 w-3 ml-auto" />
                    )}
                  </>
                )}
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 h-10 px-3",
                level > 0 && "ml-4",
                isCollapsed && "justify-center px-2"
              )}
              onClick={() => hasChildren && toggleExpanded(item.title)}
            >
              <IconComponent className="h-4 w-4" />
              {!isCollapsed && (
                <>
                  <span className="truncate">{item.title}</span>
                  {hasChildren && (
                    isExpanded ? (
                      <ChevronUp className="h-3 w-3 ml-auto" />
                    ) : (
                      <ChevronDown className="h-3 w-3 ml-auto" />
                    )
                  )}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Render children */}
        {hasChildren && !isCollapsed && isExpanded && (
          <div className="mt-1">
            {item.children.map((child, index) => {
              if (typeof child === 'string') {
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 h-8 px-3 text-sm",
                      level > 0 ? "ml-8" : "ml-4"
                    )}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-2 align-middle" />
                    <span className="truncate align-middle">{child}</span>
                  </Button>
                );
              } else if (typeof child === 'object' && child.path) {
                // Render as a link if child has a path
                return (
                  <Link to={child.path} key={index}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2 h-8 px-3 text-sm",
                        level > 0 ? "ml-8" : "ml-4"
                      )}
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-2 align-middle" />
                      <span className="truncate align-middle">{child.title}</span>
                    </Button>
                  </Link>
                );
              } else {
                return renderMenuItem(child, level + 1);
              }
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <span className="font-semibold">Grupo Premium</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuConfig.map((item) => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Online</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
