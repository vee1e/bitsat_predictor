import srihari from '@/assets/team/Golden-purple.png';
import pranav from '@/assets/team/PranavU-Coder.png';


export const TEAM_MEMBERS: TeamMemberProps[] = [
    { image: pranav, name: "Pranav", role: "Lead", githubLink: "https://github.com/PranavU-Coder", description: 'Progenitor of the idea, created the ML-model for predictions and contributed to the website.' },
    { image: srihari, name: "Golden Purple", role: "Co-Lead", githubLink: "https://github.com/Golden-purple", description: 'Helped in model-tuning and creator of the website.' },
] as const;

export type TeamMemberProps = {
    image: string;
    name: string;
    role: string;
    githubLink: string;
    description: string;
};