"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
	steps: {
		title: string;
		description: string;
		date?: string;
	}[];
	className?: string;
}

export function Timeline({ steps, className }: TimelineProps) {
	return (
		<div
			className={cn(
				"my-8 ml-4 border-l-2 border-muted space-y-8 pl-8 not-prose",
				className,
			)}
		>
			{steps.map((step, index) => (
				<div key={index} className="relative">
					{/* Dot */}
					<div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-background bg-muted-foreground/30" />

					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
							{step.date || `Phase ${index + 1}`}
						</span>
						<h4 className="text-lg font-bold text-foreground">{step.title}</h4>
						<p className="text-muted-foreground leading-relaxed">
							{step.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
