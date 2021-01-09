import React from "react";
import PropTypes from "prop-types";
import { fetchQuery } from "../helpers/fetch";

const MyComponent = ({ objekty }) => {
  return (
    <div>
      <h1>This is server side rendered</h1>
      {objekty && objekty?.map((objekt) => <div>{objekt.nazev}</div>)}
    </div>
  );
};

MyComponent.propTypes = {
  objekty: PropTypes.array.isRequired,
};

export default MyComponent;

export async function getServerSideProps() {
  const objekty = await fetchQuery(
    "objekt-infos-minified?_sort=druh_zapisu:DESC,createdAt:DESC"
  );

  return { props: { objekty } };
}
