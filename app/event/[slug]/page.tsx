import EventDetailItem from '@/components/EventDetailItem';
import EventAgenda from '@/components/EventAgenda';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import EventTags from '@/components/EventTags';
import BookEvent from '@/components/BookEvent';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BOOKINGS = 10;

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const data = await response.json();
  if (!data.event) {
    return notFound();
  }
  const event = data.event;
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
                    <EventDetailItem icon='/icons/check.png' alt='calendar' label='Date' />
                    <EventDetailItem icon='/icons/wait.png' alt='clock' label='Time' />
                    <EventDetailItem icon='/icons/pin.png' alt='location' label='Location' />
                    <EventDetailItem icon='/icons/laptop.svg' alt='mode' label='Mode' />
                    <EventDetailItem icon='/icons/user.png' alt='audience' label='Audience' />
                </section>
                <EventAgenda agendaItems={event.agenda} />
                <section className='flex-col-gap-2 '>
                    <h2>About the Organizer</h2>
                    <p>{event.organizer}</p>
                </section>
                <EventTags tags={JSON.parse(event.tags[0])} />
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
                <BookEvent />
            </aside>
        </div>
    </section>
  )
}

export default EventDetailsPage
