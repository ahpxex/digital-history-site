import { SessionUser } from "@/lib/auth/session";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Administrator";

const NORMALIZED_EMAIL = ADMIN_EMAIL.trim().toLowerCase();

export const getAdminUser = (): SessionUser => ({
  email: ADMIN_EMAIL,
  name: ADMIN_NAME,
});

export const validateAdminCredentials = (
  email?: string,
  password?: string,
): boolean => {
  if (!email || !password) return false;
  return (
    email.trim().toLowerCase() === NORMALIZED_EMAIL &&
    password === ADMIN_PASSWORD
  );
};
