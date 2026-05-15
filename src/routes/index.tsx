import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Minus, Plus, MapPin, Calendar as CalendarIcon, ShieldCheck, Star, BadgeCheck, ExternalLink, Trash2, House, Caravan, Forklift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import logo from "@/assets/deepcells-logo.svg";
import batteryEvoLogo from "@/assets/BatteryEVO-High-Resolution.webp";
import ebayLogo from "@/assets/EBay_logo.svg";
import techDirectLogo from "@/assets/TechDirect Logo.webp";
import walrusG3 from "@/assets/products/walrus-g3.webp";
import walrusG3Pro from "@/assets/products/walrus-g3-pro.webp";
import walrusG4Plus from "@/assets/products/walrus-g4-plus.webp";
import walrusPacific from "@/assets/products/walrus-pacific.webp";
import walrusPacificPro from "@/assets/products/Walrus-Pacific-Pro-BEVO-1536x1024.webp";
import mustang from "@/assets/products/48V-MUSTANG-With-A-Line-1024x682.webp";
import rhino from "@/assets/products/Rhino4.webp";
import owlLite from "@/assets/products/12V-OWL-LITE.webp";
import razorback from "@/assets/products/12V-RAZORBACK.webp";
import eagle from "@/assets/products/24V-EAGLE.webp";
import raptor from "@/assets/products/36V-RAPTOR-Lithium-Battery.webp";
import reindeer from "@/assets/products/36V-REINDEER.webp";
import badger from "@/assets/products/48V-BADGER.webp";
import chihuahua from "@/assets/products/48V-Chihuahua.webp";
import falcon from "@/assets/products/72V-FALCON.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DeepCells × TechDirect Liquidation — Lithium Battery Sale" },
      { name: "description", content: "30-50+% OFF select lithium battery inventory. Home backup, golf cart, RV & industrial. Hosted by DeepCells, processed with TechDirect. Ends in 2 weeks." },
    ],
  }),
});

type Product = {
  id: string;
  name: string;
  spec: string;
  blurb: string;
  image: string;
  retail: number;
  sale: number;
  off: number;
};

type IconComponent = React.ComponentType<{ className?: string }>;
type Category = { name: string; icon: IconComponent; products: Product[] };

function GolfCartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* roof */}
      <path d="M3 5h12" />
      {/* roof supports */}
      <path d="M3 5v6" />
      <path d="M15 5v6" />
      {/* cabin and cargo bed */}
      <path d="M3 11h13l3 2h2v2H3z" />
      {/* wheels */}
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="17" cy="17.5" r="1.7" />
    </svg>
  );
}

