import Hero from "@/components/UIElements/Hero";
import TrendingProducts from "@/components/Navigation/Products/TrendingProducts";
import FindTextbooksSection from "@/components/UIElements/FindTextbooksSection";

export default function Home() {
  return (
    <div className="  font-[family-name:var(--font-geist-sans)] pt-16">
      <main className="">
        <Hero/>
        <FindTextbooksSection/>
        <TrendingProducts title="School Supplies"/>
       
      </main>
    </div>
  );
}
