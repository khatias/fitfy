import React from "react";
import { Link } from "@/i18n/routing";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black p-4 text-center text-sm text-white md:text-left md:p-6 md:text-base">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="mb-4 md:mb-0 w-full md:w-1/3">
          <h3 className="font-semibold mb-2 text-gray-300">About Us</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Buy and sell clothes easily on our marketplace. Find trendy fashion
            or unique second-hand pieces. Join us today!
          </p>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="font-semibold mb-2 text-gray-300">Quick Links</h3>
          <div className="flex flex-col md:flex-row">
            <Link href="/home" className="mr-4 hover:underline text-white">
              privacy-policy
            </Link>
            <Link href="/about" className="mr-4 hover:underline text-white">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="font-semibold mb-2 text-gray-300">Contact</h3>
          <p className="text-sm text-gray-400">
            Email: sikharulidzekhatiaa@gmail.com
          </p>
          <p className="text-sm text-gray-400">Phone: +1 123 456 7890</p>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto mt-4 md:mt-0  md:text-left text-gray-400">
        <p>&copy; {currentYear} Fitify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
