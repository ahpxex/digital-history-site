"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useLogin } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/lib/schemas";

type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending: isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const resetErrors = (...keys: (keyof LoginErrors)[]) => {
    setErrors((prev) => {
      if (!prev.general && keys.every((key) => !prev[key])) {
        return prev;
      }
      const next = { ...prev };
      keys.forEach((key) => {
        if (next[key]) {
          delete next[key];
        }
      });
      delete next.general;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await login({
        email,
        password,
      });

      if (response?.success === false) {
        setErrors({
          general:
            response.error?.message ||
            "Failed to sign in. Please check your credentials.",
        });
        return;
      }

      const redirectTo = response?.redirectTo ?? "/";
      router.push(redirectTo);
    } catch (error: any) {
      setErrors({
        general:
          error?.message || "Failed to sign in. Please check your credentials.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center text-center">
        <h1 className="text-4xl font-bold">Administrator Login</h1>
        <p className="text-gray-600 max-w-md text-balance">
          This dashboard is restricted to a single administrator account. Update
          the <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code>{" "}
          environment variables to customize the credentials.
        </p>
      </div>
      <Card className="w-full max-w-md">
        <CardBody className="space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {errors.general && (
              <Alert
                color="warning"
                variant="flat"
                title="Unable to sign in"
                description={errors.general}
              />
            )}
            <Input
              isRequired
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                resetErrors("email");
              }}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
            />
            <Input
              isRequired
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                resetErrors("password");
              }}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
            />
            <Button
              type="submit"
              color="primary"
              variant="solid"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
