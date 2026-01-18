import Link from "next/link";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SITE_CONFIG } from "@/lib/site-config";

export function DesktopNav() {
	return (
		<LiquidGlass
			className="absolute left-1/2 -translate-x-1/2 hidden lg:block"
			cornerRadius={40}
			baseStrength={12}
			softness={10}
		>
			<nav className="flex items-center xl:gap-8 gap-4 text-white font-medium xl:px-8 px-6 py-3">
				{SITE_CONFIG.navLinks.map((link) => (
					<Link
						key={link.href + link.label}
						href={link.href}
						className="hover:text-primary transition-colors"
					>
						{link.label}
					</Link>
				))}
			</nav>
		</LiquidGlass>
	);
}
