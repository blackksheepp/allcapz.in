"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Auth from '../components/Auth';
import { useCartStore } from '../utils/store/cartStore';
import Link from 'next/link';

const Cookies = () => {
    const { showCart } = useCartStore((state) => state);

    return (
        <>
            <div style={{ filter: showCart ? "blur(5px)" : "none" }} className="min-h-screen flex flex-col">
                <Navbar />

                <div className="text-accent flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 text-sm sm:text-base">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">Cookie Policy</h1>
                            <p className="text-sm">Last updated: January 1, 2025</p>
                        </div>

                        <p className="text-sm sm:text-base">This cookie policy explains how ALLCAPZ (&quot;Website&quot;) uses cookies and similar technologies to ensure essential website functionality.</p>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">What are Cookies?</h2>
                            <p>Cookies are small text files that are stored on your device when you visit our website. They help us maintain basic website functionality and your user experience.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">How We Use Cookies</h2>
                            <p>We only use essential session cookies that are strictly necessary for the website to function properly. These cookies are used to:</p>
                            <ul className="list-disc pl-6 my-2 space-y-1">
                                <li>Maintain your shopping cart during your visit</li>
                                <li>Keep you logged in during your session</li>
                                <li>Enable basic website functionality</li>
                            </ul>
                            <p className="mt-4">Our session cookies are temporary and are deleted when you close your browser.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Types of Cookies We Use</h2>
                            <h3 className="text-lg font-semibold mb-2">Essential Session Cookies</h3>
                            <p>These are the only cookies we use:</p>
                            <ul className="list-disc pl-6 my-2 space-y-1">
                                <li>Session ID cookie - To maintain your login status</li>
                                <li>Cart cookie - To remember items in your shopping cart</li>
                            </ul>
                            <p className="mt-4">We do not use any advertising, analytics, or third-party cookies.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Managing Cookies</h2>
                            <p>Since we only use essential cookies, disabling them may prevent our website from functioning properly. However, you can manage or delete cookies through your browser settings. Please note that restricting essential cookies may impact your ability to use our website&apos;s features.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Changes to This Policy</h2>
                            <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold my-4">Contact Us</h2>
                            <p>If you have any questions about our use of cookies, please contact us at support@allcapz.in. For more details reach us via our <Link href={"/about#contact"} className="text-green-600 underline">Contact Page</Link>.</p>
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

export default Cookies;