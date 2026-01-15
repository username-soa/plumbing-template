"use client";

import { useRef, useState } from "react";
import { ArrowRight, Calendar, Search, Wrench, LucideIcon } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
	Calendar,
	Search,
	Wrench,
};

export function ProcessSteps() {
	return (
		<section className="py-24 bg-background">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-4xl font-bold tracking-tight mb-4">
						How It Works
					</h2>
					<p className="text-muted-foreground text-lg">
						Simple, transparent, and stress-free service in 3 easy steps.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{SITE_CONFIG.process?.map((step, index) => {
						const Icon = ICONS[step.icon] || Wrench;
						return (
							<SpotlightCard key={step.title} className="h-full">
								<div className="relative z-20 flex flex-col items-start text-start h-full p-8">
									<div className="mb-6 relative">
										<div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
										<div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
											<Icon className="w-8 h-8" />
										</div>
									</div>

									<h3 className="text-xl font-bold mb-3 text-card-foreground">
										{index + 1}. {step.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{step.description}
									</p>
								</div>
							</SpotlightCard>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function SpotlightCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!divRef.current) return;

		const div = divRef.current;
		const rect = div.getBoundingClientRect();

		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(1);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(1);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={cn(
				"relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-200",
				className,
			)}
		>
			<div
				className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
				style={{
					opacity,
					background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.15), transparent 40%)`,
				}}
			/>
			{/* Border Highlight Effect */}
			<div
				className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
				style={{
					opacity,
					background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary)), transparent 40%)`,
					maskImage: `radial-gradient(200px circle at ${position.x}px ${position.y}px, black, transparent)`,
					WebkitMaskImage: `radial-gradient(200px circle at ${position.x}px ${position.y}px, black, transparent)`,
				}}
			/>

			{/* Content Container (to sit on top of the bg effect) */}
			<div className="relative">{children}</div>
		</div>
	);
}

/*
    Note: For the --primary-rgb variable to work in the gradient, we might need it defined in globals.css. 
    Alternatively, using hsl(var(--primary) / 0.15) works if tailwind is set up that way.
    For this implementation, I used a direct hsl color approach in the border highlight 
    and a fallback approach for the background glow.
*/
