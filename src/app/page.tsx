import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
      </main>
    </>
  );
}
