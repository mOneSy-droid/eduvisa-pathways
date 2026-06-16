import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Phone, Menu, X, ArrowRight, GraduationCap, FileText, Plane, Award, Home, Compass,
  Star, Linkedin, Send, MapPin, Mail, Clock, Instagram, Facebook, ChevronDown, Check,
  Heart, MessageCircle, Calculator, Trophy, ArrowUp, Sparkles, CalendarDays,
  ChevronLeft, ChevronRight, GitCompare, Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal, CountUp } from "@/components/reveal";
import { useT, LANGS, type Lang } from "@/lib/i18n";
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

const navItems = [
  { key: "nav.home", href: "#home" },
  { key: "nav.services", href: "#services" },
  { key: "nav.destinations", href: "#destinations" },
  { key: "nav.universities", href: "#universities" },
  { key: "nav.team", href: "#team" },
  { key: "nav.contact", href: "#contact" },
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

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-[#0D1B2A]/10 bg-white/70 backdrop-blur hover:bg-white transition-all ${compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"}`}
        aria-label="Language"
      >
        <Globe className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        <span className="font-semibold text-[#0D1B2A] uppercase">{current.code}</span>
        <ChevronDown className={`${compact ? "h-3 w-3" : "h-3.5 w-3.5"} transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-[0_20px_50px_-15px_rgba(15,27,42,0.25)] border border-[#0D1B2A]/8 overflow-hidden z-50 animate-fade-up">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code as Lang); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left transition-colors ${
                lang === l.code ? "bg-[var(--gold)]/10 text-[#0D1B2A] font-semibold" : "text-[#0D1B2A]/80 hover:bg-[var(--soft)]"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              {lang === l.code && <Check className="h-4 w-4 text-[#A68B52]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const { t } = useT();
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
          {navItems.map((l) => {
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
                {t(l.key)}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <a href="tel:+998901234567" className="flex items-center gap-2 text-sm text-[#0D1B2A]/75 hover:text-[#0D1B2A] transition-colors">
            <Phone className="h-4 w-4" /> +998 90 123 45 67
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-[14px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] text-sm font-semibold hover:scale-[1.04] active:scale-[0.98] transition-all duration-200 shadow-gold"
          >
            {t("nav.cta")}
          </a>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="h-11 w-11 grid place-items-center rounded-xl bg-[#0D1B2A]/8 text-[#0D1B2A]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-white transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-10 flex flex-col gap-5">
          {navItems.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-display text-[#0D1B2A] hover:text-[#A68B52]">
              {t(l.key)}
            </a>
          ))}
          <a href="tel:+998901234567" className="mt-4 flex items-center gap-2 text-[#0D1B2A]/70"><Phone className="h-4 w-4" /> +998 90 123 45 67</a>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 px-5 py-3.5 rounded-[14px] bg-gold text-[#0D1B2A] text-center font-semibold">
            {t("nav.ctaLong")}
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
  const { t } = useT();
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
      <div className="absolute top-[-10%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#C8A971]/25 blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-8%] h-[32rem] w-[32rem] rounded-full bg-[#7DA7F5]/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-[-15%] left-[20%] h-[26rem] w-[26rem] rounded-full bg-[#A78BFA]/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0D1B2A 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <Particles />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up" style={px(0.06)}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#C8A971]/40 backdrop-blur-md shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-[#A68B52]" />
            <span className="text-xs font-semibold tracking-wider text-[#0D1B2A]">{t("hero.eyebrow")}</span>
          </div>
          <h1 className="mt-7 font-display font-bold text-[clamp(2.4rem,5.6vw,4.7rem)] leading-[1.04] tracking-tight text-[#0D1B2A]">
            {t("hero.title1")}<br />
            <span className="bg-gradient-to-r from-[#C8A971] via-[#A68B52] to-[#C8A971] bg-clip-text text-transparent">{t("hero.titleHighlight")}</span> {t("hero.title2")}
          </h1>
          <p className="mt-6 text-lg text-[#0D1B2A]/70 max-w-xl leading-relaxed">{t("hero.subtitle")}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { i: "👨‍🎓", k: "hero.badge1" },
              { i: "🎓", k: "hero.badge2" },
              { i: "✅", k: "hero.badge3" },
            ].map((b) => (
              <div key={b.k} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur border border-[#0D1B2A]/8 text-xs font-semibold text-[#0D1B2A] shadow-soft">
                <span>{b.i}</span>{t(b.k)}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-[14px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.98] shadow-gold">
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#universities" className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px] bg-white/80 backdrop-blur border border-[#0D1B2A]/12 text-[#0D1B2A] font-semibold hover:bg-white transition-all duration-200 hover:scale-[1.02]">
              {t("hero.cta2")}
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
              <div className="text-xs mt-0.5 text-[#0D1B2A]/60">{t("hero.trust")}</div>
            </div>
          </div>
        </div>

        <div className="relative" style={px(-0.05)}>
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(15,27,42,0.35)]">
            <img src={heroStudents} alt="Students" width={1024} height={1280} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/30 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 sm:-left-10 top-8 px-5 py-4 rounded-2xl glass-card animate-float">
            <div className="font-display text-3xl font-bold text-[#0D1B2A]"><CountUp end={500} suffix="+" /></div>
            <div className="text-xs text-[#0D1B2A]/65 mt-0.5">{t("hero.floatStudents")}</div>
          </div>

          <div className="absolute -right-3 sm:-right-6 top-1/3 px-4 py-3 rounded-2xl glass-card animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="text-[10px] font-semibold tracking-wider text-[#0D1B2A]/60 uppercase mb-1.5">{t("hero.floatCountries")}</div>
            <div className="flex gap-1.5 text-xl">
              {flags.map((f) => <span key={f}>{f}</span>)}
            </div>
          </div>

          <div className="absolute -left-2 sm:-left-8 bottom-6 px-5 py-4 rounded-2xl glass-card animate-float max-w-[16rem]" style={{ animationDelay: "3s" }}>
            <div className="text-[10px] font-semibold tracking-wider text-[#0D1B2A]/60 uppercase mb-2">{t("hero.floatUnis")}</div>
            <div className="flex flex-wrap gap-1.5">
              {unis.map((u) => (
                <span key={u} className="px-2 py-0.5 rounded-md bg-[#0D1B2A]/8 text-[11px] font-semibold text-[#0D1B2A]">{u}</span>
              ))}
            </div>
          </div>

          <div className="absolute -right-2 bottom-10 px-4 py-3 rounded-2xl glass-card animate-float" style={{ animationDelay: "2.2s" }}>
            <div className="font-display text-2xl font-bold text-[#0D1B2A]"><CountUp end={95} suffix="%" /></div>
            <div className="text-[11px] text-[#0D1B2A]/65">{t("hero.floatVisa")}</div>
          </div>
        </div>
      </div>

      <a href="#services" aria-label="Scroll" className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#0D1B2A]/55 hover:text-[#0D1B2A] transition-colors">
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">{t("hero.scroll")}</span>
        <span className="h-10 w-6 rounded-full border-2 border-current grid place-items-start p-1">
          <span className="h-2 w-1 rounded-full bg-current animate-bounce" />
        </span>
      </a>
    </section>
  );
}

function Stats() {
  const { t } = useT();
  const stats = [
    { v: 500, s: "+", l: t("stats.l1") },
    { v: 8, s: t("stats.l2suffix"), l: t("stats.l2") },
    { v: 50, s: "+", l: t("stats.l3") },
    { v: 6, s: "", l: t("stats.l4") },
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
  const { t } = useT();
  const items = [
    { icon: Compass, k: "s1" },
    { icon: GraduationCap, k: "s2" },
    { icon: FileText, k: "s3" },
    { icon: Plane, k: "s4" },
    { icon: Award, k: "s5" },
    { icon: Home, k: "s6" },
  ];
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("services.eyebrow")} title={t("services.title")} sub={t("services.sub")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <Reveal key={s.k} delay={i * 60}>
              <div className="group h-full p-8 rounded-[20px] bg-white border border-[var(--border)] shadow-soft hover:border-gold hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-gold/10 grid place-items-center text-[#A68B52] group-hover:bg-gold group-hover:text-[#0D1B2A] transition-colors">
                  <s.icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-[#0D1B2A]">{t(`services.${s.k}.t`)}</h3>
                <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">{t(`services.${s.k}.d`)}</p>
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
  const { t } = useT();
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
            {d.visa}% {t("dest.visa")}
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="font-display text-2xl font-bold">{d.n}</div>
            <div className="text-xs text-white/85 mt-0.5 line-clamp-1">{d.cities}</div>
          </div>
        </div>
        <div className="p-5 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="font-display text-lg font-bold text-[#0D1B2A]">{d.unis}+</div>
            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">{t("dest.uni")}</div>
          </div>
          <div className="border-x border-[var(--border)]">
            <div className="font-display text-lg font-bold text-[#0D1B2A]">{d.tuition}</div>
            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">{t("dest.yearly")}</div>
          </div>
          <div>
            <div className="font-display text-base font-bold text-[#A68B52] truncate">{d.scholar.split(",")[0]}</div>
            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">{t("dest.scholar")}</div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function Destinations() {
  const { t } = useT();
  return (
    <section id="destinations" className="py-24 bg-[var(--soft)] relative overflow-hidden">
      <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-[#7DA7F5]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("dest.eyebrow")} title={t("dest.title")} sub={t("dest.sub")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationData.map((d, i) => <CountryCard key={d.n} d={d} i={i} />)}
        </div>
      </div>
    </section>
  );
}

const universities = [
  { img: uOxford, n: "University of Oxford", c: "UK", flag: "🇬🇧", logo: "OX", r: 3, t: "$45,000", country: "UK", scholar: true },
  { img: uHarvard, n: "Harvard University", c: "USA", flag: "🇺🇸", logo: "HU", r: 4, t: "$55,000", country: "USA", scholar: true },
  { img: uCam, n: "University of Cambridge", c: "UK", flag: "🇬🇧", logo: "CA", r: 5, t: "$42,000", country: "UK", scholar: true },
  { img: uMelb, n: "University of Melbourne", c: "Australia", flag: "🇦🇺", logo: "ME", r: 13, t: "$38,000", country: "Australia", scholar: true },
  { img: uTor, n: "University of Toronto", c: "Canada", flag: "🇨🇦", logo: "TO", r: 21, t: "$36,000", country: "Canada", scholar: false },
  { img: uSyd, n: "University of Sydney", c: "Australia", flag: "🇦🇺", logo: "SY", r: 18, t: "$40,000", country: "Australia", scholar: true },
];

function Universities() {
  const { t } = useT();
  const tabs = [{ k: "uni.tabAll", v: "All" }, { k: null, v: "UK" }, { k: null, v: "Australia" }, { k: null, v: "Canada" }, { k: null, v: "USA" }];
  const [active, setActive] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const filtered = active === "All" ? universities : universities.filter(u => u.country === active);
  const toggle = (arr: string[], set: (v: string[]) => void, name: string, max?: number) => {
    if (arr.includes(name)) { set(arr.filter(x => x !== name)); return; }
    if (max && arr.length >= max) { toast.error(t("uni.maxCompare")); return; }
    set([...arr, name]);
  };
  return (
    <section id="universities" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("uni.eyebrow")} title={t("uni.title")} sub={t("uni.sub")} />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.v}
              onClick={() => setActive(tab.v)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.04] ${
                active === tab.v
                  ? "bg-[#0D1B2A] text-white shadow-soft"
                  : "bg-[var(--soft)] text-[var(--muted-foreground)] hover:bg-gold/10 hover:text-[#0D1B2A]"
              }`}
            >{tab.k ? t(tab.k) : tab.v}</button>
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
                        <span className="px-2.5 py-1 rounded-full bg-[#10B981]/95 text-white text-xs font-bold">{t("uni.scholarship")}</span>
                      )}
                    </div>
                    <button
                      aria-label={t("uni.save")}
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
                        <div className="text-[var(--muted-foreground)] text-xs">{t("uni.yearlyFee")}</div>
                        <div className="font-semibold text-[#0D1B2A]">{u.t}</div>
                      </div>
                      <button
                        onClick={() => toggle(compare, setCompare, u.n, 3)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isComp ? "bg-[#0D1B2A] text-white" : "bg-[var(--soft)] text-[#0D1B2A] hover:bg-gold/15"
                        }`}
                      >
                        <GitCompare className="h-3 w-3" /> {isComp ? t("uni.comparing") : t("uni.compare")}
                      </button>
                    </div>
                    <a href="#contact" className="mt-5 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-gold">
                      {t("uni.apply")} <ArrowRight className="h-4 w-4" />
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
            <span className="text-sm font-semibold">{compare.length} {t("uni.barText")}</span>
            <button onClick={() => setCompare([])} className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20">{t("uni.clear")}</button>
          </div>
        )}
      </div>
    </section>
  );
}

function WhyUs() {
  const { t } = useT();
  const benefits = [
    { k: "b1" }, { k: "b2" }, { k: "b3" }, { k: "b4" },
  ];
  return (
    <section className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-[#A68B52] text-xs font-semibold tracking-wider uppercase">{t("why.eyebrow")}</div>
            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl text-[#0D1B2A]">{t("why.title")}</h2>
            <p className="mt-5 text-[var(--muted-foreground)] text-lg leading-relaxed">{t("why.intro")}</p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-6 rounded-[20px] bg-white shadow-soft">
                <div className="font-display text-4xl font-bold text-[#0D1B2A]"><CountUp end={95} suffix="%" /></div>
                <div className="mt-2 text-sm text-[var(--muted-foreground)]">{t("why.admit")}</div>
              </div>
              <div className="p-6 rounded-[20px] bg-[#0D1B2A] text-white">
                <div className="font-display text-4xl font-bold text-gold"><CountUp end={2} suffix="M+" /></div>
                <div className="mt-2 text-sm text-white/70">{t("why.scholarWon")}</div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <Reveal key={b.k} delay={i * 80}>
              <div className="p-6 rounded-[20px] bg-white border border-[var(--border)] shadow-soft h-full hover:border-gold transition-colors">
                <div className="h-10 w-10 rounded-xl bg-gold/15 text-[#A68B52] grid place-items-center">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#0D1B2A]">{t(`why.${b.k}.t`)}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{t(`why.${b.k}.d`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useT();
  const steps = [
    { n: "01", k: "s1" }, { n: "02", k: "s2" }, { n: "03", k: "s3" }, { n: "04", k: "s4" }, { n: "05", k: "s5" },
  ];
  return (
    <section className="py-24 bg-[#0D1B2A] relative overflow-hidden">
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold tracking-wider uppercase">{t("process.eyebrow")}</div>
            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl text-white">{t("process.title")}</h2>
            <p className="mt-4 text-white/70 text-lg">{t("process.sub")}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="p-6 rounded-[20px] bg-white/[0.04] border border-white/10 backdrop-blur h-full hover:border-gold/50 transition-colors">
                <div className="font-display text-4xl font-bold text-gold/80">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{t(`process.${s.k}.t`)}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{t(`process.${s.k}.d`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useT();
  const items = [
    { img: ts1, n: "Nigora Karimova", u: "University of Manchester", flag: "🇬🇧", qk: "testim.q1" },
    { img: ts2, n: "Jasur Rahmonov", u: "University of Toronto", flag: "🇨🇦", qk: "testim.q2" },
    { img: ts3, n: "Madina Yusupova", u: "University of Melbourne", flag: "🇦🇺", qk: "testim.q3" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("testim.eyebrow")} title={t("testim.title")} sub={t("testim.sub")} />
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
                  <p className="mt-4 text-lg md:text-xl text-[#1F2937] leading-relaxed font-display italic">"{t(it.qk)}"</p>
                  <div className="mt-6">
                    <div className="font-semibold text-[#0D1B2A] text-lg">{it.n}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{it.u}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button aria-label={t("testim.prev")} onClick={() => setIdx((idx - 1 + items.length) % items.length)} className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-soft grid place-items-center text-[#0D1B2A] hover:bg-gold hover:text-[#0D1B2A] transition-all hover:scale-110"><ChevronLeft className="h-5 w-5" /></button>
          <button aria-label={t("testim.next")} onClick={() => setIdx((idx + 1) % items.length)} className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-soft grid place-items-center text-[#0D1B2A] hover:bg-gold hover:text-[#0D1B2A] transition-all hover:scale-110"><ChevronRight className="h-5 w-5" /></button>
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
  const { t } = useT();
  const [calcCountry, setCalcCountry] = useState("UK");
  const [tuition, setTuition] = useState(30000);
  const [living, setLiving] = useState(12000);
  const total = tuition + living;

  const [gpa, setGpa] = useState(3.5);
  const [ielts, setIelts] = useState(6.5);
  const [budget, setBudget] = useState(20000);
  const recs = useMemo(() => {
    const r: { n: string; c: string; m: string }[] = [];
    if (gpa >= 3.7 && ielts >= 7) r.push({ n: "Chevening (UK)", c: "🇬🇧", m: t("schol.full") });
    if (gpa >= 3.5 && ielts >= 6.5) r.push({ n: "Australia Awards", c: "🇦🇺", m: t("schol.full") });
    if (gpa >= 3.3 && ielts >= 6.0) r.push({ n: "Government of Ireland", c: "🇮🇪", m: t("schol.partial") });
    if (budget <= 25000 && ielts >= 6) r.push({ n: "DAAD (Germany)", c: "🇩🇪", m: t("schol.free") });
    if (gpa >= 3.8) r.push({ n: "Fulbright (USA)", c: "🇺🇸", m: t("schol.full") });
    return r.slice(0, 4);
  }, [gpa, ielts, budget, t]);

  return (
    <section className="py-24 bg-[var(--soft)] relative overflow-hidden">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#A78BFA]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("tools.eyebrow")} title={t("tools.title")} sub={t("tools.sub")} />
        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="p-8 rounded-[24px] bg-white shadow-soft border border-[var(--border)] h-full">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-hover)] grid place-items-center text-[#0D1B2A]">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#0D1B2A]">{t("calc.title")}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{t("calc.sub")}</p>
                </div>
              </div>
              <div className="mt-7 space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#0D1B2A]">{t("calc.country")}</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["UK", "USA", "Canada", "Australia"].map((c) => (
                      <button key={c} onClick={() => setCalcCountry(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${calcCountry === c ? "bg-[#0D1B2A] text-white" : "bg-[var(--soft)] text-[#0D1B2A] hover:bg-gold/15"}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm"><label className="font-medium text-[#0D1B2A]">{t("calc.tuition")}</label><span className="font-semibold text-[#A68B52]">${tuition.toLocaleString()}</span></div>
                  <input type="range" min={10000} max={70000} step={1000} value={tuition} onChange={(e) => setTuition(+e.target.value)} className="mt-2 w-full accent-[#C8A971]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm"><label className="font-medium text-[#0D1B2A]">{t("calc.living")}</label><span className="font-semibold text-[#A68B52]">${living.toLocaleString()}</span></div>
                  <input type="range" min={5000} max={30000} step={500} value={living} onChange={(e) => setLiving(+e.target.value)} className="mt-2 w-full accent-[#C8A971]" />
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#1F3A5F] text-white">
                  <div className="text-xs tracking-wider uppercase text-white/60">{t("calc.total")} — {calcCountry}</div>
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
                  <h3 className="font-display text-xl font-semibold text-[#0D1B2A]">{t("schol.title")}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{t("schol.sub")}</p>
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
                  <label className="text-xs font-semibold text-[#0D1B2A]/70 uppercase tracking-wider">{t("schol.budget")}</label>
                  <input type="number" min={5000} max={80000} step={1000} value={budget} onChange={(e) => setBudget(+e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none" />
                </div>
              </div>
              <div className="mt-6 space-y-2.5">
                {recs.length === 0 && (
                  <div className="p-4 rounded-xl bg-[var(--soft)] text-sm text-[var(--muted-foreground)]">{t("schol.empty")}</div>
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
  const { t } = useT();
  const questions = [
    { k: "country", q: t("quiz.q1"), opts: ["UK", "USA", "Canada", "Australia"] },
    { k: "budget", q: t("quiz.q2"), opts: ["$15-25K", "$25-40K", "$40-60K", "$60K+"] },
    { k: "degree", q: t("quiz.q3"), opts: [t("quiz.degree.b"), t("quiz.degree.m"), t("quiz.degree.phd"), t("quiz.degree.lang")] },
    { k: "ielts", q: t("quiz.q4"), opts: ["5.5-6.0", "6.0-6.5", "6.5-7.5", "7.5+"] },
  ];
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const done = step >= questions.length;
  const recommend = () => {
    const map: Record<string, { u: string; m: string }> = {
      UK: { u: "University of Manchester", m: t("quiz.rec.uk") },
      USA: { u: "Boston University", m: t("quiz.rec.usa") },
      Canada: { u: "University of Toronto", m: t("quiz.rec.ca") },
      Australia: { u: "Monash University", m: t("quiz.rec.au") },
    };
    return map[ans.country] || map.UK;
  };
  return (
    <Reveal>
      <div className="p-8 lg:p-10 rounded-[24px] bg-gradient-to-br from-[#0D1B2A] to-[#1F3A5F] text-white shadow-[0_30px_60px_-20px_rgba(15,27,42,0.4)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-[var(--gold)] grid place-items-center text-[#0D1B2A]"><Sparkles className="h-6 w-6" /></div>
          <div>
            <h3 className="font-display text-xl font-semibold">{t("quiz.title")}</h3>
            <p className="text-sm text-white/65">{t("quiz.sub")}</p>
          </div>
        </div>
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
                <ChevronLeft className="h-4 w-4" /> {t("quiz.back")}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold mb-4">
              <Check className="h-3.5 w-3.5" /> {t("quiz.ready")}
            </div>
            <div className="font-display text-3xl font-bold">{recommend().u}</div>
            <p className="mt-2 text-white/70">{recommend().m}{t("quiz.recommendSuffix")}</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#contact" className="px-6 py-3 rounded-[12px] bg-[var(--gold)] text-[#0D1B2A] font-semibold hover:scale-[1.04] transition-all shadow-gold inline-flex items-center gap-2">{t("quiz.consult")} <ArrowRight className="h-4 w-4" /></a>
              <button onClick={() => { setStep(0); setAns({}); }} className="px-6 py-3 rounded-[12px] bg-white/10 border border-white/15 hover:bg-white/15 transition-all">{t("quiz.retry")}</button>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function FloatingActions() {
  const { t } = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
        <a href="https://wa.me/998901234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
          className="group h-14 w-14 grid place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform">
          <MessageCircle className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-ping" />
        </a>
        <a href="https://t.me/eduvisauz" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
          className="h-14 w-14 grid place-items-center rounded-full bg-[#0088CC] text-white shadow-[0_15px_40px_-10px_rgba(0,136,204,0.5)] hover:scale-110 transition-transform">
          <Send className="h-6 w-6" />
        </a>
        {show && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t("fab.top")}
            className="h-12 w-12 grid place-items-center rounded-full bg-[#0D1B2A] text-white shadow-soft hover:scale-110 transition-transform animate-fade-up">
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
      <a href="#contact"
        className={`fixed bottom-5 left-5 z-40 hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] font-semibold shadow-gold hover:scale-[1.05] transition-all ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <CalendarDays className="h-4 w-4" /> {t("fab.book")}
      </a>
    </>
  );
}

