import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import logo from '../assets/logo.jpeg';
import {
  RiHome3Line,
  RiFileCopyLine,
  RiWalletLine,
  RiMore2Fill,
  RiCloseFill,
  RiArrowDownSLine, // Agregamos el ícono de flecha hacia abajo
} from "react-icons/ri";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const { user } = useUserContext();
  const [showAlmacenMenu, setShowAlmacenMenu] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedInUserName(user.displayName || user.email);
    }
  }, [user]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleAlmacenMenu = () => {
    setShowAlmacenMenu(!showAlmacenMenu);
  };

  return (
    <>
      <div
        className={`bg-blue-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src={logo}
            className="w-30 h-30 object-cover  ring-2 ring-blue-300"
          />
          <h1 className="text-base text-white font-serif">{loggedInUserName}</h1>
        </div>
        <div className="bg-blue-700 p-8 rounded-tr-[100px] h-[70vh]  flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <a
              href="/dashboard"
              className="text-base flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors font-serif"
              style={{
                textDecoration: 'none',
              }}
            >
              <RiHome3Line /> Inicio
            </a>
            <div
              className="text-base flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors font-serif cursor-pointer"
              style={{
                textDecoration: 'none',
              }}
              onClick={toggleAlmacenMenu}
            >
              <RiArrowDownSLine /> Almacén
            </div>
            {showAlmacenMenu && (
              <div>
                <a
                  href="/dashboard/almacenmov"
                  className="text-sm flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors font-serif"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <RiFileCopyLine /> Movimientos
                </a>
              </div>
            )}
            <a
              href="/app/ejemplo"
              className="text-base flex items-center gap-4 text-white py-2 px-4 rounded-xl hover-bg-primary-900/50 transition-colors font-serif"
              style={{
                textDecoration: 'none',
              }}
            >
              <RiWalletLine /> Reportes
            </a>
          </nav>
        </div>
      </div>
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;