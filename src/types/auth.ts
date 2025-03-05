// src/types/auth.ts
export interface User {
    id: string;
    email: string;
    full_name?: string;
    created_at: string;
    updated_at: string;
    is_verified: boolean;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
    full_name?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  