import React, { useRef } from "react";
import PropTypes from "prop-types";
import Input from "../../components/form/Input.js";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-grid-system";
import { isEmail } from "../../helpers/validators";
import { registerUser } from "../../redux/actions/users";
import { connect } from "react-redux";
import { FaAt, FaLock, FaUser } from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { MdLocationCity } from "react-icons/md";
import { TiSortNumerically } from "react-icons/ti";
import { MyLink } from "../../layouts/MyLink";

const Register = ({ user }) => {
  const { handleSubmit, register, errors, watch } = useForm();

  const password = useRef();
  password.current = watch("heslo", "");
  const passwordConfirm = useRef();
  passwordConfirm.current = watch("heslo-confirm", "");

  const onSubmit = (data) => {
    const formUser = {
      email: data.email,
      password: data.heslo,
      jmeno: data.jmeno,
      prijmeni: data.prijmeni,
      ulice: data.ulice,
      mesto: data.mesto,
      psc: data.psc,
    };
    registerUser(formUser);
  };
  const onError = (errors, e) => console.log(errors, e);

  return user ? (
    "Not authorized"
  ) : (
    <>
      <h2>Registrace</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Row className="row">
          <Col md={6}>
            <Input
              type="email"
              name="email"
              text="E-mail"
              autoComplete="email"
              errors={errors}
              ref={register({
                required: "Prosím zadejte svůj e-mail",
                pattern: isEmail(),
              })}
            >
              <FaAt className="form-icon" />
            </Input>
            <Input
              name="jmeno"
              text="Jméno"
              autoComplete="given-name"
              required
              ref={register({ required: "Prosím zadejte své křesní jméno" })}
              errors={errors}
            >
              <FaUser className="form-icon" />
            </Input>
            <Input
              name="prijmeni"
              text="Přijmení"
              autoComplete="family-name"
              ref={register({ required: "Prosím zadejte své přijemní" })}
              errors={errors}
            >
              <FaUser className="form-icon" />
            </Input>
            <Input
              type="password"
              name="heslo"
              text="Heslo"
              ref={register({
                required: "Prosím zadejte heslo",
                validate: (value) =>
                  value === passwordConfirm.current || "Heslo se neshodují",
              })}
              autoComplete="new-password"
              errors={errors}
            >
              <FaLock className="form-icon" />
            </Input>
            <Input
              type="password"
              name="heslo-confirm"
              text="Ověřte heslo"
              errors={errors}
              autoComplete="new-password"
              ref={register({
                required: "Prosím zadejte heslo",
                validate: (value) =>
                  value === password.current || "Heslo se neshodují",
              })}
            >
              <FaLock className="form-icon" />
            </Input>
          </Col>
          <Col md={6}>
            <Input
              name="ulice"
              text="Ulice a č.p."
              autoComplete="shipping street-address"
              ref={register({
                required: "Prosím zadejte Ulici a č.p svého bydliště",
              })}
              errors={errors}
            >
              <GiHouse className="form-icon" />
            </Input>
            <Input
              name="mesto"
              text="Město"
              autoComplete="address-level2"
              ref={register({
                required: "Prosím zadejte Město svého bydliště",
              })}
              errors={errors}
            >
              <MdLocationCity className="form-icon" />
            </Input>
            <Input
              name="psc"
              text="PSČ"
              ref={register({
                required: "Prosím zadejte PSČ svého bydliště",
                pattern: {
                  value: /^\d{3}[-\s]?\d{2}$/,
                  message: "Zadejte prosím platné PSČ",
                },
              })}
              errors={errors}
              autoComplete="postal-code"
            >
              <TiSortNumerically className="form-icon" />
            </Input>
          </Col>
        </Row>

        <button className="btn bg-blue text-white">Zaregistrovat se</button>
      </form>
      <p>
        Už jste se u nás registrovali?{" "}
        <MyLink href="/auth/login/" className="text-blue">
          Přihlašte se
        </MyLink>
      </p>
    </>
  );
};

Register.propTypes = {
  users: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default Register;
