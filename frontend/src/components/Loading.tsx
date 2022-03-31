// import { motion } from "framer-motion";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Loading() {
  // const dim = {
  //   width: 62,
  //   height: 18,
  //   get ratio() {
  //     return this.width / this.height;
  //   },
  // };

  const { theme } = useContext(ThemeContext)!;

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <PuffLoader color={theme === "light" ? "black" : "white"} size={200} />
      {/* <svg viewBox={`0 0 ${dim.width} ${dim.height}`} width="600" height={600 / dim.ratio} overflow="visible">
        <filter id="shadow1" x="-50" y="-50" width="100" height="100">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#22C55E" floodOpacity="0.6" />
        </filter>
        <filter id="shadow2" x="-50" y="-50" width="100" height="100">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#DC2626" floodOpacity="0.6" />
        </filter>
        <filter id="shadow3" x="-50" y="-50" width="100" height="100">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3B82F6" floodOpacity="0.6" />
        </filter>
        <motion.circle
          animate={{ x: 30, opacity: 0 }}
          transition={{ ease: "linear", repeat: Infinity, duration: 5 }}
          cx="9"
          cy="9"
          r="9"
          fill="#22C55E"
          filter="url(#shadow1)"
        />
        <motion.circle cx="31" cy="9" r="9" fill="#DC2626" filter="url(#shadow2)" />
        <motion.circle cx="53" cy="9" r="9" fill="#3B82F6" filter="url(#shadow3)" />
      </svg> */}
    </div>
  );
}
