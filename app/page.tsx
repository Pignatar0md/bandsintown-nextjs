import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

export default function Page() {
	return (
		<section>
			<h1 className="text-center text-4xl font-bold">
				The hub for live music events <br /> Events near you
			</h1>
			<p className="text-center mt-5 text-xl">
				Music concerts, jams and more. All in one place.
			</p>
			<ExploreBtn />
			<div className="mt-20 space-y-7 max-w-7xl mx-auto">
				<h3>Featured Events</h3>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{events.map((item) => (
						<li key={item.title} className="event">
							<EventCard {...item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
