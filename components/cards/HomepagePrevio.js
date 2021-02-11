import React from "react";
import PrevioObjekt from "./PrevioObjekt";

const HomePagePreviObjekt = ({ objekt, background, badge, word_count }) => (
  <PrevioObjekt
    objekt={objekt}
    background={background}
    badge={badge}
    word_count={word_count}
  />
);
export default HomePagePreviObjekt;
