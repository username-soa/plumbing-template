export function CaseStudiesHero() {
	return (
		<section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
			<div className="container relative z-10">
				<div className="max-w-3xl mx-auto text-center space-y-6">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
						Our Success Stories
					</h1>
					<p className="text-xl text-muted-foreground">
						See how we've helped homeowners and businesses across Water City
						solve their plumbing challenges with precision and care.
					</p>
				</div>
			</div>

			{/* Background Pattern */}
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
		</section>
	);
}
