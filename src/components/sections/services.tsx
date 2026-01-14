import Link from "next/link";
import {
	ArrowRight,
	Search,
	Flame,
	Droplets,
	Wrench,
	Siren,
	Bath,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
	TypographyH2,
	TypographyMuted,
	TypographyH4,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
	Search,
	Flame,
	Droplets,
	Wrench,
	Siren,
	Bath,
};

export function ServicesSection() {
	return (
		<section className="w-full py-24 bg-muted/20">
			<div className="container mx-auto px-6 md:px-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
					<div className="max-w-2xl">
						<TypographyH2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
							Our Professional Services
						</TypographyH2>
						<TypographyMuted className="text-lg md:text-xl">
							From routine maintenance to emergency repairs, we handle all your
							plumbing needs with precision and care.
						</TypographyMuted>
					</div>

					<Button
						variant="outline"
						className="hidden md:flex rounded-full px-6"
						asChild
					>
						<Link href="/services" className="flex items-center gap-2">
							View All Services
							<ArrowRight className="w-4 h-4 ml-1" />
						</Link>
					</Button>
				</div>

				{/* Services Grid (Bento Style) */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 auto-rows-[250px]">
					{SITE_CONFIG.services.map((service, index) => {
						const Icon = ICON_MAP[service.icon] || Wrench;
						// Bento Grid Logic: items 0, 3, and 5 span 2 columns on desktop
						const isLarge = index === 0 || index === 3 || index === 5;
						const spanClass = isLarge ? "md:col-span-2" : "md:col-span-1";

						return (
							<div
								key={service.title}
								className={cn(
									"group relative p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col justify-between",
									spanClass,
									isLarge ? "bg-muted/40" : "bg-background",
								)}
							>
								{/* Hover Gradient Overlay */}
								<div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								{/* Content */}
								<div className="relative z-10 flex flex-col h-full">
									<div className="flex justify-between items-start mb-6">
										<div
											className={cn(
												"rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
												isLarge
													? "w-14 h-14 bg-primary text-primary-foreground"
													: "w-12 h-12 bg-primary/10 text-primary",
											)}
										>
											<Icon className={isLarge ? "w-7 h-7" : "w-6 h-6"} />
										</div>
										{isLarge && (
											<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<ArrowRight className="w-6 h-6 text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
											</div>
										)}
									</div>

									<div>
										<TypographyH4
											className={cn(
												"font-bold mb-3 group-hover:text-primary transition-colors",
												isLarge ? "text-2xl" : "text-xl",
											)}
										>
											{service.title}
										</TypographyH4>

										<TypographyMuted className="line-clamp-3">
											{service.description}
										</TypographyMuted>
									</div>

									{!isLarge && (
										<div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 mt-4">
											<span>Learn More</span>
											<ArrowRight className="w-4 h-4 ml-2" />
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{/* Mobile View All Button */}
				<div className="flex justify-center md:hidden">
					<Button
						variant="outline"
						className="rounded-full w-full max-w-xs"
						asChild
					>
						<Link
							href="/services"
							className="flex items-center justify-center gap-2"
						>
							View All Services
							<ArrowRight className="w-4 h-4 ml-1" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
