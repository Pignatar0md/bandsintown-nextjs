'use client';
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error, success } = await createBooking({ eventId, slug, email });
        if (success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email });
        } else {
            console.log(error);
            posthog.captureException('event_booking_failed');
        }
    };

    return (
        <div id="book-event">
            {submitted
            ? (<p>Thank you for signing up</p>) 
            : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your e-mail address"
                            required
                        />
                    </div>
                    <button className="button-submit" type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default BookEvent