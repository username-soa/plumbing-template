"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import {
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyMuted,
	TypographySmall,
} from "@/components/ui/typography";

const STATS = [
	{
		value: "10+",
		label: "Years of Experience",
		description:
			"Over the years, we've earned the trust of hundreds of homeowners and businesses by delivering consistent, high-quality plumbing solutions.",
	},
	{
		value: "99%",
		label: "Customer Satisfaction",
		description:
			"Our experienced team takes pride in every job, using safe and eco-friendly products to create healthier, efficient systems.",
	},
	{
		value: "10K+",
		label: "Happy Clients",
		description:
			"From on-time service to exceptional attention to detail, our commitment to excellence is reflected in our client satisfaction.",
	},
];

const CARDS = [
	{
		title: "Built on Trust, Powered by Service",
		image: "/about-trust.png",
	},
	{
		title: "Making Efficient Flow Our Promise",
		image: "/about-team.png",
	},
	{
		title: "Your Trusted Plumbing Experts",
		image: "/about-expert.png",
	},
];

function AboutCard({
	title,
	image,
	className,
}: {
	title: string;
	image: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"group relative w-full float-left rounded-3xl overflow-hidden cursor-pointer md:h-[400px] max-md:aspect-2/3",
				className,
			)}
		>
			<Image
				src={image}
				alt={title}
				fill
				sizes="(max-width: 768px) 100vw, 33vw"
				className="object-cover transition-transform duration-700 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

			<div className="absolute bottom-0 left-0 md:p-6 p-4 w-full">
				{/* <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
					<ArrowUpRight className="w-6 h-6" />
				</div> */}
				<h3 className="text-white text-xl font-bold leading-snug max-w-[80%] group-hover:translate-x-2 transition-transform">
					{title}
				</h3>
			</div>
		</div>
	);
}

export function AboutSection() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<section className="w-full py-24 bg-background">
			<div className="container mx-auto px-6 md:px-12">
				{/* Header Section */}
				<div className="flex flex-col xl:gap-x-8 max-xl:gap-y-4 md:mb-20 mb-12">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-primary font-medium">
							<span className="uppercase tracking-wider text-sm">About Us</span>
						</div>
					</div>
					<TypographyH2 className="text-3xl max-w-[1000px] md:text-5xl font-bold border-none tracking-tight leading-tight ">
						At FlowMasters we believe a reliable plumbing system creates a{" "}
						<span className="text-primary">happier and healthier life.</span>
					</TypographyH2>
					<Button
						size="lg"
						className="rounded-full text-base font-semibold shadow-lg hover:scale-105 transition-transform px-6 h-12  mt-4 md:w-fit md:ml-auto"
						asChild
					>
						<Link href="/about">Learn More About Us</Link>
					</Button>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] lg:gap-4 gap-3 mb-20">
					{STATS.map((stat, index) => (
						<Fragment key={stat.label}>
							<div className="flex flex-col gap-3 lg:px-4 md:px-2.5 max-md:py-4">
								<span className="text-5xl font-bold tracking-tighter text-foreground">
									{stat.value}
								</span>
								<TypographyH4 className="font-bold text-lg">
									{stat.label}
								</TypographyH4>
								<TypographyMuted className="text-base leading-relaxed">
									{stat.description}
								</TypographyMuted>
							</div>
							{index < STATS.length - 1 && (
								<div className="md:w-px w-full md:h-full h-px bg-border" />
							)}
						</Fragment>
					))}
				</div>

				{/* Image Grid - Desktop */}
				<div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:gap-8 gap-4">
					{CARDS.map((card) => (
						<AboutCard key={card.title} {...card} />
					))}
				</div>

				{/* Carousel - Mobile */}
				<div className="md:hidden">
					<Carousel
						setApi={setApi}
						plugins={[
							Autoplay({
								delay: 3000,
							}),
						]}
						className="w-full"
					>
						<CarouselContent>
							{CARDS.map((card) => (
								<CarouselItem key={card.title}>
									<AboutCard {...card} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
					<div className="flex justify-center gap-2 mt-4">
						{Array.from({ length: count }).map((_, index) => (
							<button
								key={CARDS[index]?.title ?? `slide-${index}`}
								type="button"
								className={cn(
									"h-2 rounded-full transition-all duration-300",
									current === index ? "w-8 bg-primary" : "w-2 bg-primary/30",
								)}
								onClick={() => api?.scrollTo(index)}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
