import { CTASection } from "@/components/sections/cta";
import { FAQSection } from "@/components/sections/faq";
import { AboutSection } from "@/components/sections/about";
import { ReviewSection } from "@/components/sections/review";
import { LocationSection } from "@/components/sections/location";
import { HeroSection } from "@/components/sections/hero";

export default function Home() {
  return (
    <>

      <HeroSection />
          <AboutSection />
          <ReviewSection />
          <LocationSection />
          <FAQSection />
          <CTASection />
    </>
  );
}
