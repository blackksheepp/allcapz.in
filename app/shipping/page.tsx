"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Auth from '../components/Auth';
import { useCartStore } from '../utils/store/cartStore';
import Link from 'next/link';

const Shipping = () => {
    const { showCart } = useCartStore((state) => state);

    return (
        <>
            <div style={{ filter: showCart ? "blur(5px)" : "none" }} className="min-h-screen flex flex-col">
                <Navbar />

                <div className="text-accent flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 text-sm sm:text-base">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">Shipping Policy</h1>
                            <p className="text-sm">Last updated: January 1, 2025</p>
                        </div>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Shipping Timeline</h2>
                            <p>Orders are usually dispatched within <strong>1–2 business days</strong> of placing the order.</p>
                            <p>Delivery typically takes <strong>7 working days</strong> within India.</p>
                            <p>For <strong>pre-ordered items</strong>, delivery will be based on the specified dates mentioned on our <strong>homepage</strong> or <strong>Instagram page</strong>.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Shipping Process</h2>
                            <p>We use <strong>Shiprocket</strong> as a third-party service to ensure reliable delivery. We share your <strong>delivery address</strong> and <strong>contact details</strong> with Shiprocket to facilitate this.</p>
                            <p>Orders are processed and shipped throughout the week, excluding Sundays and public holidays.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Free Shipping</h2>
                            <p>ALLCAPZ offers <strong>free shipping</strong> for all orders within India.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Order Cancellation</h2>
                            <p className="">Orders can be <strong>canceled within 24 hours</strong> of placing the order, <strong>before dispatch</strong>.</p>
                            <p className="mt-2">Once an order has been <strong>dispatched</strong>, cancellations are <strong>no longer possible</strong> due to the nature of shipping and handling. We are unable to retrieve packages once they are on their way to you, as it may cause damage to the product and packaging material.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Damaged Goods</h2>
                            <p>In the rare case that your order is <strong>damaged upon delivery</strong>, please reach out to us immediately. We offer <strong>refunds or replacements</strong> for damaged goods. The product need not be shipped back to us.</p>
                            <p className="mt-2">For more details, please visit our <Link href="/refunds" className="text-green-500 underline">Refund Policy</Link>.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Tracking Information</h2>
                            <p>Tracking details will be sent to you via <strong>email or SMS</strong> by <strong>Shiprocket</strong> once your order is dispatched.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Address Details</h2>
                            <p>We store your <strong>delivery address</strong> and <strong>contact information</strong> for order fulfillment purposes. You can choose to delete your address at any time through your account settings.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Exceptional Circumstances</h2>
                            <p>While we strive to meet the estimated delivery time, please note that during peak seasons or due to unforeseen circumstances, deliveries may experience delays.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Customer Support</h2>
                            <p>If you have any questions about your order or experience issues with delivery, feel free to contact us at [your email/phone number]. We&apos;re here to help!</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Contact us</h2>
                            <p>If you have any questions regarding your order, please contact us at support@allcapz.in. For more details reach us via our <Link href={"/contact"} className="text-green-600 underline">Contact Page</Link>.</p>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>

            <Cart />
            <Auth />
        </>
    );
};

export default Shipping;
