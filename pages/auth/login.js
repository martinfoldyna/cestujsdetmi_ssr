import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loginUser, getUser } from "../../redux/actions/users";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input.js";
import { FaAt, FaChevronRight, FaLock } from "react-icons/fa";
import { setToast } from "../../redux/actions/alerts";
import { MyLink } from "../../layouts/MyLink";
import { useRouter } from "next/router";

const Login = ({ user }) => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("auth-token"));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data);
  };

  useEffect(() => {
    if (user) {
      router.push("/auth/dashboard");
    }
  }, [user]);

  const [adminLogin, setAdminLogin] = useState(false);

  const onErrors = (errors, e) => console.log(errors);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="login-card border-grey">
          <div className="p-1">
            <h3 className="mt-0 mb-1">
              {adminLogin
                ? "Přihlašení správce objektu"
                : "Uživatelské přihlášení"}
            </h3>
            {adminLogin && (
              <span className="text-left w-100 d-block mb-1">
                Přístup do administrace
              </span>
            )}
            <form onSubmit={handleSubmit(onSubmit, onErrors)} noValidate>
              <Input
                type="email"
                ref={register({
                  required: "Prosím zadejte svojí emailovou adresu",
                })}
                text="E-mail"
                name="identifier"
                className="m-0"
                errors={errors}
              >
                <FaAt className="form-icon" />
              </Input>
              <Input
                type="password"
                ref={register}
                text="Heslo"
                name="password"
                className="m-0"
                errors={errors}
                required="Prosím zadejte svoje heslo"
              >
                <FaLock className="form-icon" />
              </Input>

              <button className="btn bg-blue text-white w-100">
                Přihlásit se
              </button>
            </form>
            {!adminLogin && (
              <Fragment>
                <span className="d-block mt-1 mb-1">nebo</span>
                <button className="btn bg-white w-100">
                  Přihlásit přes Google
                </button>
              </Fragment>
            )}
            <span className="d-block mt-1">
              {adminLogin
                ? "Chcete vlastní prezentaci objektu?"
                : "Ještě u nás nemáte účet?"}
            </span>
            <MyLink
              href="/auth/register/"
              className="text-blue mb-1 w-100 d-block"
            >
              Registrujte se
            </MyLink>
          </div>
          <div className="p-1 bg-grey d-flex justify-content-center">
            <button
              className="btn btn-small-logo bg-transparent"
              onClick={() => setAdminLogin((prevState) => !prevState)}
            >
              Přihlásit se jako {adminLogin ? "uživatel" : "správce objektu"}
              <FaChevronRight className="btn-icon right text-blue" />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  users: PropTypes.object,
  loginUser: PropTypes.func,
  getUser: PropTypes.func,
  setToast: PropTypes.func,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default Login;
