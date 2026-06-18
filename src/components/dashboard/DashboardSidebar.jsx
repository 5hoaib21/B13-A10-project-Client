import { auth } from "@/lib/auth";
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea, User } from "lucide-react";
import { headers } from "next/headers";
import { BiMoney } from "react-icons/bi";
import { TbAsset } from "react-icons/tb";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user;
  const role = user?.role || 'creator';
  // console.log('user', user);
  const dashboardItems = {
    user: [
      {
        icon: ChartArea,
        label: "Overview",
        link: "/dashboard/user/overview",
      },
      { icon: TbAsset, label: "Products", link: "/dashboard/user/products" },
      {
        icon: BiMoney,
        label: "Transactions",
        link: "/dashboard/user/transactions",
      },
      { icon: Gear, label: "Settings", link: "/dashboard/user/settings" },
    ],
    creator: [
      {
        icon: ChartArea,
        label: "Overview",
        link: "/dashboard/creator/overview",
      },
      { icon: TbAsset, label: "Productsss", link: "/dashboard/creator/products" },
      {
        icon: BiMoney,
        label: "Transactions",
        link: "/dashboard/creator/transactions",
      },
      { icon: Gear, label: "Settings", link: "/dashboard/creator/settings" },
    ],
    admin: [
      {
        icon: ChartArea,
        label: "Overview",
        link: "/dashboard/admin/overview",
      },
      { icon: User, label: "User Management", link: "/dashboard/admin/products" },
      {
        icon: BiMoney,
        label: "Transactions",
        link: "/dashboard/admin/transactions",
      },
      { icon: Gear, label: "Settings", link: "/dashboard/admin/settings" },
    ],
  };

  const navItems = dashboardItems[role];
  // [
  //   { icon: House, label: "Home" },
  //   { icon: Magnifier, label: "Search" },
  //   { icon: Bell, label: "Notifications" },
  //   { icon: Envelope, label: "Messages" },
  //   { icon: Person, label: "Profile" },
  //   { icon: Gear, label: "Settings" },
  // ];

  return (
    <Drawer>
      <Button className={"lg:hidden md:hidden sm:block"} variant="secondary">
        <Bars />
        Menu
      </Button>
      <nav className="flex flex-col gap-1 hidden lg:block md:block">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
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
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
