"use client";

import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiSend,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-amber-100 border-t border-slate-200 text-slate-600">
      {/* Upper Footer Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Column 1 - Brand Info */}
        <div className="lg:col-span-4 space-y-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider text-slate-900"
          >
            Mango<span className="text-amber-500">Cart</span>
          </Link>
          <p className="text-sm text-slate-600 leading-relaxed">
            Connecting premium, 100% formalin-free mango orchards directly to
            your doorstep. Experience the absolute heritage taste of pure
            Rajshahi mangoes.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-green-700 hover:text-white text-slate-500 transition-colors"
            >
              <FiFacebook size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-green-700 hover:text-white text-slate-500 transition-colors"
            >
              <FiInstagram size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-green-700 hover:text-white text-slate-500 transition-colors"
            >
              <FiTwitter size={16} />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-green-700 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/Explore"
                className="hover:text-green-700 transition-colors"
              >
                Explore Mangoes
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-green-700 transition-colors"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-green-700 transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Popular Varieties */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            Varieties
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/Explore?type=gopalbhog"
                className="hover:text-green-700 transition-colors"
              >
                Gopalbhog
              </Link>
            </li>
            <li>
              <Link
                href="/Explore?type=langra"
                className="hover:text-green-700 transition-colors"
              >
                Langra
              </Link>
            </li>
            <li>
              <Link
                href="/Explore?type=himsagar"
                className="hover:text-green-700 transition-colors"
              >
                Himsagar
              </Link>
            </li>
            <li>
              <Link
                href="/Explore?type=fazli"
                className="hover:text-green-700 transition-colors"
              >
                Fazli
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact & Newsletter */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            Stay Connected
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FiMapPin className="text-green-700 shrink-0" /> Rajshahi,
              Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-green-700 shrink-0" /> +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-green-700 shrink-0" />{" "}
              support@mangocart.com
            </li>
          </ul>

          {/* Newsletter Input with Requested Theme Focus Rules */}
          <form onSubmit={(e) => e.preventDefault()} className="pt-2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-orange-500 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center flex-shrink-0"
              >
                <FiSend size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lower Footer Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-500 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()} MangoCart. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="hover:text-green-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="hover:text-green-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
