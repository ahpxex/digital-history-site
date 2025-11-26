"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { useRouter } from "next/navigation";
import type { Key } from "react";
import { useEffect, useMemo, useState } from "react";
import type { SessionUser } from "@/lib/auth/session";

export function UserAvatar() {
  const router = useRouter();
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<SessionUser>();
  const { mutateAsync: logout } = useLogout();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  useEffect(() => {
    if (signOutError) {
      console.error("[auth] Sign out failed:", signOutError);
    }
  }, [signOutError]);

  const displayName = useMemo(() => {
    if (identity?.name) {
      return identity.name;
    }
    return identity?.email ?? "User";
  }, [identity]);

  const avatarSrc = undefined;

  const handleAction = async (key: Key) => {
    switch (key) {
      case "logout":
        try {
          setIsSigningOut(true);
          setSignOutError(null);
          const response = await logout();
          if (response?.success === false) {
            setSignOutError(
              response.error?.message ||
                "Unable to sign out. Please try again.",
            );
            return;
          }
          router.push("/login");
          router.refresh();
        } catch (error: any) {
          setSignOutError(
            error.message ?? "Unable to sign out. Please try again.",
          );
        } finally {
          setIsSigningOut(false);
        }
        break;
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="light"
          radius="full"
          endContent={
            isIdentityLoading ? (
              <Spinner size="sm" />
            ) : (
              <Avatar
                className="transition-transform"
                color="primary"
                name={displayName}
                size="sm"
                src={avatarSrc}
              />
            )
          }
        >
          <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:inline">
            {displayName}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        onAction={handleAction}
        variant="flat"
      >
        <DropdownSection>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            description="Sign out of your account"
            startContent={<SignOutIcon size={20} />}
            isDisabled={isSigningOut}
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
