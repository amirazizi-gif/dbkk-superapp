"use client";
import { User, Phone, Mail, MapPin, Shield, ChevronRight, LogOut, Bell, Globe, HelpCircle, Star } from "lucide-react";
import { User as UserType } from "../App";

interface ProfilePageProps {
  user: UserType;
  onLogout: () => void;
}

export default function ProfilePage({ user, onLogout }: ProfilePageProps) {
  const menuSections = [
    {
      title: "Akaun",
      items: [
        { icon: Bell, label: "Tetapan Notifikasi", desc: "Urus pemberitahuan anda" },
        { icon: Shield, label: "Keselamatan & Privasi", desc: "Kata laluan & keselamatan" },
        { icon: Globe, label: "Bahasa", desc: "Bahasa Malaysia / English" },
      ],
    },
    {
      title: "Sokongan",
      items: [
        { icon: HelpCircle, label: "Soalan Lazim (FAQ)", desc: "Jawapan kepada soalan lazim" },
        { icon: Star, label: "Beri Penilaian", desc: "Bantu kami penambahbaikan" },
      ],
    },
  ];

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Profile card */}
      <div className="gradient-hero rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">{user.name}</p>
            <p className="text-blue-200 text-xs mt-0.5">{user.ic}</p>
            <div className="mt-2 bg-white/20 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
              <Shield size={12} className="text-green-300" />
              <span className="text-white text-xs font-semibold">Pengguna Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Maklumat Peribadi</p>
        {[
          { icon: Mail, label: user.email },
          { icon: Phone, label: user.phone },
          { icon: MapPin, label: user.address },
        ].map(({ icon: Icon, label }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={15} className="text-slate-500" />
            </div>
            <span className="text-sm text-slate-700 leading-relaxed">{label}</span>
          </div>
        ))}
      </div>

      {/* Activity summary */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Ringkasan Aktiviti 2025</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[["4", "Pembayaran"], ["1", "Aduan"], ["2", "Permohonan"]].map(([val, lab], i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-blue-700">{val}</p>
              <p className="text-xs text-slate-500">{lab}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      {menuSections.map((section, si) => (
        <div key={si} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 pt-4 pb-2">{section.title}</p>
          {section.items.map(({ icon: Icon, label, desc }, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors border-t border-slate-50 first:border-0">
              <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={17} className="text-slate-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          ))}
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full bg-red-50 border border-red-200 text-red-600 rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <LogOut size={18} />
        Log Keluar
      </button>

      <p className="text-center text-xs text-slate-400 pb-2">
        DBKK Super App · Versi Prototaip 1.0<br />
        © 2025 Dewan Bandaraya Kota Kinabalu
      </p>
    </div>
  );
}
