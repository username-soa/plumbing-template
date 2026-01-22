"use client";

import { MapPin, Clock, Wrench, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetaItem {
	icon: React.ReactNode;
	label: string;
	value: string;
}

interface ProjectMetaProps {
	location?: string;
	duration?: string;
	serviceType?: string;
	completedDate?: string;
	budget?: string;
	className?: string;
}

export function ProjectMeta({
	location,
	duration,
	serviceType,
	completedDate,
	budget,
	className,
}: ProjectMetaProps) {
	const items: MetaItem[] = [
		location && {
			icon: <MapPin className="w-5 h-5" />,
			label: "Location",
			value: location,
		},
		duration && {
			icon: <Clock className="w-5 h-5" />,
			label: "Duration",
			value: duration,
		},
		serviceType && {
			icon: <Wrench className="w-5 h-5" />,
			label: "Service",
			value: serviceType,
		},
		completedDate && {
			icon: <Calendar className="w-5 h-5" />,
			label: "Completed",
			value: completedDate,
		},
		budget && {
			icon: <DollarSign className="w-5 h-5" />,
			label: "Budget",
			value: budget,
		},
	].filter(Boolean) as MetaItem[];

	if (items.length === 0) return null;

	return (
		<div
			className={cn(
				"my-8 not-prose relative overflow-hidden rounded-2xl",
				"bg-linear-to-br from-primary/5 via-primary/10 to-primary/5",
				"border border-primary/20",
				className,
			)}
		>
			{/* Decorative accent */}
			<div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/60 via-primary to-primary/60" />

			<div className="p-6">
				<p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
					Project Details
				</p>

				<div
					className={cn(
						"grid gap-6",
						items.length === 1 && "grid-cols-1",
						items.length === 2 && "grid-cols-2",
						items.length >= 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
						items.length >= 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
						items.length >= 5 &&
							"grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
					)}
				>
					{items.map((item) => (
						<div key={item.label} className="flex items-start gap-3 group">
							<div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
								{item.icon}
							</div>
							<div className="min-w-0">
								<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
									{item.label}
								</p>
								<p className="text-sm font-semibold text-foreground mt-0.5 truncate">
									{item.value}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
