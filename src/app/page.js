"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import A-Frame components with no SSR
const Scene = dynamic(() => import("aframe-react").then((mod) => mod.Scene), {
	ssr: false,
});
const Entity = dynamic(() => import("aframe-react").then((mod) => mod.Entity), {
	ssr: false,
});

export default function Home() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		const loadAframe = async () => {
			await import("aframe");
			await import("aframe-ar");
			setIsClient(true);
		};

		loadAframe();
	}, []);

	if (!isClient) return null;

	return (
		<Scene
			embedded
			arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
		>
			<a-marker preset="hiro">
				<Entity
					position="0 0 0"
					rotation="0 0 0"
					scale="0.05 0.05 0.05"
					gltf-model="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
				/>
			</a-marker>
			<Entity camera />
		</Scene>
	);
}
