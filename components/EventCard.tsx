import Link from "next/link";
import Image from "next/image";

export type EventCardProps = {
	slug: string;
	title: string;
	image: string;
	date: string;
	time: string;
	location: string;
};

const EventCard = ({
	slug,
	title,
	image,
	date,
	time,
	location,
}: EventCardProps) => {
	return (
		<>
			<Link
				href={`/event/${slug}`}
				id="event-card"
				className="group block relative w-70 h-96"
			>
				<Image
					src={image}
					alt={title}
					fill={true}
					className="group-hover:scale-105 transition-all duration-300 rounded-lg"
				/>
			</Link>
			<div className="flex flex-row gap-1 my-4">
				<Image src="/icons/pin.svg" alt="pin" width={24} height={24} />
				<p className="text-sm">{location}</p>
			</div>
			<h3 className="text-lg font-bold mt-2">{title}</h3>
			<div className="flex flex-row gap-1 my-4 items-center">
				<Image
					src="/icons/calendar-alt.svg"
					alt="calendar"
					width={24}
					height={24}
				/>
				<p className="text-sm mr-2">{date}</p>
				<Image src="/icons/clock-alt.svg" alt="clock" width={20} height={20} />
				<p className="text-sm">{time}</p>
			</div>
		</>
	);
};

export default EventCard;
