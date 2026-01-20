"use client";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
	id: string;
	platform?: "youtube" | "vimeo";
	title?: string;
	className?: string;
}

export function YouTubeEmbed({
	id,
	platform = "youtube",
	title = "Embedded Video",
	className,
}: YouTubeEmbedProps) {
	// YouTube URL structure
	const ytSrc = `https://www.youtube.com/embed/${id}`;
	// Vimeo URL structure
	const vimeoSrc = `https://player.vimeo.com/video/${id}`;

	const src = platform === "youtube" ? ytSrc : vimeoSrc;

	return (
		<div
			className={cn(
				"relative w-full rounded-xl overflow-hidden border border-border bg-black aspect-video my-6",
				className,
			)}
		>
			<iframe
				src={src}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="absolute top-0 left-0 w-full h-full"
			/>
		</div>
	);
}
