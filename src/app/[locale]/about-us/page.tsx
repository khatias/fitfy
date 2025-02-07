import React from 'react';
import { Link } from '@/i18n/routing';

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 max-w-screen-xl mx-auto h-[80vh]">
      <div className="px-6 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between lg:flex-col lg:justify-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-300 lg:text-center">
              About Us - Your Sustainable Style Destination
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 transition-colors duration-300">
              Welcome to Fitify, a community-driven platform where fashion finds a second life. We believe in a circular economy and the power of sustainable style. Our mission is to make buying and selling pre-loved clothing easy, affordable, and fun!
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 transition-colors duration-300">
              We&apos;re passionate about reducing textile waste and promoting conscious consumerism. By connecting individuals who want to refresh their wardrobes with those seeking unique and affordable pieces, we&apos;re creating a more sustainable fashion ecosystem.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 transition-colors duration-300">
              Whether you&apos;re decluttering your closet or searching for that perfect vintage find, Fitify is your go-to destination. Join our community of stylish and eco-conscious individuals and discover a new way to love fashion.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/create-product" 
                className="bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                Start Selling / Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
