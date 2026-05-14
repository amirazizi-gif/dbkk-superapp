"use client";
import { Car, Heart, FileText, CreditCard, AlertCircle, CheckCircle, Clock, ChevronRight, MapPin, Wifi } from "lucide-react";
import { Page, User } from "../App";

interface DashboardProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const quickServices = [
  { id: "parking" as Page, label: "Smart\nParking", icon: Car, gradient: "gradient-hero", desc: "Pay & check compounds" },
  { id: "icare" as Page, label: "iCare\nAduan", icon: Heart, gradient: "gradient-green", desc: "Lodge complaints" },
  { id: "eservices" as Page, label: "e-Services\nPortal", icon: FileText, gradient: "gradient-gold", desc: "Assessment & licence" },
];

const myActivities = [
  { title: "Parking Payment", subtitle: "Zone A2, Jln Gaya", time: "Today, 9:14 AM", amount: "RM 3.00", status: "approved", icon: Car },
  { title: "iCare Report #2847", subtitle: "Damaged road — Jln Sulaman", time: "Yesterday", amount: "", status: "processing", icon: Heart },
  { title: "Assessment Tax Q2 2025", subtitle: "HA-12345-B", time: "2 days ago", amount: "RM 240.00", status: "approved", icon: FileText },
  { title: "Business Licence Renewal", subtitle: "Kedai Runcit Ahmad", time: "5 days ago", amount: "RM 150.00", status: "pending", icon: FileText },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    approved: "bg-green-100 text-green-700",
    processing: "bg-blue-100 text-blue-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    approved: "Selesai",
    processing: "Diproses",
    pending: "Menunggu",
    rejected: "Ditolak",
  };
  return { className: map[status] || "", label: labels[status] || status };
};

const announcements = [
  { title: "Pembaharuan Lesen Perniagaan 2026", desc: "Sila renew sebelum 31 Mac 2026 untuk elak penalti.", type: "info" },
  { title: "Smart Parking Kini di Penampang!", desc: "SSP kini diterima di kawasan Penampang. Satu app, dua kawasan.", type: "success" },
];

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const firstName = user.name.split(" ")[0];

  return (
    <div className="px-4 py-5 space-y-6">
      {/* Hero banner */}
      <div className="gradient-hero rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -right-4 w-20 h-20 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <p className="text-blue-200 text-xs mb-1">Helo, {firstName} 👋</p>
          <h2 className="text-white font-bold text-lg leading-tight mb-3">
            Apa yang boleh kami bantu hari ini?
          </h2>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
              <MapPin size={12} className="text-blue-200" />
              <span className="text-white text-xs">Kota Kinabalu</span>
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
              <Wifi size={12} className="text-green-300" />
              <span className="text-white text-xs">Smart City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick services */}
      <section>
        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Perkhidmatan Utama</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickServices.map(({ id, label, icon: Icon, gradient }, i) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`animate-fade-up stagger-${i + 1} card-hover ${gradient} rounded-2xl p-4 flex flex-col items-center text-center gap-2`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-white text-xs font-semibold leading-tight whitespace-pre-line">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* My balance / quick stats */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-fade-up stagger-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <Car size={14} className="text-blue-600" />
            </div>
            <span className="text-xs text-slate-500">Parking Credit</span>
          </div>
          <p className="text-xl font-bold text-slate-900">RM 12.50</p>
          <p className="text-xs text-slate-400 mt-0.5">Sabah Smart Parking</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-fade-up stagger-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
              <CreditCard size={14} className="text-amber-600" />
            </div>
            <span className="text-xs text-slate-500">Cukai Taksiran</span>
          </div>
          <p className="text-xl font-bold text-green-600">Terkini</p>
          <p className="text-xs text-slate-400 mt-0.5">HA-12345-B</p>
        </div>
      </section>

      {/* Announcements */}
      <section>
        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Notis & Hebahan</h3>
        <div className="space-y-2">
          {announcements.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${a.type === "success" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
              {a.type === "success"
                ? <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                : <AlertCircle size={18} className="text-blue-600 mt-0.5 shrink-0" />
              }
              <div>
                <p className={`text-xs font-semibold ${a.type === "success" ? "text-green-800" : "text-blue-800"}`}>{a.title}</p>
                <p className={`text-xs mt-0.5 ${a.type === "success" ? "text-green-700" : "text-blue-700"}`}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Aktiviti Terkini</h3>
          <span className="text-xs text-blue-600 font-medium">Lihat semua</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
          {myActivities.map(({ title, subtitle, time, amount, status, icon: Icon }, i) => {
            const { className, label } = statusBadge(status);
            return (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{title}</p>
                  <p className="text-xs text-slate-500 truncate">{subtitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={10} className="text-slate-400" />
                    <span className="text-xs text-slate-400">{time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {amount && <span className="text-sm font-bold text-slate-900">{amount}</span>}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Smart City badge */}
      <div className="gradient-hero rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <CheckCircle size={24} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Smart City Early Adopter 2025</p>
          <p className="text-blue-200 text-xs mt-0.5">DBKK antara 27 PBT diiktiraf di Malaysia</p>
        </div>
        <ChevronRight size={18} className="text-blue-300 ml-auto shrink-0" />
      </div>
    </div>
  );
}
