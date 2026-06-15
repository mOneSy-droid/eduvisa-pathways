import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Phone, Menu, X, ArrowRight, GraduationCap, FileText, Plane, Award, Home, Compass,
  Star, Linkedin, Send, MapPin, Mail, Clock, Instagram, Facebook, ChevronDown, Check,
  Heart, MessageCircle, Calculator, Trophy, ArrowUp, Sparkles, Globe2, CalendarDays,
  ChevronLeft, ChevronRight, GitCompare,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal, CountUp } from "@/components/reveal";
import heroStudents from "@/assets/hero-students.jpg";
import cUK from "@/assets/country-uk.jpg";
import cAU from "@/assets/country-australia.jpg";
import cCA from "@/assets/country-canada.jpg";
import cNZ from "@/assets/country-newzealand.jpg";
import cIE from "@/assets/country-ireland.jpg";
import cUS from "@/assets/country-usa.jpg";
import uOxford from "@/assets/uni-oxford.jpg";
import uMelb from "@/assets/uni-melbourne.jpg";
import uTor from "@/assets/uni-toronto.jpg";
import uHarvard from "@/assets/uni-harvard.jpg";
import uCam from "@/assets/uni-cambridge.jpg";
import uSyd from "@/assets/uni-sydney.jpg";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";
import ts1 from "@/assets/testimonial-1.jpg";
import ts2 from "@/assets/testimonial-2.jpg";
import ts3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eduvisa — Kelajagingiz xorijdan boshlanadi | CHET ELDA TA'LIM" },
      { name: "description", content: "O'zbekistondagi eng ishonchli ta'lim konsalting markazi. UK, USA, Canada, Australia universitetlariga qabul, viza va stipendiya yordami." },
      { property: "og:title", content: "Eduvisa — Kelajagingiz xorijdan boshlanadi" },
      { property: "og:description", content: "Premium ta'lim konsalting markazi. 500+ talaba, 30+ davlat, 95% qabul ko'rsatkichi." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Davlatlar", href: "#destinations" },
  { label: "Universitetlar", href: "#universities" },
  { label: "Jamoa", href: "#team" },
  { label: "Aloqa", href: "#contact" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(["home", "services", "destinations", "universities", "team", "contact"]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-[#0D1B2A]/8 shadow-[0_4px_30px_-15px_rgba(15,27,42,0.15)]"
          : "bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-hover)] grid place-items-center shadow-gold">
            <GraduationCap className="h-5 w-5 text-[#0D1B2A]" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-[#0D1B2A]">Eduvisa</div>
            <div className="text-[10px] tracking-[0.2em] text-[#A68B52] font-semibold">CHET ELDA TA'LIM</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-[#0D1B2A]" : "text-[#0D1B2A]/65 hover:text-[#0D1B2A]"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+998901234567" className="flex items-center gap-2 text-sm text-[#0D1B2A]/75 hover:text-[#0D1B2A] transition-colors">
            <Phone className="h-4 w-4" /> +998 90 123 45 67
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-[14px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] text-sm font-semibold hover:scale-[1.04] active:scale-[0.98] transition-all duration-200 shadow-gold"
          >
            Konsultatsiya
          </a>
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden h-11 w-11 grid place-items-center rounded-xl bg-[#0D1B2A]/8 text-[#0D1B2A]"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-white transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-10 flex flex-col gap-5">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-display text-[#0D1B2A] hover:text-[#A68B52]">
              {l.label}
            </a>
          ))}
          <a href="tel:+998901234567" className="mt-4 flex items-center gap-2 text-[#0D1B2A]/70"><Phone className="h-4 w-4" /> +998 90 123 45 67</a>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 px-5 py-3.5 rounded-[14px] bg-gold text-[#0D1B2A] text-center font-semibold">
            Konsultatsiya olish
          </a>
        </div>
      </div>
    </header>
  );
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: `${(i * 53) % 100}%`,
        size: 4 + ((i * 7) % 8),
        delay: (i % 9) * 1.2,
        duration: 14 + (i % 6) * 3,
        opacity: 0.25 + ((i % 5) * 0.1),
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-[var(--gold)] animate-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const px = (mult: number) => ({ transform: `translateY(${scrollY * mult}px)` });
  const flags = ["🇬🇧", "🇺🇸", "🇨🇦", "🇦🇺", "🇳🇿", "🇮🇪"];
  const unis = ["Oxford", "Harvard", "Cambridge", "MIT", "Toronto"];
  return (
    <section id="home" className="relative min-h-screen pt-28 lg:pt-32 pb-24 hero-gradient overflow-hidden">
      {/* Soft blurred floating shapes */}
      <div className="absolute top-[-10%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#C8A971]/25 blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-8%] h-[32rem] w-[32rem] rounded-full bg-[#7DA7F5]/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-[-15%] left-[20%] h-[26rem] w-[26rem] rounded-full bg-[#A78BFA]/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0D1B2A 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <Particles />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up" style={px(0.06)}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#C8A971]/40 backdrop-blur-md shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-[#A68B52]" />
            <span className="text-xs font-semibold tracking-wider text-[#0D1B2A]">O'ZBEKISTONNING #1 TA'LIM KONSALTING MARKAZI</span>
          </div>
          <h1 className="mt-7 font-display font-bold text-[clamp(2.4rem,5.6vw,4.7rem)] leading-[1.04] tracking-tight text-[#0D1B2A]">
            Kelajagingiz<br />
            <span className="bg-gradient-to-r from-[#C8A971] via-[#A68B52] to-[#C8A971] bg-clip-text text-transparent">Xorijdan</span> Boshlanadi
          </h1>
          <p className="mt-6 text-lg text-[#0D1B2A]/70 max-w-xl leading-relaxed">
            O'zbekistonning eng ishonchli ta'lim konsalting markazi. Siz tanlagan universitetga biz olib boramiz — konsultatsiyadan vizagacha.
          </p>

          {/* Trust badges */}
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { i: "👨‍🎓", t: "500+ Talaba" },
              { i: "🎓", t: "50+ Hamkor universitet" },
              { i: "✅", t: "95% viza muvaffaqiyati" },
            ].map((b) => (
              <div key={b.t} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur border border-[#0D1B2A]/8 text-xs font-semibold text-[#0D1B2A] shadow-soft">
                <span>{b.i}</span>{b.t}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-[14px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.98] shadow-gold">
              Bepul Konsultatsiya
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#universities" className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px] bg-white/80 backdrop-blur border border-[#0D1B2A]/12 text-[#0D1B2A] font-semibold hover:bg-white transition-all duration-200 hover:scale-[1.02]">
              Universitetlarni Ko'rish
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-[#0D1B2A]/70">
            <div className="flex -space-x-3">
              {[ts1, ts2, ts3].map((s, i) => (
                <img key={i} src={s} alt="" loading="lazy" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-white object-cover shadow" />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-[#C8A971]">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <div className="text-xs mt-0.5 text-[#0D1B2A]/60">500+ muvaffaqiyatli talaba ishonadi</div>
            </div>
          </div>
        </div>

        <div className="relative" style={px(-0.05)}>
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(15,27,42,0.35)]">
            <img src={heroStudents} alt="Xorijiy universitetlardagi talabalar" width={1024} height={1280} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/30 via-transparent to-transparent" />
          </div>

          {/* Floating animated counter card */}
          <div className="absolute -left-4 sm:-left-10 top-8 px-5 py-4 rounded-2xl glass-card animate-float">
            <div className="font-display text-3xl font-bold text-[#0D1B2A]"><CountUp end={500} suffix="+" /></div>
            <div className="text-xs text-[#0D1B2A]/65 mt-0.5">Muvaffaqiyatli talabalar</div>
          </div>

          {/* Floating country flags pill */}
          <div className="absolute -right-3 sm:-right-6 top-1/3 px-4 py-3 rounded-2xl glass-card animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="text-[10px] font-semibold tracking-wider text-[#0D1B2A]/60 uppercase mb-1.5">Davlatlar</div>
            <div className="flex gap-1.5 text-xl">
              {flags.map((f) => <span key={f}>{f}</span>)}
            </div>
          </div>

          {/* Floating university badges */}
          <div className="absolute -left-2 sm:-left-8 bottom-6 px-5 py-4 rounded-2xl glass-card animate-float max-w-[16rem]" style={{ animationDelay: "3s" }}>
            <div className="text-[10px] font-semibold tracking-wider text-[#0D1B2A]/60 uppercase mb-2">Hamkor universitetlar</div>
            <div className="flex flex-wrap gap-1.5">
              {unis.map((u) => (
                <span key={u} className="px-2 py-0.5 rounded-md bg-[#0D1B2A]/8 text-[11px] font-semibold text-[#0D1B2A]">{u}</span>
              ))}
            </div>
          </div>

          <div className="absolute -right-2 bottom-10 px-4 py-3 rounded-2xl glass-card animate-float" style={{ animationDelay: "2.2s" }}>
            <div className="font-display text-2xl font-bold text-[#0D1B2A]"><CountUp end={95} suffix="%" /></div>
            <div className="text-[11px] text-[#0D1B2A]/65">Viza muvaffaqiyati</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#services" aria-label="Scroll" className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#0D1B2A]/55 hover:text-[#0D1B2A] transition-colors">
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <span className="h-10 w-6 rounded-full border-2 border-current grid place-items-start p-1">
          <span className="h-2 w-1 rounded-full bg-current animate-bounce" />
        </span>
      </a>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 500, s: "+", l: "Muvaffaqiyatli talabalar" },
    { v: 8, s: "+ yil", l: "Tajriba" },
    { v: 50, s: "+", l: "Hamkor universitetlar" },
    { v: 6, s: "", l: "Asosiy davlatlar" },
  ];
  return (
    <section className="py-20 bg-[var(--soft)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="text-center">
              <div className="font-display text-5xl lg:text-6xl font-bold text-[#0D1B2A]">
                <CountUp end={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 text-sm text-[var(--muted-foreground)]">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-[#A68B52] text-xs font-semibold tracking-wider uppercase">
          {eyebrow}
        </div>
        <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl text-[#0D1B2A]">{title}</h2>
        {sub && <p className="mt-4 text-[var(--muted-foreground)] text-lg">{sub}</p>}
      </div>
    </Reveal>
  );
}

function Services() {
  const items = [
    { icon: Compass, t: "Dastlabki Konsultatsiya", d: "Mutaxassislarimiz bilan bepul uchrashuv — sizning maqsadingiz va imkoniyatlaringizni baholaymiz." },
    { icon: GraduationCap, t: "Universitet Tanlash", d: "Sizning sohangiz va byudjetingizga mos eng yaxshi universitetlarni tanlaymiz." },
    { icon: FileText, t: "Hujjatlar Tayyorlash", d: "Motivation letter, CV, tavsiyanomalardan tortib barcha ariza hujjatlarini professional darajada tayyorlaymiz." },
    { icon: Plane, t: "Viza Yordam", d: "Talabalar vizasi uchun to'liq qo'llab-quvvatlash — intervyudan tortib hujjatlargacha." },
    { icon: Award, t: "Stipendiya Qidirish", d: "Sizga mos stipendiya dasturlarini topib, ariza topshirishda yo'l-yo'riq beramiz." },
    { icon: Home, t: "Turar Joy Topish", d: "Yotoqxona yoki ijara uy — sizga mos turar joyni xorijda topib beramiz." },
  ];
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Xizmatlarimiz" title="To'liq ta'lim yo'lboshchilik" sub="Birinchi uchrashuvdan xorijdagi birinchi darsigacha — har bir bosqichda yoningizdamiz." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="group h-full p-8 rounded-[20px] bg-white border border-[var(--border)] shadow-soft hover:border-gold hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-gold/10 grid place-items-center text-[#A68B52] group-hover:bg-gold group-hover:text-[#0D1B2A] transition-colors">
                  <s.icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-[#0D1B2A]">{s.t}</h3>
                <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const destinationData = [
  { img: cUK, n: "United Kingdom", flag: "🇬🇧", unis: 150, tuition: "$25-45K", cities: "London, Manchester, Edinburgh", visa: 96, scholar: "Chevening, GREAT" },
  { img: cUS, n: "USA", flag: "🇺🇸", unis: 200, tuition: "$30-60K", cities: "New York, Boston, LA", visa: 92, scholar: "Fulbright, OFID" },
  { img: cCA, n: "Canada", flag: "🇨🇦", unis: 100, tuition: "$20-36K", cities: "Toronto, Vancouver, Montreal", visa: 94, scholar: "Vanier, Trudeau" },
  { img: cAU, n: "Australia", flag: "🇦🇺", unis: 80, tuition: "$22-40K", cities: "Sydney, Melbourne, Brisbane", visa: 95, scholar: "Australia Awards" },
  { img: cNZ, n: "New Zealand", flag: "🇳🇿", unis: 25, tuition: "$20-32K", cities: "Auckland, Wellington", visa: 97, scholar: "NZ Excellence" },
  { img: cIE, n: "Ireland", flag: "🇮🇪", unis: 20, tuition: "$18-30K", cities: "Dublin, Cork, Galway", visa: 98, scholar: "Government of Ireland" },
];

function CountryCard({ d, i }: { d: (typeof destinationData)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={i * 70}>
      <a
        ref={ref}
        href="#contact"
        onMouseMove={onMove}
        className="group relative block rounded-[22px] overflow-hidden bg-white shadow-soft hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(15,27,42,0.25)] transition-all duration-500 shine-on-hover"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(200,169,113,0.18), transparent 60%)" }}
        />
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={d.img} alt={d.n} loading="lazy" width={800} height={600} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1100ms] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/70 via-[#0D1B2A]/10 to-transparent" />
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-[#0D1B2A]">
            <span className="text-base leading-none">{d.flag}</span> {d.n}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#10B981]/95 text-white text-[11px] font-bold">
            {d.visa}% viza
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="font-display text-2xl font-bold">{d.n}</div>
            <div className="text-xs text-white/85 mt-0.5 line-clamp-1">{d.cities}</div>
          </div>
        </div>
        <div className="p-5 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="font-display text-lg font-bold text-[#0D1B2A]">{d.unis}+</div>
            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">Universitet</div>
          </div>
          <div className="border-x border-[var(--border)]">
            <div className="font-display text-lg font-bold text-[#0D1B2A]">{d.tuition}</div>
            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">Yillik</div>
          </div>
          <div>
            <div className="font-display text-base font-bold text-[#A68B52] truncate">{d.scholar.split(",")[0]}</div>
            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">Stipendiya</div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-[var(--soft)] relative overflow-hidden">
      <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-[#7DA7F5]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Davlatlar" title="O'qish davlatini tanlang" sub="Dunyo bo'ylab eng nufuzli ta'lim yo'nalishlari — har bir davlat uchun to'liq ma'lumot." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationData.map((d, i) => <CountryCard key={d.n} d={d} i={i} />)}
        </div>
      </div>
    </section>
  );
}

const universities = [
  { img: uOxford, n: "University of Oxford", c: "UK", flag: "🇬🇧", logo: "OX", r: 3, t: "$45,000/yil", country: "UK", scholar: true },
  { img: uHarvard, n: "Harvard University", c: "USA", flag: "🇺🇸", logo: "HU", r: 4, t: "$55,000/yil", country: "USA", scholar: true },
  { img: uCam, n: "University of Cambridge", c: "UK", flag: "🇬🇧", logo: "CA", r: 5, t: "$42,000/yil", country: "UK", scholar: true },
  { img: uMelb, n: "University of Melbourne", c: "Australia", flag: "🇦🇺", logo: "ME", r: 13, t: "$38,000/yil", country: "Australia", scholar: true },
  { img: uTor, n: "University of Toronto", c: "Canada", flag: "🇨🇦", logo: "TO", r: 21, t: "$36,000/yil", country: "Canada", scholar: false },
  { img: uSyd, n: "University of Sydney", c: "Australia", flag: "🇦🇺", logo: "SY", r: 18, t: "$40,000/yil", country: "Australia", scholar: true },
];

function Universities() {
  const tabs = ["Barchasi", "UK", "Australia", "Canada", "USA"];
  const [active, setActive] = useState("Barchasi");
  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const filtered = active === "Barchasi" ? universities : universities.filter(u => u.country === active);
  const toggle = (arr: string[], set: (v: string[]) => void, name: string, max?: number) => {
    if (arr.includes(name)) { set(arr.filter(x => x !== name)); return; }
    if (max && arr.length >= max) { toast.error(`Solishtirish uchun maks ${max} ta universitet`); return; }
    set([...arr, name]);
  };
  return (
    <section id="universities" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Universitetlar" title="Dunyodagi eng nufuzli universitetlar" sub="Hamkor universitetlarimiz orasidan o'zingizga mosini tanlang, saqlang yoki solishtiring." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.04] ${
                active === t
                  ? "bg-[#0D1B2A] text-white shadow-soft"
                  : "bg-[var(--soft)] text-[var(--muted-foreground)] hover:bg-gold/10 hover:text-[#0D1B2A]"
              }`}
            >{t}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u, i) => {
            const isSaved = saved.includes(u.n);
            const isComp = compare.includes(u.n);
            return (
              <Reveal key={u.n} delay={i * 50}>
                <div className="group rounded-[22px] overflow-hidden bg-white border border-[var(--border)] shadow-soft hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(15,27,42,0.25)] transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={u.img} alt={u.n} loading="lazy" width={1024} height={640} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1000ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-bold text-[#0D1B2A] flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-[#C8A971]" /> QS #{u.r}
                      </span>
                      {u.scholar && (
                        <span className="px-2.5 py-1 rounded-full bg-[#10B981]/95 text-white text-xs font-bold">Stipendiya</span>
                      )}
                    </div>
                    <button
                      aria-label="Saqlash"
                      onClick={() => toggle(saved, setSaved, u.n)}
                      className={`absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full backdrop-blur transition-all hover:scale-110 ${
                        isSaved ? "bg-[#EF4444] text-white" : "bg-white/90 text-[#0D1B2A] hover:bg-white"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#0D1B2A] to-[#1F3A5F] grid place-items-center text-white font-display font-bold text-sm shrink-0">{u.logo}</div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold tracking-wider uppercase text-[#A68B52] flex items-center gap-1.5">
                          <span>{u.flag}</span> {u.c}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-[#0D1B2A] truncate">{u.n}</h3>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div>
                        <div className="text-[var(--muted-foreground)] text-xs">Yillik to'lov</div>
                        <div className="font-semibold text-[#0D1B2A]">{u.t}</div>
                      </div>
                      <button
                        onClick={() => toggle(compare, setCompare, u.n, 3)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isComp ? "bg-[#0D1B2A] text-white" : "bg-[var(--soft)] text-[#0D1B2A] hover:bg-gold/15"
                        }`}
                      >
                        <GitCompare className="h-3 w-3" /> {isComp ? "Solishtirilmoqda" : "Solishtirish"}
                      </button>
                    </div>
                    <a href="#contact" className="mt-5 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-gold">
                      Ariza topshirish <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        {compare.length > 0 && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-2xl bg-[#0D1B2A] text-white shadow-2xl flex items-center gap-3 animate-fade-up">
            <GitCompare className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-sm font-semibold">{compare.length} ta universitet solishtirilmoqda</span>
            <button onClick={() => setCompare([])} className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20">Tozalash</button>
          </div>
        )}
      </div>
    </section>
  );
}

function WhyUs() {
  const benefits = [
    { t: "Sertifikatlangan mutaxassislar", d: "Xalqaro ta'lim sohasida sertifikat olgan jamoa." },
    { t: "Shaffof narxlar", d: "Yashirin to'lovlar yo'q — hammasi avvaldan kelishiladi." },
    { t: "Individual yondashuv", d: "Har bir talaba uchun shaxsiy reja tuziladi." },
    { t: "24/7 qo'llab-quvvatlash", d: "Xorijga ketganingizdan keyin ham yoningizdamiz." },
  ];
  return (
    <section className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-[#A68B52] text-xs font-semibold tracking-wider uppercase">Nima uchun biz</div>
            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl text-[#0D1B2A]">Sizning ishonchli yo'ldoshingiz</h2>
            <p className="mt-5 text-[var(--muted-foreground)] text-lg leading-relaxed">8 yildan ortiq tajribaga ega jamoamiz minglab talabalarning orzularini ro'yobga chiqarishga yordam berdi.</p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-6 rounded-[20px] bg-white shadow-soft">
                <div className="font-display text-4xl font-bold text-[#0D1B2A]"><CountUp end={95} suffix="%" /></div>
                <div className="mt-2 text-sm text-[var(--muted-foreground)]">Qabul ko'rsatkichi</div>
              </div>
              <div className="p-6 rounded-[20px] bg-[#0D1B2A] text-white">
                <div className="font-display text-4xl font-bold text-gold"><CountUp end={2} suffix="M+" /></div>
                <div className="mt-2 text-sm text-white/70">Stipendiya yutilgan</div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="p-6 rounded-[20px] bg-white border border-[var(--border)] shadow-soft h-full hover:border-gold transition-colors">
                <div className="h-10 w-10 rounded-xl bg-gold/15 text-[#A68B52] grid place-items-center">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#0D1B2A]">{b.t}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Konsultatsiya", d: "Bepul birinchi uchrashuv va imkoniyatlarni baholash." },
    { n: "02", t: "Universitet Tanlash", d: "Sizga eng mos universitet va dasturlar ro'yxati." },
    { n: "03", t: "Hujjatlar Tayyorlash", d: "Barcha ariza hujjatlarini professional tayyorlash." },
    { n: "04", t: "Ariza Topshirish", d: "Universitetlarga arizalarni topshirish va kuzatib borish." },
    { n: "05", t: "Qabul va Viza", d: "Qabul xati olish va viza jarayonida to'liq yordam." },
  ];
  return (
    <section className="py-24 bg-[#0D1B2A] relative overflow-hidden">
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold tracking-wider uppercase">Jarayon</div>
            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl text-white">5 bosqichda xorijiy universitetga</h2>
            <p className="mt-4 text-white/70 text-lg">Aniq va shaffof jarayon — siz tushunadigan tilda.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="p-6 rounded-[20px] bg-white/[0.04] border border-white/10 backdrop-blur h-full hover:border-gold/50 transition-colors">
                <div className="font-display text-4xl font-bold text-gold/80">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { img: ts1, n: "Nigora Karimova", u: "University of Manchester", flag: "🇬🇧", q: "Eduvisa jamoasi tufayli ikkilangan paytda aniq yo'nalish topdim. Hujjatlar tayyorlashda har bir tafsilotga e'tibor berildi va men orzudagi universitetga qabul qilindim." },
    { img: ts2, n: "Jasur Rahmonov", u: "University of Toronto", flag: "🇨🇦", q: "Stipendiya qidirish va viza jarayonida professional yordam oldim. Hozir Kanadada o'qiyapman va Eduvisaga umrim davomida minnatdorman." },
    { img: ts3, n: "Madina Yusupova", u: "University of Melbourne", flag: "🇦🇺", q: "Birinchi konsultatsiyadan boshlab har bir bosqichda yonimda bo'lishdi. Mutaxassislar juda professional — tavsiya qilaman!" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Talabalar fikri" title="Bizning bitiruvchilarimiz" sub="Real talabalar — real natijalar." />
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[var(--soft)] to-[#EEF2FF] border border-[var(--border)] shadow-soft">
          <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {items.map((it, i) => (
              <div key={i} className="min-w-full p-10 md:p-14 grid md:grid-cols-[auto_1fr] gap-8 items-center">
                <div className="relative shrink-0">
                  <img src={it.img} alt={it.n} width={160} height={160} loading="lazy" className="h-32 w-32 md:h-40 md:w-40 rounded-2xl object-cover shadow-soft" />
                  <span className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-white grid place-items-center shadow text-2xl">{it.flag}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#C8A971]">
                    {[0,1,2,3,4].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-lg md:text-xl text-[#1F2937] leading-relaxed font-display italic">"{it.q}"</p>
                  <div className="mt-6">
                    <div className="font-semibold text-[#0D1B2A] text-lg">{it.n}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{it.u}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button aria-label="Oldingi" onClick={() => setIdx((idx - 1 + items.length) % items.length)} className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-soft grid place-items-center text-[#0D1B2A] hover:bg-gold hover:text-[#0D1B2A] transition-all hover:scale-110"><ChevronLeft className="h-5 w-5" /></button>
          <button aria-label="Keyingi" onClick={() => setIdx((idx + 1) % items.length)} className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-soft grid place-items-center text-[#0D1B2A] hover:bg-gold hover:text-[#0D1B2A] transition-all hover:scale-110"><ChevronRight className="h-5 w-5" /></button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button key={i} aria-label={`Slide ${i+1}`} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-[#0D1B2A]" : "w-2 bg-[#0D1B2A]/25"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  // Calculator
  const [calcCountry, setCalcCountry] = useState("UK");
  const [tuition, setTuition] = useState(30000);
  const [living, setLiving] = useState(12000);
  const total = tuition + living;

  // Scholarship checker
  const [gpa, setGpa] = useState(3.5);
  const [ielts, setIelts] = useState(6.5);
  const [budget, setBudget] = useState(20000);
  const recs = useMemo(() => {
    const r: { n: string; c: string; m: string }[] = [];
    if (gpa >= 3.7 && ielts >= 7) r.push({ n: "Chevening (UK)", c: "🇬🇧", m: "To'liq stipendiya" });
    if (gpa >= 3.5 && ielts >= 6.5) r.push({ n: "Australia Awards", c: "🇦🇺", m: "To'liq stipendiya" });
    if (gpa >= 3.3 && ielts >= 6.0) r.push({ n: "Government of Ireland", c: "🇮🇪", m: "Qisman stipendiya" });
    if (budget <= 25000 && ielts >= 6) r.push({ n: "DAAD (Germany)", c: "🇩🇪", m: "Tekin ta'lim" });
    if (gpa >= 3.8) r.push({ n: "Fulbright (USA)", c: "🇺🇸", m: "To'liq stipendiya" });
    return r.slice(0, 4);
  }, [gpa, ielts, budget]);

  return (
    <section className="py-24 bg-[var(--soft)] relative overflow-hidden">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#A78BFA]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Foydali vositalar" title="O'z imkoniyatlaringizni baholang" sub="Bir necha soniyada xarajatlar va stipendiya imkoniyatlarini hisoblang." />
        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="p-8 rounded-[24px] bg-white shadow-soft border border-[var(--border)] h-full">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-hover)] grid place-items-center text-[#0D1B2A]">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#0D1B2A]">Xarajat kalkulyatori</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">Yillik o'qish xarajatlarini hisoblang</p>
                </div>
              </div>
              <div className="mt-7 space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#0D1B2A]">Davlat</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["UK", "USA", "Canada", "Australia"].map((c) => (
                      <button key={c} onClick={() => setCalcCountry(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${calcCountry === c ? "bg-[#0D1B2A] text-white" : "bg-[var(--soft)] text-[#0D1B2A] hover:bg-gold/15"}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm"><label className="font-medium text-[#0D1B2A]">O'qish to'lovi</label><span className="font-semibold text-[#A68B52]">${tuition.toLocaleString()}</span></div>
                  <input type="range" min={10000} max={70000} step={1000} value={tuition} onChange={(e) => setTuition(+e.target.value)} className="mt-2 w-full accent-[#C8A971]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm"><label className="font-medium text-[#0D1B2A]">Yashash xarajati</label><span className="font-semibold text-[#A68B52]">${living.toLocaleString()}</span></div>
                  <input type="range" min={5000} max={30000} step={500} value={living} onChange={(e) => setLiving(+e.target.value)} className="mt-2 w-full accent-[#C8A971]" />
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#1F3A5F] text-white">
                  <div className="text-xs tracking-wider uppercase text-white/60">Taxminiy yillik xarajat — {calcCountry}</div>
                  <div className="mt-1 font-display text-4xl font-bold text-[var(--gold)]">${total.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="p-8 rounded-[24px] bg-white shadow-soft border border-[var(--border)] h-full">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] grid place-items-center text-white">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#0D1B2A]">Stipendiya tekshiruvi</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">Sizga mos dasturlarni topamiz</p>
                </div>
              </div>
              <div className="mt-7 grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#0D1B2A]/70 uppercase tracking-wider">GPA</label>
                  <input type="number" min={2} max={4} step={0.1} value={gpa} onChange={(e) => setGpa(+e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#0D1B2A]/70 uppercase tracking-wider">IELTS</label>
                  <input type="number" min={4} max={9} step={0.5} value={ielts} onChange={(e) => setIelts(+e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#0D1B2A]/70 uppercase tracking-wider">Byudjet $</label>
                  <input type="number" min={5000} max={80000} step={1000} value={budget} onChange={(e) => setBudget(+e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none" />
                </div>
              </div>
              <div className="mt-6 space-y-2.5">
                {recs.length === 0 && (
                  <div className="p-4 rounded-xl bg-[var(--soft)] text-sm text-[var(--muted-foreground)]">Parametrlarni o'zgartiring — sizga mos imkoniyatlar paydo bo'ladi.</div>
                )}
                {recs.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#10B981]/10 to-transparent border border-[#10B981]/20 hover:border-[#10B981]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.c}</span>
                      <div>
                        <div className="font-semibold text-[#0D1B2A]">{r.n}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{r.m}</div>
                      </div>
                    </div>
                    <Check className="h-5 w-5 text-[#10B981]" strokeWidth={2.5} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-6">
          <Quiz />
        </div>
      </div>
    </section>
  );
}

function Quiz() {
  const questions = [
    { k: "country", q: "Qaysi davlatda o'qishni xohlaysiz?", opts: ["UK", "USA", "Canada", "Australia"] },
    { k: "budget", q: "Yillik byudjetingiz qancha?", opts: ["$15-25K", "$25-40K", "$40-60K", "$60K+"] },
    { k: "degree", q: "Daraja darajasi?", opts: ["Bakalavr", "Magistr", "PhD", "Til kursi"] },
    { k: "ielts", q: "IELTS balingiz?", opts: ["5.5-6.0", "6.0-6.5", "6.5-7.5", "7.5+"] },
  ];
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const done = step >= questions.length;
  const recommend = () => {
    const map: Record<string, { u: string; m: string }> = {
      UK: { u: "University of Manchester", m: "Top-30 dunyo reytingida" },
      USA: { u: "Boston University", m: "Stipendiya imkoniyati bilan" },
      Canada: { u: "University of Toronto", m: "Eng arzon Top-25" },
      Australia: { u: "Monash University", m: "Yuqori viza muvaffaqiyati" },
    };
    return map[ans.country] || map.UK;
  };
  return (
    <Reveal>
      <div className="p-8 lg:p-10 rounded-[24px] bg-gradient-to-br from-[#0D1B2A] to-[#1F3A5F] text-white shadow-[0_30px_60px_-20px_rgba(15,27,42,0.4)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-[var(--gold)] grid place-items-center text-[#0D1B2A]"><Sparkles className="h-6 w-6" /></div>
          <div>
            <h3 className="font-display text-xl font-semibold">2 daqiqalik tavsiya testi</h3>
            <p className="text-sm text-white/65">Sizga mos universitetni aniqlang</p>
          </div>
        </div>
        {/* Progress */}
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] transition-all duration-500" style={{ width: `${(Math.min(step, questions.length) / questions.length) * 100}%` }} />
        </div>
        <div className="mt-2 text-xs text-white/55">{Math.min(step + (done ? 0 : 1), questions.length)} / {questions.length}</div>

        {!done ? (
          <div className="mt-7">
            <div className="font-display text-2xl font-semibold mb-5">{questions[step].q}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {questions[step].opts.map((o) => (
                <button
                  key={o}
                  onClick={() => { setAns({ ...ans, [questions[step].k]: o }); setStep(step + 1); }}
                  className="px-5 py-4 rounded-xl bg-white/8 border border-white/10 text-left font-medium hover:border-[var(--gold)] hover:bg-white/12 hover:translate-x-1 transition-all"
                >{o}</button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-5 text-sm text-white/60 hover:text-[var(--gold)] inline-flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" /> Orqaga
              </button>
            )}
          </div>
        ) : (
          <div className="mt-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold mb-4">
              <Check className="h-3.5 w-3.5" /> Natija tayyor
            </div>
            <div className="font-display text-3xl font-bold">{recommend().u}</div>
            <p className="mt-2 text-white/70">{recommend().m}. Sizning javoblaringizga asoslanib eng yaxshi mos kelishi.</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#contact" className="px-6 py-3 rounded-[12px] bg-[var(--gold)] text-[#0D1B2A] font-semibold hover:scale-[1.04] transition-all shadow-gold inline-flex items-center gap-2">Bepul konsultatsiya <ArrowRight className="h-4 w-4" /></a>
              <button onClick={() => { setStep(0); setAns({}); }} className="px-6 py-3 rounded-[12px] bg-white/10 border border-white/15 hover:bg-white/15 transition-all">Qayta urinish</button>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      {/* Bottom-right stack */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
        <a
          href="https://wa.me/998901234567"
          target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="group h-14 w-14 grid place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-ping" />
        </a>
        <a
          href="https://t.me/eduvisauz"
          target="_blank" rel="noopener noreferrer"
          aria-label="Telegram"
          className="h-14 w-14 grid place-items-center rounded-full bg-[#0088CC] text-white shadow-[0_15px_40px_-10px_rgba(0,136,204,0.5)] hover:scale-110 transition-transform"
        >
          <Send className="h-6 w-6" />
        </a>
        {show && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Yuqoriga"
            className="h-12 w-12 grid place-items-center rounded-full bg-[#0D1B2A] text-white shadow-soft hover:scale-110 transition-transform animate-fade-up"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
      {/* Sticky book CTA bottom-left on desktop */}
      <a
        href="#contact"
        className={`fixed bottom-5 left-5 z-40 hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] font-semibold shadow-gold hover:scale-[1.05] transition-all ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <CalendarDays className="h-4 w-4" /> Konsultatsiya band qilish
      </a>
    </>
  );
}

function Team() {
  const members = [
    { img: t1, n: "Dilnoza Saidova", r: "Bosh konsultant", b: "8 yillik tajriba. UK & Europe ta'lim mutaxassisi." },
    { img: t2, n: "Sherzod Aliyev", r: "Viza mutaxassisi", b: "Talabalar vizasi bo'yicha 500+ muvaffaqiyatli holatlar." },
    { img: t3, n: "Kamola Yo'ldosheva", r: "USA & Canada bo'limi", b: "Ivy League va Top-50 universitetlar bo'yicha mutaxassis." },
    { img: t4, n: "Botir Toshmatov", r: "Stipendiya yo'naltiruvchisi", b: "2M+ dollar stipendiya yutilishida yordam bergan." },
  ];
  return (
    <section id="team" className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Jamoamiz" title="Sizning ta'lim yo'lboshchilaringiz" sub="Tajribali va sertifikatlangan mutaxassislar jamoasi." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="group rounded-[20px] overflow-hidden bg-white shadow-soft hover:-translate-y-1 transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={m.img} alt={m.n} loading="lazy" width={768} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-[#0D1B2A]">{m.n}</h3>
                  <div className="text-xs text-gold font-semibold tracking-wider uppercase mt-1">{m.r}</div>
                  <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">{m.b}</p>
                  <div className="mt-4 flex gap-2">
                    <a href="#" aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-[var(--soft)] grid place-items-center text-[var(--muted-foreground)] hover:bg-gold hover:text-[#0D1B2A] transition-colors"><Linkedin className="h-4 w-4" /></a>
                    <a href="#" aria-label="Telegram" className="h-9 w-9 rounded-full bg-[var(--soft)] grid place-items-center text-[var(--muted-foreground)] hover:bg-gold hover:text-[#0D1B2A] transition-colors"><Send className="h-4 w-4" /></a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const names = ["Oxford", "Cambridge", "Harvard", "Melbourne", "Toronto", "Sydney", "MIT", "Stanford", "UCL", "Imperial", "ANU", "McGill"];
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Hamkorlar" title="Bizga ishonadigan universitetlar" />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {names.map((n, i) => (
            <Reveal key={n} delay={i * 30}>
              <div className="h-20 rounded-2xl border border-[var(--border)] grid place-items-center font-display text-lg font-semibold text-[#0D1B2A]/70 hover:border-gold hover:text-[#0D1B2A] transition-colors">
                {n}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Konsultatsiya bepulmi?", a: "Ha, birinchi konsultatsiya butunlay bepul. Siz hech qanday majburiyat olmasdan barcha savollaringizga javob olasiz." },
    { q: "Qancha vaqtda jarayon yakunlanadi?", a: "Odatda 3-6 oy davom etadi — universitetga ariza topshirishdan tortib viza olishgacha." },
    { q: "Ingliz tili sertifikati kerakmi?", a: "Ko'p universitetlarda IELTS yoki TOEFL talab qilinadi. Biz tayyorgarlikda ham yordam beramiz." },
    { q: "Stipendiya olish imkoniyati bormi?", a: "Albatta. Bizning talabalarimiz har yili 2M+ dollar stipendiya yutib oladi." },
    { q: "Qaysi davlatlar bo'yicha ishlaysiz?", a: "UK, USA, Canada, Australia, New Zealand, Ireland va boshqa 30+ davlat." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Savollar" title="Tez-tez so'raladigan savollar" />
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`w-full text-left p-6 rounded-[20px] bg-white border transition-all ${
                    isOpen ? "border-gold shadow-soft" : "border-[var(--border)] hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-lg font-semibold text-[#0D1B2A]">{it.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#A68B52] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="text-[var(--muted-foreground)] leading-relaxed">{it.a}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const countries = [
    { f: "🇬🇧", n: "United Kingdom" },
    { f: "🇺🇸", n: "USA" },
    { f: "🇨🇦", n: "Canada" },
    { f: "🇦🇺", n: "Australia" },
    { f: "🇳🇿", n: "New Zealand" },
    { f: "🇮🇪", n: "Ireland" },
  ];
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", country: "", date: "", message: "" });
  const next = () => {
    if (step === 0) {
      if (form.name.trim().length < 2) return toast.error("Iltimos, to'liq ismingizni kiriting");
      if (form.phone.trim().length < 7) return toast.error("Telefon raqamingizni to'g'ri kiriting");
    }
    if (step === 1 && !form.country) return toast.error("Davlatni tanlang");
    setStep(step + 1);
  };
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.date) return toast.error("Konsultatsiya sanasini tanlang");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("Murojaatingiz qabul qilindi! 24 soat ichida bog'lanamiz.");
    }, 900);
  }
  const reset = () => { setDone(false); setStep(0); setForm({ name: "", phone: "", country: "", date: "", message: "" }); };
  const today = new Date().toISOString().slice(0, 10);
  return (
    <section id="contact" className="py-24 bg-[#0D1B2A] relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14">
        <Reveal>
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold tracking-wider uppercase">Aloqa</div>
            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl">Keling, suhbatlashamiz</h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">Bepul konsultatsiya uchun arizangizni qoldiring — 24 soat ichida siz bilan bog'lanamiz.</p>
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><MapPin className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">Manzil</div><div className="text-white/60 text-sm mt-1">Toshkent, Amir Temur ko'chasi 108, 7-qavat</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Phone className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">Telefon</div><div className="text-white/60 text-sm mt-1">+998 90 123 45 67 · +998 71 200 00 00</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Mail className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">Email</div><div className="text-white/60 text-sm mt-1">info@eduvisa.uz</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Clock className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">Ish vaqti</div><div className="text-white/60 text-sm mt-1">Du-Sha: 9:00 — 19:00 · Yak: dam</div></div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              {[Instagram, Facebook, Send].map((I, i) => (
                <a key={i} href="#" aria-label="social" className="h-11 w-11 rounded-xl bg-white/8 grid place-items-center text-white/80 hover:bg-gold hover:text-[#0D1B2A] transition-colors"><I className="h-5 w-5" /></a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={submit} className="p-8 lg:p-10 rounded-[24px] bg-white/[0.04] backdrop-blur-xl border border-white/10">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Ismingiz</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={80} className="w-full h-12 px-4 rounded-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors" placeholder="To'liq ismingiz" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Telefon</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} maxLength={30} className="w-full h-12 px-4 rounded-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors" placeholder="+998 __ ___ __ __" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Qiziqtirgan davlat</label>
                <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full h-12 px-4 rounded-[14px] bg-white/5 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors">
                  <option value="" className="bg-[#0D1B2A]">Tanlang...</option>
                  {["UK", "USA", "Canada", "Australia", "New Zealand", "Ireland"].map(c => <option key={c} value={c} className="bg-[#0D1B2A]">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Xabar</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={4} className="w-full px-4 py-3 rounded-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors resize-none" placeholder="Sizga qanday yordam bera olamiz?" />
              </div>
              <button type="submit" className="w-full h-13 py-4 rounded-[14px] bg-gold text-[#0D1B2A] font-semibold hover:bg-[var(--gold-hover)] hover:scale-[1.02] transition-all shadow-gold">
                Bepul konsultatsiya olish
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A1421] text-white/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gold grid place-items-center"><GraduationCap className="h-5 w-5 text-[#0D1B2A]" strokeWidth={2.5} /></div>
            <div>
              <div className="font-display text-lg font-bold text-white">Eduvisa</div>
              <div className="text-[10px] tracking-[0.2em] text-gold font-semibold">CHET ELDA TA'LIM</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed">Kelajagingiz xorijdan boshlanadi. O'zbekistondagi premium ta'lim konsalting markazi.</p>
        </div>
        <div>
          <div className="font-display text-white font-semibold mb-5">Tezkor havolalar</div>
          <ul className="space-y-3 text-sm">
            {navLinks.map(l => <li key={l.href}><a href={l.href} className="hover:text-gold transition-colors">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display text-white font-semibold mb-5">Aloqa</div>
          <ul className="space-y-3 text-sm">
            <li>Toshkent, Amir Temur ko'chasi 108</li>
            <li>+998 90 123 45 67</li>
            <li>info@eduvisa.uz</li>
            <li>Du-Sha: 9:00 — 19:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Eduvisa · CHET ELDA TA'LIM. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Destinations />
        <Universities />
        <WhyUs />
        <Process />
        <Testimonials />
        <Team />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
