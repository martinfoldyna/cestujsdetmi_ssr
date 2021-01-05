import React, { useEffect, Fragment, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-grid-system";
import { AiFillBulb } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import SideCards from "../../layouts/SideCards";
import { Section, SectionHeading, SectionContent } from "../../layouts/Section";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { getAdvices } from "../../redux/actions/radyTipy";
import { connect } from "react-redux";
import enums from "../../enums";
import { objectToArray } from "../../helpers/helpers";
import Post from "../../layouts/Post";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { MyLink } from "../../layouts/MyLink";

const RadyTipy = ({ radyTipy: { posts, post }, getAdvices, match }) => {
  const router = useRouter();
  const [category, setCategory] = useState("");

  useEffect(() => {
    getAdvices();
    checkForCategory();
  }, [getAdvices, router]);

  const checkForCategory = () => {
    const splittedURL = router?.pathname?.split("/");
    const lastURLItem = splittedURL[splittedURL.length - 1];
    console.log(lastURLItem);

    if (
      enums.RADY_TIPY.KATEGORIE[lastURLItem]?.key &&
      enums.RADY_TIPY.KATEGORIE[lastURLItem]?.value
    ) {
      setCategory(enums.RADY_TIPY.KATEGORIE[lastURLItem].value);
    } else {
      setCategory("");
    }
  };

  return (
    <div>
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;
        {post ? (
          <Fragment>
            <MyLink href={router.pathname} className="text-yellow">
              Rady a tipy
            </MyLink>
            &nbsp;/&nbsp;
            <MyLink
              href={`${router.pathname}/${post.kategorie}`}
              className="text-yellow"
            >
              {enums.RADY_TIPY.KATEGORIE[post.kategorie].value}
            </MyLink>
            &nbsp;/&nbsp;{post.nazev}
          </Fragment>
        ) : (
          <Fragment>
            {category ? (
              <Fragment>
                <MyLink href="/rady-a-tipy" className="text-yellow">
                  Rady a tipy
                </MyLink>
                &nbsp;/&nbsp;
                {category}
              </Fragment>
            ) : (
              "Rady a tipy"
            )}
          </Fragment>
        )}
      </span>
      <HeadingWithIcon
        background="yellow"
        heading={
          category || post?.kategorie
            ? category ||
              (post?.kategorie &&
                enums.RADY_TIPY.KATEGORIE[post?.kategorie].value)
            : "Rady a tipy"
        }
        icon={AiFillBulb}
      >
        <p className={category || post?.kategorie ? "mt-0" : ""}>
          {category || post?.kategorie ? (
            "Rady a tipy"
          ) : (
            <Fragment>
              Kam na výlety s dětmi v Čechách i na Moravě. Jeďte za zábavou,
              poznáním, historií, adrenalinem, sportem i odpočinkem. Najděte si
              ten svůj tip na výlet. Portál Cestuj s dětmi.cz je zaměřený na
              rodinné výlety a výlety s dětmi.
            </Fragment>
          )}
        </p>
      </HeadingWithIcon>
      <div className="data-wrapper">
        <Row>
          <Col lg={2.5} className="hide-mobile">
            <div className="filter-card full-padding bg-light-yellow">
              <div className="categories">
                <p className="filter-name pl-0">Navigace:</p>
                <ul className="pl-0 list-style-none categories-list">
                  <li className="category-item">
                    <Link href={router.pathname}>Všechny rady a tipy</Link>
                  </li>
                  {/*<li className="category-item">*/}
                  {/*  <Link*/}
                  {/*    href={`${router.pathname}/${enums.RADY_TIPY.KATEGORIE.cestujsdetmi_doporucuje.key}`}*/}
                  {/*  >*/}
                  {/*    Cestujsdetmi.cz doporučuje*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li className="category-item"><Link href={`${router.pathname}/${enums.RADY_TIPY.KATEGORIE.}`}>Sportování s dětmi</Link></li>*/}
                  {/*<li className="category-item">Děti a zdraví</li>*/}
                  {/*<li className="category-item">Zábava a dovolená s dětmi</li>*/}
                  {objectToArray(enums.RADY_TIPY.KATEGORIE).map(
                    (categoryItem) => (
                      <li className="category-item" key={categoryItem.key}>
                        <Link href={`${router.pathname}/${categoryItem.key}`}>
                          {categoryItem.value}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <SideCards />
          </Col>
          <Col lg={9.5}>
            {objectToArray(enums.RADY_TIPY.KATEGORIE).map((categoryItem) => (
              <Section className="border-section mt-0" key={categoryItem.key}>
                <SectionHeading background="none">
                  <h2>{categoryItem.value}</h2>
                </SectionHeading>
                <SectionContent>
                  {posts ? (
                    <Row>
                      {posts
                        ?.filter((post) => post?.kategorie === categoryItem.key)
                        ?.map(
                          (post, index) =>
                            index < 9 && (
                              <Fragment key={post.id}>
                                <Col md={4} key={post.id}>
                                  <Post post={post} />
                                </Col>
                              </Fragment>
                            )
                        )}
                    </Row>
                  ) : (
                    <LoadingSkeleton />
                  )}
                </SectionContent>
                <button className="btn btn-small-logo btn-homepage-detail bg-yellow text-white">
                  <MyLink
                    href={`${router.pathname}/${categoryItem.key}`}
                    className="d-flex align-items-center"
                  >
                    <>
                      Načíst další
                      <RiArrowRightSLine style={{ marginLeft: ".5em" }} />
                    </>
                  </MyLink>
                </button>
              </Section>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

RadyTipy.propTypes = {
  radyTipy: PropTypes.object.isRequired,
  getAdvices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  radyTipy: state.radyTipy,
});

export default connect(mapStateToProps, { getAdvices })(RadyTipy);