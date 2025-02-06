"use client";
// import Hero from "@/components/Hero/Hero";
import Carousel from "@/components/Carousel/Carousel";
import image1 from "../../assets/clothes2.jpg";
import image2 from "../../assets/5241bce36fd8531ce6306b8aa69a8048.jpg";
import image6 from "../../assets/variety-women-s-fashion-comfortable-shoes-all-seasons-light-background-top-view.jpg";
import image7 from "../../assets/bag.png";
import clothes from "../../assets/spring-wardrobe-switch-still-life.jpg";
import glasses from "../../assets/glasses.jpg";
import coats from "../../assets/coats.jpg";
import jewellery from "../../assets/jewellery.jpg";
import dresses from "../../assets/dresses.jpg";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const items = [
    {
      image: image2,
      title: t("discoverglasses"),
      link: "/category/9",
    },
    {
      image: image7,
      link: "/category/3",
      title: t("discoverBags"),
    },
    {
      image: image1,
      title: t("discoverAccessories"),
      link: "/category/6",
    },
  ];

  return (
    <div className="max-w-[1300px] m-auto">
      <div>
        <div className="py-4">
          <Carousel items={items} />
        </div>
      </div>
      <section className="bg-[#e3ecde] dark:bg-[#1a202c] text-[#333] dark:text-white py-12 px-6 rounded-lg shadow-sm transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4 dark:text-yellow-400">
          {t("subscriptionTitle")}
        </h2>
        <p className="text-lg mb-4">{t("subscriptionDesc")}</p>
        <Link
          href="/subscription"
          className="inline-block text-blue-600 hover:underline dark:text-blue-400 transition-colors duration-300"
        >
          {t("upgrade")}
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-6  px-6 py-10   text-center">
        {[
          {
            title: t("accessores"),
            image: glasses,
            link: "/category/6",
          },
          { title: t("clothing"), image: clothes, link: "/category/5" },
          { title: t("coats"), image: coats, link: "/category/1" },
          { title: t("jewellery"), image: jewellery, link: "/category/7" },
          { title: t("shoes"), image: image6, link: "category/4" },
          { title: t("dresses"), image: dresses, link: "/category/2" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 hover:scale-105 transition-transform">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                quality={100}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              <Link href={item.link} className="hover:underline">
                {item.title}
              </Link>
            </h2>
          </div>
        ))}
      </section>
      <section>
        <h2></h2>
        <p></p>
        <Link href="./subscription"></Link>
      </section>

      <section></section>
    </div>
  );
}
