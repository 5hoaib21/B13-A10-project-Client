"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { TbPrompt } from "react-icons/tb";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import { Coins, Home, Terminal } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter()

  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh()
  };

  const isActive = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/prompts", label: "All Prompts", icon: TbPrompt },
    { href: "/pricing", label: "Pricing", icon: Coins },
    ...(user ?[{ href: `/dashboard/${user?.role}`, label: "Dashboard", icon: RiDashboardHorizontalLine }] : []),
  ];

  return (
    <div>
      {/* Announcement Bar */}
      {/* <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-center text-sm text-white">
        <div className="animate-pulse">
          🎉 Avail Up to 4% Extra Discount with Bank Transfer | 💳 Cash on
          Delivery Available | 🚚 Fast Delivery in 2–3 Days.
        </div>
      </div> */}

      {/* Navbar - Fixed positioning to prevent hiding */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md dark:bg-gray-900/95"
            : "bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
        }`}
        // style={{ marginTop: "40px" }} // To account for announcement bar
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>

            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <Terminal />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 blur transition-opacity group-hover:opacity-20" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PromptForge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                        transition={{ type: "spring", bounce: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Auth Section - Fixed nested button issue */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive("/signin")
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <Button
                    className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isActive("/signup") ? "ring-2 ring-purple-600 ring-offset-2" : ""
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                  {/* Use div instead of button to avoid nested button */}
                  <div className="group relative cursor-pointer rounded-full p-0.5 transition-all duration-300 hover:scale-105">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 blur transition-opacity group-hover:opacity-100" />
                    <Avatar
                      size="sm"
                      className="relative border-2 border-white dark:border-gray-800"
                    >
                      <Avatar.Image
                        referrerPolicy="no-referrer"
                        alt={user?.name || "User"}
                        src={user?.image}
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="min-w-[220px] p-2">
                    <div className="flex items-center gap-3 border-b border-gray-100 p-3 dark:border-gray-700">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>
                          {user?.name?.charAt(0) || "U"}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium">
                          {user?.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 space-y-1">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <MdDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href={`/profile`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <CgProfile className="h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                      >
                        <BiLogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </Dropdown.Popover>
              </Dropdown>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-200 dark:border-gray-700 md:hidden"
            >
              <div className="space-y-1 p-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  {!user ? (
                    <div className="space-y-2">
                      <Link
                        href="/signin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Log in
                      </Link>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      <BiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;