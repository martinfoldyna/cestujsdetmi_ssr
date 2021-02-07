import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { IoMdAdd } from "react-icons/io";
import {
  FaRegUser,
  FaRegHeart,
  FaEnvelope,
  FaRegEnvelope,
  FaSearch,
} from "react-icons/fa";
import Link from "next/link";
import MyLink from "../layouts/MyLink";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import SmallButton from "../layouts/SmallButton";
import { useSession, signOut } from "next-auth/client";

const HeaderComponent = ({ user }) => {
  const [sticky, setSticky] = useState(false);
  const [stickyUp, setStickyUp] = useState(false);
  const [sesssion, loading] = useSession();

  const [openNav, setOpenNav] = useState(false);

  let oldScroll = 0;
  const handleScroll = (e) => {
    if (window.scrollY > 200) {
      if (oldScroll < window.scrollY) {
        setSticky(true);
        setStickyUp(false);
      } else {
        setStickyUp(true);
        setSticky(false);
      }
    } else {
      setStickyUp(false);
      setSticky(false);
    }

    oldScroll = window.scrollY;
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`main-header ${stickyUp ? "sticky" : ""}`}>
      <div className="hide-mobile">
        <Container className="main-container">
          <div className="d-flex justify-content-between align-items-center">
            <MyLink href="/" className="d-flex align-items-center">
              <Image
                src="/cestuj_big.svg"
                height={35}
                width={220}
                alt="logo cestuj s dětmi"
              />
            </MyLink>
            <div className="d-flex align-items-center justify-content-end">
              <div className="search-bar">
                <div className="d-flex align-items-center justify-content-end">
                  <input
                    type="text"
                    placeholder="Povězte nám, co hledáte"
                    className="bg-grey"
                  />
                  <button className="btn bg-grey search-bar-button">
                    <FaSearch className="text-blue" />
                  </button>
                </div>
              </div>
              <MyLink href="/oblibene">
                {/*<button className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost mr-0">*/}
                {/*  <FaRegHeart className="btn-icon text-red" />*/}
                {/*  <span>Oblíbené</span>*/}
                {/*</button>*/}
                <SmallButton
                  color="grey"
                  ghost
                  icon={FaRegHeart}
                  iconColor="red"
                >
                  Oblíbené
                </SmallButton>
              </MyLink>
              {/*<button className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost mr-0">*/}
              {/*  <FaRegEnvelope className="btn-icon text-blue" />*/}
              {/*  <span>Odběr newsletteru</span>*/}
              {/*</button>*/}
              <MyLink href="/newsletter">
                <SmallButton
                  color="grey"
                  ghost
                  icon={FaRegEnvelope}
                  iconColor="blue"
                >
                  Odběr newsletteru
                </SmallButton>
              </MyLink>
              <MyLink href="/objekty">
                {/*<button*/}
                {/*  className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost"*/}
                {/*  style={{ marginLeft: "0" }}*/}
                {/*>*/}
                {/*  <IoMdAdd className="btn-icon text-blue" />*/}
                {/*  <span>Přidat objekt</span>*/}
                {/*</button>*/}
                <SmallButton color="grey" ghost icon={IoMdAdd} iconColor="blue">
                  Přidat objekt
                </SmallButton>
              </MyLink>
              <MyLink href="/auth/login">
                {/*<button*/}
                {/*  className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost"*/}
                {/*  style={{ marginRight: "0" }}*/}
                {/*>*/}
                {/*  <FaRegUser className="btn-icon text-blue" />*/}
                {/*  <span>Přihlášení</span>*/}
                {/*</button>*/}
                {sesssion ? (
                  <MyLink href="/user">
                    <SmallButton
                      color="grey"
                      ghost
                      icon={FaRegUser}
                      iconColor="blue"
                    >
                      {sesssion.user.email}
                    </SmallButton>
                  </MyLink>
                ) : (
                  <SmallButton
                    color="grey"
                    ghost
                    icon={FaRegUser}
                    iconColor="blue"
                  >
                    Přihlášení
                  </SmallButton>
                )}
              </MyLink>
            </div>
          </div>
        </Container>
      </div>
      <div className="hide-desktop">
        <div className="d-flex justify-content-between header-wrapper">
          <MyLink href="/">
            <Image
              src="/img/logo-small.svg"
              alt="logo Cestuj s detmi"
              className="cestuj-logo"
              layout="intrinsic"
              height={35}
              width={126}
              style={{ height: "80%" }}
            />
          </MyLink>
          <div className="d-flex">
            <button className="btn text-blue ghost">
              {/*<Image src="/icons/search.svg" alt="search" layout="fill" />*/}
              <BiSearch className="text-blue" />
            </button>
            <button className="btn text-blue ghost" onClick={toggleNav}>
              <GiHamburgerMenu className="text-blue" />
              {/*<Image
              src="/icons/hamburger.svg"
              alt="hamburger menu"
              layout="fill"
            />*/}
            </button>
          </div>
        </div>
      </div>
      <Navbar
        isSticky={stickyUp ? false : sticky}
        open={openNav}
        onClose={toggleNav}
      />
    </header>
  );
};

HeaderComponent.propTypes = {
  users: PropTypes.object,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default HeaderComponent;
