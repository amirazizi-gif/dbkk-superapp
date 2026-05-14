"use client";
import { Home, Car, Heart, FileText, User } from "lucide-react";
import { Page } from "../App";

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: "dashboard" as Page, label: "Home", icon: Home },
  { id: "parking" as Page, label: "Parking", icon: Car },
  { id: "icare" as Page, label: "iCare", icon: Heart },
  { id: "eservices" as Page, label: "e-Services", icon: FileText },
  { id: "profile" as Page, label: "Profile", icon: User },
];

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-slate-200/60 z-50">
      <div className="flex">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = currentPage === id || (currentPage === "notifications" && id === "dashboard");
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all ${
                isActive ? "text-blue-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${isActive ? "bg-blue-50" : ""}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-blue-700 font-semibold" : ""}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
