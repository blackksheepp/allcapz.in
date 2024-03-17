import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, FC } from "react";

import { usePathname } from "next/navigation";

interface LTransitionProps {
    animate: boolean;
    mobile: boolean;
    children: ReactNode;
}

export const LoginTransition: FC<LTransitionProps> = ({ animate, mobile, children }) => {

    return (
        <AnimatePresence mode={"wait"}>
            <motion.div
                key={usePathname()}
                initial="initialState"
                animate={animate ? "animateState" : "initialState"}
                exit="exitState"
                transition={{
                    type: "spring",
                    damping: 10,
                    duration: 200
                }}
                variants={{
                    initialState: {
                        y: "100vh",
                    },
                    animateState: {
                        y: 0
                    },
                    exitState: {
                        y: "-100vh",
                    },
                }}
                className="top-0 fixed z-40"
                style={{ width: "100vw", height: "100vh" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

