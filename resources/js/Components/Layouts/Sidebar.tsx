import React from 'react';
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  LucideIcon
} from 'lucide-react';

import { Link } from '@inertiajs/react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  show?: boolean; // opcional para condicionar visibilidad
}


interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  show?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, activeMenu, setActiveMenu }) => {


const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
  { id: 'usuarios', label: 'Usuarios', icon: Users, href: '/usuarios', show: true },
  { id: 'analytics', label: 'Analíticas', icon: BarChart3, href: '/analytics', show: false },
  { id: 'reports', label: 'Reportes', icon: FileText, href: '/reports' },
  { id: 'settings', label: 'Configuración', icon: Settings, href: '/settings' },
];

  return (
    <>
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className=" fixed inset-0 bg-black/80 bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-[#1C2434] shadow-lg z-50 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen
      `}>
        {/* Logo */}
        <div className="mt-6   flex flex-col items-center justify-center">
          <img
            src="/recursos/cusocode.png"
            alt="Logo"
            className="h-12 w-auto mb-2"
          />
          <h1 className="text-xl font-medium text-gray-300 text-center">Coporacion Cuscocode</h1>
        </div>

         {/* Navigation */}
      <nav className="mt-6">
        <h3 className="mt-10 mb-4 ml-4 text-md font-semibold text-white/70">Menú</h3>

        {menuItems
          .filter(item => item.show !== false)
          .map((item) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.href;

            return (
              <Link
                href={item.href}
                key={item.id}
                className={`
                  font-medium w-full flex items-center px-6 py-3 text-left transition-colors duration-200
                  ${isActive
                    ? 'bg-[#333A48] border-r-2 border-[#00B19D] text-white'
                    : 'text-gray-400 hover:bg-[#333A48] hover:text-white'}
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
      </nav>
      </aside>
    </>
  );
};

export default Sidebar;