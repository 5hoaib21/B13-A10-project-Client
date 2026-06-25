import { auth } from "@/lib/auth";
import {
  Bars,
  Bell,
  Comment,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea, User, Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { BiAddToQueue, BiMoney } from "react-icons/bi";
import { CiSaveDown1 } from "react-icons/ci";
import { MdReport } from "react-icons/md";
import { TbAsset } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { redirect } from "next/navigation";// ✅ ActiveLink কম্পোনেন্ট ইম্পোর্ট
import ActiveLink from "../ActiveLink";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user;
  if(!user){
    redirect('/signin')
  }
  const role = user?.role || 'creator';
  
  const dashboardItems = {
    user: [
      {
        icon: User,
        label: "My Profile",
        link: "/dashboard/user/profile",
      },
      { icon: BiAddToQueue, label: "Add Prompt", link: "/dashboard/user/add-prompt" },
      {
        icon: BiMoney,
        label: "My Prompt",
        link: "/dashboard/user/my-prompt",
      },
      { icon: Gear, label: "Saved Prompts", link: "/dashboard/user/saved-prompt" },
      { icon: Gear, label: "My Reviews", link: "/dashboard/user/my-review" },
    ],
    creator: [
      {
        icon: User,
        label: "My Profile",
        link: "/dashboard/creator/profile",
      },
      { icon: BiAddToQueue, label: "Add Prompt", link: "/dashboard/creator/add-prompt" },
      {
        icon: BiMoney,
        label: "My Prompts",
        link: "/dashboard/creator/my-prompt",
      },
      { icon: CiSaveDown1, label: "Saved Prompts", link: "/dashboard/creator/saved-prompt" },
      { icon: Comment, label: "My Reviews", link: "/dashboard/creator/my-review" },
    ],
    admin: [
      {
        icon: Users,
        label: "Users Management",
        link: "/dashboard/admin/all-users",
      },
      { 
        icon: User, 
        label: "Prompts Management", 
        link: "/dashboard/admin/all-prompts" 
      },
      {
        icon: BiMoney,
        label: "Transactions",
        link: "/dashboard/admin/all-payments",
      },
      { icon: MdReport, label: "Reports", link: "/dashboard/admin/reports" },
    ],
  };

  const navItems = dashboardItems[role];

  return (
    <Drawer>
      <Button className={"lg:hidden md:hidden sm:block"} variant="secondary">
        <Bars />
        Menu
      </Button>
      
      <nav className="flex flex-col gap-1 hidden lg:block md:block">
        {navItems.map((item) => (
          <ActiveLink 
            href={item.link} 
            key={item.label}
            prefetch={false}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            activeClassName="bg-blue-50 text-blue-600 shadow-sm"
            inactiveClassName="text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </ActiveLink>
        ))}
      </nav>
      
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <ActiveLink 
                    href={item.link} 
                    key={item.label}
                    prefetch={false}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default w-full"
                    activeClassName="bg-blue-50 text-blue-600 shadow-sm"
                    inactiveClassName="text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </ActiveLink>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}