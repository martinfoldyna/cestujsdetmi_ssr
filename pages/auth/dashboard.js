import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MyLink } from "../../layouts/MyLink";
import { Col, Row } from "react-grid-system";
import { BsPlus } from "react-icons/bs";
import { GiHouse } from "react-icons/gi";
import { MdLocationCity } from "react-icons/md";
import { TiSortNumerically } from "react-icons/ti";
import { FaEnvelope, FaSave, FaUser } from "react-icons/fa";
import AdminObjekt from "../../layouts/AdminObjekt";
import { Section, SectionContent, SectionHeading } from "../../layouts/Section";
import Input from "../../components/form/Input.js";
import { logoutUser, getUser } from "../../redux/actions/users";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { useRouter } from "next/router";
import { GlobalContext } from "../../context/GlobalContext";

const UserDashboard = () => {
  const router = useRouter();
  const userContext = useContext(GlobalContext).user;
  const { user, setUser } = userContext;
  console.log("dashboard_user", user);
  const logoutUser = () => {
    setUser(null);
  };

  return user && user.objekty ? (
    <Fragment>
      <span className="breadcrumb">
        <MyLink href="/">Úvodní stránka</MyLink>&nbsp;/&nbsp;Administrace
      </span>

      <HeadingWithIcon
        background="blue"
        icon={FaUser}
        heading="Seznam objektů a nastavení účtu"
        icon_size="medium"
      />

      <div className="data-wrapper">
        <Row className="justify-content-between">
          <Col>
            <Row className="user-objekty-row">
              {user?.objekty
                ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((objekt) => {
                  return (
                    <Col sm={12} key={objekt.id} className="col">
                      <AdminObjekt objekt={objekt} key={objekt.id} />
                    </Col>
                  );
                })}
              <MyLink href="/auth/info/" className="m-0-auto">
                <button
                  type="button"
                  className="btn-logo d-flex align-items-center btn bg-blue text-white m-0-auto"
                >
                  <BsPlus className="btn-icon" />
                  Přidat další objekt
                </button>
              </MyLink>
            </Row>
            <Row>
              <Col>
                <Section className="admin-user-info">
                  <SectionHeading>
                    <h2>Osobní údaje</h2>
                  </SectionHeading>
                  <SectionContent>
                    <form>
                      <Row className="row">
                        <Col md={6}>
                          <Input
                            name="email"
                            text="E-mail"
                            defaultValue={user.email}
                          >
                            <FaEnvelope className="form-icon" />
                          </Input>
                          <Input
                            name="jmeno"
                            text="Jméno"
                            defaultValue={user.jmeno}
                          >
                            <FaUser className="form-icon" />
                          </Input>
                          <Input
                            name="prijmeni"
                            text="Přijmení"
                            defaultValue={user.prijmeni}
                          >
                            <FaUser className="form-icon" />
                          </Input>
                        </Col>
                        <Col md={6}>
                          <Input
                            name="ulice"
                            text="Ulice a č.p."
                            defaultValue={user.ulice}
                          >
                            <GiHouse className="form-icon" />
                          </Input>
                          <Input
                            name="mesto"
                            text="Město"
                            defaultValue={user.mesto}
                          >
                            <MdLocationCity className="form-icon" />
                          </Input>
                          <Input name="psc" text="PSČ" defaultValue={user.psc}>
                            <TiSortNumerically className="form-icon" />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <button
                          type="submit"
                          className="btn-logo d-flex align-items-center btn bg-blue text-white mr-2"
                        >
                          <FaSave className="btn-icon" />
                          Uložit změny
                        </button>
                      </Row>
                    </form>
                  </SectionContent>
                </Section>
              </Col>
            </Row>
          </Col>
          <Col md={2.5}>
            <div className="filter-card">
              <h3>Správa účtu:</h3>
              <ul className="categories-list list-style-none p-0 mb-0">
                <li className="category-item text-black d-flex justify-content-between align-items-center">
                  <MyLink href="#">Seznam objektů</MyLink>
                </li>
                <li className="category-item text-black d-flex justify-content-between align-items-center">
                  <MyLink href={`${router.pathname}/user-info`}>
                    Změna osobních údajů
                  </MyLink>
                </li>
                <li className="category-item text-black d-flex justify-content-between align-items-center">
                  <MyLink href="#">Změna formy zápisu</MyLink>
                </li>
                <li className="category-item text-black d-flex justify-content-between align-items-center">
                  <MyLink href="#">Změna hesla</MyLink>
                </li>
                <li className="category-item text-black d-flex justify-content-between align-items-center">
                  <MyLink
                    href="#"
                    onClick={() => {
                      logoutUser();
                      router.push("/auth/login");
                    }}
                  >
                    Odhlášení
                  </MyLink>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  ) : (
    // <Redirect href="/auth/login" />
    <p className="text-red">Not authorized</p>
  );
};

UserDashboard.propTypes = {
  users: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default UserDashboard;
