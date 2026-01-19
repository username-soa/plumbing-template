"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
	src: string;
	poster?: string;
	className?: string;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
}

export function VideoPlayer({
	src,
	poster,
	className,
	autoplay = false,
	loop = false,
	muted = false,
}: VideoPlayerProps) {
	return (
		<div
			className={cn(
				"rounded-xl overflow-hidden border border-border bg-black",
				className,
			)}
		>
			<video
				src={src}
				poster={poster}
				controls
				autoPlay={autoplay}
				loop={loop}
				muted={muted}
				playsInline
				className="w-full h-auto max-h-[600px]"
			/>
		</div>
	);
}
