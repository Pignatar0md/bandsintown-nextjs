import EventDetailItem from '@/components/EventDetailItem';
import EventAgenda from '@/components/EventAgenda';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import EventTags from '@/components/EventTags';
import BookEvent from '@/components/BookEvent';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import EventCard from '@/components/EventCard';
import { cacheLife } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BOOKINGS = 10;

const getSimilarEvents = async (slug: string) => {
  const similarEvents = await getSimilarEventsBySlug(slug);
  return similarEvents;
};

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  'use cache';
  cacheLife('hours');
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const data = await response.json();
  if (!data.event) {
    return notFound();
  }
  const event = data.event;
  const similarEvents = await getSimilarEvents(slug);
  
  return (
    <section id="event">
        <div className='header'>

        <h1>Event Description</h1>
        <p  >{event.description}</p>
        </div>
        <div className='details'>
            <div className='content'>
                <Image src={event.image} alt='event banner' className='banner' width={800} height={800} />
                <section className='flex-col-gap-2 '>
                    <h2>Overview</h2>
                    <p>{event.overview}</p>
                </section>
                <section className='flex-col-gap-2 '>
                    <h2>Event Details</h2>
                    <EventDetailItem icon='/icons/check.png' alt='calendar' label={event.date} />
                    <EventDetailItem icon='/icons/wait.png' alt='clock' label={event.time} />
                    <EventDetailItem icon='/icons/pin.png' alt='location' label={event.location} />
                    <EventDetailItem
                      icon={event.mode === 'insite' ? `/icons/insite.png`
                        : event.mode === 'online' ? `/icons/online.png`
                        : `/icons/hybrid.png`}
                      alt='mode'
                      label={event.mode}
                    />
                    <EventDetailItem icon='/icons/user.png' alt='audience' label={event.audience} />
                </section>
                <EventAgenda agendaItems={event.agenda} />
                <section className='flex-col-gap-2 '>
                    <h2>About the Organizer</h2>
                    <p>{event.organizer}</p>
                </section>
                <EventTags tags={event.tags} />
            </div>
            <aside className='booking'>
                <div className='signup-card'>
                    <h2>Book your spot</h2>
                    {
                        BOOKINGS > 0 ? (
                            <p className='text-sm'>Join {BOOKINGS} people who have already booked their spot</p>
                        ) : (
                            <p className='text-sm'>Be the first to book your spot</p>
                        )
                    }
                </div>
                <BookEvent eventId={event._id} slug={slug} />
            </aside>
        </div>
        <div className='flex w-full flex-col gap-4 pt-20'>
            <h2>Similar Events</h2>
            <div className='events'>
                {Array.isArray(similarEvents) && similarEvents.length > 0 && similarEvents.map((eventObj: any, idx: number) => (
                    <EventCard 
                        key={eventObj?.id ?? idx}
                        slug={eventObj?.slug}
                        title={eventObj?.title}
                        image={eventObj?.image}
                        date={eventObj?.date}
                        time={eventObj?.time}
                        location={eventObj?.location}
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default EventDetailsPage
