import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";

interface BreadcrumbsProps {
	items: {
		label: string;
		href?: string;
	}[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: `https://${SITE_CONFIG.brand.name.toLowerCase().replace(/\s/g, "")}.com/`, // In real app, use actual base URL
			},
			...items.map((item, index) => ({
				"@type": "ListItem",
				position: index + 2,
				name: item.label,
				...(item.href && {
					item: `https://${SITE_CONFIG.brand.name.toLowerCase().replace(/\s/g, "")}.com${item.href}`,
				}),
			})),
		],
	};

	return (
		<nav className="py-4 border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-[72px] z-40">
			<JsonLd data={jsonLd} />
			<div className="container mx-auto px-6">
				<ol className="flex items-center text-sm text-muted-foreground">
					<li className="flex items-center">
						<Link
							href="/"
							className="hover:text-primary transition-colors flex items-center"
						>
							<Home className="w-4 h-4 mr-1" />
							<span className="sr-only">Home</span>
						</Link>
					</li>

					{items.map((item, index) => (
						<li key={index} className="flex items-center">
							<ChevronRight className="w-4 h-4 mx-2 opacity-50" />
							{item.href ? (
								<Link
									href={item.href}
									className="hover:text-primary transition-colors font-medium"
								>
									{item.label}
								</Link>
							) : (
								<span className="text-foreground font-semibold">
									{item.label}
								</span>
							)}
						</li>
					))}
				</ol>
			</div>
		</nav>
	);
}
