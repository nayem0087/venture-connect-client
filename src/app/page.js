import Banner from "@/components/Banner";
import Stats from "@/components/Stats";
import WhyJoin from "@/components/WhyJoin";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <Stats />
      <WhyJoin/>
    </div>
  );
}
