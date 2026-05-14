"use client";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ParkingPage from "./pages/ParkingPage";
import ICarePage from "./pages/ICarePage";
import EServicesPage from "./pages/EServicesPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import ExplorePage from "@/components/pages/ExplorePage";
import Header from "./layout/Header";
import BottomNav from "./layout/BottomNav";

export type Page = "dashboard" | "parking" | "icare" | "eservices" | "profile" | "notifications" | "explore";

export interface User {
  name: string;
  ic: string;
  email: string;
  phone: string;
  address: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":     return <Dashboard user={user!} onNavigate={setCurrentPage} />;
      case "parking":       return <ParkingPage />;
      case "icare":         return <ICarePage />;
      case "eservices":     return <EServicesPage />;
      case "explore":       return <ExplorePage />;
      case "profile":       return <ProfilePage user={user!} onLogout={handleLogout} />;
      case "notifications": return <NotificationsPage />;
      default:              return <Dashboard user={user!} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 max-w-md mx-auto relative shadow-2xl">
      <Header user={user!} currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}