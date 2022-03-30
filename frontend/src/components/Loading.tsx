import { motion } from "framer-motion";

export default function Loading() {
  const dim = {
    width: 62,
    height: 18,
    get ratio() {
      return this.width / this.height;
    },
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <svg viewBox={`0 0 ${dim.width} ${dim.height}`} width="600" height={600 / dim.ratio} overflow="visible">
        <motion.circle cx="9" cy="9" r="9" fill="#22C55E" />
        <motion.circle cx="31" cy="9" r="9" fill="#DC2626" />
        <motion.circle cx="53" cy="9" r="9" fill="#3B82F6" />
      </svg>
    </div>
  );
}
