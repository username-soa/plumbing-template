import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/sections/faq";
import { ReviewSection } from "@/components/sections/review";
import { AboutHero } from "./_components/about-hero";
import { CompanyStory } from "./_components/company-story";
import { ServiceAreas } from "./_components/service-areas";
import { TrustStats } from "./_components/trust-stats";
import { MeetTheTeam } from "./_components/meet-the-team";
import { Certifications } from "./_components/certifications";
import { OurValues } from "./_components/our-values";

export const metadata: Metadata = {
	title: `About Us | ${SITE_CONFIG.brand.name} - Your Trusted Water City Plumbers`,
	description:
		"Learn about FlowMasters, Water City's trusted family-owned plumbing company since 2005. Licensed, insured, and committed to serving our community with integrity. Meet our team of expert plumbers.",
	keywords: [
		"Water City plumber",
		"local plumbing company",
		"family-owned plumber",
		"licensed plumber Water City",
		"plumbing services near me",
	],
};

export default function AboutPage() {
	const { aboutUs } = SITE_CONFIG;

	// JSON-LD Schema for LocalBusiness and Organization
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": ["LocalBusiness", "Plumber"],
				"@id": "https://flowmasters.com/#organization",
				name: SITE_CONFIG.brand.name,
				description: SITE_CONFIG.brand.description,
				url: "https://flowmasters.com",
				telephone: SITE_CONFIG.contact.phone,
				email: SITE_CONFIG.contact.email,
				foundingDate: `${aboutUs.companyStory.foundedYear}`,
				address: {
					"@type": "PostalAddress",
					streetAddress: SITE_CONFIG.contact.address,
					addressLocality: "Water City",
					addressRegion: "WC",
					postalCode: "12345",
					addressCountry: "US",
				},
				geo: {
					"@type": "GeoCoordinates",
					latitude: "40.7128",
					longitude: "-74.0060",
				},
				areaServed: aboutUs.serviceAreas.map((area) => ({
					"@type": "City",
					name: area,
				})),
				openingHoursSpecification: [
					{
						"@type": "OpeningHoursSpecification",
						dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
						opens: "08:00",
						closes: "19:00",
					},
					{
						"@type": "OpeningHoursSpecification",
						dayOfWeek: "Saturday",
						opens: "09:00",
						closes: "18:00",
					},
				],
				priceRange: "$$",
				image: "/about-team.png",
				sameAs: SITE_CONFIG.socials.map((s) => s.href).filter((h) => h !== "#"),
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: "4.9",
					reviewCount: "500",
					bestRating: "5",
					worstRating: "1",
				},
				hasCredential: aboutUs.certifications.map((cert) => ({
					"@type": "EducationalOccupationalCredential",
					credentialCategory: cert.name,
					description: cert.description,
				})),
			},
			// Team members as Person schema
			...aboutUs.team.map((member) => ({
				"@type": "Person",
				name: member.name,
				jobTitle: member.role,
				description: member.bio,
				image: member.image,
				worksFor: {
					"@type": "Organization",
					name: SITE_CONFIG.brand.name,
				},
				hasCredential: member.certifications.map((cert) => ({
					"@type": "EducationalOccupationalCredential",
					name: cert,
				})),
			})),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<AboutHero />
			<CompanyStory />
			<OurValues />
			<ServiceAreas />
			<TrustStats />
			<MeetTheTeam />
			<Certifications />
			<ReviewSection />
			<FAQSection />
		</>
	);
}
