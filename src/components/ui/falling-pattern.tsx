'use client';

import React from 'react';
import { cn } from '../../lib/utils';

type FallingPatternProps = React.ComponentProps<'div'> & {
	/** Primary color of the falling elements (default: 'rgba(255, 255, 255, 0.15)') */
	color?: string;
	/** Background color (default: 'transparent') */
	backgroundColor?: string;
	/** Animation duration in seconds (default: 40) */
	duration?: number;
	/** Pattern density - affects spacing (default: 1) */
	density?: number;
};

export function FallingPattern({
	color = 'rgba(255, 255, 255, 0.15)',
	backgroundColor = 'transparent',
	duration = 45,
	className,
}: FallingPatternProps) {
	// Pre-generate static repeating SVG pattern for GPU compositor layer
	// Using CSS transform: translateY runs entirely on the GPU compositor thread
	// with zero CPU layout / paint recalculations per frame.

	return (
		<div className={cn('relative h-full w-full overflow-hidden pointer-events-none', className)}>
			{/* GPU Animated Falling Stream Layer 1 */}
			<div
				className="absolute inset-0 w-full h-[200%] transform-gpu will-change-transform"
				style={{
					backgroundColor,
					backgroundImage: `
						radial-gradient(1.5px 80px at 40px 0px, ${color}, transparent),
						radial-gradient(1.5px 120px at 120px 80px, ${color}, transparent),
						radial-gradient(1.5px 90px at 220px 40px, ${color}, transparent),
						radial-gradient(1.5px 140px at 320px 120px, ${color}, transparent),
						radial-gradient(1.5px 70px at 420px 20px, ${color}, transparent),
						radial-gradient(1.5px 110px at 540px 90px, ${color}, transparent),
						radial-gradient(1.5px 130px at 660px 50px, ${color}, transparent),
						radial-gradient(1.5px 85px at 780px 140px, ${color}, transparent),
						radial-gradient(1px 1px at 80px 60px, ${color} 100%, transparent),
						radial-gradient(1px 1px at 260px 150px, ${color} 100%, transparent),
						radial-gradient(1px 1px at 480px 90px, ${color} 100%, transparent),
						radial-gradient(1px 1px at 700px 200px, ${color} 100%, transparent)
					`,
					backgroundSize: '820px 500px',
					animation: `fallingRain ${duration}s linear infinite`,
				}}
			/>

			{/* GPU Animated Falling Stream Layer 2 (Offset for depth) */}
			<div
				className="absolute inset-0 w-full h-[200%] opacity-60 transform-gpu will-change-transform"
				style={{
					backgroundImage: `
						radial-gradient(1px 60px at 80px 100px, ${color}, transparent),
						radial-gradient(1px 90px at 180px 30px, ${color}, transparent),
						radial-gradient(1px 75px at 360px 160px, ${color}, transparent),
						radial-gradient(1px 100px at 500px 60px, ${color}, transparent),
						radial-gradient(1px 80px at 620px 180px, ${color}, transparent),
						radial-gradient(1px 110px at 740px 40px, ${color}, transparent)
					`,
					backgroundSize: '760px 450px',
					animation: `fallingRain ${duration * 0.75}s linear infinite`,
				}}
			/>

			{/* Dotted Grid Overlay without CPU-heavy backdropFilter */}
			<div
				className="absolute inset-0 pointer-events-none opacity-30"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
					backgroundSize: '32px 32px',
				}}
			/>

			<style jsx global>{`
				@keyframes fallingRain {
					0% {
						transform: translate3d(0, -50%, 0);
					}
					100% {
						transform: translate3d(0, 0%, 0);
					}
				}
			`}</style>
		</div>
	);
}