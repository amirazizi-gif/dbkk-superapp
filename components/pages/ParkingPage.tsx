"use client";
import { useState } from "react";
import {
  CreditCard,
  QrCode,
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  Download,
  Bell,
  Clock,
  RefreshCw,
} from "lucide-react";

type ParkingView =
  | "home"
  | "pay"
  | "selectBox"
  | "compound"
  | "topup"
  | "success"
  | "extend";

// Box colour types — core mechanic of Sabah Smart Parking
const BOX_TYPES = [
  {
    id: "green",
    label: "Kotak Hijau",
    labelEn: "Green Box",
    rate: 0.53,
    unit: "per jam (1 hour)",
    unitShort: "/jam",
    maxHours: 8,
    stepMinutes: 60,
    color: "bg-green-500",
    colorLight: "bg-green-50",
    colorBorder: "border-green-400",
    colorText: "text-green-700",
    colorDot: "#22c55e",
    desc: "Long-stay parking zones. Suitable for shoppers & office workers.",
    areas: ["Jalan Gaya", "Jalan Pantai", "Jalan Bakau"],
  },
  {
    id: "yellow",
    label: "Kotak Kuning",
    labelEn: "Yellow Box",
    rate: 0.53,
    unit: "per 30 minit (30 mins)",
    unitShort: "/30min",
    maxHours: 8,
    stepMinutes: 30,
    color: "bg-yellow-400",
    colorLight: "bg-yellow-50",
    colorBorder: "border-yellow-400",
    colorText: "text-yellow-700",
    colorDot: "#eab308",
    desc: "Short-stay zones near shops & offices. Quick errands.",
    areas: ["Jalan Tuaran", "Jalan Sembulan", "Jalan Haji Saman"],
  },
  {
    id: "red",
    label: "Kotak Merah",
    labelEn: "Red Box",
    rate: 1.06,
    unit: "per jam (1 hour)",
    unitShort: "/jam",
    maxHours: 2,
    stepMinutes: 60,
    color: "bg-red-500",
    colorLight: "bg-red-50",
    colorBorder: "border-red-400",
    colorText: "text-red-700",
    colorDot: "#ef4444",
    desc: "High-demand premium zones. Maximum 2 hours only.",
    areas: ["Warisan Square", "Jalan Tun Razak", "Pusat Bandar"],
  },
];

const compounds = [
  {
    ref: "KK-2025-04521",
    location: "Jalan Gaya (Yellow Line)",
    date: "12 Apr 2025",
    amount: 50,
    paid: false,
  },
  {
    ref: "KK-2024-08871",
    location: "Jalan Pantai (No Parking Zone)",
    date: "15 Nov 2024",
    amount: 100,
    paid: true,
  },
];

function calcCost(box: (typeof BOX_TYPES)[0], units: number) {
  // units = number of steps (60min for green/red, 30min for yellow)
  return units * box.rate;
}

