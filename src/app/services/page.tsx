import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { ProcessSteps } from "./_components/process-steps";
import { ReviewSection } from "@/components/sections/review";
import { FAQSection } from "@/components/sections/faq";
import { ServicesHeroMain } from "./_components/services-hero-main";
import { ServicesGrid } from "./_components/services-grid";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
	title: "Professional Plumbing Services | FlowMasters",
	description:
		"Comprehensive plumbing services for residential and commercial properties. Leak detection, water heaters, drain cleaning, and 24/7 emergency repair.",
};

export default function ServicesPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		serviceType: "Plumbing Services",
		provider: {
			"@type": "LocalBusiness",
			name: SITE_CONFIG.brand.name,
			telephone: SITE_CONFIG.contact.phone,
			address: {
				"@type": "PostalAddress",
				streetAddress: SITE_CONFIG.contact.address,
				addressLocality: "Water City",
				addressRegion: "WC",
				postalCode: "12345",
				addressCountry: "US",
			},
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Plumbing Services",
			itemListElement: SITE_CONFIG.services.map((service) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: service.title,
					description: service.description,
				},
			})),
		},
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<ServicesHeroMain />
			<ServicesGrid />
			<ProcessSteps />
			<ReviewSection />
			<FAQSection />
		</>
	);
}
