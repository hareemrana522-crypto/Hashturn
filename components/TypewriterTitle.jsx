"use client";

import Typewriter from 'typewriter-effect';

export default function TypewriterTitle() {
  return (
    <span className="stagger-anim" style={{ display: "inline-block", animationDelay: "0.4s" }}>
      <style>{`
        .my-typewriter-wrapper .Typewriter__wrapper {
          color: navy;
        }
        .my-typewriter-wrapper .Typewriter__cursor {
          color: navy;
        }
      `}</style>
      <span className="my-typewriter-wrapper">
        <Typewriter
          options={{
            strings: [
              'You Run the Business.',
              'You Focus on Growth.',
              'You Scale Up Faster.',
              'You Lead the Market.'
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
            pauseFor: 2500,
          }}
        />
      </span>
    </span>
  );
}
