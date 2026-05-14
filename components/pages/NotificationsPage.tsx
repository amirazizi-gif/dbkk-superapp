"use client";
import { Bell, Car, Heart, FileText, Info, CheckCircle, AlertCircle } from "lucide-react";

const notifications = [
  { id: 1, type: "warning", icon: Car, title: "Baki Parking Rendah", desc: "Baki Sabah Smart Parking anda tinggal RM 2.50. Sila top-up sekarang.", time: "Baru sahaja", read: false },
  { id: 2, type: "success", icon: Heart, title: "Aduan Diselesaikan", desc: "Aduan #RPT-2025-1203 (Pembuangan Haram — Inanam) telah diselesaikan.", time: "2 jam lepas", read: false },
  { id: 3, type: "info", icon: FileText, title: "Peringatan Cukai Taksiran", desc: "Cukai Taksiran Q2 2025 (HA-12345-B) perlu dibayar sebelum 31 Mei 2025.", time: "Semalam", read: true },
  { id: 4, type: "success", icon: Car, title: "Pembayaran Parking Berjaya", desc: "Parking Zone A2 — 60 minit. Sah hingga 10:14 AM.", time: "Semalam", read: true },
  { id: 5, type: "info", icon: Info, title: "Pembaharuan Lesen 2026", desc: "Sila renew lesen perniagaan anda sebelum 31 Mac 2026.", time: "3 hari lepas", read: true },
  { id: 6, type: "success", icon: CheckCircle, title: "Permohonan Diluluskan", desc: "Permohonan lesen No. LIC-2024-8821 telah diluluskan.", time: "5 hari lepas", read: true },
];

const typeStyles = {
  warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "bg-amber-100 text-amber-600" },
  success: { bg: "bg-green-50", border: "border-green-200", icon: "bg-green-100 text-green-600" },
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "bg-blue-100 text-blue-600" },
};

export default function NotificationsPage() {
  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  return (
    <div className="px-4 py-5 space-y-5">
      {unread.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Belum Dibaca</h3>
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-semibold">{unread.length}</span>
          </div>
          <div className="space-y-3">
            {unread.map(n => {
              const style = typeStyles[n.type as keyof typeof typeStyles];
              const Icon = n.icon;
              return (
                <div key={n.id} className={`rounded-2xl border p-4 ${style.bg} ${style.border}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.icon}`}>
                      <Icon size={17} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{n.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.desc}</p>
                      <p className="text-xs text-slate-400 mt-1.5">{n.time}</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Terdahulu</h3>
        <div className="space-y-2">
          {read.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-start gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
