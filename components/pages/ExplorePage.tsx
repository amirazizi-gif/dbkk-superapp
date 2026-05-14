"use client";
import { useState } from "react";
import { MapPin, Clock, Utensils, Camera, Info } from "lucide-react";

type ExploreTab = "attractions" | "food" | "tips";

const attractions = [
  {
    name: "Pasar Kraftangan KK",
    category: "Budaya & Membeli-belah",
    desc: "Pasar kraf tradisional terbesar di Sabah. Jual kain, ukiran kayu, manik, dan cenderamata tempatan.",
    hours: "8:00am – 6:00pm",
    area: "Pusat Bandar KK",
    tip: "Datang awal pagi untuk pilihan terbaik. Tawar-menawar adalah amalan biasa di sini.",
    icon: "🛍️",
  },
  {
    name: "Pantai Tanjung Aru",
    category: "Alam Semula Jadi",
    desc: "Pantai paling popular di KK, terkenal dengan pemandangan matahari terbenam yang memukau. Ada restoran tepi pantai dan taman awam.",
    hours: "Terbuka 24 jam",
    area: "Tanjung Aru",
    tip: "Datang lewat petang (5:30–6:30pm) untuk matahari terbenam. Membawa kamera adalah wajib!",
    icon: "🌅",
  },
  {
    name: "Muzium Sabah",
    category: "Sejarah & Ilmu",
    desc: "Muzium utama negeri Sabah. Mempamerkan sejarah, budaya, dan alam semula jadi Sabah secara menyeluruh.",
    hours: "9:00am – 5:00pm (Tutup Jumaat)",
    area: "Bukit Istana Lama",
    tip: "Percuma untuk kanak-kanak bawah 12 tahun. Ada masjid berhampiran jika perlu solat.",
    icon: "🏛️",
  },
  {
    name: "Warisan Square",
    category: "Membeli-belah & Makan",
    desc: "Pusat membeli-belah dan restoran tepi laut. View menghadap Teluk Gaya. Ada pelbagai pilihan makanan dari pelbagai budaya.",
    hours: "10:00am – 10:00pm",
    area: "Jalan Tun Fuad Stephens",
    tip: "Parkir di sini menggunakan Sabah Smart Parking (Zone C1). Kadar RM 1.00/30min.",
    icon: "🌊",
  },
  {
    name: "Pekan Malam Gaya Street",
    category: "Makanan & Budaya",
    desc: "Pasar malam Ahad yang terkenal di Jalan Gaya. Jual makanan tempatan, buah-buahan eksotik, pakaian, dan barangan antik.",
    hours: "Ahad sahaja: 6:00am – 1:00pm",
    area: "Jalan Gaya",
    tip: "Datang sebelum 9am untuk mengelak kepadatan. Cuba kuih-muih tempatan dan kopi Tenom.",
    icon: "🌏",
  },
];

const foodSpots = [
  {
    name: "Kedai Kopi & Makanan Tempatan",
    desc: "Cuba Nasi Lemak Sabah, Hinava (ikan mentah), Sup Tuhau, dan Ambuyat di kedai-kedai lokal sekitar Jalan Gaya dan Pasar Filipina.",
    must: ["Hinava", "Nasi Lemak Sabah", "Teh Panas + Roti Kaya"],
    icon: "☕",
    area: "Jalan Gaya, Pusat Bandar",
  },
  {
    name: "Pasar Filipina (Night Market)",
    desc: "Terkenal dengan seafood segar dan makanan laut. Harga berpatutan, suasana meriah terutama pada waktu malam.",
    must: ["Ketam Masak Lemak", "Ikan Bakar", "Kerang Rebus"],
    icon: "🦀",
    area: "Jalan Tun Fuad Stephens",
  },
  {
    name: "Restoran di Sepanjang Waterfront",
    desc: "Restoran dan kafe dengan pemandangan laut di kawasan Waterfront dan Warisan Square. Sesuai untuk makan malam dengan suasana romantik.",
    must: ["Western & Local Fusion", "Seafood Platter", "Lihing (tapai tempatan)"],
    icon: "🌃",
    area: "Waterfront, Warisan Square",
  },
];

