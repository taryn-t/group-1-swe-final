import Hero from "@/components/UIElements/Hero";
import TrendingProducts from "@/components/Navigation/Products/TrendingProducts";

export default function Home() {
  return (
    <div className="  font-[family-name:var(--font-geist-sans)] pt-16">
      <main className="">
        <Hero/>
        <TrendingProducts title="School Supplies"/>
      </main>
    </div>
  );
}
