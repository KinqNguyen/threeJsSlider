import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "./Experience";
import SlideShow from './SlideShow';


export const slideAtom = atom(0);

export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  const [isContent, setIsContent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  const slides = [
    { id: 1, title:'Title 1' , content: [{sub:'Sub1',subContent:['SubContent1.1','SubContent1.2']},{sub:'Sub2',subContent:['SubContent2.1','SubContent2.2']},{sub:'Sub3',subContent:['SubContent3.1','SubContent3.2']}] },
    { id: 2, title:'Title 2', content: [{sub:'Sub1',subContent:['SubContent1.1','SubContent1.2']},{sub:'Sub2',subContent:['SubContent2.1','SubContent2.2']},{sub:'Sub3',subContent:['SubContent3.1','SubContent3.2']}] },
    { id: 3, title:'Title 3', content: [{sub:'Sub1',subContent:['SubContent1.1','SubContent1.2']},{sub:'Sub2',subContent:['SubContent2.1','SubContent2.2']},{sub:'Sub3',subContent:['SubContent3.1','SubContent3.2']}] },
  ];

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 2600);
  }, [slide]);

  function playSlide() {
    setIsContent((prevIsContent) => true);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", isContent);
  }
  function closeSlide() {
    setIsContent((prevIsContent) => false);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", isContent);
  }

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-black ${
          visible ? "" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <div className="flex justify-around mt-8 items-center">
          <img
            className="w-60  flex items-center"
            src="https://aegona.vn/wp-content/uploads/2019/11/logo-2.png"
            alt="AEGONA"
            data-retina="https://aegona.vn/wp-content/uploads/2019/11/logo-2.png"
            width="213"
            height="40"
          ></img>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                />
              </svg>
              <p className="font-semibold text-3xl">Simple ThreeJs UI</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4">
          <svg
            onClick={() => {
              setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
              setIsContent((prevIsContent) => false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
            onClick={() => {
              setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
              setIsContent((prevIsContent) => false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        {/* //Modal custom */}
        <div
          id="modalContainer"
          className={`flex bg-black bg-opacity-50 absolute w-full h-full items-center justify-center z-50 ${
            isContent ? "" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <div class="p-6 relative bg-black bg-opacity-50 rounded shadow-md h-3/4 w-9/12">
            <button
              id="closeModal"
              class="float-right text-white hover:text-red-900 pointer-events-auto  cursor-pointer "
              onClick={() => closeSlide()}
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
{scenes[displaySlide].slides && <SlideShow slides={scenes[displaySlide].slides} /> }
            

          </div>
        </div>

        <div
          className={`bg-gradient-to-t from-white/90 pt-20 pb-10 p-4 flex items-center flex-col text-center transition-opacity duration-1000 ${
            isContent ? "opacity-0" : ""
          } transition-opacity duration-1000`}
        >
          <h1 className="text-5xl font-extrabold">
            {scenes[displaySlide].name}
          </h1>
          <p className="text-opacity-60 italic">
            {scenes[displaySlide].description}
          </p>
          {scenes[displaySlide].slides &&
          (<div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex flex-col items-center">
            <div
              className="flex gap-2 items-center  pointer-events-auto hover:opacity-40 transition-opacity cursor-pointer"
              onClick={() => playSlide()}
            >
              <svg
                id="play-button"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 "
                viewBox="0 0 512 512"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
              </svg>
               <p className="font-semibold text-3xl">Play</p> 
              
            </div>
          </div>
        </div>)
          }
          
        </div>
      </div>
    </>
  );
};
