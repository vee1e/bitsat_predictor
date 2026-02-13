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
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
