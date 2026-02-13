import useAppSeo from "@/lib/hooks/useAppSeo";
import TeamMember from "@/components/ui/ProfileCard";
import { TEAM_MEMBERS } from "@/lib/utils";
import { Github, BookOpen } from "lucide-react";

const Team = () => {
  useAppSeo({
    title: "About Us — The Team Behind The Predictor",
    description:
      "Our mission, our team, and how you can contribute to the project.",
  });

  return (
    <main className="min-h-screen bg-[var(--brutal-bg)] pb-24">
      <div className="brutal-container pt-12 md:pt-20">
        {/* ========== OUR MISSION ========== */}
        <div className="brutal-box p-6 md:p-10 mb-14 brutal-animate-up brutal-stagger-1">
          <div className="inline-block px-3 py-1.5 rounded-[10px] bg-[var(--brutal-accent)] text-white text-xs font-bold uppercase tracking-wider mb-5">
            Our Mission
          </div>
          <h1 className="brutal-heading-lg mb-5">WHY WE BUILT THIS</h1>

          <div className="space-y-3 max-w-3xl">
            <p className="brutal-text-lg text-[var(--brutal-text-secondary)]">
              Every year, lakhs of students take BITSAT and are left guessing
              which branches they can realistically aim for. Coaching centers
              hand out vague guidance. Online forums are flooded with
              contradictory opinions.
            </p>
            <p className="brutal-text text-[var(--brutal-text-secondary)]">
              This project started with a simple question:{" "}
              <span className="font-bold text-[var(--brutal-text)]">
                Can we mathematically model the external parameters — like
                paper difficulty — that drive BITSAT's unpredictable cutoff
                fluctuations?
              </span>
            </p>
            <p className="brutal-text text-[var(--brutal-text-secondary)]">
              By treating difficulty as a quantifiable variable, we built a
              model that gives honest, data-grounded predictions. Not
              marketing claims. Not guesswork.{" "}
              <span className="font-bold text-[var(--brutal-accent)]">
                Math.
              </span>
            </p>
            <p className="brutal-text text-[var(--brutal-text-secondary)]">
              Head to{" "}
              <a
                href="/working"
                className="text-[var(--brutal-accent)] font-bold hover:underline underline-offset-4"
              >
                Under The Hood
              </a>{" "}
              to see exactly how every prediction is made.
            </p>
          </div>
        </div>

        {/* ========== THE TEAM ========== */}
        <div className="mb-14 brutal-animate-up brutal-stagger-2">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1.5 rounded-[10px] bg-[var(--brutal-accent)] text-white text-xs font-bold uppercase tracking-wider mb-3">
              The Team
            </div>
            <h2 className="brutal-heading-lg mb-3">OUR TEAM</h2>
            <p className="brutal-text-lg max-w-2xl mx-auto text-[var(--brutal-text-secondary)]">
              The minds behind the predictor.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {TEAM_MEMBERS.map((member) => (
              <TeamMember
                key={member.name}
                image={member.image}
                name={member.name}
                role={member.role}
                githubLink={member.githubLink}
                description={member.description}
              />
            ))}
          </div>
        </div>

        {/* ========== CONTRIBUTE ========== */}
        <div className="brutal-animate-up brutal-stagger-3">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1.5 rounded-[10px] bg-[var(--brutal-accent)] text-white text-xs font-bold uppercase tracking-wider mb-3">
              Get Involved
            </div>
            <h2 className="brutal-heading-lg mb-3">CONTRIBUTE</h2>
            <p className="brutal-text-lg max-w-2xl mx-auto text-[var(--brutal-text-secondary)]">
              Open project. Help improve the model or the website.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <a
              href="https://github.com/PranavU-Coder/bitsat_predictor/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-card hover:border-[#3f3f46] transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[var(--brutal-accent)] rounded-[10px]">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-display text-sm font-bold uppercase">
                  Model & Data
                </h3>
              </div>
              <p className="brutal-text text-[var(--brutal-text-secondary)] mb-3 text-sm">
                Improve the prediction model, add more data, or help with
                feature engineering.
              </p>
              <span className="text-xs text-[var(--brutal-accent)] font-bold group-hover:underline underline-offset-4">
                GitHub Wiki →
              </span>
            </a>

            <a
              href="https://github.com/PranavU-Coder/bitsat_predictor"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-card hover:border-[#3f3f46] transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[var(--brutal-accent)] rounded-[10px]">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-display text-sm font-bold uppercase">
                  Website
                </h3>
              </div>
              <p className="brutal-text text-[var(--brutal-text-secondary)] mb-3 text-sm">
                Help improve the UI, add features, or fix bugs. The source is
                fully open.
              </p>
              <span className="text-xs text-[var(--brutal-accent)] font-bold group-hover:underline underline-offset-4">
                Source Code →
              </span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Team;
