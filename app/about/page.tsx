"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Auth from '../components/Auth';
import { useCartStore } from '../utils/store/cartStore';
import { useParams } from 'next/navigation';
import { GetImage } from '../components';

const About = () => {
    const { showCart } = useCartStore((state) => state);
    const placeholderImg = "https://img.freepik.com/premium-photo/road-amidst-buildings-city-against-sky_1048944-6397649.jpg?semt=ais_hybrid";

    const params = useParams();
    const [section, setSection] = useState<string>('')
    useEffect(() => {
        const update = () => {
            setSection(window.location.href.substring(window.location.href.indexOf('/', 9)).split("#")[1])
        };
        window.addEventListener('hashchange', update);
        update();
        return () => window.removeEventListener('hashchange', update)
    }, [params])

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const [, hash] = url.split('#');
            if (hash) {
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth',
                    });
                }
            }
        };

        handleRouteChange(window.location.href)
    }, [section]);

    return (
        <>
            <div style={{ filter: showCart ? "blur(5px)" : "none" }} className="min-h-screen flex flex-col bg-black">
                <Navbar />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-32 flex-grow">
                    {/* About Section */}
                    <section id="us" className="relative">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-2">ABOUT US</h1>
                        <p className="text-lg sm:text-xl text-green-500 mb-8 sm:mb-12"></p>

                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center mb-8 sm:mb-12">
                            <div className="relative h-[500px] sm:h-[600px] md:h-[750px] lg:[700px] w-full">
                                <Image
                                    src={GetImage('img/about/2.avif')}
                                    alt="Artist studio"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-3xl sm:text-4xl font-bold text-accent tracking-wider">ALLCAPZ</h2>
                                <p className="text-accent text-base sm:text-lg leading-relaxed">
                                    WELCOME TO ALLCAPZ! I&apos;M <Link href="https://www.instagram.com/saharshpng/" className="text-green-500 underline">@SAHARSHPNG</Link>, THE PERSON BEHIND THIS BRAND.

                                    THIS WHOLE JOURNEY STARTED WITH A SIMPLE IDEA—I WANTED TO SHARE MY ART WITH YOU, SO YOU COULD BRING IT INTO YOUR SPACE AND ENJOY IT EVERY DAY. TURNING MY DIGITAL CREATIONS INTO PHYSICAL PRINTS FELT LIKE THE BEST WAY TO DO THAT.
                                </p>
                                <p className="text-accent text-base sm:text-lg">
                                    TO MAKE SURE YOU GET ONLY THE BEST, I WENT ALL OUT. I VISITED TONS OF PRINT SHOPS, TESTED DIFFERENT PAPER QUALITIES, CHECKED OUT INKS, AND FIGURED OUT THE PERFECT PACKAGING. AFTER ALL, YOUR POSTERS DESERVE TO LOOK AMAZING AND REACH YOU IN PERFECT CONDITION.

                                    WHEN IT CAME TO THE STORE, I PARTNERED WITH MY DEVELOPER TO CREATE A SITE THAT REFLECTS MY VIBE AND MAKES IT EASY FOR YOU TO BROWSE AND BUY. AFTER A LONG WAIT, ALLCAPZ IS FINALLY LIVE!
                                </p>
                                <p className="text-accent text-base sm:text-lg">
                                    TAKE A LOOK AROUND, AND I HOPE YOU FIND SOMETHING YOU&apos;D LOVE TO HAVE ON YOUR WALL. IF YOU DO, GRAB IT AND LET MY ART BE PART OF YOUR SPACE. YOUR FEEDBACK MEANS THE WORLD TO ME, SO FEEL FREE TO SHARE YOUR THOUGHTS ANYTIME.

                                    THANKS FOR BEING HERE—HAPPY SHOPPING! 
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative h-[200px] sm:h-[250px] md:h-[300px]">
                                <Image
                                    src={GetImage('img/about/5.avif')}
                                    alt={`Gallery image 1`}
                                    fill
                                    style={{objectPosition: "bottom: 40px"}}
                                    className="object-cover w-full"
                                />
                            </div>
                            <div className="relative h-[200px] sm:h-[250px] md:h-[300px]">
                                <Image
                                    src={GetImage('img/about/4.avif')}
                                    alt={`Gallery image 2`}
                                    fill
                                    className="object-cover w-full"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Products Section */}
                    <section id="products">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-2">OUR PRODUCTS</h2>
                        <p className="text-lg sm:text-xl text-green-500 mb-8 sm:mb-12">CRAFT & QUALITY</p>

                        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                            <div className="space-y-6 sm:space-y-8">
                                <div className="space-y-4 p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-colors">
                                    <h3 className="text-xl sm:text-2xl font-bold text-accent">PREMIUM MATERIALS</h3>
                                    <p className="text-accent text-base sm:text-lg">
                                        WE USE ONLY THE FINEST 300 GSM GLOSS/MATTE FINISH PAPER, ENSURING YOUR ART
                                        PIECE MAINTAINS ITS QUALITY. OUR ARCHIVAL INKS ARE
                                        CAREFULLY SELECTED TO PROVIDE DEEP, RICH COLORS THAT STAND THE TEST OF TIME.
                                    </p>
                                </div>

                                <div className="space-y-4 p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-colors">
                                    <h3 className="text-xl sm:text-2xl font-bold text-accent">SIZE RANGE</h3>
                                    <ul style={{ listStyle: "square" }} className="text-accent space-y-2 text-base sm:text-lg ml-4">
                                        <li>A4 (8.3 × 11.7inches) - PERFECT FOR INTIMATE SPACES</li>
                                        <li>A3 (11.7 × 16.5inches) - OUR MOST POPULAR SIZE</li>
                                        <li>A2 (16.5 × 23.4inches) - FOR STATEMENT PIECES</li>
                                        <li>CUSTOM SIZES AVAILABLE FOR SPECIAL REQUIREMENTS</li>
                                    </ul>
                                </div>

                                <div className="space-y-4 p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-colors">
                                    <h3 className="text-xl sm:text-2xl font-bold text-accent">QUALITY ASSURANCE</h3>
                                    <p className="text-accent text-base sm:text-lg">
                                        EVERY PRINT GOES THROUGH OUR RIGOROUS QUALITY CONTROL.
                                        WE CHECK FOR COLOR ACCURACY AND FLAWLESS DETAILS.
                                        YOUR SATISFACTION GUARANTEED FOR 30 DAYS.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
                                    <Image
                                        src={GetImage('img/about/7.avif')}
                                        alt={`Product image`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
                                    <Image
                                        src={GetImage('img/about/8.avif')}
                                        alt={`Product image`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
                                    <Image
                                        src={GetImage('img/about/10.avif')}
                                        alt={`Product image`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
                                    <Image
                                        src={GetImage('img/about/14.avif')}
                                        alt={`Product image`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section id="services">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-2">SERVICES</h2>
                        <p className="text-lg sm:text-xl text-green-500 mb-8 sm:mb-12">SEAMLESS INTEGRATION, SUPERIOR EXPERIENCE</p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            {['PAYMENTS', 'SHIPPING', 'PLATFORM'].map((service, index) => (
                                <div key={service} className="bg-zinc-900/50 p-6 sm:p-8 border border-green-500/20 hover:border-green-500/40 transition-colors">
                                    <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">{service}</h3>
                                    <p className="text-accent mb-4 text-base sm:text-lg">
                                        {service === 'PAYMENTS' && 'PARTNERED WITH RAZORPAY FOR SECURE TRANSACTIONS. WE OFFER MULTIPLE PAYMENT OPTIONS INCLUDING UPI, CREDIT CARDS, AND NET BANKING.'}
                                        {service === 'SHIPPING' && 'SHIPROCKET POWERS OUR DELIVERY NETWORK, ENSURING YOUR ART REACHES YOU SAFELY AND ON TIME. TRACK YOUR ORDER IN REAL-TIME.'}
                                        {service === 'PLATFORM' && 'OUR CUSTOM PLATFORM OFFERS A SEAMLESS EXPERIENCE WITH REAL-TIME PREVIEWS AND DETAILED ARTWORK INFORMATION.'}
                                    </p>
                                    <div className="relative h-[150px] sm:h-[200px]">
                                        <Image
                                            src={service === "PAYMENTS" ? GetImage('img/about/11.avif') : service === "SHIPPING" ? GetImage('img/about/13.avif') : GetImage('img/about/12.avif')}
                                            alt={`${service.toLowerCase()} interface`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section id="contact">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-2">CONTACT US</h2>
                        <p className="text-lg sm:text-xl text-green-500 mb-8 sm:mb-12">LET&apos;S TALK ART</p>

                        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                            <div className="space-y-6 sm:space-y-8 p-6 sm:p-8 border border-green-500/20">
                                {[
                                    {
                                        title: 'BUSINESS HOURS',
                                        content: ['MONDAY - FRIDAY: 12:00 AM - 6:00 PM', 'SATURDAY: 12:00 AM - 6:00 PM', 'SUNDAY: CLOSED']
                                    },
                                    {
                                        title: 'LOCATION',
                                        content: ['G1 32', 'Indra Enclave, Sector 21D', 'Faridabad, Haryana 121001']
                                    },
                                    {
                                        title: 'EMAIL US',
                                        content: ['SUPPORT@ALLCAPZ.IN']
                                    }
                                ].map((section) => (
                                    <div key={section.title} className="space-y-4 sm:space-y-6">
                                        <h3 className="text-xl sm:text-2xl font-bold text-accent">{section.title}</h3>
                                        <div className="text-accent text-base sm:text-lg">
                                            {section.content.map((line) => (
                                                <p key={line}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold text-accent">SOCIAL</h3>
                                    <p className="text-accent text-base sm:text-lg">
                                        CONNECT WITH OUR COMMUNITY ON INSTAGRAM<br/ >TO KEEP UPDATED WITH LATEST DROPS <br />JOIN US AT <Link href="https://instagram.com/weallcapz" className="text-green-500 hover:text-green-400">@WEALLCAPZ</Link>
                                    </p>
                                </div>
                            </div>
                            <div className="relative h-[400px] sm:h-[600px] md:h-[800px]">
                                <Image
                                    src={GetImage('img/about/1.avif')}
                                    alt="Office space"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
            <Cart />
            <Auth />
        </>
    );
};

export default About;