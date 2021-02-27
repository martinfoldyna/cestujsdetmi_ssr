import { Fragment, useEffect } from "react";
import Link from "next/link";
import { AiFillBulb } from "react-icons/ai";
import { FaNewspaper } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Row, Col, Container } from "react-grid-system";
import ObjektOverviewItem from "../../components/cards/ObjektOverviewItem";
import ObjektyTable from "../../components/ObjektyTable";
import { connect } from "react-redux";
import { getAllObjectTypes } from "../../redux/actions/objekty";
import PropTypes from "prop-types";
import SideCards from "../../layouts/SideCards";
import MyLink from "../../layouts/MyLink";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { fetchQuery } from "../../helpers/fetch";
import enums from "../../enums";

export async function getStaticProps() {
  const objektyTypyData = await fetchQuery(`${enums.URLS.objektyTypy}`);

  const objektyTypy = {};
  for (let type of objektyTypyData) {
    const beautifiedHodnota = type.hodnota.substr(3);
    objektyTypy[beautifiedHodnota] = type;
  }

  return { props: { objektyTypy } };
}

const ObjektyOverview = ({ objektyTypy }) => {
  const generateObjekty = () => {
    let dataKeysUnsorted = Object.keys(objektyTypy);

    return dataKeysUnsorted.map((key) => (
      <Col md={6} style={{ marginBottom: "2em" }} key={objektyTypy[key].id}>
        <ObjektOverviewItem data={objektyTypy[key]} />
      </Col>
    ));
  };

  const fetchPublicAPI = async () => {
    const res = await fetch(
      " https://salty-fortress-11549.herokuapp.com/objekt-infos?_sort=druh_zapisu:DESC,created_at:DESC&typ_objektu=zabava&_limit=20"
    );
    console.log(res);
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchPublicAPI();
  }, []);

  return (
    <>
      <Container className="main-container">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;Registrace - nabídka
          možností
        </span>

        {/*<div className="objekty-heading bg-blue text-white">*/}
        {/*  <Row>*/}
        {/*    <Col md={9}>*/}
        {/*      <div className="heading-with-icons d-flex align-items-center">*/}
        {/*        <FiPlus*/}
        {/*          className="text-white icon-heading"*/}
        {/*          style={{ marginRight: ".5em" }}*/}
        {/*        />*/}
        {/*        <h2>Registrace - Nabídka možností prezentace</h2>*/}
        {/*      </div>*/}
        {/*      <p>*/}
        {/*        Denně navštěvuje portál Cestuj s dětmi.cz více než 2 tisíce*/}
        {/*        uživatelů, kteří hledají tipy na dovolenou nebo na volný čas po*/}
        {/*        celé České republice.*/}
        {/*      </p>*/}

        {/*      <p>*/}
        {/*        Tak neváhejte a vyberte jednu z níže uvedených verzí zápisů a*/}
        {/*        sestavte si kvalitní prezentaci Vašeho objektu pomocí jednoduché a*/}
        {/*        přehledné administrace. Případní budoucí klienti se tak snadno a*/}
        {/*        rychle seznámí s poskytovanou nabídkou, prohlédnou si fotografie a*/}
        {/*        získají představu o nabízených službách. Zároveň mohou ihned*/}
        {/*        pomocí přímého prolinku přejít na Vaše webové stránky.*/}
        {/*      </p>*/}
        {/*    </Col>*/}
        {/*    <Col className="d-flex justify-content-center align-items-center hide-mobile">*/}
        {/*      <img src={biPlus} alt="biplus" />*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</div>*/}
        <HeadingWithIcon
          heading="Registrace - Nabídka možností prezentace"
          background="blue"
          icon={FiPlus}
        >
          <>
            <p>
              Denně navštěvuje portál Cestuj s dětmi.cz více než 2 tisíce
              uživatelů, kteří hledají tipy na dovolenou nebo na volný čas po
              celé České republice.
            </p>

            <p>
              Tak neváhejte a vyberte jednu z níže uvedených verzí zápisů a
              sestavte si kvalitní prezentaci Vašeho objektu pomocí jednoduché a
              přehledné administrace. Případní budoucí klienti se tak snadno a
              rychle seznámí s poskytovanou nabídkou, prohlédnou si fotografie a
              získají představu o nabízených službách. Zároveň mohou ihned
              pomocí přímého prolinku přejít na Vaše webové stránky.
            </p>
          </>
        </HeadingWithIcon>

        <Row className="justify-content-between">
          <Col md={2.5}>
            <div className="mt-1">
              <SideCards />
            </div>
          </Col>
          <Col>
            <div className="objekty">
              <h3 className="font-weight-600 section-heading">
                Pokud chcete vybrat formu prezentace, nejdříve se{" "}
                <MyLink href="/auth/register" className="text-blue">
                  registrujte
                </MyLink>
                .
              </h3>
              <Row>
                {objektyTypy && (
                  <Fragment>
                    {generateObjekty()}
                    <Col md={6} style={{ marginBottom: "2em" }}>
                      <ObjektOverviewItem
                        data={{
                          nazev: "Previo",
                          cena: "Zdarma",
                          popis: `<p>Previo je alternativní způsob registrace.</p>`,
                          hodnota: "previo",
                        }}
                      />
                    </Col>{" "}
                  </Fragment>
                )}
              </Row>
            </div>
            {objektyTypy && <ObjektyTable objektyTypy={objektyTypy} />}
            <h3 className="font-weight-600 section-heading">Vysvětlivky</h3>
            <Row>
              <Col md={6} style={{ marginBottom: "2em" }} className="pl-0">
                <div className="plan-card">
                  <h3 className="card-heading d-flex align-items-center">
                    <span>
                      PR článek v sekci &nbsp;
                      <FaNewspaper className="text-pink link-icon m-0" />
                      &nbsp; Aktuality
                    </span>
                  </h3>
                  <p>
                    Krátkodobé zveřejnění Vašeho PR článku ( např. s pozvánkou
                    na pořádané akce, pogramy, slevové balíčky apod. ) na hlavní
                    straně portálu Cestuj s dětmi. cz v sekci AKTUALITY.
                  </p>{" "}
                  <p>
                    Součástí článku jsou přímé prolinky z klíčových slovních
                    spojení na Vaše webové stránky a dále několik fotografií.
                  </p>{" "}
                  <p>
                    Po uplynutí placeného období zůstává článek na našem serveru
                    v archivu. Článek na hlavní straně nerotuje s ostatními
                    články, zůstává v pevném ukotvení.
                  </p>{" "}
                  <p>Zveřejňujeme max. 6 AKTUALIT v daném období.</p>{" "}
                  <p>
                    Průměrná návštěvnost portálu je 2000 uživatelů dennně, ruční
                    zaindexování článku na Google.cz a Seznam.cz, anotace z
                    hlavní strany portálu (HP).
                  </p>{" "}
                  <p>
                    Cena je 290,- Kč / týden zobrazení PR článku na našem
                    homepage. Doporučujeme dobu zveřejnění min. 3 týdny před
                    termínem plánované akce.
                  </p>{" "}
                  <p>Samozřejmostí je vždy i vložení článku na náš Facebook.</p>{" "}
                  <p>Příklad zveřejněné AKTUALITY.</p>{" "}
                  <p>
                    Pokud Vás nabídka zaujala, pak určitě neváhejte a
                    kontaktujte nás info@cestujsdetmi.cz.
                  </p>
                </div>
              </Col>
              <Col md={6} style={{ marginBottom: "2em" }} className="p-0">
                <div className="plan-card">
                  <h3 className="card-heading d-flex align-items-center">
                    <span>
                      PR článek v sekci &nbsp;
                      <AiFillBulb className="text-yellow link-icon m-0" />
                      &nbsp; Rady a tipy
                    </span>
                  </h3>
                  <p>
                    PR článek je umístěn na dobu jednoho roku v sekci RADY A
                    TIPY – Cestuj s dětmi doporučuje ( zelená záložka v menu na
                    hlavní straně ). PR článek je umístěn na dobu jednoho roku v
                    sekci RADY A TIPY – Cestuj s dětmi doporučuje ( zelená
                    záložka v menu na hlavní straně ).
                  </p>{" "}
                  <p>
                    Součástí článku jsou i přímé odkazy z klíčových slovních
                    spojení na Váš web tak, aby se uživatelé mohli z textu
                    prokliknout přímo na konkrétní webové stránky a zároveň
                    posílily ranky vyhledávačů a dále několik fotografií.
                  </p>{" "}
                  <p>
                    Po dobu zveřejnění rotuje PR článek na hlavní straně portálu
                    v sekci NEJČTENĚJŠÍ ČLÁNKY a tím je uživatelům ještě více na
                    očích.
                  </p>{" "}
                  <p>
                    Po uplynutí placeného období bude na Vás, zda se rozhodnete
                    spolupráci prodloužit o další rok nebo bude PR článek
                    umístěn do archivu ( zachování linkbuildingu ).
                  </p>{" "}
                  <p>Cena je 1390,- Kč / rok zveřejnění.</p>{" "}
                  <p>
                    Nabízíme i možnost sepsání PR článku dle zadání v ceně 490,-
                    Kč / článek.
                  </p>{" "}
                  <p>
                    Sekci RADY A TIPY naleznete přímo{" "}
                    <MyLink href="/rady-tipy" className="text-yellow">
                      zde
                    </MyLink>
                    .
                  </p>{" "}
                  <p>Samozřejmostí je vždy i vložení článku na náš Facebook.</p>
                  <p>
                    Pokud Vás nabídka zaujala, pak určitě neváhejte a
                    kontaktujte nás{" "}
                    <a
                      href="mailto:info@cestujsdetmi.cz"
                      className="text-yellow"
                    >
                      info@cestujsdetmi.cz
                    </a>
                    .
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="plan-card">
                  <h3 className="card-heading d-flex align-items-center">
                    Bannerová reklama
                  </h3>
                  <p>
                    V případě zájmu umístíme Vaše bannery různých velikostí na
                    vybrané pozice portálu. Garance 5000 impresí denně.
                  </p>

                  <p>Cena je 2900,- Kč / měsíc.</p>

                  <p>
                    Pokud Vás nabídka zaujala, pak určitě neváhejte a
                    kontaktujte nás info@cestujsdetmi.cz.
                  </p>

                  <p>Mezi naše klienty patří:</p>

                  <p>
                    CK Blue Style, CK Fischer, firma Topgal, Generali
                    pojišťovna, TravelPortál.cz, ePojištění, Zoznam.sk a mnoho
                    dalších.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

ObjektyOverview.propTypes = {};

export default ObjektyOverview;