function Team() {
  const { t } = useT();
  const members = [
    { img: t1, n: "Dilnoza Saidova", k: "m1" },
    { img: t2, n: "Sherzod Aliyev", k: "m2" },
    { img: t3, n: "Kamola Yo'ldosheva", k: "m3" },
    { img: t4, n: "Botir Toshmatov", k: "m4" },
  ];
  return (
    <section id="team" className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("team.eyebrow")} title={t("team.title")} sub={t("team.sub")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="group rounded-[20px] overflow-hidden bg-white shadow-soft hover:-translate-y-1 transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={m.img} alt={m.n} loading="lazy" width={768} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-[#0D1B2A]">{m.n}</h3>
                  <div className="text-xs text-gold font-semibold tracking-wider uppercase mt-1">{t(`team.${m.k}.r`)}</div>
                  <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">{t(`team.${m.k}.b`)}</p>
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
  const { t } = useT();
  const names = ["Oxford", "Cambridge", "Harvard", "Melbourne", "Toronto", "Sydney", "MIT", "Stanford", "UCL", "Imperial", "ANU", "McGill"];
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("partners.eyebrow")} title={t("partners.title")} />
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
  const { t } = useT();
  const items = [
    { k: 1 }, { k: 2 }, { k: 3 }, { k: 4 }, { k: 5 },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
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
                    <span className="font-display text-lg font-semibold text-[#0D1B2A]">{t(`faq.q${it.k}`)}</span>
                    <ChevronDown className={`h-5 w-5 text-[#A68B52] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="text-[var(--muted-foreground)] leading-relaxed">{t(`faq.a${it.k}`)}</p>
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
  const { t } = useT();
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
      if (form.name.trim().length < 2) return toast.error(t("form.errName"));
      if (form.phone.trim().length < 7) return toast.error(t("form.errPhone"));
    }
    if (step === 1 && !form.country) return toast.error(t("form.errCountry"));
    setStep(step + 1);
  };
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.date) return toast.error(t("form.errDate"));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success(t("form.success"));
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold tracking-wider uppercase">{t("contact.eyebrow")}</div>
            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl">{t("contact.title")}</h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">{t("contact.sub")}</p>
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><MapPin className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">{t("contact.addressLabel")}</div><div className="text-white/60 text-sm mt-1">{t("contact.address")}</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Phone className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">{t("contact.phoneLabel")}</div><div className="text-white/60 text-sm mt-1">+998 90 123 45 67 · +998 71 200 00 00</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Mail className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">{t("contact.emailLabel")}</div><div className="text-white/60 text-sm mt-1">info@eduvisa.uz</div></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Clock className="h-5 w-5" /></div>
                <div><div className="text-white font-semibold">{t("contact.hoursLabel")}</div><div className="text-white/60 text-sm mt-1">{t("contact.hours")}</div></div>
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
          <form onSubmit={submit} className="p-8 lg:p-10 rounded-[24px] bg-white/[0.05] backdrop-blur-xl border border-white/10">
            {done ? (
              <div className="text-center py-10 animate-fade-up">
                <div className="mx-auto h-20 w-20 rounded-full bg-[#10B981] grid place-items-center shadow-[0_15px_40px_-10px_rgba(16,185,129,0.6)] animate-bounce">
                  <Check className="h-10 w-10 text-white" strokeWidth={3} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">{t("form.thanks")}, {form.name}!</h3>
                <p className="mt-2 text-white/70">{t("form.thanksBody1")} {form.date} {t("form.thanksBody2")}</p>
                <button type="button" onClick={reset} className="mt-6 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm hover:bg-white/15 transition-colors">{t("form.newReq")}</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  {[0, 1, 2].map((s) => (
                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)]" : "bg-white/10"}`} />
                  ))}
                </div>
                <div className="text-xs text-white/60 mb-5">{step + 1} / 3 {t("form.step")}</div>

                {step === 0 && (
                  <div className="space-y-5 animate-fade-up">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">{t("form.name")}</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={80} className="w-full h-12 px-4 rounded-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none transition-colors" placeholder={t("form.namePh")} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">{t("form.phone")}</label>
                      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} maxLength={30} className="w-full h-12 px-4 rounded-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none transition-colors" placeholder="+998 __ ___ __ __" />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5 animate-fade-up">
                    <label className="block text-sm font-medium text-white/80">{t("form.country")}</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {countries.map((c) => (
                        <button
                          key={c.n} type="button"
                          onClick={() => setForm({ ...form, country: c.n })}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all text-left ${
                            form.country === c.n
                              ? "bg-[var(--gold)]/15 border-[var(--gold)] text-white"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span className="text-xl">{c.f}</span>
                          <span className="text-sm font-medium">{c.n}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 animate-fade-up">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">{t("form.date")}</label>
                      <input type="date" min={today} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full h-12 px-4 rounded-[14px] bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">{t("form.message")}</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={3} className="w-full px-4 py-3 rounded-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none transition-colors resize-none" placeholder={t("form.messagePh")} />
                    </div>
                  </div>
                )}

                <div className="mt-7 flex gap-3">
                  {step > 0 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="px-5 py-3.5 rounded-[14px] bg-white/8 border border-white/15 text-white font-semibold hover:bg-white/12 transition-all inline-flex items-center gap-2">
                      <ChevronLeft className="h-4 w-4" /> {t("form.back")}
                    </button>
                  )}
                  {step < 2 ? (
                    <button type="button" onClick={next} className="flex-1 py-3.5 rounded-[14px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-gold inline-flex items-center justify-center gap-2">
                      {t("form.continue")} <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button type="submit" disabled={loading} className="flex-1 py-3.5 rounded-[14px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#0D1B2A] font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-gold inline-flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? (
                        <><span className="h-4 w-4 rounded-full border-2 border-[#0D1B2A]/30 border-t-[#0D1B2A] animate-spin" /> {t("form.submitting")}</>
                      ) : (<>{t("form.submit")} <ArrowRight className="h-4 w-4" /></>)}
                    </button>
                  )}
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useT();
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
          <p className="mt-5 text-sm leading-relaxed">{t("footer.tagline")}</p>
        </div>
        <div>
          <div className="font-display text-white font-semibold mb-5">{t("footer.quick")}</div>
          <ul className="space-y-3 text-sm">
            {navItems.map(l => <li key={l.href}><a href={l.href} className="hover:text-gold transition-colors">{t(l.key)}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display text-white font-semibold mb-5">{t("footer.contact")}</div>
          <ul className="space-y-3 text-sm">
            <li>{t("contact.address")}</li>
            <li>+998 90 123 45 67</li>
            <li>info@eduvisa.uz</li>
            <li>{t("contact.hours")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Eduvisa · CHET ELDA TA'LIM. {t("footer.rights")}
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
        <Tools />
        <Testimonials />
        <Team />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
