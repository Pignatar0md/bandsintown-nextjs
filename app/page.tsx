import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { Event } from "@/database";
// import { events } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function Page() {


	const response = await fetch(`${BASE_URL}/api/events`);
	const data = await response.json();
	const events = data.events;
	
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
					{events && events.length > 0 && events.map((item: Event) => (
						<li key={item.title} className="event">
							<EventCard {...item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
