import "../App.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="background-container flex flex-col">
        <div className="justify-center items-center text-center flex flex-1 flex-col overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.13 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="relative group w-full py-10"
          >
            <div
              className="absolute inset-0 bg-black/50 transform translate-x-full group-hover:translate-x-0
               transition-transform duration-700 ease-out"
            ></div>
            <h1
              className="text-8xl text-white relative hover-shadow explosive-text"
              style={{
                fontFamily: "Archivo Black",
                fontWeight: "650",
              }}
            >
              Moonlight Hair Studio
            </h1>
            <h1
              className="text-5xl text-white drop-shadow-xl "
              style={{
                fontFamily: "Kanit",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              ร้านทำผมชายสไตล์เกาหลี สุราษฎร์ธานี
            </h1>
          </motion.div>

          <motion.button
            onClick={() => navigate('/booking ')}
            style={{ fontFamily: "Kanit" }}
            transition={{ type: "spring", duration: 1.2 }}
            whileHover={{
              backgroundImage:
                "linear-gradient(90deg,rgba(112, 165, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)",
              color: "white",
              scale: 1.2,
            }}
            className="bg-white top-205 fixed shadow-sm z-15 bg-whit border-white rounded-full cursor-pointer text-2xl font-medium border-3 py-2.5 px-13 text-black absolute"
          >
            จองคิว
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default Home;
