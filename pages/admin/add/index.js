import React from "react";
import ObjednatObjektInfo from "../../../components/ObjednatObjektInfo";
import { Container } from "react-grid-system";
import { handleJwt } from "../../../helpers/auth";
import { fetchQuery } from "../../../helpers/fetch";

export async function getServerSideProps(ctx) {
  const user = await handleJwt(ctx);
  const locations = await fetchQuery("locations");
  console.log(user);
  return { props: { APIuser: user, locations } };
}

const AddObjekt = ({ APIuser, locations }) => (
  <Container className='main-container'>
    <ObjednatObjektInfo user={APIuser} locations={locations} />
  </Container>
);

export default AddObjekt;
