import React from "react";
import ObjednatObjektInfo from "../../../components/ObjednatObjektInfo";
import { Container } from "react-grid-system";
import { handleJwt } from "../../../helpers/auth";

export async function getServerSideProps(ctx) {
  const user = await handleJwt(ctx);
  console.log(user);
  return { props: { APIuser: user } };
}

const UpdateObjekt = ({ APIuser }) => (
  <Container className="main-container">
    <ObjednatObjektInfo user={APIuser} />
  </Container>
);

export default UpdateObjekt;
