'use client';
import { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div id="book-event">
            {submitted
            ? (<p>Thank you for sugning up</p>) 
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