import React from "react";
import ObjednatObjektInfo from "../../../components/ObjednatObjektInfo";
import { Container } from "react-grid-system";
import { handleJwt } from "../../../helpers/auth";

export async function getServerSideProps(ctx) {
  const user = await handleJwt(ctx);
  const locations = await fetchQuery("locations");

  console.log(user);
  return { props: { APIuser: user } };
}

const AddObjektWithPlan = ({ apiUser, locations }) => (
  <Container className='main-container'>
    <ObjednatObjektInfo user={apiUser} locations={locations} />
  </Container>
);

export default AddObjektWithPlan;
