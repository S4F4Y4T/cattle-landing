import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

export interface CheckSlugResponse {
  available: boolean;
  suggestion?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  slug: string;
  package_id: number | null;
}

export interface RegisterResponse {
  tenant_id: number;
  slug: string;
}

export async function checkSlug(slug: string): Promise<CheckSlugResponse> {
  const res = await api.post<{ data: CheckSlugResponse }>("/check-slug", { slug });
  return res.data.data;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const res = await api.post<{ data: RegisterResponse }>("/register", payload);
  return res.data.data;
}
