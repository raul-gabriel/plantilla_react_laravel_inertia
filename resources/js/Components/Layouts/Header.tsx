import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';
import UserMenu from './UserMenu';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeMenu: string;
}



interface PageProps {
  auth: {
    user: {
      id: number;
      nombres: string;
      correo: string;
      rol: 'administrador' | 'visitante';
      dni: string;
      celular?: string;
    } | null;
  };
}



const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, activeMenu }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const [notifications] = useState([
    { text: 'Nuevo usuario registrado', time: 'Hace 5 min' },
    { text: 'Reporte generado', time: 'Hace 1 hora' },
    { text: 'Configuración actualizada', time: 'Hace 2 horas' },
  ]);

  // Cierra ambos dropdowns si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current && !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        notificationsRef.current && !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);





  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-2 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-800 capitalize">
              {activeMenu}
            </h1>
            <p className="text-sm text-gray-600">Gestiona tu aplicación</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-auto">
                <div className="py-2">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 border-b last:border-b-0 border-gray-300 hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="text-sm font-medium text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
