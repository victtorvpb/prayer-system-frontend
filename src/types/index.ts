export interface PrayerPoint {
  id: string;
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  active: boolean;
}

export interface PrayerPointFormData {
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  active: boolean;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
  ativo: boolean;
}

export interface UserFormData {
  nome: string;
  email: string;
  senha?: string;
  confirmarSenha?: string;
  role: "admin" | "user";
  ativo: boolean;
} 
