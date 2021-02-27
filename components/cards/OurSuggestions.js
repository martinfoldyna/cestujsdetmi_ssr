import React, { useEffect, useState } from "react";
import { MdFlag } from "react-icons/md";
import { Section, SectionHeading, SectionContent } from "../../layouts/Section";
import { fetchPromo, fetchQuery } from "../../helpers/fetch";
import parse from "html-react-parser";
import { trimString } from "../../helpers/helpers";
import MyLink from "../../layouts/MyLink";

const OurSuggestions = () => {
  const [promo, setPromo] = useState(null);
  const [promoIndex, setPromoIndex] = useState(0);

  const generateRandomIndex = () => {};

  useEffect(() => {
    fetchPromo(setPromo);
  }, []);

  useEffect(() => {
    if (promo) {
      setPromoIndex(Math.floor(Math.random() * promo.length));
    }
  }, [promo]);

  return (
    <div>
      <Section className="border-radius">
        <SectionHeading className="d-flex align-items-center p-0">
          <MdFlag className="icon text-blue" />
          <h3>Naše tipy</h3>
        </SectionHeading>
        <div className="bg-white last-minute-small mb-1">
          <div className="suggestion-article">
            <h3 className="m-0 suggestion-post-heading">Chateau St. Havelno</h3>
            <p>
              Apart Hotel v Jablonci nad Nisou je rodinné a moderní ubytování s
              vyhlášenou restaurací v blízkosti krásné jablonecké přehrady,
              plaveckého bazénu s aquaparkem a městské sportovní haly. Ideální
              poloha pro dovolenou s dětmi a to jak v létě tak v zimě.
            </p>
          </div>
          {promo && (
            <div className="suggestion-article">
              <MyLink href={`/rady-a-tipy/detail/${promo[promoIndex].hodnota}`}>
                <h3 className="m-0 suggestion-post-heading">
                  {promo[promoIndex].nazev}
                </h3>
                {promo[promoIndex].perex ? (
                  <p>{parse(trimString(promo[promoIndex].perex, 21))}</p>
                ) : promo[promoIndex]?.zakladni_popis ||
                  promo[promoIndex]?.text ? (
                  <p>
                    {parse(
                      trimString(
                        promo[promoIndex]?.zakladni_popis ||
                          promo[promoIndex]?.text,
                        21
                      )
                    )}
                    ...
                  </p>
                ) : (
                  ""
                )}
              </MyLink>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default OurSuggestions;
