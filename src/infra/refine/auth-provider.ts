"use client";

import type { AuthProvider } from "@refinedev/core";

export interface SessionUser {
  email: string;
  name?: string;
}

type SessionCredentials = {
  email: string;
  password: string;
};

const SESSION_ENDPOINT = "/api/auth/session";

async function readSession(): Promise<SessionUser | null> {
  const response = await fetch(SESSION_ENDPOINT, {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { user?: SessionUser } | null;
  return data?.user ?? null;
}

async function createSession(
  credentials: SessionCredentials,
): Promise<SessionUser> {
  const response = await fetch(SESSION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(
      (payload as { message?: string }).message ||
        "Unable to create session. Please try again.",
    );
  }

  const data = (await response.json().catch(() => ({}))) as
    | { user?: SessionUser }
    | undefined;

  if (!data?.user) {
    throw new Error("Unable to create session. Please try again.");
  }

  return data.user;
}

async function clearSession(): Promise<void> {
  await fetch(SESSION_ENDPOINT, {
    method: "DELETE",
    credentials: "include",
  });
}

export const authProvider: AuthProvider = {
  login: async ({ email, password }: { email?: string; password?: string }) => {
    if (!email || !password) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Email and password are required",
        },
      };
    }

    await createSession({ email, password });

    return {
      success: true,
      redirectTo: "/",
    };
  },

  register: async () => ({
    success: false,
    error: {
      name: "RegisterError",
      message: "Registration is disabled",
    },
  }),

  logout: async () => {
    await clearSession();

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const user = await readSession();

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getIdentity: async () => {
    const user = await readSession();
    return user ?? null;
  },

  onError: async (error: Error) => {
    console.error("[authProvider] onError", error);
    return { error };
  },
};
