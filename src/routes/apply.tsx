import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, GraduationCap, MapPin, CheckCircle2, Upload, FileCheck2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "University Application Portal" },
      { name: "description", content: "Apply to top universities worldwide. Search, select, and submit your application with all required documents in one place." },
    ],
  }),
  component: ApplyPage,
});

type University = { name: string; country: string; flag: string };

const UNIVERSITIES: University[] = [
  { name: "Harvard University", country: "USA", flag: "🇺🇸" },
  { name: "Stanford University", country: "USA", flag: "🇺🇸" },
  { name: "MIT", country: "USA", flag: "🇺🇸" },
  { name: "University of Oxford", country: "UK", flag: "🇬🇧" },
  { name: "University of Cambridge", country: "UK", flag: "🇬🇧" },
  { name: "Imperial College London", country: "UK", flag: "🇬🇧" },
  { name: "University of Toronto", country: "Canada", flag: "🇨🇦" },
  { name: "McGill University", country: "Canada", flag: "🇨🇦" },
  { name: "University of Melbourne", country: "Australia", flag: "🇦🇺" },
  { name: "ETH Zurich", country: "Switzerland", flag: "🇨🇭" },
  { name: "TU Munich", country: "Germany", flag: "🇩🇪" },
  { name: "Seoul National University", country: "South Korea", flag: "🇰🇷" },
  { name: "University of Tokyo", country: "Japan", flag: "🇯🇵" },
  { name: "NUS Singapore", country: "Singapore", flag: "🇸🇬" },
];

type DocKey = "id" | "zagran" | "parent" | "grade" | "photo" | "lang";

const COUNTRY_CODES = [
  { code: "+998", label: "🇺🇿 +998" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+7", label: "🇷🇺 +7" },
  { code: "+90", label: "🇹🇷 +90" },
  { code: "+49", label: "🇩🇪 +49" },
];

function ApplyPage() {
  const [query, setQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [countryCode, setCountryCode] = useState("+998");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");

  const [docs, setDocs] = useState<Record<DocKey, File | null>>({
    id: null,
    zagran: null,
    parent: null,
    grade: null,
    photo: null,
    lang: null,
  });
  const [gradeType, setGradeType] = useState("");
  const [langType, setLangType] = useState("");
  const [langScore, setLangScore] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const filtered = UNIVERSITIES.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.country.toLowerCase().includes(query.toLowerCase()),
  );

  function handleApplyNow(uniName: string) {
    setSelectedUniversity(uniName);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleFile(key: DocKey, file: File | null, imageOnly = false) {
    if (!file) return;
    if (imageOnly && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }
    setDocs((d) => ({ ...d, [key]: file }));
  }

  const uploadedCount = Object.values(docs).filter(Boolean).length;
  const totalDocs = 6;
  const progress = (uploadedCount / totalDocs) * 100;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUniversity) return toast.error("Please select a university");
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!dob) return toast.error("Date of birth is required");
    if (!phone.trim()) return toast.error("Phone number is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Valid email is required");
    if (!faculty.trim()) return toast.error("Faculty/Major is required");
    if (uploadedCount < totalDocs) return toast.error("Please upload all 6 documents");
    if (!gradeType) return toast.error("Select grade certificate type");
    if (!langType) return toast.error("Select IELTS or CEFR");
    if (!langScore.trim()) return toast.error("Enter your score or level");

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-100 flex items-center justify-center px-4">
        <Card className="max-w-lg w-full text-center p-8 shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Your application to <span className="font-semibold text-foreground">{selectedUniversity}</span> has been received. We'll reach out within 1–2 business days.
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Submit another application
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-100">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm mb-6">
            <GraduationCap className="h-4 w-4" /> University Application Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            Apply to your dream university
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Search universities worldwide and submit your application with all required documents in one place.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by university name or country..."
              className="h-14 pl-12 text-base bg-white/90 backdrop-blur shadow-lg border-white/60"
            />
          </div>
        </div>
      </section>

      {/* University Grid */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {filtered.length} {filtered.length === 1 ? "university" : "universities"} found
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((u) => (
              <Card
                key={u.name}
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-white/60 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="text-4xl mb-2">{u.flag}</div>
                  <CardTitle className="text-xl">{u.name}</CardTitle>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {u.country}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleApplyNow(u.name)} className="w-full">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No universities match your search.
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <Card className="shadow-2xl border-white/60 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl">Application Form</CardTitle>
              <p className="text-muted-foreground">
                Fill in all fields and upload required documents to submit your application.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Selected University</Label>
                  <Input
                    value={selectedUniversity}
                    readOnly
                    disabled
                    placeholder='Click "Apply Now" on a university above'
                    className="mt-1.5 bg-slate-100 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1.5" />
                  </div>
                </div>

                <div>
                  <Label>Phone Number *</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="901234567" maxLength={15} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" maxLength={255} />
                  </div>
                  <div>
                    <Label htmlFor="faculty">Desired Faculty/Major *</Label>
                    <Input id="faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} className="mt-1.5" maxLength={100} />
                  </div>
                </div>

                {/* Documents */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Required Documents</h3>
                    <span className="text-sm font-medium text-muted-foreground">
                      {uploadedCount} / {totalDocs} uploaded
                    </span>
                  </div>
                  <Progress value={progress} className="mb-6" />

                  <div className="space-y-4">
                    <DocUpload label="ID Card" file={docs.id} accept="image/*,application/pdf" onChange={(f) => handleFile("id", f)} />
                    <DocUpload label="Zagranpassport" file={docs.zagran} accept="image/*,application/pdf" onChange={(f) => handleFile("zagran", f)} />
                    <DocUpload label="Parent's Passport" file={docs.parent} accept="image/*,application/pdf" onChange={(f) => handleFile("parent", f)} />

                    <DocUpload label="Grade Certificate" file={docs.grade} accept="image/*,application/pdf" onChange={(f) => handleFile("grade", f)}>
                      <Select value={gradeType} onValueChange={setGradeType}>
                        <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Select grade" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </DocUpload>

                    <DocUpload label="3x4 Photo" file={docs.photo} accept="image/*" onChange={(f) => handleFile("photo", f, true)} />

                    <DocUpload label="Language Certificate" file={docs.lang} accept="image/*,application/pdf" onChange={(f) => handleFile("lang", f)}>
                      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <Select value={langType} onValueChange={setLangType}>
                          <SelectTrigger className="w-full md:w-36"><SelectValue placeholder="Type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IELTS">IELTS</SelectItem>
                            <SelectItem value="CEFR">CEFR</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={langScore}
                          onChange={(e) => setLangScore(e.target.value)}
                          placeholder="Score / Level"
                          className="w-full md:w-36"
                          maxLength={10}
                        />
                      </div>
                    </DocUpload>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-12 text-base">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function DocUpload({
  label,
  file,
  accept,
  onChange,
  children,
}: {
  label: string;
  file: File | null;
  accept: string;
  onChange: (file: File | null) => void;
  children?: React.ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`rounded-lg border-2 border-dashed p-4 transition-colors ${file ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-slate-50/50"}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {file ? (
            <FileCheck2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <Upload className="h-5 w-5 text-slate-400 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="font-medium text-sm">{label}</div>
            <div className="text-xs text-muted-foreground truncate">
              {file ? `✓ ${file.name}` : "Not uploaded"}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          {children}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
          <Button type="button" variant={file ? "outline" : "default"} size="sm" onClick={() => inputRef.current?.click()}>
            {file ? "Replace" : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
}