const CATEGORIES: Category[] = [
  {
    name: "Home Backup Systems",
    icon: House,
    products: [
      { id: "walrus-g3", name: "Walrus G3", spec: "12.5 kVA Inverter · 22 kWh LFP", blurb: "Perfect for small to medium homes with central A/C under 3 tons.", image: walrusG3, retail: 4849, sale: 3799, off: 22 },
      { id: "walrus-g4-plus", name: "Walrus G4 PLUS", spec: "16.5 kVA Inverter · 23 kWh LFP", blurb: "Larger inverter for homes with high-draw appliances and electric water heaters.", image: walrusG4Plus, retail: 5199, sale: 4199, off: 19 },
      { id: "walrus-g3-pro", name: "Walrus G3 PRO", spec: "22.0 kVA Inverter · 44 kWh LFP", blurb: "Strongest inverter we carry plus immense storage in a compact package.", image: walrusG3Pro, retail: 9195, sale: 8195, off: 11 },
      { id: "walrus-pacific", name: "Walrus Pacific", spec: "12.5 kVA Inverter · 62 kWh LFP", blurb: "Massive LFP pack for long outages or high daily consumption.", image: walrusPacific, retail: 10985, sale: 7690, off: 30 },
      { id: "walrus-pacific-pro", name: "Walrus Pacific Pro", spec: "22 kVA Inverter · 100 kWh LFP · 72V / AC110-220V", blurb: "Flagship system with 100 kWh storage and split-phase AC output for the largest residential demands.", image: walrusPacificPro, retail: 17599, sale: 12319, off: 30 },
      { id: "rhino-48v-home", name: "48V Rhino", spec: "48V LiFePO4 · Home energy storage", blurb: "Standalone 48V LFP battery for home backup and DIY energy storage builds.", image: rhino, retail: 7145, sale: 5002, off: 30 },
    ],
  },
  {
    name: "Golf Cart Batteries",
    icon: GolfCartIcon,
    products: [
      { id: "eagle-24v", name: "24V Eagle", spec: "24V Lithium · Drop-in", blurb: "Light, compact lithium pack for 24V carts and utility vehicles.", image: eagle, retail: 500, sale: 375, off: 25 },
      { id: "reindeer-36v", name: "36V Reindeer", spec: "36V Lithium · Long-range", blurb: "All-day range upgrade for classic 36V golf carts.", image: reindeer, retail: 1699, sale: 1189, off: 30 },
      { id: "raptor-36v", name: "36V Raptor", spec: "36V Lithium · High output", blurb: "High-output 36V pack for hilly courses and modded carts.", image: raptor, retail: 700, sale: 490, off: 30 },
      { id: "badger-48v", name: "48V Badger", spec: "48V Lithium · Standard", blurb: "Reliable 48V drop-in upgrade with BMS protection.", image: badger, retail: 749, sale: 524, off: 30 },
      { id: "chihuahua-48v", name: "48V Chihuahua", spec: "48V Lithium · Compact", blurb: "Compact 48V pack for tight battery bays.", image: chihuahua, retail: 644, sale: 451, off: 30 },
      { id: "mustang-48v", name: "48V Mustang", spec: "48V Lithium", blurb: "Lithium battery upgrade for 48V golf carts and utility applications.", image: mustang, retail: 1299, sale: 909, off: 30 },
      { id: "falcon-72v", name: "72V Falcon", spec: "72V Lithium · Performance", blurb: "Performance 72V system for lifted and high-speed carts.", image: falcon, retail: 814, sale: 595, off: 27 },
    ],
  },
  {
    name: "RV Batteries",
    icon: Caravan,
    products: [
      { id: "owl-lite-12v", name: "12V Owl Lite", spec: "12V LiFePO4 · 100Ah class", blurb: "Lightweight 12V house battery for RVs, vans, and trailers.", image: owlLite, retail: 328, sale: 229, off: 30 },
      { id: "razorback-12v", name: "12V Razorback", spec: "12V LiFePO4 · High capacity", blurb: "High-capacity 12V LFP for off-grid coaches and overlanders.", image: razorback, retail: 950, sale: 750, off: 21 },
      { id: "eagle-24v-rv", name: "24V Eagle (RV)", spec: "24V LiFePO4 · House bank", blurb: "24V house bank for larger RVs and marine builds.", image: eagle, retail: 500, sale: 375, off: 25 },
    ],
  },
  {
    name: "Industrial Batteries",
    icon: Forklift,
    products: [
      { id: "owl-lite-ind", name: "12V Owl Lite (Industrial)", spec: "12V LFP · Telecom & light duty", blurb: "Telecom and light industrial 12V LFP.", image: owlLite, retail: 328, sale: 229, off: 30 },
      { id: "reindeer-36v-ind", name: "36V Reindeer (Industrial)", spec: "36V LFP · Material handling", blurb: "Material handling and floor scrubber lithium pack.", image: reindeer, retail: 1699, sale: 1189, off: 30 },
      { id: "chihuahua-48v-ind", name: "48V Chihuahua (Industrial)", spec: "48V LFP · Light forklift", blurb: "Compact 48V industrial pack for light forklifts and AGVs.", image: chihuahua, retail: 644, sale: 451, off: 30 },
      { id: "rhino-48v-ind", name: "48V Rhino (Industrial)", spec: "48V LFP · Industrial-grade", blurb: "Rugged 48V LFP for industrial equipment, forklifts, and stationary applications.", image: rhino, retail: 7145, sale: 5002, off: 30 },
    ],
  },
];

const ALL_PRODUCTS = CATEGORIES.flatMap((c) => c.products);
// Sale ends at midnight Pacific (PDT) at the end of May 28, 2026
// — i.e. 00:00 Pacific on May 29 = 07:00 UTC.
const SALE_END = new Date("2026-05-29T07:00:00Z");

