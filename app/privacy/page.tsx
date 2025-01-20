"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Auth from '../components/Auth';
import { useCartStore } from '../utils/store/cartStore';
import Link from 'next/link';

const Privacy = () => {
  const { showCart } = useCartStore((state) => state);

  return (
    <>
      <div style={{ filter: showCart ? "blur(5px)" : "none" }} className="min-h-screen flex flex-col">
        <Navbar />

        <div className="text-accent flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 text-sm sm:text-base">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
              <p className="text-sm">Last updated: January 1, 2025</p>
            </div>

            <p className="text-sm sm:text-base">This privacy policy governs your use of ALLCAPZ (&quot;Website&quot;), a poster selling website created by ALLCAPZ.</p>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">What information does the Website obtain and how is it used?</h2>
              <h3 className="text-lg font-semibold mb-2">User Provided Information</h3>
              <p>When you use our Website and place orders, you provide:</p>
              <ul className="list-disc pl-6 my-2 space-y-1">
                <li>Your name, email address, and phone number</li>
                <li>Shipping address for order delivery</li>
                <li>Transaction-related information when making purchases</li>
              </ul>
            </section>

            {/* Rest of the sections with same structure */}
            <section>
              <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
              <p>The Website only uses session cookies essential for maintaining your shopping cart and login state.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">Do third parties see and/or have access to information obtained by the Website?</h2>
              <p>We share your information with third parties only in the ways described in this privacy statement:</p>
              <ul className="list-disc pl-6 my-2 space-y-1">
                <li>Razorpay - For processing your payments securely</li>
                <li>Shiprocket - For delivering your orders</li>
                <li>As required by law, such as to comply with legal process</li>
                <li>When we believe disclosure is necessary to protect our rights or investigate fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">Data Retention Policy, Managing Your Information</h2>
              <p>We retain order records indefinitely for tracking purposes. If you&apos;d like to delete your shipping address data, please contact us at support@allcapz.in.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">Security</h2>
              <p>We are concerned about safeguarding your information. Payments are securely processed through Razorpay, and we limit access to your personal information to authorized personnel only.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">Changes</h2>
              <p>This Privacy Policy may be updated from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">Your Consent</h2>
              <p>By using the Website, you consent to our processing of your information as set forth in this Privacy Policy now and as amended by us.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold my-4">Contact us</h2>
              <p>If you have any questions regarding privacy while using the Website, please contact us at support@allcapz.in. For more details reach us via our <Link href={"/contact"} className="text-green-600 underline">Contact Page</Link>.</p>
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

export default Privacy;