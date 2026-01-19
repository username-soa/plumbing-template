"use client";
import Image from "next/image";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
	before: string;
	after: string;
	beforeLabel?: string;
	afterLabel?: string;
	className?: string;
}

export function BeforeAfter({
	before,
	after,
	beforeLabel = "Before",
	afterLabel = "After",
	className,
}: BeforeAfterProps) {
	const [sliderPosition, setSliderPosition] = React.useState(50);

	return (
		<div
			className={cn(
				"relative w-full aspect-video rounded-xl overflow-hidden select-none border border-border my-6",
				className,
			)}
		>
			{/* After Image (Background) */}
			<div className="absolute inset-0">
				<Image
					src={after}
					alt="After result"
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Before Image (Foreground, clipped) */}
			<div
				className="absolute inset-0 overflow-hidden border-r-2 border-white/80"
				style={{ width: `${sliderPosition}%` }}
			>
				{/* Inner container with fixed width to prevent image repositioning */}
				<div
					className="absolute inset-0"
					style={{ width: `${100 / (sliderPosition / 100)}%` }}
				>
					<Image
						src={before}
						alt="Before state"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>

			{/* Slider Control */}
			<div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
				<input
					type="range"
					min="0"
					max="100"
					value={sliderPosition}
					onChange={(e) => setSliderPosition(parseInt(e.target.value, 10))}
					className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
					aria-label="Compare before and after images"
				/>
				<div
					className="absolute h-full w-10 flex items-center justify-center pointer-events-none z-10"
					style={{ left: `calc(${sliderPosition}% - 20px)` }}
				>
					<div className="h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="text-primary"
							aria-hidden="true"
						>
							<path
								d="M18 8L22 12L18 16"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6 8L2 12L6 16"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Fixed Labels (always visible) */}
			<div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm font-medium backdrop-blur-sm pointer-events-none z-30">
				{beforeLabel}
			</div>
			<div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm font-medium backdrop-blur-sm pointer-events-none z-30">
				{afterLabel}
			</div>
		</div>
	);
}