// Weekly discount lever. Bump to 0.35, 0.40, 0.45, 0.50 in coming weeks.
const DISCOUNT = 0.30;
function salePrice(retail: number) {
  return Math.round(retail * (1 - DISCOUNT));
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Index() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", buyerType: "", notes: "" });
  const [pickup, setPickup] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { d, h, m, s } = useCountdown(SALE_END);

  const lineItems = ALL_PRODUCTS
    .map((p) => ({ ...p, q: qty[p.id] || 0, sale: salePrice(p.retail) }))
    .filter((p) => p.q > 0);
  const subtotal = lineItems.reduce((acc, p) => acc + p.sale * p.q, 0);
  const retailTotal = lineItems.reduce((acc, p) => acc + p.retail * p.q, 0);

  const setQ = (id: string, v: number) => setQty((q) => ({ ...q, [id]: Math.min(999, Math.max(0, v)) }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Name and email are required.");
    if (lineItems.length === 0) return toast.error("Select at least one product you're interested in.");

    const itemsText = lineItems
      .map((p) => `  ${p.q} × ${p.name} (${p.spec}) — ${fmt(p.sale)} ea (retail ${fmt(p.retail)}) = ${fmt(p.sale * p.q)}`)
      .join("\n");

    const payload = {
      _subject: `DeepCells × BatteryEVO Quote Request — ${form.name}${form.company ? ` (${form.company})` : ""}`,
      _replyto: form.email,
      _cc: "joshua.b@bigbattery.com",
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      buyerType: form.buyerType,
      pickup: pickup ? formatPickup(pickup) : "(not specified)",
      notes: form.notes,
      items: itemsText,
      retailTotal: fmt(retailTotal),
      subtotal: fmt(subtotal),
    };

    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xqenvkjo", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Formspree returned ${res.status}`);
      toast.success("Quote request sent. We'll be in touch within one business day.");
      setForm({ name: "", company: "", email: "", phone: "", buyerType: "", notes: "" });
      setPickup(null);
      setQty({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />

      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,oklch(0.88_0.015_250)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.88_0.015_250)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-border/60">
            <img src={logo} alt="DeepCells" className="h-20 sm:h-24 lg:h-28 w-auto shrink-0" />
            <div>
              <h1 className="inline-flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                <BadgeCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
                Established in 2017
              </h1>
              <h3 className="mt-1 text-base sm:text-lg font-medium text-muted-foreground">
                Celebrating 9 years of trusted LiFePO4 battery solutions for homes, electric vehicles, industrial equipment
              </h3>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#0077ff] via-[#00b3ff] to-[var(--promo)] bg-clip-text text-transparent">
                Sponsored by Deepcells,<br />Techdirect Liquidation of{" "}
                <img
                  src={batteryEvoLogo}
                  alt="BatteryEVO"
                  className="inline-block h-[0.9em] w-auto align-middle -translate-y-[0.05em]"
                />{" "}
                Inventory
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                Deepcells is hosting an exclusive liquidation sale of BatteryEVO inventory at <span className="font-bold text-[var(--promo)]">30-50+% OFF</span>. Partnered and processed with TechDirect you can select home backup, golf cart, RV, and industrial lithium batteries. First-come, first-served.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--urgency)]/40 bg-[var(--urgency)]/10 px-3 py-1 text-xs font-semibold text-[var(--urgency)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--urgency)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--urgency)]" />
                </span>
                LIVE LIQUIDATION EVENT · ENDS IN 2 WEEKS
              </div>

              <div className="mt-3 grid grid-cols-4 gap-3 max-w-md">
                {[{ l: "Days", v: d }, { l: "Hours", v: h }, { l: "Min", v: m }, { l: "Sec", v: s }].map((t) => (
                  <div key={t.l} className="rounded-xl border border-[var(--urgency)]/30 bg-[var(--urgency)]/5 p-3 text-center" style={{ boxShadow: "var(--shadow-elegant)" }}>
                    <div className="text-2xl sm:text-3xl font-bold tabular-nums text-[var(--urgency)]">{String(t.v).padStart(2, "0")}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.l}</div>
                  </div>
                ))}
              </div>

            </div>

            <TrustCard />
          </div>

        </div>
      </header>

      {/* Catalog */}
      <main id="catalog" className="mx-auto max-w-6xl px-6 py-16">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Select Products!</h2>
          <p className="mt-2 text-muted-foreground">Set quantities below. Your order summary updates live.</p>
        </div>

        <div className="mt-10 space-y-14">
          {CATEGORIES.map((cat) => (
            <section key={cat.name}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">{cat.name}</h3>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                {cat.products.map((p) => (
                  <ProductCard key={p.id} product={p} qty={qty[p.id] || 0} setQ={(v) => setQ(p.id, v)} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Order summary + form */}
        <section id="order" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <h3 className="text-2xl font-bold">Order summary</h3>
            <p className="mt-1 text-sm text-muted-foreground">We'll follow up with a quote and availability.</p>

            <div className="mt-6 divide-y divide-border">
              {lineItems.length === 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No items selected yet — add quantities above.
                </div>
              )}
              {lineItems.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-3">
                  <img src={p.image} alt="" className="h-12 w-12 rounded-md object-cover bg-muted" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground tabular-nums">
                      {p.q} × <span className="line-through opacity-70">{fmt(p.retail)}</span>{" "}
                      <span className="font-semibold text-[var(--promo)]">{fmt(p.sale)}</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold tabular-nums">{fmt(p.sale * p.q)}</div>
                  <button
                    type="button"
                    onClick={() => setQ(p.id, 0)}
                    aria-label={`Remove ${p.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-400/30 to-red-600/30 text-red-600 transition hover:from-red-400/50 hover:to-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:ring-offset-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {lineItems.length > 0 && (
              <div className="mt-5 space-y-2 rounded-xl bg-muted/40 p-4 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Retail total</span>
                  <span className="line-through tabular-nums">{fmt(retailTotal)}</span>
                </div>
                <div className="my-2 h-px bg-border" />
                <div className="flex items-center justify-between text-base font-bold">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[var(--promo)]">{fmt(subtotal)}</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <h3 className="text-2xl font-bold">Request a quote</h3>
            <p className="mt-1 text-sm text-muted-foreground">We'll reach out with pricing, availability, and pickup details within one business day.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name *"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={120} /></Field>
              <Field label="Company"><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} maxLength={120} /></Field>
              <Field label="Email *"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={200} /></Field>
              <Field label="Phone"><Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={40} /></Field>
              <Field label="Buyer type">
                <select value={form.buyerType} onChange={(e) => setForm({ ...form, buyerType: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Select…</option>
                  <option>Reseller</option><option>Installer</option><option>Contractor</option><option>End user / bulk buyer</option><option>Other</option>
                </select>
              </Field>
              <Field label="Pickup Window (Optional)">
                <PickupPicker value={pickup} onChange={setPickup} />
                <p className="mt-1 text-xs text-muted-foreground">For local pickup only</p>
              </Field>
              <div className="sm:col-span-2"><Field label="Notes"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} maxLength={1000} placeholder="Anything we should know?" /></Field></div>
            </div>

            <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90" style={{ boxShadow: "var(--shadow-glow)" }}>
              {submitting ? "Sending…" : "Request quote"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting, you'll be contacted by DeepCells with a quote and availability. Pickup at {`9667 Owensmouth Ave, Chatsworth, CA 91311`}.
            </p>
          </form>
        </section>
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 sm:grid-cols-2 items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DeepCells" className="h-10 w-auto" />
            <div className="text-sm text-muted-foreground">
              Liquidation event hosted by DeepCells. Inventory & payments fulfilled by TechDirect.
            </div>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            <div className="flex sm:justify-end items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 9667 Owensmouth Ave, Chatsworth, CA 91311</div>
            <div className="mt-1">© {new Date().getFullYear()} DeepCells.com</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function formatPickup(d: Date) {
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function PickupPicker({ value, onChange }: { value: Date | null; onChange: (d: Date | null) => void }) {
  const [open, setOpen] = useState(false);
  const initial = value ?? new Date();
  const [draftDate, setDraftDate] = useState<Date>(initial);
  const [hour, setHour] = useState<number>(((initial.getHours() + 11) % 12) + 1);
  const [minute, setMinute] = useState<number>(Math.floor(initial.getMinutes() / 5) * 5);
  const [ampm, setAmpm] = useState<"AM" | "PM">(initial.getHours() >= 12 ? "PM" : "AM");

  const apply = () => {
    const d = new Date(draftDate);
    const h24 = (hour % 12) + (ampm === "PM" ? 12 : 0);
    d.setHours(h24, minute, 0, 0);
    onChange(d);
    setOpen(false);
  };

  const clear = () => {
    onChange(null);
    setOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full justify-start font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          {value ? formatPickup(value) : <span className="text-muted-foreground">Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={draftDate}
          onSelect={(d) => d && setDraftDate(d)}
          disabled={(d) => d < today}
          autoFocus
        />
        <div className="border-t border-border p-3 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground w-12">Time</span>
            <select
              value={hour}
              onChange={(e) => setHour(parseInt(e.target.value, 10))}
              className="flex h-9 rounded-md border border-input bg-background px-2 text-sm"
              aria-label="Hour"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <span className="text-muted-foreground">:</span>
            <select
              value={minute}
              onChange={(e) => setMinute(parseInt(e.target.value, 10))}
              className="flex h-9 rounded-md border border-input bg-background px-2 text-sm"
              aria-label="Minute"
            >
              {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>
              ))}
            </select>
            <select
              value={ampm}
              onChange={(e) => setAmpm(e.target.value as "AM" | "PM")}
              className="flex h-9 rounded-md border border-input bg-background px-2 text-sm"
              aria-label="AM or PM"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={clear}>Clear</Button>
            <Button type="button" size="sm" onClick={apply}>Set pickup</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ProductCard({ product, qty, setQ }: { product: Product; qty: number; setQ: (v: number) => void }) {
  const sale = salePrice(product.retail);
  const selected = qty > 0;
  return (
    <div
      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-2.5 sm:p-3 transition hover:border-primary/50"
      style={{ boxShadow: selected ? "var(--shadow-glow)" : undefined }}
    >
      <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-md bg-muted">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-1" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold leading-tight truncate">
          {product.name} <span className="text-muted-foreground font-normal">· {product.spec}</span>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0 tabular-nums leading-tight">
        <span className="text-[11px] sm:text-xs text-muted-foreground line-through">{fmt(product.retail)}</span>
        <span className="text-sm sm:text-base font-bold text-[var(--promo)]">{fmt(sale)}</span>
      </div>
      <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1 shrink-0">
        <button type="button" aria-label="Decrease" onClick={() => setQ(qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted disabled:opacity-40" disabled={qty <= 0}><Minus className="h-3.5 w-3.5" /></button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          value={qty}
          onChange={(e) => {
            const v = e.target.value.replace(/[^0-9]/g, "");
            setQ(v === "" ? 0 : parseInt(v, 10));
          }}
          className="w-8 bg-transparent text-center text-sm font-semibold outline-none"
        />
        <button type="button" aria-label="Increase" onClick={() => setQ(qty + 1)} disabled={qty >= 999} className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"><Plus className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}

function TrustCard() {
  return (
    <div className="relative rounded-2xl border border-border bg-card/70 p-6 backdrop-blur" style={{ boxShadow: "var(--shadow-elegant)" }}>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">About TechDirect</div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
          <img src={techDirectLogo} alt="TechDirect" className="h-full w-full object-contain" />
        </div>
        <div>
          <div className="text-lg font-bold">TechDirect</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {[...Array(5)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />)}
            <span className="ml-1">eBay verified seller</span>
          </div>
        </div>
      </div>

      <a
        href="https://www.ebay.com/str/techdirectclub"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
      >
        View their trusted official{" "}
        <img src={ebayLogo} alt="eBay" className="inline-block h-4 w-auto align-middle -translate-y-[1px]" />{" "}
        store
        <ExternalLink className="h-3.5 w-3.5" />
      </a>

      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            In business for over <strong className="font-semibold text-foreground">10+ years</strong> liquidating overstock inventory.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Star className="h-4 w-4" />
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            Trusted seller of overstock with <strong className="font-semibold text-foreground">99.3% positive feedback</strong> on their{" "}
            <img src={ebayLogo} alt="eBay" className="inline-block h-4 w-auto align-middle -translate-y-[1px]" /> store.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <BadgeCheck className="h-4 w-4" />
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            <strong className="font-semibold text-foreground">Top Rated Plus</strong> seller — eBay's official distinction for highest-quality sellers.
          </p>
        </li>
      </ul>
    </div>
  );
}
