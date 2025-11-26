"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function HomeNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "首页", href: "/" },
    { label: "精选案例", href: "/#featured-cases" },
    { label: "研究工具", href: "/#research-tools" },
    { label: "数据集", href: "/#datasets" },
    { label: "发展动态", href: "/#dynamic-news" },
    { label: "合作机构", href: "/#partners" },
    { label: "高级搜索", href: "/advanced-search" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return false;
    }
    return pathname === href;
  };

  return (
    <Navbar 
      maxWidth="xl" 
      className="bg-background/70 backdrop-blur-md border-b border-default-100"
      height="4rem"
    >
      <NavbarBrand>
        <Link as={NextLink} href="/" className="flex items-center gap-3 text-inherit hover:opacity-80 transition-opacity">
          <div className="relative w-8 h-8">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-lg tracking-tight">Digital History</span>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href} isActive={isActive(item.href)}>
            <Link
              as={NextLink}
              href={item.href}
              color={isActive(item.href) ? "primary" : "foreground"}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href) ? "font-semibold" : "text-default-600 hover:text-default-900"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
    </Navbar>
  );
}
