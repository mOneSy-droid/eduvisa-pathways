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

function Destinations() {
  const items = [
    { img: cUK, n: "United Kingdom", c: "150+ universitet" },
    { img: cAU, n: "Australia", c: "80+ universitet" },
    { img: cCA, n: "Canada", c: "100+ universitet" },
    { img: cNZ, n: "New Zealand", c: "25+ universitet" },
    { img: cIE, n: "Ireland", c: "20+ universitet" },
    { img: cUS, n: "USA", c: "200+ universitet" },
  ];
  return (
    <section id="destinations" className="py-24 bg-[var(--soft)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Davlatlar" title="O'qish davlatini tanlang" sub="Dunyo bo'ylab eng nufuzli ta'lim yo'nalishlari." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((d, i) => (
            <Reveal key={i} delay={i * 50}>
              <a href="#contact" className="group block rounded-[20px] overflow-hidden bg-white shadow-soft hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={d.img} alt={d.n} loading="lazy" width={800} height={600} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0D1B2A]">{d.n}</h3>
                    <div className="text-sm text-[var(--muted-foreground)] mt-0.5">{d.c}</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gold/10 grid place-items-center text-[#A68B52] group-hover:bg-gold group-hover:text-[#0D1B2A] transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const universities = [
  { img: uOxford, n: "University of Oxford", c: "UK", r: "#3", t: "$45,000/yil", country: "UK" },
  { img: uHarvard, n: "Harvard University", c: "USA", r: "#4", t: "$55,000/yil", country: "USA" },
  { img: uCam, n: "University of Cambridge", c: "UK", r: "#5", t: "$42,000/yil", country: "UK" },
  { img: uMelb, n: "University of Melbourne", c: "Australia", r: "#13", t: "$38,000/yil", country: "Australia" },
  { img: uTor, n: "University of Toronto", c: "Canada", r: "#21", t: "$36,000/yil", country: "Canada" },
  { img: uSyd, n: "University of Sydney", c: "Australia", r: "#18", t: "$40,000/yil", country: "Australia" },
];

function Universities() {
  const tabs = ["Barchasi", "UK", "Australia", "Canada", "USA"];
  const [active, setActive] = useState("Barchasi");
  const filtered = active === "Barchasi" ? universities : universities.filter(u => u.country === active);
  return (
    <section id="universities" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Universitetlar" title="Dunyodagi eng nufuzli universitetlar" sub="Hamkor universitetlarimiz orasidan o'zingizga mosini tanlang." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === t ? "bg-[#0D1B2A] text-white" : "bg-[var(--soft)] text-[var(--muted-foreground)] hover:bg-gold/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u, i) => (
            <Reveal key={u.n} delay={i * 50}>
              <div className="group rounded-[20px] overflow-hidden bg-white border border-[var(--border)] shadow-soft hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={u.img} alt={u.n} loading="lazy" width={1024} height={640} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-[#0D1B2A]">QS {u.r}</div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gold font-semibold tracking-wider uppercase">{u.c}</div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#0D1B2A]">{u.n}</h3>
                  <div className="mt-3 text-sm text-[var(--muted-foreground)]">Yillik to'lov: <span className="font-medium text-[#0D1B2A]">{u.t}</span></div>
                  <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#A68B52] hover:text-[#0D1B2A] transition-colors">
                    Ariza topshirish <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
    { img: ts1, n: "Nigora Karimova", u: "University of Manchester, UK", q: "Eduvisa jamoasi tufayli ikkilangan paytda aniq yo'nalish topdim. Hujjatlar tayyorlashda har bir tafsilotga e'tibor berildi." },
    { img: ts2, n: "Jasur Rahmonov", u: "University of Toronto, Canada", q: "Stipendiya qidirish va viza jarayonida professional yordam oldim. Hozir orzudagi universitetda o'qiyapman." },
    { img: ts3, n: "Madina Yusupova", u: "University of Melbourne, Australia", q: "Birinchi konsultatsiyadan boshlab har bir bosqichda yonimda bo'lishdi. Tavsiya qilaman!" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Talabalar fikri" title="Bizning bitiruvchilarimiz" sub="Real talabalar — real natijalar." />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="p-8 rounded-[20px] bg-[var(--soft)] border border-transparent hover:border-gold/40 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-1 text-gold">
                  {[0,1,2,3,4].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-5 text-[#1F2937] leading-relaxed italic">"{it.q}"</p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <img src={it.img} alt={it.n} loading="lazy" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-[#0D1B2A]">{it.n}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{it.u}</div>
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
  const [form, setForm] = useState({ name: "", phone: "", country: "", message: "" });
  function submit(e: FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Iltimos, to'liq ismingizni kiriting");
    if (form.phone.trim().length < 7) return toast.error("Telefon raqamingizni to'g'ri kiriting");
    if (!form.country) return toast.error("Davlatni tanlang");
    toast.success("Murojaatingiz qabul qilindi! Tez orada bog'lanamiz.");
    setForm({ name: "", phone: "", country: "", message: "" });
  }
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
