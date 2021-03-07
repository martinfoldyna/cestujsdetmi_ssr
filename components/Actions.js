import { Col, Row } from "react-grid-system";
import { RiSendPlaneFill } from "react-icons/ri";
import { ImFacebook2 } from "react-icons/im";
import { IoLogoInstagram } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";
import MyLink from "../layouts/MyLink";
import Link from "next/link";

const Actions = () => {
  return (
    <Row className='row'>
      <Col className='col' lg={7.5}>
        <div className='bg-white map-component actions-component border-radius'>
          <div className='d-flex align-items-center justify-content-between'>
            <div>
              <div className='heading-with-icons d-flex align-items-center'>
                <RiSendPlaneFill
                  className={`text-white icon-heading bg-blue`}
                  style={{ marginRight: "1em" }}
                />
                <h2 className='d-flex align-items-center'>
                  Nezávazná poptávka
                </h2>
              </div>
              <div className='margin-wrapper'>
                <p>Zašleme Vám nezávaznou nabídku Vaší dovolené nebo výletu.</p>
              </div>
            </div>
            <button className='btn bg-blue text-white'>Vyplnit poptávku</button>
          </div>
        </div>
      </Col>
      <Col lg={4.5}>
        <div className='hide-mobile'>
          <div className='bg-white map-component actions-component border-radius'>
            <div className='heading-with-icons d-flex align-items-center justify-content-between'>
              <h2 className='d-flex align-items-center'>Sledování novinek</h2>
              <div className='d-flex justify-content-end'>
                <div className='mr-1'>
                  <button className='btn d-flex align-items-center btn-circle'>
                    <a
                      href='https://www.facebook.com/cestujsdetmi.cz/'
                      target='_blank'
                      rel='noopener'
                    >
                      <ImFacebook2 />
                    </a>
                  </button>
                </div>
                <div className='mr-1 '>
                  <button className='btn d-flex align-items-center btn-circle'>
                    <a
                      href='https://www.instagram.com/cestujsdetmi.cz/'
                      target='_blank'
                      rel='noopener'
                    >
                      <IoLogoInstagram />
                    </a>
                  </button>
                </div>
                <div>
                  <button className='btn d-flex align-items-center btn-circle'>
                    <a
                      href='mailto:info@cestujsdetmi.cz'
                      target='_blank'
                      rel='noopener'
                    >
                      <FaRegEnvelope />
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <p> Sledujte nás na soc. sítích nebo formou newletteru.</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Actions;
