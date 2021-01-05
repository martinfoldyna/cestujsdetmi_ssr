import React, { useEffect, useState } from "react";
import { MyLink } from "../layouts/MyLink";
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
import { FaRegUser } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import Image from "next/image";

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
      <div className="hide-desktop">
        <div className="d-flex justify-content-between m-1">
          <Image
            src="/img/logo-small.svg"
            alt="logo Cestuj s detmi"
            className="cestuj-logo"
            layout="fill"
          />
          <button className="btn text-blue ghost" onClick={closeNav}>
            <CgClose style={{ fontSize: "1em" }} />
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
              href="/tipy-na-ubytovani"
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
              href="/tipy-na-vylety"
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
      <div className="hide-desktop">
        <div className="buttons">
          <div className="actions">
            <button className="btn ghost text-black d-flex" onClick={closeNav}>
              <AiFillHeart className="text-red btn-icon" />
              Oblíbené položky
            </button>
            <button className="btn ghost text-black d-flex" onClick={closeNav}>
              <BiEnvelope className="text-blue btn-icon" />
              Odběr newsletteru
            </button>
          </div>
          <div className="d-flex links justify-content-between">
            <MyLink href="/objekty" onClick={closeNav}>
              <button
                className="btn-small-logo d-flex align-items-center btn ghost text-blue"
                style={{ marginLeft: "0" }}
              >
                <IoMdAdd className="btn-icon" />
                Přidat objekt
              </button>
            </MyLink>
            <MyLink href="/auth/login" onClick={closeNav}>
              <button
                className="btn-small-logo d-flex align-items-center btn ghost text-blue"
                style={{ marginRight: "0" }}
              >
                <FaRegUser className="btn-icon" />
                Přihlášení
              </button>
            </MyLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;