import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import GraphPlot from "./components/ui/GraphPlot";
import PredictTable from "./components/ui/PredictTable";

function Home() {
  return (
    <main className="brutal-grid-bg min-h-screen relative overflow-hidden">
      {/* Hero / Intro */}
      <div className="brutal-container pt-24 md:pt-32 pb-16 relative z-10">
        <div className="brutal-box p-6 md:p-12 mb-16 relative brutal-animate-up brutal-stagger-1">
          <h1 className="brutal-heading-xl mb-5">
            PREDICT <span className="text-[var(--brutal-accent)]">YOUR</span>{" "}
            FUTURE
          </h1>
          <p className="brutal-text-lg max-w-2xl mb-3 text-[var(--brutal-text-secondary)] brutal-animate-up brutal-stagger-2">
            Advanced BITSAT branch prediction based on historical cutoffs. No
            fluff. Just data.
          </p>
          <p className="brutal-text max-w-2xl text-[var(--brutal-text-muted)] brutal-animate-up brutal-stagger-2">
            We mathematically model external parameters like paper difficulty —
            the hidden variable behind BITSAT's wildly fluctuating cutoffs — so
            you get honest, transparent predictions.
          </p>
        </div>

        {/* Prediction Section */}
        <section className="mb-20 relative">
          <div className="flex flex-col gap-12">
            <div className="brutal-animate-up brutal-stagger-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-5 bg-[var(--brutal-accent)] rounded-[10px]"></div>
                <h2 className="brutal-heading-lg">Calculator</h2>
              </div>
              <PredictTable />
            </div>

            {/* Branch Exclusion Notice */}
            <div className="brutal-animate-up brutal-stagger-4">
              <div className="brutal-box p-5 md:p-8 border-l-2 border-l-[var(--brutal-accent)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-[var(--brutal-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                    Notice
                  </span>
                  <h3 className="brutal-heading-sm text-sm">
                    Why Some Branches Are Missing
                  </h3>
                </div>

                <div className="space-y-3">
                  <p className="brutal-text text-[var(--brutal-text-secondary)]">
                    Branches like{" "}
                    <span className="font-bold text-[var(--brutal-text)]">
                      MnC, Nanoscience, Electronics & Computer Engineering
                    </span>{" "}
                    and other recently introduced programs are{" "}
                    <span className="font-bold text-[var(--brutal-accent)]">
                      not included
                    </span>{" "}
                    — they have insufficient historical data for reliable
                    predictions.
                  </p>

                  <div className="pt-3 mt-3 border-t border-[var(--brutal-border)]">
                    <p className="text-xs text-[var(--brutal-text-muted)]">
                      Full technical reasoning →{" "}
                      <Link
                        to="/working"
                        className="text-[var(--brutal-accent)] font-bold hover:underline underline-offset-4"
                      >
                        Under The Hood
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="brutal-line brutal-line-accent my-4"></div>

            {/* Trends */}
            <div className="brutal-animate-up brutal-stagger-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-5 bg-[var(--brutal-accent)] rounded-[10px]"></div>
                <h2 className="brutal-heading-lg">Trends</h2>
              </div>
              <GraphPlot />
            </div>

            <div className="brutal-line brutal-line-accent my-4"></div>

            {/* Misc. Resources */}
            <div className="brutal-animate-up brutal-stagger-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-5 bg-[var(--brutal-accent)] rounded-[10px]"></div>
                <h2 className="brutal-heading-lg">Misc. Resources</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Syllabus */}
                <a
                  href="https://admissions.bits-pilani.ac.in/FD/downloads/BITSAT_Syllabus.pdf?06012025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-box p-5 hover:border-[var(--brutal-accent)] transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-[var(--brutal-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      PDF
                    </span>
                    <h3 className="brutal-heading-sm text-sm">BITSAT Syllabus</h3>
                  </div>
                  <p className="brutal-text text-sm text-[var(--brutal-text-secondary)] mb-3">
                    Official BITSAT syllabus from BITS Pilani admissions.
                  </p>
                  <span className="text-xs text-[var(--brutal-accent)] font-bold group-hover:underline underline-offset-4">
                    Download PDF →
                  </span>
                </a>

                {/* Study Group */}
                <a
                  href="https://link.yeolpumta.com/P3R5cGU9Z3JvdXBJbnZpdGUmaWQ9MzU5OTUzNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-box p-5 hover:border-[var(--brutal-accent)] transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-[var(--brutal-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      Study
                    </span>
                    <h3 className="brutal-heading-sm text-sm">YeolPumTa Group</h3>
                  </div>
                  <p className="brutal-text text-sm text-[var(--brutal-text-secondary)] mb-3">
                    Join the <span className="font-bold text-[var(--brutal-text)]">BITSATards</span> study
                    group. Password: <code className="text-xs bg-[var(--brutal-bg-secondary)] px-1.5 py-0.5 rounded font-mono">123</code>
                  </p>
                  <span className="text-xs text-[var(--brutal-accent)] font-bold group-hover:underline underline-offset-4">
                    Join Group →
                  </span>
                </a>

                {/* Important Dates */}
                <div className="brutal-box p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-[var(--brutal-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      Dates
                    </span>
                    <h3 className="brutal-heading-sm text-sm">BITSAT 2026 Schedule</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="brutal-text text-sm text-[var(--brutal-text-secondary)]">
                      <span className="font-bold text-[var(--brutal-text)]">Session 1:</span>{" "}
                      Wednesday, 15 April 2026
                    </p>
                    <p className="brutal-text text-sm text-[var(--brutal-text-secondary)]">
                      <span className="font-bold text-[var(--brutal-text)]">Session 2:</span>{" "}
                      Sunday, 24 May 2026
                    </p>
                  </div>
                </div>

                {/* Community Resources */}
                <div className="brutal-box p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-[var(--brutal-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      Community
                    </span>
                    <h3 className="brutal-heading-sm text-sm">Resources</h3>
                  </div>
                  <p className="brutal-text text-sm text-[var(--brutal-text-secondary)] mb-3">
                    Curated prep material and community discussions.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://www.reddit.com/r/Bitsatards/wiki/resources/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brutal-accent)] font-bold hover:underline underline-offset-4"
                    >
                      r/Bitsatards Wiki →
                    </a>
                    <a
                      href="https://discord.com/channels/1221093390167576646/1224005178106187877"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brutal-accent)] font-bold hover:underline underline-offset-4"
                    >
                      Discord Resources Channel →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="brutal-line brutal-line-accent my-4"></div>

            {/* FAQ */}
            <FaqSection />
          </div>
        </section>
      </div>
    </main>
  );
}

