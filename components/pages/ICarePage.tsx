"use client";
import { useState } from "react";
import { Heart, MapPin, Camera, CheckCircle, Clock, ChevronRight, AlertCircle } from "lucide-react";

type ICareView = "home" | "new" | "success";

const categories = [
  { id: "jalan", label: "Jalan Rosak", emoji: "🛣️" },
  { id: "sampah", label: "Pembuangan Haram", emoji: "🗑️" },
  { id: "lampu", label: "Lampu Jalan Rosak", emoji: "💡" },
  { id: "banjir", label: "Banjir / Longkang", emoji: "🌊" },
  { id: "pokok", label: "Pokok Tumbang", emoji: "🌳" },
  { id: "tandas", label: "Tandas Awam Rosak", emoji: "🚻" },
  { id: "haiwan", label: "Haiwan Liar", emoji: "🐕" },
  { id: "lain", label: "Lain-lain", emoji: "📋" },
];

const myReports = [
  { id: "RPT-2025-2847", cat: "Jalan Rosak", loc: "Jln Sulaman Batu 5", date: "13 Mei 2025", status: "processing", note: "Sedang disiasat oleh Jab. Kejuruteraan." },
  { id: "RPT-2025-1203", cat: "Pembuangan Haram", loc: "Belakang Pasar Inanam", date: "2 Mac 2025", status: "approved", note: "Tindakan diambil. Kawasan telah dibersihkan." },
  { id: "RPT-2024-9980", cat: "Lampu Jalan Rosak", loc: "Jln Tuaran KM 12", date: "28 Nov 2024", status: "approved", note: "Lampu telah ditukar ganti." },
];

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  processing: { label: "Sedang Diproses", className: "bg-blue-100 text-blue-700", icon: <Clock size={12} /> },
  approved: { label: "Selesai", className: "bg-green-100 text-green-700", icon: <CheckCircle size={12} /> },
  pending: { label: "Menunggu", className: "bg-amber-100 text-amber-700", icon: <AlertCircle size={12} /> },
};

export default function ICarePage() {
  const [view, setView] = useState<ICareView>("home");
  const [selectedCat, setSelectedCat] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("sederhana");
  const [newRef, setNewRef] = useState("");

  const handleSubmit = () => {
    if (!selectedCat || !desc || !location) return;
    const ref = `RPT-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setNewRef(ref);
    setView("success");
  };

  if (view === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Aduan Dihantar!</h2>
        <p className="text-slate-500 text-sm mb-2">No. Rujukan anda:</p>
        <p className="text-2xl font-bold text-blue-700 mb-6">{newRef}</p>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 w-full text-left shadow-sm space-y-2 text-sm mb-6">
          <div className="flex justify-between"><span className="text-slate-500">Kategori</span><span className="font-semibold">{categories.find(c => c.id === selectedCat)?.label}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Lokasi</span><span className="font-semibold">{location}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Keutamaan</span><span className="font-semibold capitalize">{priority}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Anggaran respons</span><span className="font-semibold text-blue-700">3–5 hari bekerja</span></div>
        </div>
        <button
          onClick={() => { setView("home"); setSelectedCat(""); setDesc(""); setLocation(""); }}
          className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold"
        >
          Kembali ke iCare
        </button>
      </div>
    );
  }

  if (view === "new") {
    return (
      <div className="px-4 py-5 space-y-5">
        <div>
          <p className="text-sm font-bold text-slate-900 mb-3">Pilih Kategori Aduan *</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${selectedCat === c.id ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"}`}
              >
                <span className="text-xl">{c.emoji}</span>
                <span className={`text-xs font-medium ${selectedCat === c.id ? "text-blue-800" : "text-slate-700"}`}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Lokasi *</label>
          <div className="relative mt-1.5">
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="cth: Jalan Gaya, berhampiran kedai..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 pr-10"
            />
            <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="mt-1.5 text-xs text-blue-600 font-medium flex items-center gap-1">
            <MapPin size={12} /> Guna lokasi semasa
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Penerangan *</label>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={3}
            placeholder="Terangkan masalah dengan jelas..."
            className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Keutamaan</label>
          <div className="flex gap-2 mt-1.5">
            {["rendah", "sederhana", "tinggi"].map(p => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 capitalize transition-all ${priority === p ? (p === "tinggi" ? "border-red-500 bg-red-50 text-red-700" : p === "sederhana" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-400 bg-slate-50 text-slate-700") : "border-slate-200 text-slate-500"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
            <Camera size={20} className="text-slate-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Lampir Gambar</p>
            <p className="text-xs text-slate-400">Pilihan — bantu kami kenal pasti masalah</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedCat || !desc || !location}
          className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold disabled:opacity-50"
        >
          Hantar Aduan
        </button>
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">Batal</button>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Banner */}
      <div className="gradient-green rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">DBKK iCare</p>
            <p className="text-green-200 text-xs">Sistem Aduan & Maklum Balas Awam</p>
          </div>
        </div>
        <p className="text-green-100 text-xs">Laporkan masalah bandaraya anda. Kami akan respons dalam 3–5 hari bekerja.</p>
      </div>

      {/* New report button */}
      <button
        onClick={() => setView("new")}
        className="w-full bg-white border-2 border-dashed border-blue-300 rounded-2xl py-5 flex flex-col items-center gap-2 hover:bg-blue-50 transition-colors card-hover"
      >
        <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
          <Heart size={22} className="text-white" />
        </div>
        <p className="text-sm font-bold text-slate-800">Hantar Aduan Baru</p>
        <p className="text-xs text-slate-500">Tap untuk laporkan masalah bandaraya</p>
      </button>

      {/* My reports */}
      <section>
        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Aduan Saya</h3>
        <div className="space-y-3">
          {myReports.map((r, i) => {
            const sc = statusConfig[r.status];
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400 font-mono">{r.id}</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{r.cat}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.className}`}>
                    {sc.icon} {sc.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-500">{r.loc}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-600">{r.note}</p>
                </div>
                <p className="text-xs text-slate-400 mt-2">{r.date}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Statistik Aduan Bandaraya</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[["2,847", "Aduan 2025"], ["94%", "Diselesaikan"], ["3.2", "Hari avg"]].map(([val, lab], i) => (
            <div key={i}>
              <p className="text-xl font-bold text-blue-700">{val}</p>
              <p className="text-xs text-slate-500">{lab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
