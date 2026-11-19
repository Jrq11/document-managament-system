const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const ACCESS_TOKEN_KEY = "docuqr_access_token";

type AuthSession = {
  access_token: string;
};

type AuthResponse = {
  user: Record<string, unknown> | null;
  session: AuthSession | null;
  message?: string;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
        ? body.error
        : "The request could not be completed.";

    throw new Error(message);
  }

  return body as T;
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signUp(input: {
  fullName: string;
  email: string;
  department: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function saveAccessToken(token: string, rememberMe: boolean): void {
  const storage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;

  otherStorage.removeItem(ACCESS_TOKEN_KEY);
  storage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ??
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
}

export async function signOut(): Promise<void> {
  const accessToken = getAccessToken();

  try {
    if (accessToken) {
      await request<void>("/api/auth/signout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } finally {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
