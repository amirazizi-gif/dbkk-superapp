"use client";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import { User } from "../App";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const DEMO_USERS = [
  {
    name: "Ahmad Bin Abdullah",
    ic: "850101-12-1234",
    email: "ahmad.abdullah@email.com",
    phone: "011-2345 6789",
    address: "No. 12, Jalan Inanam, 88450 Kota Kinabalu, Sabah",
  },
  {
    name: "Siti Rahmah Binti Hassan",
    ic: "920505-12-5678",
    email: "siti.rahmah@email.com",
    phone: "016-3456 7890",
    address: "Blok D-07-05, Taman Likas, 88400 Kota Kinabalu, Sabah",
  },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [ic, setIc] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!ic || !password) { setError("Sila isi semua maklumat."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const matched = DEMO_USERS.find(u => u.ic.replace(/-/g, "") === ic.replace(/-/g, ""));
    if (matched && password === "demo1234") {
      onLogin(matched);
    } else if (password !== "demo1234") {
      setError("Kata laluan salah. Cuba: demo1234");
    } else {
      setError("No. Kad Pengenalan tidak dijumpai.");
    }
    setLoading(false);
  };

  const demoLogin = () => {
    setIc("850101-12-1234");
    setPassword("demo1234");
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Hero top */}
      <div className="gradient-hero px-6 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute top-20 -left-8 w-28 h-28 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-blue-800 font-bold text-xl">DB</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">DBKK Super App</h1>
              <p className="text-blue-200 text-xs">Dewan Bandaraya Kota Kinabalu</p>
            </div>
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight animate-fade-up stagger-1">
            Satu Platform.<br />
            <span className="text-yellow-300">Semua Perkhidmatan.</span>
          </h2>
          <p className="text-blue-200 text-sm mt-2 animate-fade-up stagger-2">
            Akses perkhidmatan bandaraya KK bila-bila masa, di mana sahaja.
          </p>
        </div>
      </div>

      {/* Login card */}
      <div className="flex-1 bg-slate-50 rounded-t-3xl -mt-6 px-6 pt-8 pb-10 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 animate-fade-up stagger-2">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Log Masuk</h3>
          <p className="text-sm text-slate-500 mb-5">Gunakan No. Kad Pengenalan anda</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">No. Kad Pengenalan</label>
              <input
                type="text"
                value={ic}
                onChange={e => setIc(e.target.value)}
                placeholder="850101-12-1234"
                className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Kata Laluan</label>
              <div className="relative mt-1.5">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan kata laluan"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Log Masuk <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>

        {/* Demo hint */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 animate-fade-up stagger-3">
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-800 mb-1">Demo Mode</p>
              <p className="text-xs text-amber-700 mb-2">IC: <code className="bg-amber-100 px-1 rounded">850101-12-1234</code> &nbsp; Kata Laluan: <code className="bg-amber-100 px-1 rounded">demo1234</code></p>
              <button onClick={demoLogin} className="text-xs font-semibold text-amber-800 underline underline-offset-2">
                Isi secara automatik →
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Versi Prototaip · DBKK EA & Super App 2025
        </p>
      </div>
    </div>
  );
}
