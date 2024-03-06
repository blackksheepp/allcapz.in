import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, FC } from "react";

import { usePathname } from "next/navigation";

interface ILayoutProps {
  animate: boolean;
  mobile: boolean;
  children: ReactNode;
}

export const PageTransitionLayout: FC<ILayoutProps> = ({ animate, mobile, children }) => {

  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        key={usePathname()}
        initial="initialState"
        animate={animate ? "animateState" : "initialState"}
        exit="exitState"
        transition={{
          type: "spring",
        }}
        variants={{
          initialState: {
            x: "100vw",
          },
          animateState: {
            x: mobile ? 0 : "calc(100vw - 400px)",
          },
          exitState: {
            x: "-100vw",
          },
        }}
        className="top-0 min-h-screen fixed z-40 bg-black"
        style={{ width: mobile ? "100vw"  : "400px"}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

