import { Header } from "@/components/header/header";
import { Hero } from "@/components/pages/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
    </div>
  );
}
