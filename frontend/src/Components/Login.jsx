import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataLayerContext } from "../DataLayer";
import { actions } from "../Reducer/action";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, dispatch] = useDataLayerContext();
  const handelSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    if (response.status === 200) {
      toast.success(result.message);
      dispatch({
        type: actions.SET_TOKEN,
        token: result.token,
      });
      dispatch({
        type: actions.SET_USERID,
        user_id: result.user_id,
      });
      navigate("/main");
    } else {
      result?.message
        ? toast.error(result?.message)
        : toast.error("Something is wrong");
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 p-3 w-50 m-auto">
      <h1>Login Form</h1>
      <form className="container mt-4" onSubmit={handelSubmit}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email Address"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            minLength={6}
          />
        </div>
        <Link to="/register" className="m-3" style={{ float: "right" }}>
          Not Have an Account
        </Link>
        <button type="submit " className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
