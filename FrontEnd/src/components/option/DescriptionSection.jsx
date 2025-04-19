import React, { useState } from "react";

export default function DescriptionSection() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white text-[#8C8C8C] px-6 py-10 text-sm leading-relaxed max-w-5xl mx-auto text-center">
      <div className={expanded ? "" : "line-clamp-6"}>
        <p className="mb-4">
          MSI has unveiled the Prestige Series line of business-class and gaming
          notebooks. Tuned for color accuracy, the Prestige Series also
          leverages True Color Technology, which allows users to adjust the
          display profile to best fit their computing needs.
        </p>
        <p className="mb-4">
          There are six different screen profiles, which are tuned for gaming,
          reducing eye fatigue, vivid color accuracy, increasing clarity for
          words and lines, reducing harmful blue light, and optimizing comfort
          for watching movies.
        </p>
        <p className="mb-4">
          Given the various display profiles and discrete graphics chip, the
          Prestige Series notebooks can be used for various design work as well
          as for office tasks given that the screen can be adjusted for better
          clarity, color accuracy, or for eye strain reduction. Users working
          with video or 3D rendering will appreciate the “theater mode” for
          which contrast is increased.
        </p>
        <p className="mb-6">
          Home users or students can benefit from the “anti-blue” and the
          “office mode” options, both of which are designed to reduce eye
          strain. This is helpful when working on the computer for extended
          periods of time. Additionally, in their down time, students can also
          use the “gamer mode” to increase the screen brightness.
        </p>
      </div>

      <button
        onClick={toggleExpand}
        className="px-6 py-2 border-2 border-gray-400 rounded-full text-gray-400 font-bold bg-white cursor-pointer hover:bg-gray-200 transition duration-300"
      >
        {expanded ? "Less" : "More"}
      </button>
    </div>
  );
}
