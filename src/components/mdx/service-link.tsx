"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ServiceLinkProps {
	slug: string;
	label?: string;
	className?: string;
}

export function ServiceLink({ slug, label, className }: ServiceLinkProps) {
	return (
		<Link
			href={`/services/${slug}`}
			className={cn(
				"inline-flex items-center gap-2 text-primary font-medium hover:underline group not-prose",
				className,
			)}
		>
			<Wrench className="w-4 h-4" />
			<span>{label || "View Related Service"}</span>
			<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
		</Link>
	);
}
