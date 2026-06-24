import Banner from "@/components/Banner";
import BrowseOpportunitiesPage from "@/components/BrowseOpportunities";
import BrowseStartupsPage from "@/components/BrowseStartups";
import Protocol from "@/components/Protocol";
import Stats from "@/components/Stats";
import SuccessStories from "@/components/SuccessStories";
import WhyJoin from "@/components/WhyJoin";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <Stats />
      <BrowseStartupsPage/>
      <BrowseOpportunitiesPage/>
      <SuccessStories/>
      <WhyJoin/>
      <Protocol/>
    </div>
  );
}