const tips = [
  { icon: "🚗", title: "Parking", desc: "Gunakan Sabah Smart Parking (SSP app atau dalam Super App ini) untuk kawasan A1/A2 (Jalan Gaya), B1 (Tuaran), C1 (Warisan Square). Bayar terus dari telefon — tiada kupon kertas lagi." },
  { icon: "🚕", title: "Pengangkutan", desc: "Grab tersedia di seluruh KK. Teksi Lama ada di kawasan stesen bas dan lapangan terbang. Bayar lebih berpatutan jika ada barang banyak." },
  { icon: "🕌", title: "Waktu Solat", desc: "Masjid Bandaraya KK terletak di pusat bandar. Kebanyakan restoran dan pusat membeli-belah ada surau. Waktu solat bergantung pada kalendar Islam tempatan." },
  { icon: "💰", title: "Wang & ATM", desc: "ATM boleh didapati di semua bank dan pusat membeli-belah. Kebanyakan kedai dan restoran besar menerima kad kredit/debit. Bawa sedikit tunai untuk pasar dan gerai kecil." },
  { icon: "☀️", title: "Cuaca", desc: "KK beriklim tropika — panas dan lembap sepanjang tahun. Hujan lebat boleh berlaku pada bila-bila masa. Bawa payung atau jaket ringan semasa keluar." },
  { icon: "🆘", title: "Kecemasan", desc: "Polis: 999 | Bomba: 994 | Ambulans: 999 | Hospital Queen Elizabeth: 088-517 555. DBKK Hotline Aduan: 088-521 800." },
];

export default function ExplorePage() {
  const [tab, setTab] = useState<ExploreTab>("attractions");
  const [expanded, setExpanded] = useState<number | null>(null);

  const tabs = [
    { id: "attractions" as ExploreTab, label: "Tarikan", icon: Camera },
    { id: "food" as ExploreTab, label: "Makanan", icon: Utensils },
    { id: "tips" as ExploreTab, label: "Tip & Info", icon: Info },
  ];

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Hero */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0052A5 0%, #006B3C 100%)" }}>
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -left-4 w-20 h-20 bg-white/5 rounded-full" />
        <div className="p-5 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-green-300" />
            <span className="text-green-200 text-xs font-medium">Kota Kinabalu, Sabah</span>
          </div>
          <h2 className="text-white font-bold text-xl leading-tight mb-1">Jelajah Kota Kinabalu</h2>
          <p className="text-blue-200 text-xs">Maklumat asas untuk lawatan dan kehidupan harian di KK</p>
        </div>
      </div>

      {/* Quick context note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
        <span className="text-base mt-0.5">ℹ️</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          Maklumat ini adalah panduan asas sahaja. Sila semak dengan pihak berkenaan untuk maklumat terkini seperti waktu operasi dan harga.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === id ? "bg-white text-blue-700 shadow-sm" : "text-slate-500"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Attractions tab */}
      {tab === "attractions" && (
        <div className="space-y-3">
          {attractions.map((place, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button
                className="w-full text-left p-4"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{place.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{place.name}</p>
                      <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full">{place.category}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs mt-1">{expanded === i ? "▲" : "▼"}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 ml-9">
                  <div className="flex items-center gap-1">
                    <Clock size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{place.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{place.area}</span>
                  </div>
                </div>
              </button>
              {expanded === i && (
                <div className="px-4 pb-4 ml-9 space-y-3 border-t border-slate-50 pt-3">
                  <p className="text-sm text-slate-600 leading-relaxed">{place.desc}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-xs font-semibold text-yellow-800 mb-1">💡 Tip</p>
                    <p className="text-xs text-yellow-800 leading-relaxed">{place.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Food tab */}
      {tab === "food" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 italic">Makanan tempatan Sabah — unik dan wajib dicuba semasa berada di KK.</p>
          {foodSpots.map((spot, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{spot.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{spot.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{spot.area}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{spot.desc}</p>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Wajib Cuba:</p>
                <div className="flex flex-wrap gap-2">
                  {spot.must.map((item, j) => (
                    <span key={j} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Quick food glossary */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Glosari Makanan Sabah</p>
            <div className="space-y-2">
              {[
                ["Hinava", "Ikan mentah jeruk dengan jus limau dan cili — makanan tradisi Kadazan-Dusun"],
                ["Ambuyat", "Tepung sagu dimasak jadi adunan likat, dimakan dengan kuah asam — makanan khas Brunei/Sabah"],
                ["Tuhau", "Acar pokok hutan liar — rasa pedas-masam unik, dimakan sebagai lauk"],
                ["Lihing", "Arak beras tradisi Kadazan — dijual di kedai lesen sahaja"],
              ].map(([name, desc], i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-xs font-bold text-blue-700 shrink-0 w-16">{name}</span>
                  <span className="text-xs text-slate-600">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tips tab */}
      {tab === "tips" && (
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{tip.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-1">{tip.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}

          {/* DBKK contact card */}
          <div className="gradient-hero rounded-2xl p-4">
            <p className="text-white font-bold text-sm mb-1">📞 Hubungi DBKK</p>
            <p className="text-blue-200 text-xs mb-3">Untuk aduan atau pertanyaan berkaitan bandaraya</p>
            <div className="space-y-1.5">
              {[
                ["Hotline Aduan", "088-521 800"],
                ["Parking (DBKK Holdings)", "088-270 181"],
                ["E-mel", "aduan.dbkk@sabah.gov.my"],
              ].map(([label, val], i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-blue-300">{label}</span>
                  <span className="text-white font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}