import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "./helpers";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(name, event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `http://localhost:5000/api/signin`,
      data: { email, password },
    })
      .then((res) => {
        // console.log(res);
        authenticate(res.data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submited",
          });
          toast.success(`${res.data.name}, welcome back`);
          console.log(isAuth());
          isAuth() && isAuth().isAdmin
            ? history.push("/allusers")
            : history.push("/private");
        });
      })
      .catch((error) => {
        console.log(error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error("user is not verified");
      });
  };
  const signinForm = () => (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Password
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h2 className="p-5 text-center">Signin</h2>
        {signinForm()}
      </div>
    </Layout>
  );
};

export default Signin;
