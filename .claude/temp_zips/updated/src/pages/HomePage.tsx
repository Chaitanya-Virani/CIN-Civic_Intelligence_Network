import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  GraduationCap,
  Landmark,
  Languages,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Vote,
  Wallet,
} from "lucide-react";
import { useTenant } from "@/context/TenantContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SECTOR_CARDS = [
  {
    icon: GraduationCap,
    title: "For Colleges",
    kicker: "Students' Union",
    body: "Run your students' union like a real democracy — open proposals, MFA-verified voting, and participatory budgeting for club and department funds.",
    bullets: ["Proposals & voting", "Live tally by department", "Participatory budgeting"],
    color: "#2f4bd8",
  },
  {
    icon: Landmark,
    title: "For Panchayats",
    kicker: "Gram Sabha",
    body: "Bring the Gram Sabha online — notices, resident proposals, and transparent ward-wise tallies, with a multilingual interface for every resident.",
    bullets: ["Proposals & voting", "Live tally by ward", "Bhashini multilingual"],
    color: "#177a4a",
  },
];

const STEPS = [
  {
    icon: UserPlus,
    title: "Choose your institution",
    body: "Sign up as a College or a Panchayat member and pick your specific institution.",
  },
  {
    icon: ShieldCheck,
    title: "Verify with Duo MFA",
    body: "Every sign-in and every vote is protected by two-factor push verification.",
  },
  {
    icon: Vote,
    title: "Propose, vote, track live",
    body: "Raise proposals, cast one verified vote each, and watch results tally in real time.",
  },
];

export function HomePage() {
  const { tenant } = useTenant();

  return (
    <div className="relative overflow-hidden">
      {/* ambient hero wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background: `radial-gradient(120% 100% at 50% -20%, color-mix(in srgb, ${tenant.branding.primaryColor} 14%, transparent), transparent 70%)`,
        }}
      />

      {/* hero */}
      <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
          <Sparkles size={12} className="text-accent" />
          Campus &amp; civic democracy, one platform
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[40px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[52px]">
          Every proposal heard.
          <br />
          Every vote counted.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-2">
          CIN gives colleges and panchayats a shared home for proposals,
          MFA-verified voting, and live, transparent tallies — themed and
          feature-scoped to your institution.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup">
            <Button size="lg">
              <UserPlus size={17} />
              Client Sign Up
              <ArrowRight size={17} />
            </Button>
          </Link>
          <Link to="/admin/login">
            <Button size="lg" variant="outline">
              <ShieldCheck size={17} />
              Admin login
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-[13px] text-ink-3">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </section>

      {/* sector cards */}
      <section className="relative mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {SECTOR_CARDS.map((s) => (
            <Card key={s.title} className="p-6">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: `${s.color}1a`, color: s.color }}
              >
                <s.icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-[19px] font-semibold text-ink">
                {s.title}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-3">
                {s.kicker}
              </p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">
                {s.body}
              </p>
              <ul className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-[13px] text-ink-2"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: s.color }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="relative mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-center font-display text-[26px] font-semibold tracking-tight text-ink">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft font-mono text-[13px] font-semibold text-primary-strong">
                  {i + 1}
                </span>
                <step.icon size={18} className="text-ink-3" />
              </div>
              <h4 className="mt-3 text-[15px] font-semibold text-ink">
                {step.title}
              </h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* feature strip */}
      <section className="relative border-t border-line bg-surface/60">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-12 sm:grid-cols-4">
          {[
            { icon: Vote, label: "MFA-verified voting" },
            { icon: BarChart3, label: "Live grouped tallies" },
            { icon: Wallet, label: "Participatory budgeting" },
            { icon: Languages, label: "Multilingual (Bhashini)" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center text-center gap-2">
              <f.icon size={20} className="text-primary" />
              <span className="text-[12.5px] font-medium text-ink-2">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* footer CTA */}
      <section className="relative mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="font-display text-[24px] font-semibold tracking-tight text-ink">
          Ready to bring your institution online?
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup">
            <Button size="lg">
              <UserPlus size={17} />
              Sign up as a client
            </Button>
          </Link>
          <Link to="/admin/login">
            <Button size="lg" variant="ghost">
              I'm an administrator
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
