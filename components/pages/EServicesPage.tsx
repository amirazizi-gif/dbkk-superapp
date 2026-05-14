"use client";
import { useState } from "react";
import { FileText, CreditCard, Search, CheckCircle, Clock, AlertCircle, ChevronRight, Download, ExternalLink } from "lucide-react";

type EView = "home" | "assessment" | "licence" | "compound_check" | "pay_assess" | "success_assess" | "apply_licence" | "success_licence";

const services = [
  { id: "assessment", label: "Cukai Taksiran", desc: "Semak & bayar cukai hartanah", emoji: "🏠", color: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200" },
  { id: "licence", label: "Lesen Perniagaan", desc: "Mohon & renew lesen", emoji: "🏪", color: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" },
  { id: "compound_check", label: "Semak Kompaun", desc: "Semak & bayar kompaun", emoji: "📋", color: "bg-red-50", textColor: "text-red-700", borderColor: "border-red-200" },
];

const assessmentData = {
  ref: "HA-12345-B",
  address: "No. 12, Jalan Inanam, 88450 Kota Kinabalu",
  owner: "Ahmad Bin Abdullah",
  annualValue: 4800,
  taxRate: 0.05,
  annualTax: 240,
  q2Amount: 60,
  status: "Terkini",
  lastPaid: "15 Feb 2025",
  history: [
    { period: "Q1 2025", amount: 60, date: "15 Feb 2025", status: "paid" },
    { period: "Q4 2024", amount: 60, date: "10 Nov 2024", status: "paid" },
    { period: "Q3 2024", amount: 60, date: "20 Aug 2024", status: "paid" },
  ],
};

const licences = [
  { ref: "LIC-2024-8821", name: "Kedai Runcit Ahmad", type: "Perniagaan Am", exp: "31 Des 2025", status: "active" },
];

export default function EServicesPage() {
  const [view, setView] = useState<EView>("home");
  const [searchRef, setSearchRef] = useState("");
  const [licName, setLicName] = useState("");
  const [licType, setLicType] = useState("perniagaan_am");
  const [licAddress, setLicAddress] = useState("");

  if (view === "success_assess") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Pembayaran Berjaya!</h2>
        <p className="text-slate-500 text-sm mb-6">Cukai Taksiran Q2 2025 telah dibayar.</p>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 w-full text-left shadow-sm space-y-2 text-sm mb-6">
          <div className="flex justify-between"><span className="text-slate-500">No. Rujukan</span><span className="font-mono font-semibold">{assessmentData.ref}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Tempoh</span><span className="font-semibold">Q2 2025</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Jumlah</span><span className="font-bold text-green-700">RM {assessmentData.q2Amount}.00</span></div>
        </div>
        <button className="w-full bg-slate-100 text-slate-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 mb-3">
          <Download size={18} /> Muat Turun Resit
        </button>
        <button onClick={() => setView("home")} className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold">Kembali</button>
      </div>
    );
  }

  if (view === "success_licence") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Permohonan Dihantar!</h2>
        <p className="text-slate-500 text-sm mb-2">No. Rujukan anda:</p>
        <p className="text-xl font-bold text-blue-700 mb-6">APL-2025-{Math.floor(1000 + Math.random() * 9000)}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-left mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-1">Langkah Seterusnya</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✅ Permohonan diterima</li>
            <li>⏳ Semakan dokumen (3–5 hari)</li>
            <li>⏳ Pemeriksaan premis (dijadualkan)</li>
            <li>⏳ Kelulusan & pengeluaran lesen</li>
          </ul>
        </div>
        <button onClick={() => setView("home")} className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold">Kembali</button>
      </div>
    );
  }

  if (view === "pay_assess") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3 text-sm">
          <h3 className="font-bold text-slate-900">Cukai Taksiran Q2 2025</h3>
          <div className="flex justify-between"><span className="text-slate-500">No. Harta</span><span className="font-mono font-semibold">{assessmentData.ref}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Tempoh</span><span className="font-semibold">Apr – Jun 2025</span></div>
          <div className="flex justify-between border-t border-slate-100 pt-3"><span className="font-semibold">Jumlah Perlu Dibayar</span><span className="font-bold text-lg text-blue-700">RM {assessmentData.q2Amount}.00</span></div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm">
          <p className="font-semibold text-slate-700 mb-2">Kaedah Pembayaran</p>
          {["FPX Online Banking", "Kad Kredit / Debit", "DBKK e-Wallet"].map((m, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${i === 0 ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"}`}>
              <div className={`w-4 h-4 rounded-full border-2 ${i === 0 ? "border-blue-600 bg-blue-600" : "border-slate-300"} flex items-center justify-center`}>
                {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm">{m}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setView("success_assess")} className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold">
          Bayar RM {assessmentData.q2Amount}.00
        </button>
        <button onClick={() => setView("assessment")} className="w-full text-slate-500 text-sm py-2">Batal</button>
      </div>
    );
  }

  if (view === "apply_licence") {
    const types = ["Perniagaan Am", "Makanan & Minuman", "Hiburan", "Profesional", "Industri"];
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-800 mb-1">Dokumen Diperlukan</p>
          <ul className="text-xs text-amber-700 space-y-0.5">
            <li>• Salinan MyKad pemilik</li>
            <li>• Salinan Borang 9/24/49 (syarikat)</li>
            <li>• Salinan perjanjian sewa / geran</li>
            <li>• Gambar premis (luar & dalam)</li>
          </ul>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Nama Perniagaan *</label>
          <input value={licName} onChange={e => setLicName(e.target.value)} placeholder="cth: Kedai Runcit Ahmad" className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Jenis Lesen *</label>
          <select value={licType} onChange={e => setLicType(e.target.value)} className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
            {types.map(t => <option key={t} value={t.toLowerCase().replace(" ", "_")}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Alamat Premis *</label>
          <textarea value={licAddress} onChange={e => setLicAddress(e.target.value)} rows={2} placeholder="Alamat penuh premis perniagaan" className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none" />
        </div>
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 text-center">
          <Download size={24} className="text-slate-400 mx-auto mb-1" />
          <p className="text-sm font-semibold text-slate-600">Muat Naik Dokumen</p>
          <p className="text-xs text-slate-400 mt-0.5">PDF, JPG, PNG (max 5MB setiap fail)</p>
        </div>
        <button onClick={() => setView("success_licence")} disabled={!licName || !licAddress} className="w-full gradient-gold text-white rounded-xl py-3.5 font-semibold disabled:opacity-50">
          Hantar Permohonan
        </button>
        <button onClick={() => setView("licence")} className="w-full text-slate-500 text-sm py-2">Batal</button>
      </div>
    );
  }

  if (view === "assessment") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">{assessmentData.ref}</h3>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">{assessmentData.status}</span>
          </div>
          <p className="text-sm text-slate-600">{assessmentData.address}</p>
          <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Nilai Tahunan</span><span className="font-semibold">RM {assessmentData.annualValue.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Kadar Cukai</span><span className="font-semibold">{(assessmentData.taxRate * 100)}%</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Cukai Tahunan</span><span className="font-bold text-blue-700">RM {assessmentData.annualTax}</span></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-4">
          <p className="text-xs text-slate-500 mb-1">Q2 2025 (Apr – Jun)</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">RM {assessmentData.q2Amount}.00</p>
              <p className="text-xs text-amber-600 font-medium">Due: 31 Mei 2025</p>
            </div>
            <button onClick={() => setView("pay_assess")} className="gradient-hero text-white text-sm font-semibold px-5 py-2.5 rounded-xl">Bayar</button>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900 mb-3">Sejarah Pembayaran</p>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
            {assessmentData.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-800">{h.period}</p>
                  <p className="text-xs text-slate-400">{h.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">RM {h.amount}.00</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Dibayar</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">← Kembali</button>
      </div>
    );
  }

  if (view === "licence") {
    return (
      <div className="px-4 py-5 space-y-4">
        {licences.map((l, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-slate-400 font-mono">{l.ref}</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{l.name}</p>
                <p className="text-xs text-slate-500">{l.type}</p>
              </div>
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">Aktif</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Luput</span><span className="font-semibold">{l.exp}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="font-semibold text-green-600">Sah</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button className="bg-slate-100 text-slate-700 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5"><Download size={14} /> Muat Turun</button>
              <button className="gradient-gold text-white text-xs font-semibold py-2.5 rounded-xl">Renew Lesen</button>
            </div>
          </div>
        ))}
        <button onClick={() => setView("apply_licence")} className="w-full border-2 border-dashed border-amber-300 bg-amber-50 text-amber-700 rounded-2xl py-4 font-semibold text-sm">
          + Mohon Lesen Baru
        </button>
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">← Kembali</button>
      </div>
    );
  }

  if (view === "compound_check") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Cari mengikut No. IC atau Plat Kenderaan</label>
          <div className="relative mt-2">
            <input value={searchRef} onChange={e => setSearchRef(e.target.value)} placeholder="cth: 850101121234 atau SAB1234A" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 pr-12" />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="mt-3 w-full gradient-hero text-white rounded-xl py-2.5 font-semibold text-sm">Semak</button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs text-slate-400 mb-1">Keputusan untuk: SAB 1234 A</p>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-slate-900">KK-2025-04521</p>
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">Belum Bayar</span>
          </div>
          <p className="text-xs text-slate-600 mb-3">Tempat Letak Kereta Gaya — Melebihi had masa</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900">RM 50.00</span>
            <button onClick={() => setView("home")} className="gradient-hero text-white text-sm font-semibold px-4 py-2 rounded-xl">Bayar Sekarang</button>
          </div>
        </div>
        <div className="text-center py-4">
          <p className="text-xs text-slate-400">Juga tersedia di: <a href="https://eservices.dbkk.sabah.gov.my/compounds" target="_blank" className="text-blue-600 underline">DBKK e-Services Portal</a></p>
        </div>
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">← Kembali</button>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Hero */}
      <div className="gradient-gold rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">DBKK e-Services</p>
            <p className="text-yellow-100 text-xs">Portal Perkhidmatan Dalam Talian</p>
          </div>
        </div>
        <p className="text-yellow-100 text-xs">Akses semua perkhidmatan DBKK tanpa perlu hadir ke kaunter.</p>
      </div>

      {/* Service cards */}
      <div className="space-y-3">
        {services.map(s => (
          <button
            key={s.id}
            onClick={() => setView(s.id as EView)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border ${s.color} ${s.borderColor} card-hover`}
          >
            <span className="text-3xl">{s.emoji}</span>
            <div className="flex-1 text-left">
              <p className={`font-bold text-sm ${s.textColor}`}>{s.label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{s.desc}</p>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        ))}
      </div>

      {/* External link */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Portal Luar</p>
        {[
          { label: "DBKK e-Services Portal (Web)", url: "https://eservices.dbkk.sabah.gov.my/" },
          { label: "Semakan Kompaun", url: "https://eservices.dbkk.sabah.gov.my/compounds" },
        ].map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <span className="text-sm text-blue-700 font-medium">{link.label}</span>
            <ExternalLink size={14} className="text-slate-400" />
          </a>
        ))}
      </div>
    </div>
  );
}
