import useAppSeo from "@/lib/hooks/useAppSeo";

function Working() {
  useAppSeo({
    title: "Under The Hood — How Predictions Work",
    description:
      "Complete transparency on our data collection, difficulty modeling, and prediction methodology.",
  });

  const sections = [
    {
      num: "01",
      title: "The Problem",
      content: (
        <p>
          BITSAT cutoffs swing dramatically year-to-year — sometimes by{" "}
          <strong className="text-[var(--brutal-text)]">20+ marks</strong> for
          the same branch. Simple averages and extrapolations fail because
          there's a hidden external variable:{" "}
          <strong className="text-[var(--brutal-accent)]">
            paper difficulty
          </strong>
          . This variable is never officially published but has a massive impact
          on cutoffs. Our project was born to mathematically model this
          parameter.
        </p>
      ),
    },
    {
      num: "02",
      title: "Data Collection",
      content: (
        <>
          <p>
            Historical cutoff scores from{" "}
            <strong className="text-[var(--brutal-text)]">2013 to 2025</strong>,
            manually sourced from bitsadmission.com and collegepravesh.com,
            cross-verified against multiple sources. Data covers all three
            campuses — Pilani, Goa, and Hyderabad.
          </p>
          <p className="mt-3">
            Pre-2022, BITSAT was out of 450. We apply{" "}
            <strong className="text-[var(--brutal-text)]">
              linear scaling
            </strong>{" "}
            (<code className="text-[var(--brutal-accent)] text-xs">score × 390/450</code>) to
            normalize against the current 390-mark format. The final dataset is
            hosted on{" "}
            <a
              href="https://www.kaggle.com/datasets/pranavunni/bitsat-cutoff-dataset-2017-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brutal-accent)] hover:underline underline-offset-4"
            >
              Kaggle
            </a>
            .
          </p>
        </>
      ),
    },
    {
      num: "03",
      title: "Difficulty Modeling",
      highlight: true,
      content: (
        <>
          <p>
            The{" "}
            <strong className="text-[var(--brutal-accent)]">
              core innovation
            </strong>
            . We use{" "}
            <strong className="text-[var(--brutal-text)]">
              min-max scaling
            </strong>{" "}
            to derive a "coefficient of difficulty" per branch — the highest
            cutoff ever recorded gets{" "}
            <code className="text-[var(--brutal-accent)] text-xs">1.0</code>,
            the lowest gets{" "}
            <code className="text-[var(--brutal-accent)] text-xs">0.0</code>.
          </p>
          <p className="mt-3">
            This captures year-over-year variance that raw numbers miss. If
            every branch's cutoff drops uniformly, it signals a harder paper —
            and vice versa.
          </p>
        </>
      ),
    },
    {
      num: "04",
      title: "Three Scenarios",
      content: (
        <>
          <p>
            Instead of a single uncertain number, we provide three scenarios
            via{" "}
            <strong className="text-[var(--brutal-text)]">
              quantile estimation
            </strong>
            :
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-[10px] bg-[var(--brutal-bg)] border border-[var(--brutal-border)] text-center">
              <div className="text-xs uppercase tracking-wider text-[var(--brutal-text-muted)] mb-1">
                Best Case
              </div>
              <div className="font-display font-bold text-green-400">
                d = 0.2
              </div>
              <div className="text-xs text-[var(--brutal-text-muted)] mt-1">
                Easy paper year
              </div>
            </div>
            <div className="p-3 rounded-[10px] bg-[var(--brutal-bg)] border border-[var(--brutal-border)] text-center">
              <div className="text-xs uppercase tracking-wider text-[var(--brutal-text-muted)] mb-1">
                Most Likely
              </div>
              <div className="font-display font-bold text-yellow-400">
                d = 0.5
              </div>
              <div className="text-xs text-[var(--brutal-text-muted)] mt-1">
                Average year
              </div>
            </div>
            <div className="p-3 rounded-[10px] bg-[var(--brutal-bg)] border border-[var(--brutal-border)] text-center">
              <div className="text-xs uppercase tracking-wider text-[var(--brutal-text-muted)] mb-1">
                Worst Case
              </div>
              <div className="font-display font-bold text-red-400">
                d = 0.8
              </div>
              <div className="text-xs text-[var(--brutal-text-muted)] mt-1">
                Hard paper year
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--brutal-text-muted)]">
            Trained using polynomial regression (degree 2) — chosen for lowest
            RMSE on test data.
          </p>
        </>
      ),
    },
    {
      num: "05",
      title: "Why Some Branches Are Missing",
      content: (
        <p>
          Branches like MnC, Nanoscience, and Electronics & Computer
          Engineering have{" "}
          <strong className="text-[var(--brutal-text)]">
            0–2 years of data
          </strong>{" "}
          — nowhere near enough for reliable predictions. Augmenting data
          proved futile since each branch follows unique trends. As these
          branches accumulate more data, they will be incorporated.{" "}
          <strong className="text-[var(--brutal-accent)]">
            Transparency over completeness
          </strong>
          .
        </p>
      ),
    },
    {
      num: "06",
      title: "Limitations",
      content: (
        <>
          <p>
            No seat-matrix data is publicly available — BITS is a private
            institution, not subject to RTI. Without knowing exact seat counts
            per campus/branch, our model operates with incomplete information.
          </p>
          <p className="mt-3">
            This is a{" "}
            <strong className="text-[var(--brutal-text)]">
              statistical validator
            </strong>
            , not an exact predictor. No model can predict exact cutoffs — we
            provide honest, data-grounded ranges.
          </p>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--brutal-bg)] pb-24">
      <div className="brutal-container pt-12 md:pt-20">
        {/* Header */}
        <div className="mb-12 brutal-animate-up brutal-stagger-1">
          <div className="inline-block px-3 py-1.5 rounded-[10px] bg-[var(--brutal-accent)] text-white text-xs font-bold uppercase tracking-wider mb-4">
            Under The Hood
          </div>
          <h1 className="brutal-heading-lg mb-3">HOW PREDICTIONS WORK</h1>
          <p className="brutal-text-lg max-w-2xl text-[var(--brutal-text-secondary)]">
            No black boxes. Every step from raw data to the numbers you see.
          </p>
          <p className="text-xs text-[var(--brutal-text-muted)] mt-3">
            Based on the{" "}
            <a
              href="https://github.com/PranavU-Coder/bitsatards_bot/wiki/Bitsat-Predictions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brutal-accent)] hover:underline underline-offset-4"
            >
              bitsatards_bot wiki
            </a>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.num}
              className={`brutal-box p-5 md:p-8 brutal-animate-up ${section.highlight
                ? "border-l-2 border-l-[var(--brutal-accent)]"
                : ""
                }`}
            >
              <h2 className="brutal-heading-sm mb-3 flex items-center gap-2">
                <span className="text-[var(--brutal-accent)] text-xs font-mono">
                  {section.num}
                </span>
                <span className="text-[var(--brutal-text-muted)]">—</span>
                {section.title}
              </h2>
              <div className="brutal-text text-[var(--brutal-text-secondary)]">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="brutal-box-sm p-5 text-center mt-10">
          <p className="text-xs text-[var(--brutal-text-muted)] uppercase tracking-wider">
            Disclaimer: Predictions based on past trends and mathematical
            modeling. Actual cutoffs may vary.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Working;
