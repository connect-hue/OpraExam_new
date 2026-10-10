'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: 'Manage FAQs',
      href: '/admin/faqs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Manage Blogs',
      href: '/admin/blogs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      name: 'Site Content',
      href: '/admin/content',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex">
      {/* Desktop Sidebar Spacer - holds the 80px rail space so content doesn't shift */}
      <div className="hidden lg:block w-20 shrink-0" />

      {/* Desktop Sidebar Rail & Hover Drawer */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsHovered(false);
          }
        }}
        className={`hidden lg:flex lg:flex-col fixed top-0 bottom-0 left-0 z-40 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 shrink-0 select-none transition-all duration-300 ease-in-out overflow-x-hidden ${
          isHovered
            ? 'w-72 shadow-2xl shadow-emerald-950/20'
            : 'w-20 shadow-lg'
        }`}
      >
        {/* Brand */}
        <div className="h-20 px-3.5 flex items-center border-b border-slate-800/80 overflow-hidden shrink-0">
          <Link href="/admin" className="flex items-center min-w-max group/brand">
            <div className="w-[52px] h-12 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-500/20 group-hover/brand:scale-105 transition-transform">
                OP
              </div>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap pl-2 ${
                isHovered
                  ? 'opacity-100 max-w-[180px] delay-75'
                  : 'opacity-0 max-w-0 pointer-events-none'
              }`}
            >
              <span className="font-extrabold text-lg tracking-tight text-white block leading-tight">
                OPRA<span className="text-emerald-400">Admin</span>
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold block">
                Control Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3.5 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Management Heading / Divider */}
          <div className="pt-2 pb-1.5 px-1 overflow-hidden">
            <div
              className={`text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered
                  ? 'opacity-100 max-w-[180px] delay-75 block'
                  : 'opacity-0 max-w-0 hidden'
              }`}
            >
              Management
            </div>
            <div
              className={`h-px bg-slate-800/80 mx-1 transition-opacity duration-300 ${
                isHovered ? 'hidden' : 'block'
              }`}
            />
          </div>

          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                className={`flex items-center h-12 rounded-xl text-sm font-semibold transition-all group/item overflow-hidden ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="w-[52px] h-12 flex items-center justify-center shrink-0">
                  <span
                    className={
                      isActive
                        ? 'text-emerald-400'
                        : 'text-slate-400 group-hover/item:text-white transition-colors'
                    }
                  >
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 pr-3 ${
                    isHovered
                      ? 'opacity-100 max-w-[180px] delay-75'
                      : 'opacity-0 max-w-0 pointer-events-none'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Quick Links Heading / Divider */}
          <div className="pt-5 pb-1.5 px-1 overflow-hidden">
            <div
              className={`text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered
                  ? 'opacity-100 max-w-[180px] delay-75 block'
                  : 'opacity-0 max-w-0 hidden'
              }`}
            >
              Quick Links
            </div>
            <div
              className={`h-px bg-slate-800/80 mx-1 transition-opacity duration-300 ${
                isHovered ? 'hidden' : 'block'
              }`}
            />
          </div>

          <Link
            href="/"
            target="_blank"
            title="View Public Site"
            className="flex items-center h-12 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent transition-all group/quick overflow-hidden"
          >
            <div className="w-[52px] h-12 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-slate-400 group-hover/quick:text-emerald-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <div
              className={`flex-1 flex items-center justify-between pr-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered
                  ? 'opacity-100 max-w-[200px] delay-75'
                  : 'opacity-0 max-w-0 pointer-events-none'
              }`}
            >
              <span>View Public Site</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded group-hover/quick:bg-emerald-500/20 group-hover/quick:text-emerald-400 transition-colors ml-2">
                ↗
              </span>
            </div>
          </Link>

          <Link
            href="/blog"
            target="_blank"
            title="View Blog Page"
            className="flex items-center h-12 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent transition-all group/quick overflow-hidden"
          >
            <div className="w-[52px] h-12 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-slate-400 group-hover/quick:text-emerald-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div
              className={`flex-1 flex items-center justify-between pr-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered
                  ? 'opacity-100 max-w-[200px] delay-75'
                  : 'opacity-0 max-w-0 pointer-events-none'
              }`}
            >
              <span>View Blog Page</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded group-hover/quick:bg-emerald-500/20 group-hover/quick:text-emerald-400 transition-colors ml-2">
                ↗
              </span>
            </div>
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40 shrink-0">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title={loggingOut ? 'Logging out...' : 'Sign Out'}
            className="w-full h-12 flex items-center rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all disabled:opacity-50 overflow-hidden"
          >
            <div className="w-[52px] h-12 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 pr-3 ${
                isHovered
                  ? 'opacity-100 max-w-[180px] delay-75'
                  : 'opacity-0 max-w-0 pointer-events-none'
              }`}
            >
              {loggingOut ? 'Logging out...' : 'Sign Out'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Top Navbar */}
        <header className="h-20 bg-slate-950/60 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-sm font-medium text-slate-400 hidden sm:block">
              OPRA Exam Platform Administration
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700 transition-colors"
            >
              <span>Live Website</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Modal */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="relative w-72 bg-slate-950 border-r border-slate-800 p-6 flex flex-col z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <span className="font-bold text-white text-lg">OPRA Admin</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 py-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-semibold"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
