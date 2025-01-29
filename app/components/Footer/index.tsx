import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-accent text-accent-foreground mt-20 font-ibm">
            <div className="max-w-[100rem] mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-retro font-bold">ALLCAPZ</h3>
                        <p className="text-sm pr-24">Level up your space. Since 2025.</p>
                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/profile.php?id=61571980961696" className="hover:scale-[110%]">
                                <Facebook size={20} />
                            </Link>
                            <Link href="https://www.instagram.com/weallcapz/" className="hover:scale-[110%]">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://x.com/WEALLCAPZ" className="hover:scale-[110%]">
                                <Twitter size={20} />
                            </Link>
                            <Link href="https://www.linkedin.com/in/alllapz-%E2%80%8E-%E2%80%8E-%E2%80%8E-%E2%80%8E-55a037348/" className="hover:scale-[110%]">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-retro font-bold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about#us" className="text-sm hover:underline active:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#products" className="text-sm hover:underline active:underline">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#services" className="text-sm hover:underline active:underline">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#contact" className="text-sm hover:underline active:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-retro font-bold">Policies</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/privacy" className="text-sm hover:underline active:underline">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-sm hover:underline active:underline">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="/shipping" className="text-sm hover:underline active:underline">
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a href="/refunds" className="text-sm hover:underline active:underline">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-retro font-bold">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin size={20} />
                                <p className="text-sm">Faridabad, Haryana 121001</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={20} />
                                <p className="text-sm">+91 99101 28535</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={20} />
                                <p className="text-sm">support@allcapz.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-accent-foreground/20 my-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm">
                        © 2025 ALLCAPZ. All rights reserved.
                    </p>
                    <div className="flex space-x-4 text-sm">
                        <Link href="/terms" className="hover:underline active:underline">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:underline active:underline">
                            Privacy
                        </Link>
                        <Link href="/cookies" className="hover:underline active:underline">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;