const FAQ_ITEMS = [
  {
    q: "What is the eligibility criteria for BITSAT?",
    a: "Minimum 75% aggregate in PCM (Physics, Chemistry, Mathematics) and minimum 60% in each individual subject in 12th class. PCB candidates are eligible only for B.Pharmacy and B.E. Environmental & Sustainability Engineering.",
  },
  {
    q: "Do I need to apply separately for each BITS campus?",
    a: "No. A single application covers all three campuses — Pilani, Goa, and Hyderabad.",
  },
  {
    q: "I passed 12th in 2025. Am I eligible for BITSAT-2026?",
    a: "Yes. Students who passed 12th in the previous academic year (2025) or the current year (2026) are eligible.",
  },
  {
    q: "What if I appear in both Session 1 and Session 2?",
    a: "The higher of your two BITSAT scores will be considered for admission.",
  },
  {
    q: "Does BITS consider JEE Mains scores?",
    a: "No. BITS Pilani admissions are based solely on the BITSAT score.",
  },
  {
    q: "Is there any reservation or management quota?",
    a: "No. BITS Pilani does not have any kind of reservation or management quota for admissions.",
  },
  {
    q: "What is a Dual Degree at BITS?",
    a: "Students admitted to M.Sc. programmes (Physics, Chemistry, Biology, Mathematics, Economics, etc.) can get a second B.E. degree. The allotment is based on first-year academic performance and available seats.",
  },
  {
    q: "Where can I find previous year cutoffs?",
    a: "Previous year cutoffs are available on the official BITS admissions website. Our predictor also uses this historical data to generate its predictions.",
  },
] as const;

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [contentHeights, setContentHeights] = useState<number[]>([]);

  useEffect(() => {
    const heights = contentRefs.current.map(ref => ref?.scrollHeight ?? 0);
    setContentHeights(heights);
  }, []);

  return (
    <div className="brutal-animate-up brutal-stagger-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-5 bg-[var(--brutal-accent)] rounded-[10px]"></div>
        <h2 className="brutal-heading-lg">FAQ</h2>
      </div>

      <div className="flex flex-col gap-2">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="brutal-box overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left gap-4 cursor-pointer"
            >
              <span className="brutal-text text-sm font-bold">{item.q}</span>
              <span
                className="text-[var(--brutal-accent)] text-lg font-bold shrink-0 transition-transform duration-200"
                style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="transition-all duration-200 ease-in-out overflow-hidden"
              style={{
                maxHeight: openIndex === i ? `${contentHeights[i] || 500}px` : "0px",
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <p
                ref={el => { contentRefs.current[i] = el; }}
                className="brutal-text text-sm text-[var(--brutal-text-secondary)] px-4 md:px-5 pb-4 md:pb-5"
              >
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-[var(--brutal-text-muted)]">
        Full official FAQ →{" "}
        <a
          href="https://admissions.bits-pilani.ac.in/FD/BITSAT_FAQs.html?06012025"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brutal-accent)] font-bold hover:underline underline-offset-4"
        >
          BITS Admissions
        </a>
      </p>
    </div>
  );
}

export default Home;
