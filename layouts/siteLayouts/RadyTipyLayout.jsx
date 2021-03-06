import React, { useEffect, Fragment, useState } from "react";
import Link from "next/link";
import { Col, Row, Container } from "react-grid-system";
import { AiFillBulb } from "react-icons/ai";
import SideCards from "../SideCards";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import enums from "../../enums";
import { objectToArray } from "../../helpers/helpers";
import HeadingWithIcon from "./../HeadingWithIcon";
import MyLink from "../MyLink";
import { BsFilter } from "react-icons/bs";
import SideFilter from "../../components/cards/SideFilter";
import { Icon, InlineIcon } from "@iconify/react";
import bxCategory from "@iconify/icons-bx/bx-category";

const RadyTipyLayout = ({ post, getAdvices, children }) => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

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
    <Container className='main-container'>
      <span className='breadcrumb'>
        <Link href='/'>Úvodní stránka</Link>&nbsp;/&nbsp;
        {post ? (
          <Fragment>
            <MyLink href='/rady-a-tipy/' className='text-yellow'>
              Rady a tipy
            </MyLink>
            &nbsp;/&nbsp;
            <MyLink
              href={{
                pathname: "/rady-a-tipy/[kategorie]",
                query: { kategorie: post.kategorie },
              }}
              className='text-yellow'
            >
              {enums.RADY_TIPY.KATEGORIE[post.kategorie].value}
            </MyLink>
            &nbsp;/&nbsp;{post.nazev}
          </Fragment>
        ) : (
          <Fragment>
            {category ? (
              <Fragment>
                <MyLink href='/rady-a-tipy' className='text-yellow'>
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
        background='yellow'
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
      <div className='data-wrapper'>
        <Row>
          <Col lg={2.5} className='hide-mobile'>
            <div className='filter-card full-padding bg-white'>
              <div className='categories'>
                <p className='filter-name pl-0'>Navigace:</p>
                <ul className='pl-0 list-style-none categories-list'>
                  <li className='category-item'>
                    <Link href='/rady-a-tipy/'>Všechny rady a tipy</Link>
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
                      <li className='category-item' key={categoryItem.key}>
                        <Link
                          href={{
                            pathname: "/rady-a-tipy/[kategorie]",
                            query: { kategorie: categoryItem.key },
                          }}
                        >
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
            <Fragment>
              <div className='hide-desktop bg-white mb-05 border-radius filter-wrappper'>
                <div
                  className={`d-flex bg-white border-radius ${
                    openFilter
                      ? "justify-content-between"
                      : "justify-content-start"
                  }`}
                >
                  {/* {openFilter && (
                    <button
                      className='btn btn-small-logo bg-yellow text-white m-0'
                      onClick={() => setOpenFilter(false)}
                    >
                      Zavřít filtr
                    </button>
                  )} */}
                  <button
                    className='btn btn-small-logo ghost m-0'
                    onClick={() => setOpenFilter((prevState) => !prevState)}
                  >
                    <Icon
                      icon={bxCategory}
                      className='text-yellow btn-icon left'
                    />{" "}
                    Vybrat kategorii
                  </button>
                </div>
                {openFilter && (
                  <div className='filter-card mb-0 bg-white'>
                    <div className='categories pb-0'>
                      {/* <p className="filter-name p-0">Navigace:</p> */}
                      <ul className='pl-0 m-0 list-style-none categories-list'>
                        {objectToArray(enums.RADY_TIPY.KATEGORIE).map(
                          (categoryItem) => (
                            <li
                              className='category-item'
                              key={categoryItem.key}
                            >
                              <Link
                                href={{
                                  pathname: "/rady-a-tipy/[kategorie]",
                                  query: { kategorie: categoryItem.key },
                                }}
                              >
                                {categoryItem.value}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {children}
            </Fragment>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RadyTipyLayout;