export default function ParkingPage() {
  const [view, setView] = useState<ParkingView>("home");
  const [selectedBox, setSelectedBox] = useState(BOX_TYPES[0]);
  const [units, setUnits] = useState(1); // number of billing steps
  const [plate, setPlate] = useState("SAB 1234 A");
  const [payingCompound, setPayingCompound] = useState<
    (typeof compounds)[0] | null
  >(null);
  const [topupAmount, setTopupAmount] = useState(10);
  const [credit] = useState(12.5);
  const [activeParkings] = useState([
    {
      plate: "SAB 1234 A",
      zone: "Jalan Gaya",
      box: "green",
      expiresIn: 24,
      paid: 0.53,
    },
  ]);

  const cost = calcCost(selectedBox, units);
  const durationLabel =
    selectedBox.stepMinutes === 60
      ? `${units} jam (${units * 60} minit)`
      : `${units * 30} minit`;

  // ── SUCCESS ──────────────────────────────────────────────────
  if (view === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {payingCompound ? "Compound Paid!" : "Parking Active!"}
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          {payingCompound
            ? `Compound ${payingCompound.ref} has been settled.`
            : `${durationLabel} parking started. You'll be notified 10 minutes before it expires.`}
        </p>

        {!payingCompound && (
          <div
            className={`w-full rounded-2xl border-2 ${selectedBox.colorBorder} ${selectedBox.colorLight} p-4 mb-4 text-left`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-4 h-4 rounded-full ${selectedBox.color}`} />
              <span
                className={`text-xs font-bold uppercase tracking-wide ${selectedBox.colorText}`}
              >
                {selectedBox.label}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Plate</span>
                <span className="font-semibold">{plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold">{durationLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rate</span>
                <span className="font-semibold">
                  RM {selectedBox.rate.toFixed(2)} {selectedBox.unitShort}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="font-semibold">Total Paid</span>
                <span className={`font-bold text-lg ${selectedBox.colorText}`}>
                  RM {cost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {payingCompound && (
          <div className="bg-white rounded-2xl border border-slate-100 p-4 w-full mb-4 text-left shadow-sm text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Ref</span>
              <span className="font-mono font-semibold">
                {payingCompound.ref}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location</span>
              <span className="font-semibold">{payingCompound.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount</span>
              <span className="font-bold text-green-700">
                RM {payingCompound.amount.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <button className="w-full bg-slate-100 text-slate-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 mb-3">
          <Download size={16} /> Download Receipt
        </button>
        <button
          onClick={() => {
            setView("home");
            setPayingCompound(null);
            setUnits(1);
          }}
          className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold"
        >
          Back to Parking
        </button>
      </div>
    );
  }

  // ── TOP UP ───────────────────────────────────────────────────
  if (view === "topup") {
    const amounts = [5, 10, 20, 50];
    return (
      <div className="px-4 py-5 space-y-5">
        <div className="gradient-hero rounded-2xl p-5">
          <p className="text-blue-200 text-xs mb-1">Current Wallet Balance</p>
          <p className="text-4xl font-bold text-white">
            RM {credit.toFixed(2)}
          </p>
          <p className="text-blue-200 text-xs mt-1">Sabah Smart Parking</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Select Top-Up Amount
          </p>
          <div className="grid grid-cols-2 gap-3">
            {amounts.map((amt) => (
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
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2 text-sm shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Payment Method
          </p>
          {["FPX Online Banking", "Credit / Debit Card", "E-Wallet"].map(
            (m, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${i === 0 ? "border-blue-500 bg-blue-50" : "border-slate-100 bg-white"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 ${i === 0 ? "border-blue-600 bg-blue-600" : "border-slate-300"} flex items-center justify-center`}
                >
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-sm text-slate-700">{m}</span>
              </div>
            ),
          )}
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm border border-slate-100">
          <div className="flex justify-between">
            <span className="text-slate-500">Top-up amount</span>
            <span className="font-semibold">RM {topupAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <span className="font-semibold">New balance</span>
            <span className="font-bold text-green-600">
              RM {(credit + topupAmount).toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() => setView("success")}
          className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold"
        >
          Top Up Now
        </button>
        <button
          onClick={() => setView("home")}
          className="w-full text-slate-500 text-sm py-2"
        >
          Cancel
        </button>
      </div>
    );
  }

  // ── COMPOUND ────────────────────────────────────────────────
  if (view === "compound") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-0.5">
              Important
            </p>
            <p className="text-xs text-amber-700">
              Pay within 14 days to avoid a 50% late payment surcharge.
            </p>
          </div>
        </div>
        {compounds.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-slate-400 font-mono">{c.ref}</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {c.location}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{c.date}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.paid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {c.paid ? "Paid" : "Unpaid"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-slate-900">
                RM {c.amount.toFixed(2)}
              </span>
              {!c.paid && (
                <button
                  onClick={() => {
                    setPayingCompound(c);
                    setView("success");
                  }}
                  className="gradient-hero text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-500">
            Compound inquiries:{" "}
            <span className="font-semibold text-blue-700">1-700-819-612</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            support@sabahsmartparking.com.my
          </p>
        </div>
        <button
          onClick={() => setView("home")}
          className="w-full text-slate-500 text-sm py-2"
        >
          ← Back
        </button>
      </div>
    );
  }

  // ── PAY PARKING — STEP 1: SELECT BOX TYPE ───────────────────
  if (view === "selectBox") {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3">
          <p className="text-xs text-blue-800 font-semibold mb-0.5">
            What is a box type?
          </p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Look at the colour of the painted parking box on the road where you
            parked. Select the matching colour below.
          </p>
        </div>

        <div className="space-y-3">
          {BOX_TYPES.map((box) => (
            <button
              key={box.id}
              onClick={() => {
                setSelectedBox(box);
                setUnits(1);
                setView("pay");
              }}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all card-hover ${selectedBox.id === box.id ? box.colorBorder + " " + box.colorLight : "border-slate-200 bg-white"}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-lg ${box.color} flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {box.label}{" "}
                    <span className="text-slate-400 font-normal text-xs">
                      ({box.labelEn})
                    </span>
                  </p>
                  <p className={`text-sm font-bold ${box.colorText}`}>
                    RM {box.rate.toFixed(2)} {box.unit}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 ml-11">{box.desc}</p>
              <div className="flex flex-wrap gap-1 mt-2 ml-11">
                {box.areas.map((a) => (
                  <span
                    key={a}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => setView("home")}
          className="w-full text-slate-500 text-sm py-2"
        >
          Cancel
        </button>
      </div>
    );
  }

  // ── PAY PARKING — STEP 2: SET DURATION ──────────────────────
  if (view === "pay") {
    const maxUnits = selectedBox.maxHours * (60 / selectedBox.stepMinutes);

    return (
      <div className="px-4 py-5 space-y-4">
        {/* Selected box type indicator */}
        <div
          className={`rounded-2xl border-2 ${selectedBox.colorBorder} ${selectedBox.colorLight} p-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl ${selectedBox.color} flex items-center justify-center`}
              >
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {selectedBox.label}
                </p>
                <p className={`text-xs font-semibold ${selectedBox.colorText}`}>
                  RM {selectedBox.rate.toFixed(2)} {selectedBox.unit}
                </p>
              </div>
            </div>
            <button
              onClick={() => setView("selectBox")}
              className="text-xs text-blue-600 font-semibold underline underline-offset-2"
            >
              Change
            </button>
          </div>
        </div>

        {/* Plate number */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Vehicle Plate Number
          </label>
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 tracking-widest"
            placeholder="e.g. SAB 1234 A"
          />
          <p className="text-xs text-slate-400 mt-1.5">
            You can register up to 10 vehicles in the app.
          </p>
        </div>

        {/* Duration selector */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Parking Duration
          </label>
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={() => setUnits(Math.max(1, units - 1))}
              className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 font-bold text-xl hover:bg-slate-200 transition-colors"
            >
              <Minus size={20} />
            </button>
            <div className="flex-1 text-center">
              <p className="text-3xl font-bold text-slate-900">
                {selectedBox.stepMinutes === 30 ? `${units * 30}` : `${units}`}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                {selectedBox.stepMinutes === 30
                  ? "minutes"
                  : units === 1
                    ? "hour"
                    : "hours"}
              </p>
            </div>
            <button
              onClick={() => setUnits(Math.min(maxUnits, units + 1))}
              className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 font-bold text-xl hover:bg-slate-200 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          {selectedBox.maxHours <= 2 && (
            <p className="text-xs text-red-500 font-medium text-center mt-2">
              Max {selectedBox.maxHours} hour
              {selectedBox.maxHours > 1 ? "s" : ""} for {selectedBox.labelEn}
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm border border-slate-100">
          <div className="flex justify-between">
            <span className="text-slate-500">Plate</span>
            <span className="font-semibold">{plate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Box type</span>
            <span className="flex items-center gap-1.5">
              <span
                className={`inline-block w-3 h-3 rounded-full ${selectedBox.color}`}
              />
              <span className="font-semibold">{selectedBox.label}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Duration</span>
            <span className="font-semibold">{durationLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Rate</span>
            <span className="font-semibold">
              RM {selectedBox.rate.toFixed(2)} {selectedBox.unitShort}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 mt-1">
            <span className="font-bold text-slate-800">Total</span>
            <span className="font-bold text-lg text-slate-900">
              RM {cost.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Wallet after</span>
            <span
              className={`font-semibold ${credit - cost < 0 ? "text-red-600" : "text-green-600"}`}
            >
              RM {Math.max(0, credit - cost).toFixed(2)}
            </span>
          </div>
          {credit - cost < 0 && (
            <p className="text-xs text-red-500 font-medium">
              Insufficient credit. Please top up first.
            </p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
          <Bell size={14} className="text-blue-600 shrink-0" />
          <p className="text-xs text-blue-700">
            You will receive a notification 10 minutes before your parking
            expires.
          </p>
        </div>

        <button
          onClick={() => setView("success")}
          disabled={credit - cost < 0}
          className="w-full gradient-hero text-white rounded-xl py-3.5 font-semibold disabled:opacity-50"
        >
          Confirm & Pay — RM {cost.toFixed(2)}
        </button>
        <button
          onClick={() => setView("selectBox")}
          className="w-full text-slate-500 text-sm py-2"
        >
          ← Change Box Type
        </button>
      </div>
    );
  }

  // ── HOME ────────────────────────────────────────────────────
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Wallet balance */}
      <div className="gradient-hero rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <p className="text-blue-200 text-xs mb-1">
          Sabah Smart Parking · Wallet
        </p>
        <p className="text-4xl font-bold text-white mb-1">
          RM {credit.toFixed(2)}
        </p>
        <p className="text-blue-200 text-xs mb-3">{plate}</p>
        <button
          onClick={() => setView("topup")}
          className="bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
        >
          + Top Up Credit
        </button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Pay\nParking",
            icon: CreditCard,
            action: () => setView("selectBox"),
          },
          {
            label: "Check\nCompound",
            icon: AlertTriangle,
            action: () => setView("compound"),
          },
          {
            label: "Scan\nQR Code",
            icon: QrCode,
            action: () => setView("selectBox"),
          },
        ].map(({ label, icon: Icon, action }, i) => (
          <button
            key={i}
            onClick={action}
            className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center gap-2 card-hover shadow-sm"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Icon size={20} className="text-slate-700" />
            </div>
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight whitespace-pre-line">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Active parking session */}
      {activeParkings.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Active Parking
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 font-semibold">Live</span>
            </div>
          </div>
          {activeParkings.map((p, i) => {
            const box = BOX_TYPES.find((b) => b.id === p.box) || BOX_TYPES[0];
            return (
              <div key={i} className="px-4 pb-4">
                <div
                  className={`rounded-xl border-2 ${box.colorBorder} ${box.colorLight} p-3`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-lg ${box.color} flex items-center justify-center`}
                      >
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {p.plate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/70 rounded-full px-2.5 py-1">
                      <Clock size={12} className="text-orange-500" />
                      <span className="text-xs font-bold text-orange-600">
                        {p.expiresIn} min left
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    {p.zone} · {box.label}
                  </p>
                  <button
                    onClick={() => setView("selectBox")}
                    className={`w-full ${box.color} text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5`}
                  >
                    <RefreshCw size={12} /> Extend Parking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Box type guide */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
          Parking Box Types & Rates
        </p>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">
          Look at the colour of the painted box where your vehicle is parked.
          Each colour has a different rate.
        </p>
        <div className="space-y-3">
          {BOX_TYPES.map((box) => (
            <div
              key={box.id}
              className={`flex items-start gap-3 p-3 rounded-xl ${box.colorLight} border ${box.colorBorder}`}
            >
              <div
                className={`w-8 h-8 rounded-lg ${box.color} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${box.colorText}`}>
                    {box.label}
                  </span>
                  <span className={`text-sm font-bold ${box.colorText}`}>
                    RM {box.rate.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {box.unit} · Max {box.maxHours} jam
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {box.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 italic mt-3">
          * Parking hours: Mon–Sat, 8:00 AM – 6:00 PM. Sundays & public holidays
          are free.
        </p>
      </div>

      {/* Contact */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
        <p className="text-xs font-semibold text-slate-600 mb-1">
          Sabah Smart Parking Support
        </p>
        <p className="text-xs text-blue-700 font-bold">1-700-819-612</p>
        <p className="text-xs text-slate-400 mt-0.5">
          support@sabahsmartparking.com.my
        </p>
      </div>
    </div>
  );
}
