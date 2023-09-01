"use client";
import React, { useEffect } from "react";
import AlienHouse from "./alien-house";
import GreenGuy from "./intro-green-guy";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";

const StoryTimeline = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    const alienHouse = document.querySelector("section.alien-house");
    const greenGuy = document.querySelector("section.green-guy");
    const scenery = document.querySelector("section.scenery");
    const images = document.querySelectorAll("div.scene-layers img");
    const infoText = document.querySelector("h1.info-text");

    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.set(alienHouse, { opacity: 0, zIndex: 0 });
    gsap.set(scenery, { opacity: 0 });
    gsap.set(images, {
      x: (index) => {
        return index * 100 + 300 + "vh";
      },
    });
    gsap.set(infoText, {opacity: 0});

    timeline
      .to(greenGuy, { opacity: 0, duration: 3 })
      .addLabel("startScene")
      .to(scenery, { opacity: 1 }, "startScene")
      .to(infoText, {opacity: 1, delay: 3})
      .to(infoText, {opacity: 0, delay: 3})
      .to(images, { x: "0vh", duration: 10, ease: "linear" }, "startScene")
      .addLabel("endScene")
      .to(scenery, { opacity: 0 }, "endScene")
      .to(alienHouse, { opacity: 1, zIndex: 2, delay: 1 }, "endScene");

    timeline.pause();

    let update

    window.addEventListener("scroll", function () {
      const pixels = window.scrollY;
      const currentTime = pixels / 660;

      cancelAnimationFrame(update)
      update = this.requestAnimationFrame(function() {
        timeline.seek(currentTime);
      })
      
    });
  }, []);

  return (
    <div className="fade-in relative">
      <section className="fixed alien-house w-screen h-screen top-0 left-0 flex flex-col justify-center items-center">
        <div><AlienHouse /></div>
      </section>

      <section className="scenery">
        <div className="scene-layers fixed top-0 left-0 w-screen h-screen">
          <img src="/mountains-back.svg"></img>
          <img src="/mountains-front.svg"></img>
          <img src="/main-scene.svg"></img>
          <div className="w-screen h-screen flex justify-center items-center">
            <h1 className="info-text fixed text-5xl text-white font-bold text-center">we&apos;re almost there...</h1>
          </div>
          <img src="/trees.svg"></img>
        </div>
      </section>

      <section className="-z-10 green-guy w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center text-white">
        <div>
          <GreenGuy />
        </div>

        <h1 className="text-5xl text-center font-bold mt-8">
          welcome to my home planet.
        </h1>
        <h2 className="text-2xl text-center mt-2">keep scrolling, stranger!</h2>
      </section>
    </div>
  );
};

export default StoryTimeline;
