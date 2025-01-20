"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Auth from '../components/Auth';
import { useCartStore } from '../utils/store/cartStore';
import Link from 'next/link';

const Refunds    = () => {
    const { showCart } = useCartStore((state) => state);

    return (
        <>
            <div style={{ filter: showCart ? "blur(5px)" : "none" }} className="min-h-screen flex flex-col">
                <Navbar />

                <div className="text-accent marker:flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 text-sm sm:text-base">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">Refund Policy</h1>
                            <p className="text-sm">Last updated: January 1, 2025</p>
                        </div>

                        <section className="space-y-4">
                            <p>We are committed to ensuring customer satisfaction. Our refund policy is designed to address situations where a refund is necessary, and is not an option for regular returns. Refunds will only be processed under the following circumstances:</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Eligibility for Refunds</h2>
                            <p>Refunds are available only in the following cases:</p>
                            <ul className="list-disc pl-6">
                                <li><strong>Damaged Products</strong>: If your product arrives damaged.</li>
                                <li><strong>Wrong Products</strong>: If the product received does not match your order.</li>
                                <li><strong>Missing Products</strong>: If part of your order is missing.</li>
                                <li><strong>Lost Products</strong>: If your order is lost in transit.</li>
                            </ul>
                            <p>If any of the above issues occur, please contact us within <strong>24 hours</strong> of delivery for immediate assistance.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">To initiate a refund request, we will require:</h2>
                            <ul className="list-disc pl-6">
                                <li>Photos of the product showing the damage or incorrect item.</li>
                                <li>Proof of purchase.</li>
                            </ul>
                            <p><strong>Note:</strong> Refunds are not available for any other reasons beyond the conditions listed above.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Refund Process</h2>
                            <p>Once your refund request is approved, we will process it within 5-7 business days (standard refunds). Razorpay allows instant refunds for some transactions, and in such cases, your refund will be processed almost immediately. Refunds will be credited to your original payment method via Razorpay.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Refund or Replacement for Damaged or Incorrect Products</h2>
                            <p>If you receive a damaged or incorrect product, there’s no need to return it. Since our products are posters, you may dispose of the item as you see fit. For such cases, we offer two options:</p>
                            <ul className="list-disc pl-6">
                                <li><strong>Full Refund:</strong> Receive a complete refund credited to your original payment method.</li>
                                <li><strong>Replacement:</strong> Get a new product sent to you at no additional cost.</li>
                            </ul>
                            <p>You can choose the option that works best for you when submitting your request. Both options are subject to eligibility as outlined in our refund policy.</p>
                        </section>


                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Exemptions and Restrictions</h2>
                            <ul className="list-disc pl-6">
                                <li><strong>Pre-order Items:</strong> Pre-order items follow the same refund policy, with no special exceptions.</li>
                                <li><strong>Shipping Costs:</strong> Shipping costs will not be refunded, even if a refund is issued.</li>
                                <li><strong>Non-Returnable Items:</strong> We do not accept returns or cancellations for products that fall outside the conditions mentioned above.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Contact Us</h2>
                            <p>If you believe you are eligible for a refund or if you need assistance with your refund request, please call us at <strong>+91 99101 28535</strong> asap. For more details reach us via our <Link href={"/about#contact"} className="text-green-600 underline">Contact Page</Link>.</p>
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

export default Refunds;
