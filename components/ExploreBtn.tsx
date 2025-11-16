"use client";
import Image from "next/image";

const ExploreBtn = () => {
	return (
		<button
			type="button"
			id="explore-btn"
			className="mt-7 mx-auto border border-black rounded-full px-4 py-2 flex items-center"
			onClick={() => console.log("ExploreBtn clicked")}
		>
			<a href="#events" className="flex items-center gap-2">
				Explore Events
				<Image
					alt="arrow down"
					src="/icons/arrow-down.svg"
					width={20}
					height={20}
				/>
			</a>
		</button>
	);
};

export default ExploreBtn;
