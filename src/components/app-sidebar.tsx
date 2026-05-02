"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GalleryVerticalEndIcon } from "lucide-react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Começar",
      url: "#",
      items: [
        {
          title: "Página inicial",
          url: "/",
        },
        {
          title: "Como funciona",
          url: "#",
        },
      ],
    },
    {
      title: "Cursos",
      url: "#",
      items: [
        {
          title: "Ver todos",
          url: "/cursos",
        },
        {
          title: "Programação",
          url: "/cursos/categoria/programacao",
          isActive: true,
        },
        {
          title: "Design",
          url: "/cursos/categoria/design",
        },
        {
          title: "Marketing",
          url: "/cursos/categoria/marketing",
        },
        {
          title: "Fotografia",
          url: "/cursos/categoria/fotografia",
        },
        {
          title: "Idiomas",
          url: "/cursos/categoria/idiomas",
        },
      ],
    },
    {
      title: "Suporte",
      url: "#",
      items: [
        {
          title: "FAQ",
          url: "#",
        },
        {
          title: "Contato",
          url: "#",
        },
        {
          title: "Feedback",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEndIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">HubTreina</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
