import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
  };
  accessToken: string;
  refreshToken?: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", payload);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register", payload);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  },

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "ADMIN";
  },
};
