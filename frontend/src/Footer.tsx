import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-[var(--brutal-border)] bg-[var(--brutal-bg)] mt-auto py-10">
      <div className="brutal-container flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h3 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--brutal-text-secondary)] mb-1">
            BITSAT PREDICTOR
          </h3>
          <p className="text-xs text-[var(--brutal-text-muted)]">
            Data-driven branch predictions.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/PranavU-Coder/bitsat_predictor"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center border border-[var(--brutal-border)] rounded-[10px] text-[var(--brutal-text-muted)] hover:text-[var(--brutal-text)] hover:border-[#3f3f46] transition-all"
            aria-label="GitHub Repository"
          >
            <Github size={14} />
          </a>
          <div className="text-right">
            <p className="text-xs font-medium text-[var(--brutal-text-secondary)]">
              &copy; {new Date().getFullYear()} Predictor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
