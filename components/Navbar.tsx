"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiShoppingBag,
  FiLayers,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/Explore" },
  ];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="bg-green-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Website Name */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold tracking-wider text-white"
            >
              Mango<span className="text-amber-500">Cart</span>
            </Link>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-amber-500 relative py-1 text-white"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right - Auth +++++Profile Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {!isPending && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 border border-green-600 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200"
                >
                  <span>
                    Hi, {user.name ? user.name.split(" ")[0] : "User"}
                  </span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown />
                  </motion.div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-slate-900 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-slate-200">
                        <p className="text-xs text-slate-500 font-semibold">
                          Signed in as
                        </p>
                        <p className="text-xs text-slate-700 truncate font-medium">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/My-Profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <FiUser className="text-slate-500" /> My Profile
                      </Link>
                      <Link
                        href="/My-Interaction"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <FiLayers className="text-slate-500" /> My Interaction
                      </Link>
                      <Link
                        href="/Add-Mango"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <FiShoppingBag className="text-slate-500" /> Add-Mango
                      </Link>

                      <div className="border-t border-slate-200 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
                        >
                          <FiLogOut /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              !isPending && (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-white hover:text-amber-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-amber-500 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700 focus:outline-none transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-green-800 border-t border-green-700"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                    pathname === link.href
                      ? "bg-green-700 text-amber-500"
                      : "hover:bg-green-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-green-700 pt-4 mt-2">
                {!isPending && user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-1 text-xs text-slate-300 font-semibold uppercase">
                      Hi, {user.name}
                    </div>
                    <Link
                      href="/My-Profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base text-white hover:bg-green-700"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/My-Interaction"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base text-white hover:bg-green-700"
                    >
                      My Interaction
                    </Link>
                    <Link
                      href="/Add-Mango"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base text-white hover:bg-green-700"
                    >
                      Add-Mango
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base text-red-300 hover:bg-red-900/30"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  !isPending && (
                    <div className="grid grid-cols-2 gap-2 px-3">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-center px-4 py-2 border border-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="text-center bg-amber-500 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Register
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
