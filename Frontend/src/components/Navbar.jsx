import logo from "../assets/logo.jpg";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSection = (sectionId, path = "/") => {
    if (location.pathname === path) {
      // อยู่หน้าเดียวกัน scroll เลย
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // อยู่คนละหน้า navigate & scroll
      navigate(`${path}#${sectionId}`);
    }
  };

  return (
    <nav
      className="fixed bg-zinc-950/30 items-center flex z-50 2xl:h-27 xl:h-30 lg:h-25 md:h-25 sm:h-22"
      style={{ width: "100%" }}
    >
      <a href="https://www.facebook.com/moonlighstudiosurat">
        {" "}
        <img
          className="w-13 rounded-full ml-13 2xl:ml-13 md:ml-10 sm:ml-5"
          src={logo}
          alt="Moonlight Studio"
        />
      </a>
      <ul className="flex space-x-15 text-white justify-end right-14 absolute 2xl:right-14 sm:right-8">
        <li>
          <a
            onClick={() => navigateToSection('home')}
            className="text-xl font-light hover:text-gray-300 transition-colors duration-300 hover-underline"
            style={{ fontFamily: "Kanit" }}
          >
            หน้าหลัก
          </a>
        </li>
        <li>
          <a
            onClick={() => navigateToSection('service')}
            className="text-xl font-light hover:text-gray-300 transition-colors duration-300 hover-underline"
            style={{ fontFamily: "Kanit" }}
          >
            บริการ
          </a>
        </li>
        <li>
          <a
            onClick={() => navigateToSection('contact')}
            className="text-xl font-light hover:text-gray-300 transition-colors duration-300 hover-underline"
            style={{ fontFamily: "Kanit" }}
          >
            ติดต่อ
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-xl font-light hover:text-gray-300 transition-colors duration-300 border-2 py-1.5 px-9"
            style={{ fontFamily: "Kanit" }}
          >
            โทรเลย
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
