"use client";
import { Bell, ChevronLeft } from "lucide-react";
import { Page, User } from "../App";

interface HeaderProps {
  user: User;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const pageTitles: Record<Page, string> = {
  dashboard: "",
  parking: "Smart Parking",
  icare: "iCare — Report & Aduan",
  eservices: "e-Services",
  profile: "My Profile",
  notifications: "Notifications",
};

export default function Header({ user, currentPage, onNavigate }: HeaderProps) {
  const isHome = currentPage === "dashboard";

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="flex items-center justify-between px-4 py-3">
        {isHome ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <span className="text-white font-bold text-sm">DB</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 leading-none">Selamat datang,</p>
              <p className="text-sm font-700 text-slate-900 leading-tight font-semibold">{user.name}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("dashboard")}
              className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <ChevronLeft size={18} className="text-slate-700" />
            </button>
            <h1 className="text-sm font-semibold text-slate-900">{pageTitles[currentPage]}</h1>
          </div>
        )}
        <button
          onClick={() => onNavigate("notifications")}
          className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <Bell size={18} className="text-slate-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
