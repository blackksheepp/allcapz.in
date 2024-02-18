// Import necessary modules
import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";

// Interface for component props
interface TitleSlideProps {
  titles: string[];
  active: string | undefined;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// TitleSlide component
export const TitleSlide: React.FC<TitleSlideProps> = ({ titles, active, setActive }) => {
  const [showTitles, setShowTitles] = useState<string[]>(titles.slice(0, 3));

  useEffect(() => {
    if (active) {
      const middle = titles.indexOf(active);
      const prev = middle - 1 < 0 ? titles.length - 1 : middle - 1;
      const next = middle + 1 > titles.length - 1 ? 0 : middle + 1;
      setShowTitles([titles[prev], titles[middle], titles[next]]);
    }
  }, [active, titles]);

  const transitions = useTransition(showTitles, {
    key: (item: string) => item,
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
    config: { tension: 300, friction: 20, duration: 300 },
    trail: 10
  });

  return (
    <div className="font-retro text-gray-400 text-smTolg flex flex-row gap-vw-7-min@md justify-center items-baseline">
      {transitions((styles, item) => (
        <animated.p
          style={styles}
          className={`cursor-pointer ${
            active == item ? "text-accent text-xlTo3xl" : ""
          } ${active != item ? "hover:text-lgTo2xl" : ""}`}
          onClick={() => {
            setActive(item);
          }}
        >
          {item}
        </animated.p>
      ))}
    </div>
  );
};
