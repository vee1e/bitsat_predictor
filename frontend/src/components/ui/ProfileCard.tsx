import React from "react";
import { Github } from "lucide-react";
import type { TeamMemberProps } from "@/lib/utils";

const TeamMember = ({
  image,
  name,
  role,
  githubLink,
  description,
}: TeamMemberProps) => {
  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="brutal-card w-full max-w-xs flex flex-col">
      <div className="relative mb-5 rounded-[10px] overflow-hidden bg-[var(--brutal-bg-tertiary)] aspect-square">
        <img
          src={image}
          alt={`${name}'s profile`}
          onContextMenu={preventContextMenu}
          draggable={false}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[var(--brutal-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
          {role}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="brutal-heading-md text-lg">{name}</h3>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center shrink-0 border border-[var(--brutal-border)] rounded-[10px] text-[var(--brutal-text-muted)] hover:text-[var(--brutal-text)] hover:border-[#3f3f46] hover:bg-[var(--brutal-bg-tertiary)] transition-all"
          aria-label="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>

      <div className="brutal-line mb-3"></div>

      <p className="brutal-text text-[var(--brutal-text-secondary)] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default TeamMember;
