import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { METHODS } from 'http';
import axios from 'axios'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PreviewPage() {
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);


    const [productId, setProductId] = useState("")

    const handleCheckout = async () => {
        const data = JSON.stringify({ priceId: productId })
        const res = await axios.post('/api/checkout_sessions', data, {
            headers: { "Content-Type": "application/json" }
        })
        window.location = await res.data.url
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md flex flex-col gap-5">
                        <div className='flex flex-row gap-5'>
                            <div className="card w-96 bg-base-100 shadow-xl card-compact">
                                <figure className='shadow-md'><img src="/macbook.webp" alt="m1" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Macbook</h2>
                                    {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={() => { setProductId("price_1NjO9DLVT2hitfm9EJhWp23p") }}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-96 bg-base-100 shadow-xl card-compact">
                                <figure className='shadow-md'><img src="/airpod.jpeg" alt="air" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Airpod</h2>
                                    {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={() => { setProductId("price_1NjONiLVT2hitfm9dlG32qzc") }}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <form action="/api/checkout_sessions" method='POST' > */}
                        <button className="btn btn-accent" onClick={handleCheckout}>Pay now !!!</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}