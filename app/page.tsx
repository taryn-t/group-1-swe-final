import Hero from "@/components/UIElements/Hero";
import Products from "../components/Navigation/Products/Products";

export default function Home() {
  return (
    <div className="  font-[family-name:var(--font-geist-sans)] pt-16">
      <main className="">
        <Hero/>
        <Products/>
      </main>
      
    </div>
  );
}
