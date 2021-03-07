import React from "react";
import { Col, Row } from "react-grid-system";
import {
  AiFillBulb,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaSearch, FaTag } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <div className='hero'>
      <div className='wrapper'>
        {/*<div className="backdrop">*/}
        {/*  <img src="/cestuj_person_big_grey.svg" alt="logo cestuj s dětmi.cz" />*/}
        {/*</div>*/}
        <div className='d-flex justify-content-center'>
          <div className='content'>
            <h1>
              <span className='underline'>Největší portál</span> pro vyhledávání
              zážitků, ubytování a výletů s dětmi
            </h1>
            <p className='hide-mobile'>
              Poradíme Vám kam na výlet nebo dovolenou s dětmi v tuzemsku a
              poskytneme užitečné rady a tipy formou článků a nejnovějších
              aktualit.
            </p>

            <div className='search-bar'>
              <div className='d-flex align-items-center'>
                <input type='text' placeholder='Zadejte hledaný výraz' />
                <button className='btn bg-blue text-white '>
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className='logos-wrapper d-flex'>
              <div className='logo'>
                <Image src='/img/logos/generali.png' layout='fill' />
              </div>
              <div className='logo'>
                <Image src='/img/logos/blue_style.png' layout='fill' />
              </div>
              <div className='logo'>
                <Image src='/img/logos/cez.png' layout='fill' />
              </div>
              <div className='logo'>
                <Image src='/img/logos/epojisteni.png' layout='fill' />
              </div>
              <div className='logo'>
                <Image src='/img/logos/topgal.png' layout='fill' />
              </div>
              <div className='logo'>
                <Image src='/img/logos/zoznam_sk.png' layout='fill' />
              </div>
            </div>
          </div>
          <div className='image-wrapper'>
            <img src='/img/hero-background01.jpg' alt='rodina s dětmi' />
          </div>
        </div>

        <div className='hide-desktop'>
          <div className='border-radius bg-blue d-flex p-1 description-wrapper'>
            <AiFillBulb className='text-blue-darken icon-heading' />
            <p className='description text-white'>
              Poradíme Vám kam na výlet nebo dovolenou s dětmi v tuzemsku a
              poskytneme užitečné rady a tipy formou článků a nejnovějších
              aktualit.
            </p>
          </div>
          <div className='border-radius bg-white d-flex p-1 mt-1'>
            <p className='description'>Jsme také na sociálních sítích</p>
            <div className='icons d-flex'>
              <div className='icon-wrapper align-items-center'>
                <AiFillFacebook />
              </div>
              <div className='icon-wrapper align-items-center'>
                <AiOutlineInstagram />
              </div>
            </div>
          </div>
        </div>

        {/*<div className="last-minute bg-white text-black">*/}
        {/*  <div className="side-badge" style={{ position: "absolute" }}>*/}
        {/*    <FaTag className="icon" />*/}
        {/*    <span>Last minute</span>*/}
        {/*  </div>*/}
        {/*  <Row className="row">*/}
        {/*    <Col*/}
        {/*      md={1}*/}
        {/*      className="d-flex align-items-center justify-content-center"*/}
        {/*    >*/}
        {/*      <HiOutlineChevronLeft />*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Hero;
