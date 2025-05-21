import { api } from "./api";
export const authService = {
  login: (email: string, senha: string) => api.post("/login", { email, senha }),
  // outros métodos...
}; 
