export type TeamMemberProps = {
  image: string;
  name: string;
  role: string;
  githubLink: string;
  description: string;
};

export const TEAM_MEMBERS: TeamMemberProps[] = [
  {
    image: "https://github.com/PranavU-Coder.png",
    name: "Pranav",
    role: "Lead",
    githubLink: "https://github.com/PranavU-Coder",
    description:
      "Progenitor of the idea, created the ML-model for predictions and contributed to the website.",
  },
  {
    image: "https://github.com/ObnoxiousOrca.png",
    name: "Arkadeep",
    role: "Contributor",
    githubLink: "https://github.com/ObnoxiousOrca",
    description: "Contributed to the project's development and formulation.",
  },
  {
    image: "https://github.com/vee1e.png",
    name: "Lakshit",
    role: "Contributor",
    githubLink: "https://github.com/vee1e",
    description: "Worked on the frontend development and design of the website.",
  },
] as const;

export interface PlotParams {
  data?: any[];
  layout?: any;
  config?: any;
  frames?: any[];
  revision?: number;
  style?: React.CSSProperties;
  className?: string;
  useResizeHandler?: boolean;
  onInitialized?: (figure: any) => void;
  onUpdate?: (figure: any) => void;
  onRelayout?: (event: any) => void;
  onClick?: (event: any) => void;
}

export const gotoButtonStyle =
  "m-1 cursor-pointer bg-[var(--brutal-bg-tertiary)] border border-[var(--brutal-border)] text-[var(--brutal-text)] w-[40px] h-[40px] rounded-[10px] flex justify-center items-center enabled:hover:bg-[var(--brutal-accent)] enabled:active:bg-[var(--brutal-accent-hover)] disabled:opacity-40 transition-all disabled:cursor-default";

export const submitButtonStyle =
  "m-2 cursor-pointer bg-[var(--brutal-accent)] border border-[var(--brutal-accent)] hover:bg-[var(--brutal-accent-hover)] active:bg-[var(--brutal-accent)] text-white w-[150px] h-[40px] rounded-[10px] transition-all font-medium";
