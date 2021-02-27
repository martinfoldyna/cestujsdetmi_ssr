import React from "react";
import { Row, Col } from "react-grid-system";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaFacebookSquare } from "react-icons/fa";
import MyLink from "./MyLink";
import NewsletterInput from "../components/NewsletterInput";

const SiteMap = () => {
  return (
    <div className='bg-grey text-black'>
      <div className='sitemap'>
        <div className='content-wrapper'>
          <div
            className='d-flex justify-content-between sitemap-header'
            style={{ position: "relative" }}
          >
            <div className='d-flex align-items-center'>
              <div className='image-wrapper'>
                <Image
                  src='/cestuj_big.svg'
                  alt='malé logo Cestujsdětmi.cz'
                  // layout="fill"
                  height={47}
                  width={270}
                />
              </div>
            </div>
            <div className='hide-mobile'>
              <div className='d-flex align-items-center'>
                <MyLink href='/newsletter'>
                  <button className='btn btn-logo ghost'>
                    Odběr newsletteru{" "}
                    <FaEnvelope className='text-blue btn-icon right' />
                  </button>
                </MyLink>

                <MyLink href='https://www.facebook.com/cestujsdetmi.cz/'>
                  <button className='btn btn-logo ghost'>
                    Sledujte nás na{" "}
                    <FaFacebookSquare className='text-blue btn-icon right' />
                  </button>
                </MyLink>
              </div>
            </div>
            <div className='hide-desktop'>
              <h4 className='text-center'>Odebírejte zajímavé novinky!</h4>
              <NewsletterInput />
            </div>
          </div>
          <Row>
            <Col md={3}>
              <ul>
                <li>
                  <b>Navigace</b>
                </li>
                <li>
                  <Link href='/ubytovani'>Hledám ubytování</Link>
                </li>
                <li>
                  <Link href='/vylety'>Hledám zábavu pro děti</Link>
                </li>
                <li>
                  <Link href='/rad-tipy'>Rady a tipy na cesty s dětmi</Link>
                </li>
                <li>
                  <Link href='/akce'>Aktuální akce pro děti</Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <ul>
                <li>
                  <b>Cestuj s dětmi.cz</b>
                </li>
                <li>
                  <Link href='/kontakt'>Kontakty</Link>
                </li>
                <li>
                  <Link href='/o-portalu'>O portálu</Link>
                </li>
                <li>
                  <Link href='https://www.facebook.com/cestysdetmi/'>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href='/'>Mapa stránek</Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <ul>
                <li>
                  <b>Přidat objekt</b>
                </li>
                <li>
                  <Link href='/auth/objednat?druh=ubytovani'>
                    Zaregistrovat ubytovací zařízení
                  </Link>
                </li>
                <li>
                  <Link href='/auth/objednat?druh=vylet'>
                    Zaregistrovat volnočasobé zařízení
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <ul className='list-style-none pl-0'>
                <li>
                  <b>Spolupracujeme</b>
                </li>
                <li>
                  <Link href='https://www.maminkov.cz/' target='_blank'>
                    Maminkov.cz
                  </Link>
                </li>
                <li>
                  <Link href='https://www.kamsdetmivpraze.cz/' target='_blank'>
                    Kam s dětmi v Praze
                  </Link>
                </li>
                <li>
                  <Link href='https://www.tipynavylety.cz/' target='_blank'>
                    Tipy na výlety
                  </Link>
                </li>
                <li>
                  <Link href='https://jenasvic.cz/' target='_blank'>
                    Je Nás Víc
                  </Link>
                </li>
                <li>
                  <Link
                    href='http://www.aparthotel-jablonec.cz/'
                    target='_blank'
                  >
                    Apart Hotel Jablonec
                  </Link>
                </li>
                <li>
                  <Link href='https://www.restaurant59.cz/' target='_blank'>
                    Restaurant 59
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
