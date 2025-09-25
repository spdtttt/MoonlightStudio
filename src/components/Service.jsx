import pic1 from "../assets/1.jpg";
import pic2 from "../assets/2.jpg";
import pic3 from "../assets/3.jpg";
import { motion } from "motion/react";
import "../App.css";

function Service() {
  return (
    <div className="flex h-150 w-full overflow-hidden">
      <motion.div
        className="flex-1 relative items-center"
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 0, y: 250 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          margin: "0px 0px 0px 0px",
        }}
      >
        <img src={pic1} alt="" className="w-full h-full object-cover" />
        <motion.h1
          className="absolute top-120 left-1/2 -translate-x-1/2 text-white text-7xl font-bold z-10"
          style={{
            fontFamily: "Kanit",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            bounce: 0.4,
          }}
          viewport={{ once: true }}
        >
          ตัดผม
        </motion.h1>
      </motion.div>

      <motion.div
        className="flex-1 relative"
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 0, y: 250 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          margin: "0px 0px 0px 0px",
        }}
      >
        <img src={pic2} alt="" className="w-full h-full object-cover" />
        <motion.h1
          className="absolute top-120 left-1/2 -translate-x-1/2 text-white text-7xl font-bold z-10"
          style={{
            fontFamily: "Kanit",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: -400 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            bounce: 0.4,
          }}
          viewport={{ once: true }}
        >
          ดัดผม
        </motion.h1>
      </motion.div>

      <motion.div
        className="flex-1 relative"
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 0, y: 250 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          margin: "0px 0px 0px 0px",
        }}
      >
        <img src={pic3} alt="" className="w-full h-full object-cover" />
        <motion.h1
          className="absolute top-120 left-1/2 -translate-x-1/2 text-white text-7xl font-bold z-10 whitespace-nowrap"
          style={{
            fontFamily: "Kanit",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            bounce: 0.4,
          }}
          viewport={{ once: true }}
        >
          ยืดวอลลุ่ม
        </motion.h1>
      </motion.div>
    </div>
  );
}

export default Service;
