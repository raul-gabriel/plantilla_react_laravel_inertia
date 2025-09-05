// resources/js/types/global.d.ts

declare global {
  function route(name: string, params?: any): string;
  
  interface Window {
    route: typeof route;
  }
}

export {};

// Tipos para Inertia
export interface User {
  id: number;
  nombres: string;
  correo: string;
  rol: 'administrador' | 'visitante';
  dni: string;
  celular?: string;
}

export interface Auth {
  user: User | null;
}

export interface PageProps extends Record<string, any> {
  auth: Auth;
  flash?: {
    message?: string;
    error?: string;
  };
}