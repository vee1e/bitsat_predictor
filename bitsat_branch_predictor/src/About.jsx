import useAppSeo from '@/lib/hooks/useAppSeo';
import TeamMember from '@/components/ui/ProfileCard';
import { TEAM_MEMBERS } from '@/lib/utils';

const Team = () => {
    useAppSeo({
        title: 'People Behind This Project',
        description: 'Feel free to follow their profiles.',
    });

    return (
        <main>
            <div className="h-screen text-white pt-24">
                <div className="flex flex-wrap gap-3 justify-center">
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
        </main>
    );
}

export default Team;