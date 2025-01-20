"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Auth from '../components/Auth';
import { useCartStore } from '../utils/store/cartStore';
import Link from 'next/link';

const Terms = () => {
    const { showCart } = useCartStore((state) => state);

    return (
        <>
            <div style={{ filter: showCart ? "blur(5px)" : "none" }} className="min-h-screen flex flex-col">
                <Navbar />

                <div className="text-accent marker:flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 text-sm sm:text-base">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">Terms of Service</h1>
                            <p className="text-sm">Last updated: January 1, 2025</p>
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Overview</h2>
                            <p>This website is operated by ALLCAPZ. Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to ALLCAPZ. We offer this website, including all information, tools and services available to you, conditioned upon your acceptance of these terms.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">1. Terms</h2>
                            <p>By accessing our website and making a purchase, you agree to these Terms of Service. If you do not agree to these terms, you must not use our website.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">2. Online Store Terms</h2>
                            <p>You must be at least 14 years old to use this website. You agree not to use our products for any illegal or unauthorized purpose. All payments are processed securely through Razorpay.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">3. Products and Services</h2>
                            <p>We sell posters through our online platform. Prices are subject to change without notice. Shipping is handled by Shiprocket. We reserve the right to modify or discontinue any product without notice.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">4. Accuracy of Information</h2>
                            <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, prices, or other content is accurate, complete, or current.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">5. Payment and Billing</h2>
                            <p>We use Razorpay for payment processing. You agree to provide current and accurate billing information. We reserve the right to refuse any order placed through our website.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">6. Third-Party Services</h2>
                            <p>We use Razorpay for payments and Shiprocket for deliveries. Your use of these services is subject to their respective terms and conditions. We are not responsible for the actions of these third-party services.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">7. Prohibited Uses</h2>
                            <p>You may not use our website for any unlawful purpose, transmit viruses, or attempt to gain unauthorized access to our systems.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">8. Limitation of Liability</h2>
                            <p>We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website or products.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">9. Governing Law</h2>
                            <p>These terms shall be governed by the laws of India.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">10. Changes to Terms</h2>
                            <p>We reserve the right to update these terms at any time. Changes will be effective immediately upon posting to the website.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">11. Refund and Cancellation Policy</h2>
                            <p>We are committed to customer satisfaction and have outlined our refund and cancellation policy below:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Refunds:</strong> Refunds are applicable only for damaged, wrong, missing, or lost products. Customers must contact us within 24 hours of delivery, providing proof (e.g., photos of the damaged or incorrect product).</li>
                                <li><strong>Process:</strong> Refunds will be processed to the original payment method via Razorpay. Shipping charges will not be deducted from the refund amount.</li>
                                <li><strong>Refund or Replacement:</strong> We offer a complete refund or a replacement item for damaged goods.</li>
                                <li><strong>Pre-Orders:</strong> The same refund policy applies to pre-order items, with no special exceptions.</li>
                                <li><strong>Cancellations:</strong> Orders can be canceled within 48 hours unless shipping has already commenced. If cancellation is requested after shipping, the refund will be processed minus shipping charges and taxes.</li>
                            </ul>
                            <p>For more details, please refer to our <Link href="/refund-policy" className="text-green-600 underline">Refund Policy Page</Link>.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Related Policies</h2>
                            <p>For more details about our policies, please refer to the following pages:</p>
                            <ul className="list-disc pl-6">
                                <li>
                                    <strong>Shipping Policy:</strong> Details about shipping timelines, costs, and processes can be found on our
                                    <Link href="/shipping" className="text-green-600 underline"> Shipping Policy</Link> page.
                                </li>
                                <li>
                                    <strong>Privacy Policy:</strong> For information on how we collect, use, and protect your personal data, please refer to our
                                    <Link href="/privacy" className="text-green-600 underline"> Privacy Policy</Link>.
                                </li>
                            </ul>
                        </section>


                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">Contact Information</h2>
                            <p>Questions about these Terms of Service should be sent to support@allcapz.in. For more details reach us via our <Link href={"/contact"} className="text-green-600 underline">Contact Page</Link>.</p>
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

export default Terms;

