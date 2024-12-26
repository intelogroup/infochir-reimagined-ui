import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductsGrid } from "@/components/home/ProductsGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <HeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StatsSection />
        <ProductsGrid />
        <NewsletterSection />
      </div>
    </main>
  );
};

export default Index;