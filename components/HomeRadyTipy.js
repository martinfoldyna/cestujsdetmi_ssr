import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiFillBulb } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import MyLink from "../layouts/MyLink";
import { SectionContent, Section, SectionHeading } from "../layouts/Section";
import { Col, Row } from "react-grid-system";
import HomePageObjekt from "../layouts/HomePageObjekt";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import { getAdvices } from "../redux/actions/radyTipy";
import { connect } from "react-redux";
import enums from "../enums";
import { objectToArray } from "../helpers/helpers";

const RadyTipyHomepage = ({ posts }) => {
  const [categorizedPosts, setCategorizedPosts] = useState({
    [enums.RADY_TIPY.KATEGORIE.cestujsdetmi_doporucuje.key]: null,
    [enums.RADY_TIPY.KATEGORIE.deti_a_zdravi.key]: null,
    [enums.RADY_TIPY.KATEGORIE.sportovani_s_detmi.key]: null,
    [enums.RADY_TIPY.KATEGORIE.zabava_dovolena_s_detmi.key]: null,
  });

  const fetchData = () => {
    getAdvices();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Section className="rady-tipy-homepage">
      <SectionHeading>
        <MyLink href="/rady-a-tipy" className="d-flex align-items-center">
          <>
            <AiFillBulb
              className="text-white icon-heading bg-yellow"
              style={{ marginRight: "1em" }}
            />
            <h2>Rady a tipy</h2>
            <RiArrowRightSLine className="text-green arrow-heading" />
          </>
        </MyLink>
      </SectionHeading>
      <SectionContent>
        {posts ? (
          objectToArray(enums.RADY_TIPY.KATEGORIE).map(
            (categoryItem, categoryIndex) => (
              <div
                className={`category ${
                  (categoryIndex + 1) % 2 === 0 ? "bg-grey" : ""
                }`}
                key={categoryIndex}
              >
                <Row className="m-0">
                  <Col>
                    <MyLink href={`/rady-a-tipy/${categoryItem.key}`}>
                      <div className="d-flex align-items-center">
                        <h3 className="category-heading">
                          {categoryItem.value}
                        </h3>
                        <RiArrowRightSLine className="text-green arrow-heading" />
                      </div>
                    </MyLink>
                  </Col>
                </Row>
                <Row className="justify-content-arround m-0">
                  <Col lg={6}>
                    {posts &&
                      posts?.length > 0 &&
                      posts
                        ?.filter(
                          (article) => article.kategorie === categoryItem.key
                        )
                        .map((article, index) => {
                          if (index <= 2) {
                            return (
                              <HomePageObjekt
                                article={article}
                                key={article.id}
                                topic={enums.RADY_TIPY.key}
                              />
                            );
                          }
                        })}
                  </Col>
                  <Col lg={6}>
                    {posts &&
                      posts?.length > 0 &&
                      posts
                        ?.filter(
                          (article) => article.kategorie === categoryItem.key
                        )
                        .map((article, index) => {
                          if (index > 2 && index < 6) {
                            return (
                              <HomePageObjekt
                                article={article}
                                key={article.id}
                                topic={enums.RADY_TIPY.key}
                              />
                            );
                          }
                        })}
                  </Col>
                </Row>
                <Row>
                  {/*<button className="btn btn-small-logo btn-homepage-detail bg-yellow text-white">*/}
                  {/*  <MyLink*/}
                  {/*    href={`${match.path}/${categoryItem.key}`}*/}
                  {/*    className="d-flex align-items-center"*/}
                  {/*  >*/}
                  {/*    Načíst další*/}
                  {/*    <RiArrowRightSLine style={{ marginLeft: ".5em" }} />*/}
                  {/*  </MyLink>*/}
                  {/*</button>*/}

                  <Col sm={12} style={{ textAlign: "right" }}>
                    <button className="btn btn-small-logo btn-homepage-detail bg-yellow text-white">
                      <MyLink
                        href={`rady-a-tipy/${categoryItem.key}`}
                        className="d-flex align-items-center"
                      >
                        <>
                          Načíst další
                          <RiArrowRightSLine className="btn-icon right" />
                        </>
                      </MyLink>
                    </button>
                  </Col>
                </Row>
              </div>
            )
          )
        ) : (
          <Row className="justify-content-arround">
            <Col lg={5}>
              <LoadingSkeleton />
            </Col>
            <Col lg={5}>
              <LoadingSkeleton />
            </Col>
          </Row>
        )}
      </SectionContent>
    </Section>
  );
};

RadyTipyHomepage.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  radyTipy: state.radyTipy,
});

export default RadyTipyHomepage;
