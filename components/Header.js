import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { IoMdAdd } from "react-icons/io";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { MyLink } from "../layouts/MyLink";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Image from "next/image";
const HeaderComponent = ({ users: { user } }) => {
  const [sticky, setSticky] = useState(false);
  const [stickyUp, setStickyUp] = useState(false);

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
        <Container>
          <Row>
            <Col className="d-flex align-items-center hide-mobile p-0 ml-0">
              <button
                className="btn-small-logo d-flex align-items-center btn outline-blue text-blue ghost"
                style={{ marginRight: "0" }}
              >
                <FaRegHeart className="btn-icon" />
                Oblíbené
              </button>
            </Col>
            <Col className="d-flex align-items-center justify-content-center cestuj-logo-wrapper p-0">
              <MyLink href="/">
                <Image
                  src="/img/logo-big-flat.svg"
                  alt="logo Cestuj s detmi"
                  className="cestuj-logo hide-mobile"
                  layout="fill"
                />
              </MyLink>
            </Col>
            <Col className="d-flex align-items-center justify-content-end hide-mobile p-0">
              <Link href="/objekty">
                <button
                  className="btn-small-logo d-flex align-items-center btn outline-blue text-blue ghost"
                  style={{ marginLeft: "0" }}
                >
                  <IoMdAdd className="btn-icon" />
                  Přidat objekt
                </button>
              </Link>
              {user ? (
                <Link href="/auth/dashboard">
                  <button
                    className="btn-small-logo d-flex align-items-center btn outline-blue text-blue ghost"
                    style={{ marginRight: "0" }}
                  >
                    <FaRegUser className="btn-icon" />
                    {user.email}
                  </button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <button
                    className="btn-small-logo d-flex align-items-center btn outline-blue text-blue ghost"
                    style={{ marginRight: "0" }}
                  >
                    <FaRegUser className="btn-icon" />
                    Přihlášení
                  </button>
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="hide-desktop">
        <div className="d-flex justify-content-between header-wrapper">
          <Link href="/">
            <Image
              src="/img/logo-small.svg"
              alt="logo Cestuj s detmi"
              className="cestuj-logo"
              layout="fill"
            />
          </Link>
          <div className="d-flex">
            <button className="btn text-blue ghost">
              <Image src="/icons/search.svg" alt="search" layout="fill" />
            </button>
            <button className="btn text-blue ghost" onClick={toggleNav}>
              <Image
                src="/icons/hamburger.svg"
                alt="hamburger menu"
                layout="fill"
              />
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
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(HeaderComponent);
