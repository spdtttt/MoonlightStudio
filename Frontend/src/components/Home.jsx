import "../App.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="background-container flex flex-col min-h-screen">
        <div className="justify-center items-center text-center flex flex-1 flex-col overflow-hidden px-4 sm:px-6 md:px-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="relative group w-full py-6 sm:py-8 md:py-10 max-w-6xl"
          >
            <div
              className="absolute inset-0 bg-black/50 transform translate-x-full group-hover:translate-x-0
               transition-transform duration-700 ease-out rounded-lg"
            ></div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white relative hover-shadow explosive-text leading-snug sm:leading-tight"
              style={{
                fontFamily: "Archivo Black",
                fontWeight: "650",
              }}
            >
              Moonlight Hair Studio
            </h1>
            <h1
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white drop-shadow-xl mt-3 sm:mt-4 md:mt-5 leading-relaxed"
              style={{
                fontFamily: "Kanit",
                fontWeight: "400",
              }}
            >
              ร้านทำผมชายสไตล์เกาหลี สุราษฎร์ธานี
            </h1>
          </motion.div>

          <motion.button
            onClick={() => navigate('/booking')}
            style={{ fontFamily: "Kanit" }}
            transition={{ type: "spring", duration: 1.2 }}
            whileHover={{
              backgroundImage:
                "linear-gradient(90deg,rgba(112, 165, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)",
              color: "white",
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 transform -translate-x-1/2
                       bg-white shadow-lg hover:shadow-xl z-50 border-white rounded-full cursor-pointer 
                       text-base sm:text-lg md:text-xl lg:text-2xl font-medium border-2 sm:border-3
                       py-2 sm:py-2.5 md:py-3 px-8 sm:px-10 md:px-12 lg:px-13 text-black
                       transition-all duration-300"
          >
            จองคิว
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default Home;