import React, { useEffect, useState } from "react";
import MyLink from "../layouts/MyLink";
import {
  AiFillBulb,
  AiFillCompass,
  AiFillInfoCircle,
  AiFillHeart,
} from "react-icons/ai";
import { HiHome, HiNewspaper } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { RiWebcamFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { BiEnvelope } from "react-icons/bi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import { Container } from "react-grid-system";

const Navbar = ({ isSticky, open, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeNav = () => {
    console.log("Closing nav");
    setIsOpen(false);
    onClose();
  };

  return (
    <div
      className={`nav-container ${isSticky ? "sticky" : ""} ${
        !isOpen ? "hide-nav" : ""
      }`}
    >
      <Container className="main-container">
        <div className="hide-desktop">
          <div className="d-flex justify-content-end align-items-center">
            <button className="btn text-blue ghost p-1" onClick={closeNav}>
              <CgClose style={{ fontSize: "1.2em" }} />
            </button>
          </div>
        </div>
        <nav className="main-nav">
          <ul>
            <li className="nav-item">
              <MyLink
                href="/aktuality"
                className="link-purple link-coloured d-flex align-items-center"
                onClick={closeNav}
              >
                <>
                  <HiNewspaper className="text-purple link-icon" />
                  Aktuality
                </>
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink
                href="/ubytovani"
                className="link-blue link-coloured"
                onClick={closeNav}
              >
                <>
                  <HiHome className="text-blue link-icon" />
                  Ubytování a dovolená
                </>
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink
                href="/vylety"
                className="link-orange link-coloured"
                onClick={closeNav}
              >
                <>
                  <AiFillCompass className="text-orange link-icon" />
                  Výlety s dětmi
                </>
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink
                href="/rady-a-tipy"
                className="link-yellow link-coloured"
                onClick={closeNav}
              >
                <>
                  <AiFillBulb className="text-yellow link-icon" />
                  Rady a tipy
                </>
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink
                href="/webkamery"
                className="link-purple link-coloured"
                onClick={closeNav}
              >
                <>
                  <RiWebcamFill className="text-purple link-icon" />
                  Webkamery
                </>
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink
                href="/kontakt"
                className="link-blue link-coloured"
                onClick={closeNav}
              >
                <>
                  <MdPermContactCalendar className="text-blue link-icon" />
                  Kontakty
                </>
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink
                href="/o-portalu"
                className="link-red link-coloured"
                onClick={closeNav}
              >
                <>
                  <AiFillInfoCircle className="text-red link-icon" />O portálu
                </>
              </MyLink>
            </li>
          </ul>
        </nav>
        <div className="buttons hide-desktop">
          <div className="actions">
            <button
              className="btn bg-white text-black d-flex align-items-center"
              onClick={closeNav}
            >
              <FaRegHeart className="text-red btn-icon" />
              Oblíbené položky
            </button>
            <button
              className="btn bg-white text-black d-flex align-items-center"
              onClick={closeNav}
            >
              <BiEnvelope className="text-blue btn-icon" />
              Odběr newsletteru
            </button>
            <button
              className="btn d-flex align-items-center bg-white text-blue"
              style={{ marginLeft: "0" }}
            >
              <MyLink href="/objekty" onClick={closeNav}>
                <IoMdAdd className="btn-icon text-blue" />
                Přidat objekt
              </MyLink>
            </button>

            <button
              className="btn d-flex align-items-center bg-blue justify-content-center"
              style={{ marginRight: "0" }}
            >
              <MyLink
                href="/auth/login"
                onClick={closeNav}
                className="text-white"
              >
                <FaRegUser className="btn-icon" />
                Přihlášení
              </MyLink>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
