import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";

export function CompanyStory() {
	const { companyStory } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
					{/* Left - Story Content */}
					<div className="space-y-6">
						<div className="flex items-center gap-2 text-primary font-medium">
							<span className="uppercase tracking-wider text-sm">
								Our Story
							</span>
						</div>
						<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight">
							Building Trust, One{" "}
							<span className="text-primary">Repair at a Time</span>
						</TypographyH2>
						<div className="space-y-4">
							{companyStory.story.split("\n\n").map((paragraph) => (
								<TypographyMuted
									key={paragraph.slice(0, 30)}
									className="text-base leading-relaxed"
								>
									{paragraph}
								</TypographyMuted>
							))}
						</div>

						{/* Image moved here for better flow */}
						<div className="relative aspect-4/3 rounded-2xl overflow-hidden mt-8">
							<Image
								src="/about-trust.png"
								alt={`${SITE_CONFIG.brand.name} team serving Water City community`}
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</div>

					{/* Right - Timeline */}
					<div className="lg:sticky lg:top-24">
						<div className="bg-muted/30 rounded-2xl p-6 md:p-8">
							<TypographyH3 className="text-xl font-bold mb-6">
								Our Journey
							</TypographyH3>

							{/* Vertical Timeline */}
							<div className="relative">
								{/* Timeline Line */}
								<div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-linear-to-b from-primary via-primary/50 to-primary/20" />

								{/* Timeline Items */}
								<div className="space-y-6">
									{companyStory.milestones.map((milestone, index) => (
										<div
											key={milestone.year}
											className="relative flex gap-4 group"
										>
											{/* Year Badge */}
											<div className="relative z-10 shrink-0">
												<div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-md">
													<span className="text-xs font-bold text-primary group-hover:text-primary-foreground transition-colors">
														{milestone.year}
													</span>
												</div>
											</div>

											{/* Content Card */}
											<div className="flex-1 pb-2">
												<div className="bg-background rounded-xl p-4 border group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300">
													<p className="text-sm text-foreground font-medium leading-relaxed">
														{milestone.event}
													</p>
													{index === companyStory.milestones.length - 1 && (
														<span className="inline-block mt-2 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
															Latest
														</span>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
