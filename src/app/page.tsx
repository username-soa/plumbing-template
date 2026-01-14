import { FAQSection } from "@/components/sections/faq";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ReviewSection } from "@/components/sections/review";
import { LocationSection } from "@/components/sections/location";
import { HeroSection } from "@/components/sections/hero";

export default function Home() {
	return (
		<>
			<HeroSection />
			<AboutSection />
			<ServicesSection />
			<LocationSection />
			<ReviewSection />
			<FAQSection />
		</>
	);
}
