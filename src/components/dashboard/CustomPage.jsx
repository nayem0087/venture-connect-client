import { StatsCard } from "@/components/StatsCard";
import { Briefcase } from "@gravity-ui/icons";

export default function CustomPage() {
  return (
    <div className="bg-black min-h-screen p-10">
      <h1 className="text-white mb-6">Custom Single Card</h1>
      <StatsCard 
        title="Featured Opportunity" 
        description="Check out this top startup role" 
        icon={<Briefcase />} 
      />
    </div>
  );
}