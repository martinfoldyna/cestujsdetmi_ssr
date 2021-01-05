import React from 'react';
import {Col, Row} from "react-grid-system";
import {AiFillFacebook} from "react-icons/ai";
import {FaSearch, FaTag} from "react-icons/fa";
import {HiOutlineChevronLeft} from "react-icons/hi";

const Hero = () => {
    return (
        <div className="hero">
            <div className="wrapper">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="content">
                        <h1>Dovolená a výlety s dětmi</h1>
                        <p className="description">
                            Dovolená nebo výlet, mnoho tipů víme a kam s dětmi poradíme.
                            Ubytování, dovolená a výlety v Čechách i na Moravě.
                        </p>
                        <button className="text-white ghost btn btn-small-logo  mt-3 pl-0 ml-0">
                            <a
                                href="https://www.facebook.com/cestujsdetmi.cz/"
                                className="d-flex align-items-center"
                                target="_blank"
                            >
                                Sledujte nás <AiFillFacebook className="btn-icon right" />
                            </a>
                        </button>
                    </div>

                    <div className="search-bar">
                        <div className="d-flex align-items-center">
                            <input type="text" placeholder="Zadjete hledaný výraz" />
                            <button className="btn bg-white search-bar-button">
                                <FaSearch className="text-black" />
                            </button>
                        </div>
                    </div>

                    <div className="last-minute bg-white text-black">
                        <div className="side-badge" style={{ position: "absolute" }}>
                            <FaTag className="icon" />
                            <span>Last minute</span>
                        </div>
                        <Row className="row">
                            <Col
                                md={1}
                                className="d-flex align-items-center justify-content-center"
                            >
                                <HiOutlineChevronLeft />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
