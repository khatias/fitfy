"use client";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface SlideItem {
  image: StaticImageData;
  title: string;
  link: string;
}

interface CarouselProps {
  items: SlideItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const t = useTranslations("HomePage");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 flex flex-col sm:flex-row items-center"
          >
            <div className="w-full sm:w-1/2">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={400}
                className="w-full h-[450px] lg:h-[600px] object-cover"
              />
            </div>
            <div className="w-full text-white h-full sm:w-1/2 p-6 sm:pr-12 text-center bg-black sm:text-left flex flex-col items-start justify-center">
              <h3 className="text-2xl lg:text-5xl font-semibold mb-4">
                {item.title}
              </h3>
              <Link
                href={item.link}
                className="text-base sm:text-lg flex items-center gap-4 justify-center hover:underline"
              >
                <span>{t("shopnow")}</span>
                <ArrowRightIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
