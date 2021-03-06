import React, { Fragment, useState } from "react";
import MyLink from "../../layouts/MyLink";
import { Col, Row, Container } from "react-grid-system";
import { BsPlus } from "react-icons/bs";
import { GiHouse } from "react-icons/gi";
import { MdLocationCity } from "react-icons/md";
import { TiSortNumerically } from "react-icons/ti";
import { FaEnvelope, FaRegUser, FaSave, FaUser } from "react-icons/fa";
import AdminObjekt from "../../layouts/AdminObjekt";
import { Section, SectionContent, SectionHeading } from "../../layouts/Section";
import Input from "../../components/form/Input.js";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { useRouter } from "next/router";
import { CgList } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { handleJwt } from "../../helpers/auth";

export async function getServerSideProps(ctx) {
  const user = await handleJwt(ctx);
  console.log(user);
  return { props: { APIuser: user } };
}

const UserDashboard = ({ APIuser }) => {
  const router = useRouter();
  console.log(APIuser);
  const [user, setUser] = useState(APIuser);

  const logoutUser = () => {
    router.push("/auth/logout");
  };

  return (
    <Container className="main-container">
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
          <Col md={3}>
            <div className="filter-card bg-white">
              <div className="p-1 bg-grey">
                <p className="filter-name m-0">{user.email}</p>
              </div>
              <div className="pl-1 pr-1">
                <ul className="categories-list list-style-none p-0 mb-0 mt-0">
                  <li className="pt-1 pb-1 category-item text-black d-flex justify-content-between align-items-center">
                    <MyLink href="#" className="d-flex align-items-center">
                      <>
                        <CgList className="btn-icon text-blue" />
                        Seznam objektů
                      </>
                    </MyLink>
                  </li>
                  <li className="pt-1 pb-1 category-item text-black d-flex justify-content-between align-items-center">
                    <MyLink
                      href={`${router.pathname}/user-info`}
                      className="d-flex align-items-center"
                    >
                      <>
                        <FaRegUser className="btn-icon text-blue" />
                        Osobní údaje
                      </>
                    </MyLink>
                  </li>
                  <li className="pt-1 pb-1 category-item text-black d-flex justify-content-between align-items-center">
                    <MyLink
                      href="#"
                      onClick={() => {
                        logoutUser();
                        router.push("/auth/login");
                      }}
                    >
                      <>
                        <FiLogOut className="text-blue btn-icon" />
                        Odhlášení
                      </>
                    </MyLink>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col>
            <Row className="user-objekty-row">
              {user?.objekty
                ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((objekt) => {
                  return (
                    <Col sm={12} key={objekt.id} className="col">
                      <AdminObjekt objekt={objekt} />
                    </Col>
                  );
                })}

              {user.objekty.length === 0 && (
                <Col sm={12} className="col">
                  <h2 className="mt-0 mb-1">
                    Zatím nemáte žádné registrované objekty.
                  </h2>
                </Col>
              )}
              <MyLink href="/admin/add/" className="m-0-auto">
                <button
                  type="button"
                  className="btn-logo d-flex align-items-center btn bg-blue text-white m-0-auto"
                >
                  <BsPlus className="btn-icon" />
                  <span>Přidat další objekt</span>
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
                          <span>Uložit změny</span>
                        </button>
                      </Row>
                    </form>
                  </SectionContent>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

// UserDashboard.getInitialProps = async ({ req }) => {
//   const cookies = parseCookies(req);
//   const { jwt } = cookies;
//
//   const user = await fetchQuery(`users/me`, "", {
//     headers: { Authorization: `Bearer ${jwt}` },
//   });
//
//   return { APIuser: user, jwt };
// };

export default UserDashboard;
