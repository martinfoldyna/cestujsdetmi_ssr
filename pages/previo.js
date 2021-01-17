import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseString } from "xml2js";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import { FiMapPin } from "react-icons/fi";
import parse from "html-react-parser";
import { Container } from "react-grid-system";

const Previo = () => {
  const [previoObjekt, setPrevioObjekt] = useState(null);

  const getHotel = async (hotelID) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/xml",
        },
      };
      const getBody = `<?xml version="1.0"?>\n
    <request>
    <login>${process.env.NEXT_PUBLIC_PREVIO_LOGIN}</login>
    <password>${process.env.NEXT_PUBLIC_PREVIO_PASSWORD}</password>
    <hotId>${hotelID}</hotId>
</request>`;

      const res = await axios.post(
        `https://cors-anywhere.herokuapp.com/${process.env.NEXT_PUBLIC_PREVIO_API_URL}/hotel/get`,
        getBody,
        config
      );
      const galerie = await axios.get(
        `https://cors-anywhere.herokuapp.com/${process.env.NEXT_PUBLIC_PREVIO_API_URL}/hotel/getPhotogalleries`,
        getBody,
        config
      );
      parseString(res.data, (err, result) => {
        if (err) {
          return { notFound: true, success: false, data: err };
        }
        let returnObjekt = { ...result.hotel };
        parseString(galerie.data, (err, result) => {
          if (err) return { notFound: true, success: false, data: err };
          returnObjekt = {
            ...returnObjekt,
            galerie: { ...result.photogalleries },
          };
        });

        console.log(returnObjekt);
        return { success: true, data: returnObjekt };
      });
    } catch (err) {
      return { success: false, data: err };
    }
  };

  useEffect(() => {
    getHotel(1);
  }, []);

  return (
    <Container style={{ maxWidth: "1220px" }}>
      <h1>{previoObjekt?.name[0]}</h1>
      <Section className="border-section">
        <SectionHeading background="none">
          <h2>Základní informace</h2>
        </SectionHeading>
        <SectionContent>
          {previoObjekt?.descriptions[0]?.shortDescription[0] &&
            parse(previoObjekt?.descriptions[0]?.shortDescription[0])}
        </SectionContent>
      </Section>
      <Section className="border-section">
        <SectionHeading background="none">
          <h2>Podrobný popis</h2>
        </SectionHeading>
        <SectionContent>
          {previoObjekt?.descriptions[0]?.longDescription[0] &&
            parse(previoObjekt?.descriptions[0]?.longDescription[0])}
        </SectionContent>
      </Section>
      <Section className="border-section">
        <SectionHeading background="none">
          <h2>Kontakt</h2>
        </SectionHeading>
        <SectionContent>
          <ul className="list-style-none pl-0 m-0 contact-list">
            <li>
              <p className="m-0">
                <FiMapPin className="icon text-blue" />
                {previoObjekt?.address[0]?.name},{" "}
                {previoObjekt?.address[0]?.street},{" "}
                {previoObjekt?.address[0]?.zip} {previoObjekt?.address[0]?.city}
              </p>
            </li>
          </ul>
        </SectionContent>
      </Section>

      <ul>
        <li>
          {previoObjekt?.address[0]?.name}, {previoObjekt?.address[0]?.street},{" "}
          {previoObjekt?.address[0]?.zip} {previoObjekt?.address[0]?.city}
        </li>
      </ul>
      <a href={previoObjekt?.url[0]}>{previoObjekt?.url[0]}</a>
      <iframe
        src="https://booking.previo.cz/?hotId=1&lang=cs&showTabs=reservation"
        frameBorder="0"
        width="100%"
        height="2000"
        name="previo-booking-iframe"
        id="previo-booking-iframe"
        allowTransparency="true"
      />
    </Container>
  );
};

export default Previo;
