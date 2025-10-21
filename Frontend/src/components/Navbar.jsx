import logo from "../assets/logo.jpg";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateToSection = (sectionId, path = "/") => {
    setIsMenuOpen(false); // ปิด menu เมื่อคลิก
    
    if (location.pathname === path) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`${path}#${sectionId}`);
    }
  };

  return (
    <nav className="fixed bg-zinc-950/30 items-center flex z-50 w-full h-20 md:h-24 lg:h-28">
      {/* Logo */}
      <a href="https://www.facebook.com/moonlighstudiosurat" target="_blank" className="ml-4 sm:ml-8 md:ml-10 lg:ml-13">
        <img
          className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full"
          src={logo}
          alt="Moonlight Studio"
        />
      </a>

      {/* Hamburger Button - แสดงเฉพาะหน้าจอเล็ก */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden ml-auto mr-4 sm:mr-8 text-white focus:outline-none z-50"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Desktop Menu - แสดงเฉพาะหน้าจอใหญ่ */}
      <ul className="hidden lg:flex space-x-8 xl:space-x-12 2xl:space-x-15 text-white ml-auto mr-8 xl:mr-12 2xl:mr-14">
        <li>
          <a
            onClick={() => navigateToSection('home')}
            className="text-lg xl:text-xl font-light hover:text-gray-300 transition-colors duration-300 hover-underline cursor-pointer"
            style={{ fontFamily: "Kanit" }}
          >
            หน้าหลัก
          </a>
        </li>
        <li>
          <a
            onClick={() => navigateToSection('service')}
            className="text-lg xl:text-xl font-light hover:text-gray-300 transition-colors duration-300 hover-underline cursor-pointer"
            style={{ fontFamily: "Kanit" }}
          >
            บริการ
          </a>
        </li>
        <li>
          <a
            onClick={() => navigateToSection('contact')}
            className="text-lg xl:text-xl font-light hover:text-gray-300 transition-colors duration-300 hover-underline cursor-pointer"
            style={{ fontFamily: "Kanit" }}
          >
            ติดต่อ
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-lg xl:text-xl font-light hover:text-gray-300 transition-colors duration-300 border-2 py-1.5 px-6 xl:px-9"
            style={{ fontFamily: "Kanit" }}
          >
            โทรเลย
          </a>
        </li>
      </ul>

      {/* Mobile Menu - แสดงเฉพาะหน้าจอเล็ก */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-zinc-950/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col space-y-6 text-white pt-24 px-8">
          <li>
            <a
              onClick={() => navigateToSection('home')}
              className="text-xl font-light hover:text-gray-300 transition-colors duration-300 block cursor-pointer"
              style={{ fontFamily: "Kanit" }}
            >
              หน้าหลัก
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateToSection('service')}
              className="text-xl font-light hover:text-gray-300 transition-colors duration-300 block cursor-pointer"
              style={{ fontFamily: "Kanit" }}
            >
              บริการ
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateToSection('contact')}
              className="text-xl font-light hover:text-gray-300 transition-colors duration-300 block cursor-pointer"
              style={{ fontFamily: "Kanit" }}
            >
              ติดต่อ
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xl font-light hover:text-gray-300 transition-colors duration-300 border-2 py-2 px-6 inline-block text-center"
              style={{ fontFamily: "Kanit" }}
            >
              โทรเลย
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay สำหรับปิด menu เมื่อคลิกนอก */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;