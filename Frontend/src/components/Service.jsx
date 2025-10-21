import pic1 from "../assets/1.jpg";
import pic2 from "../assets/2.jpg";
import pic3 from "../assets/3.jpg";
import { motion } from "motion/react";
import "../App.css";

function Service() {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen overflow-hidden">
      {/* ตัดผม */}
      <motion.div
        className="flex-1 relative flex items-center justify-center min-h-[400px] lg:min-h-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <img 
          src={pic1} 
          alt="ตัดผม" 
          className="w-full h-full object-cover absolute inset-0" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1
          className="relative text-white text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold z-10"
          style={{
            fontFamily: "Kanit",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
          viewport={{ once: true }}
        >
          ตัดผม
        </motion.h1>
      </motion.div>

      {/* ดัดผม */}
      <motion.div
        className="flex-1 relative flex items-center justify-center min-h-[400px] lg:min-h-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <img 
          src={pic2} 
          alt="ดัดผม" 
          className="w-full h-full object-cover absolute inset-0" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1
          className="relative text-white text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold z-10 whitespace-nowrap"
          style={{
            fontFamily: "Kanit",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
          viewport={{ once: true }}
        >
          ดัดผม
        </motion.h1>
      </motion.div>

      {/* ยืดวอลลุ่ม */}
      <motion.div
        className="flex-1 relative flex items-center justify-center min-h-[400px] lg:min-h-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.4,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <img 
          src={pic3} 
          alt="ยืดวอลลุ่ม" 
          className="w-full h-full object-cover absolute inset-0" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1
          className="relative text-white text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold z-10 whitespace-nowrap px-4"
          style={{
            fontFamily: "Kanit",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
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