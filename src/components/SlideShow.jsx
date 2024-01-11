// SlideShow.js
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSprings, config } from "@react-spring/web";
import Slide from "./Slide";

const SlideShow = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [isChangePage, setIsChangePage] = useState(false);

  const springs = useSprings(
    slides.length,
    slides.map((_, i) => ({
      from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
      to: {
        opacity: index === i ? 1 : 0,
        transform: `translate3d(0, ${index === i ? 0 : 100}%, 0)`,
      },
      config: config.stiff,
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setIsChangePage((prevIsContent) => true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 500);

    setTimeout(() => {
      setIsChangePage((prevIsContent) => false);
    }, 500);
  };

  const prevSlide = () => {
    setIsChangePage((prevIsContent) => true);

    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
      );
    }, 500);

    setTimeout(() => {
      setIsChangePage((prevIsContent) => false);
    }, 500);
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-white border-solid border-2 border-white rounded-full pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
          onClick={() => {
            prevSlide();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>

        <div
          className={`w-full h-full flex flex-col ml-8  ${
            isChangePage ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000`}
        >
          <p className="text-white font-bold text-4xl mb-4">
            {(currentIndex+1) + ". "} {slides[currentIndex].title}
          </p>
          <div className="text-white text-lg">
            {slides[currentIndex].content.map((item, index) => (
              <div key={index} className="mb-8">
                <p className="text-yellow-500 text-xl">{item.sub}</p>
                <ul className="list-disc pl-4">
                  {item.subContent &&
                    item.subContent.map((asd, subindex) => (
                      <li key={subindex}>{asd}</li>
                    ))}
                  {item.image &&
                    item.image.map((imgPath, subindex) => (
                      <img
                        className="w-auto  flex items-center"
                        src={imgPath}
                        alt="AEGONA"
                        data-retina={imgPath}
                        width="213"
                        height="40"
                      ></img>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-white border-solid border-2 border-white rounded-full pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
          onClick={() => {
            nextSlide();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </>
  );
};

export default SlideShow;
