"use client";
import { useState } from "react";
import { CreditCard, QrCode, Plus, Minus, CheckCircle, AlertTriangle, Navigation } from "lucide-react";

type ParkingView = "home" | "pay" | "compound" | "topup" | "success";

const zones = [
  { id: "A1", name: "Jalan Gaya", rate: "RM 0.60/30min" },
  { id: "A2", name: "Jalan Pantai", rate: "RM 0.60/30min" },
  { id: "B1", name: "Jalan Tuaran", rate: "RM 0.40/30min" },
  { id: "C1", name: "Warisan Square", rate: "RM 1.00/30min" },
];

const compounds = [
  { ref: "KK-2025-04521", location: "Jalan Gaya (Yellow Line)", date: "12 Apr 2025", amount: 50, paid: false },
  { ref: "KK-2024-08871", location: "Jalan Pantai (No Parking)", date: "15 Nov 2024", amount: 100, paid: true },
];

export default function ParkingPage() {
  const [view, setView] = useState<ParkingView>("home");
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [duration, setDuration] = useState(2);
  const [plate, setPlate] = useState("SAB 1234 A");
  const [payingCompound, setPayingCompound] = useState<typeof compounds[0] | null>(null);
  const [topupAmount, setTopupAmount] = useState(10);
  const [credit] = useState(12.50);

  const cost = duration * 0.6;

  if (view === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Pembayaran Berjaya!</h2>
        <p className="text-slate-500 text-sm mb-6">
          {payingCompound
            ? `Kompaun ${payingCompound.ref} telah dibayar.`
            : `Parking ${selectedZone.id} — ${duration * 30} minit. Sah hingga ${new Date(Date.now() + duration * 30 * 60000).toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })}.`
          }
        </p>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 w-full mb-6 text-left shadow-sm">
          <div className="flex justify-between py-2 border-b border-slate-50 text-sm">
            <span className="text-slate-500">Plat kenderaan</span>
            <span className="font-semibold">{plate}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-50 text-sm">
            <span className="text-slate-500">Kawasan</span>
            <span className="font-semibold">{payingCompound ? payingCompound.location : selectedZone.name}</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-slate-500">Jumlah dibayar</span>
            <span className="font-bold text-green-700">RM {payingCompound ? payingCompound.amount.toFixed(2) : cost.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => { setView("home"); setPayingCompound(null); }}
          className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold"
        >
          Kembali ke Parking
        </button>
      </div>
    );
  }

  if (view === "topup") {
    const amounts = [5, 10, 20, 50];
    return (
      <div className="px-4 py-5 space-y-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 mb-1">Baki Semasa</p>
          <p className="text-3xl font-bold text-slate-900">RM {credit.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Pilih Jumlah Top-Up</p>
          <div className="grid grid-cols-2 gap-3">
            {amounts.map(amt => (
              <button
                key={amt}
                onClick={() => setTopupAmount(amt)}
                className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${topupAmount === amt ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700"}`}
              >
                RM {amt}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Jumlah Top-Up</span><span className="font-semibold">RM {topupAmount.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Baki Selepas</span><span className="font-bold text-green-600">RM {(credit + topupAmount).toFixed(2)}</span></div>
        </div>
        <button onClick={() => setView("success")} className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold">
          Top-Up Sekarang
        </button>
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">Batal</button>
      </div>
    );
  }

  if (view === "compound") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">Bayar kompaun dalam 14 hari untuk elak penalti lewat bayar 50%.</p>
        </div>
        {compounds.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500">{c.ref}</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{c.location}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.date}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.paid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {c.paid ? "Dibayar" : "Belum Bayar"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900">RM {c.amount.toFixed(2)}</span>
              {!c.paid && (
                <button
                  onClick={() => { setPayingCompound(c); setView("success"); }}
                  className="gradient-hero text-white text-sm font-semibold px-4 py-2 rounded-xl"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">← Kembali</button>
      </div>
    );
  }

  if (view === "pay") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Plat Kenderaan</label>
            <input
              value={plate}
              onChange={e => setPlate(e.target.value)}
              className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 uppercase"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Kawasan Parking</label>
            <div className="mt-1.5 space-y-2">
              {zones.map(z => (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${selectedZone.id === z.id ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"}`}
                >
                  <div className="text-left">
                    <p className={`text-sm font-semibold ${selectedZone.id === z.id ? "text-blue-800" : "text-slate-800"}`}>{z.id} — {z.name}</p>
                    <p className="text-xs text-slate-500">{z.rate}</p>
                  </div>
                  {selectedZone.id === z.id && <CheckCircle size={18} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Tempoh Parking</label>
            <div className="mt-1.5 flex items-center gap-4">
              <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Minus size={18} />
              </button>
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-slate-900">{duration * 30}</p>
                <p className="text-xs text-slate-500">minit</p>
              </div>
              <button onClick={() => setDuration(Math.min(8, duration + 1))} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm border border-slate-100">
          <div className="flex justify-between"><span className="text-slate-500">Kawasan</span><span className="font-medium">{selectedZone.name}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Tempoh</span><span className="font-medium">{duration * 30} minit</span></div>
          <div className="flex justify-between border-t border-slate-200 pt-2 mt-2"><span className="font-semibold">Jumlah</span><span className="font-bold text-lg">RM {cost.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Baki (selepas)</span><span className={`font-semibold ${credit - cost < 0 ? "text-red-600" : "text-green-600"}`}>RM {(credit - cost).toFixed(2)}</span></div>
        </div>
        <button onClick={() => setView("success")} className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold">
          Bayar Parking — RM {cost.toFixed(2)}
        </button>
        <button onClick={() => setView("home")} className="w-full text-slate-500 text-sm py-2">Batal</button>
      </div>
    );
  }

  // Home view — zones list removed, replaced with simple info card
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Credit card */}
      <div className="gradient-hero rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <p className="text-blue-200 text-xs mb-1">Sabah Smart Parking · Baki</p>
        <p className="text-4xl font-bold text-white mb-3">RM {credit.toFixed(2)}</p>
        <p className="text-blue-200 text-xs">{plate}</p>
        <button onClick={() => setView("topup")} className="mt-3 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
          + Top-Up Kredit
        </button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Bayar\nParking", icon: CreditCard, action: () => setView("pay") },
          { label: "Semak\nKompaun", icon: AlertTriangle, action: () => setView("compound") },
          { label: "Scan\nQR", icon: QrCode, action: () => setView("pay") },
        ].map(({ label, icon: Icon, action }, i) => (
          <button key={i} onClick={action} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center gap-2 card-hover shadow-sm">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Icon size={20} className="text-slate-700" />
            </div>
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight whitespace-pre-line">{label}</span>
          </button>
        ))}
      </div>

      {/* How to pay info card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">Cara Bayar Parking</p>
        <div className="space-y-3">
          {[
            { step: "1", label: "Tap \"Bayar Parking\"", desc: "Masukkan plat kenderaan & pilih kawasan" },
            { step: "2", label: "Tetapkan tempoh", desc: "Pilih berapa lama anda akan parking" },
            { step: "3", label: "Bayar dari kredit", desc: "Baki dipotong dari akaun Sabah Smart Parking anda" },
            { step: "4", label: "Resit digital", desc: "Resit dihantar automatik — tiada slip kertas" },
          ].map(({ step, label, desc }) => (
            <div key={step} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{step}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parking zones — text reference only, no live counts */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Kawasan Parking DBKK</p>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Navigation size={11} />
            <span>Kota Kinabalu</span>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { id: "A1/A2", name: "Jalan Gaya & Jalan Pantai", rate: "RM 0.60 / 30 min" },
            { id: "B1", name: "Jalan Tuaran", rate: "RM 0.40 / 30 min" },
            { id: "C1", name: "Warisan Square", rate: "RM 1.00 / 30 min" },
          ].map((z, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{z.id}</span>
                <span className="text-sm text-slate-700">{z.name}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">{z.rate}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3 italic">* Kadar semasa. Untuk info lanjut hubungi DBKK Holdings: 088-270 181</p>
      </div>
    </div>
  );
}