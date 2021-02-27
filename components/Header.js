import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { IoMdAdd } from "react-icons/io";
import { FaRegUser, FaRegHeart, FaRegEnvelope, FaSearch } from "react-icons/fa";
import MyLink from "../layouts/MyLink";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import Image from "next/image";
import { BiSearch, BiUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import SmallButton from "../layouts/SmallButton";
import { useSession, signOut } from "next-auth/client";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";
import { handleJwt, vaidateJwt } from "../helpers/auth";
import { fetchQuery } from "../helpers/fetch";
import { toast } from "react-toastify";
import NewsletterModal from "./NewsletterModal";
import { MdPersonOutline } from "react-icons/md";

const HeaderComponent = () => {
  const [sticky, setSticky] = useState(false);
  const [stickyUp, setStickyUp] = useState(false);
  const [sesssion, loading] = useSession();
  const [openLogin, setOpenLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openNewsletter, setOpenNewsletter] = useState(false);

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

  const onCloseModal = (setState) => {
    setState(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    const jwt = Cookies.get("jwt");
    console.log("jwt", jwt);
    console.log("typeof jwt", typeof jwt);

    const isJwtValid = vaidateJwt(jwt);
    if (isJwtValid) {
      setUserLoggedIn(true);
    }
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
            <div className="d-flex align-items-center justify-content-end header-wrapper">
              <div className="search-bar">
                <div className="d-flex align-items-center justify-content-end">
                  <input
                    type="text"
                    placeholder="Povězte nám, co hledáte"
                    className="bg-grey"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn bg-grey search-bar-button">
                    <MyLink href={`/search?query=${searchQuery}`}>
                      <FaSearch className="text-blue" />
                    </MyLink>
                  </button>
                </div>
              </div>
              <MyLink href={sesssion ? "/oblibene" : "/auth/login"}>
                {/*<button className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost mr-0">*/}
                {/*  <FaRegHeart className="btn-icon text-red" />*/}
                {/*  <span>Oblíbené</span>*/}
                {/*</button>*/}
                <SmallButton
                  color="grey"
                  ghost
                  icon={FaRegHeart}
                  iconColor="red"
                  onClick={() => {
                    if (!sesssion) {
                      console.log("toasting");
                      toast.info("Pro tuto akci musíte být přihlášen(a).");
                    }
                  }}
                >
                  Oblíbené
                </SmallButton>
              </MyLink>
              {/*<button className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost mr-0">*/}
              {/*  <FaRegEnvelope className="btn-icon text-blue" />*/}
              {/*  <span>Odběr newsletteru</span>*/}
              {/*</button>*/}
              <SmallButton
                color="grey"
                ghost
                icon={FaRegEnvelope}
                iconColor="blue"
                onClick={() => setOpenNewsletter(true)}
              >
                Odběr newsletteru
              </SmallButton>
              <NewsletterModal
                open={openNewsletter}
                onClose={() => onCloseModal(setOpenNewsletter)}
              />
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
              {/*<MyLink href="/auth/login">*/}
              {/*<button*/}
              {/*  className="btn-small-logo d-flex align-items-center btn outline-blue text-grey ghost"*/}
              {/*  style={{ marginRight: "0" }}*/}
              {/*>*/}
              {/*  <FaRegUser className="btn-icon text-blue" />*/}
              {/*  <span>Přihlášení</span>*/}
              {/*</button>*/}
              {sesssion || userLoggedIn ? (
                <MyLink href={sesssion ? "/user" : "/admin"} className="pr-0">
                  <SmallButton
                    color="grey"
                    ghost
                    icon={FaRegUser}
                    iconColor="blue"
                    className="pr-0"
                  >
                    Uživatel
                  </SmallButton>
                </MyLink>
              ) : (
                <SmallButton
                  color="grey"
                  ghost
                  icon={FaRegUser}
                  iconColor="blue"
                  className="pr-0"
                  onClick={() => setOpenLogin(true)}
                >
                  Přihlášení
                </SmallButton>
              )}
              {/*</MyLink>*/}
            </div>
          </div>
        </Container>
      </div>
      <div className="hide-desktop">
        <div className="d-flex justify-content-between header-wrapper">
          <MyLink href="/">
            <Image
              src="/cestuj_big.svg"
              alt="logo Cestuj s detmi"
              className="cestuj-logo"
              layout="intrinsic"
              height={35}
              width={126}
              style={{ height: "80%" }}
            />
          </MyLink>
          <div className="d-flex align-items-center">
            <button className="btn ghost">
              {/*<Image src="/icons/search.svg" alt="search" layout="fill" />*/}
              <BiSearch className="text-black" />
            </button>
            <button className="btn ghost">
              <BiUser className="text-black" />
            </button>
            <button className="btn ghost" onClick={toggleNav}>
              <GiHamburgerMenu className="text-black" />
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
      <LoginModal open={openLogin} onClose={() => onCloseModal(setOpenLogin)} />
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
