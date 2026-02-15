import { SidebarLayout } from "@/components/sidebar-layout";
import { getModules } from "@/data/lessons";
import type React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout modules={getModules()}>{children}</SidebarLayout>;
}
