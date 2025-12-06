import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import SecondaryServices from "@/components/sections/SecondaryServices";
import LatestUpdates from "@/components/sections/LatestUpdates";
import AdvertiseSection from "@/components/sections/AdvertiseSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-secondary selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <LatestUpdates />
      <AdvertiseSection />
      <SecondaryServices />
      <Footer />
    </main>
  );
}
