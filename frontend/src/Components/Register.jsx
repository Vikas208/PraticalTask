import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataLayerContext } from "../DataLayer";
import { actions } from "../Reducer/action";
function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [, dispatch] = useDataLayerContext();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.info("Confirm Password Not Matched");
      return;
    }

    let data = {
      email: email,
      name: name,
      password: password,
    };
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      navigate("/main");
      toast.success("Register SuccessFully Done");
      let result = await response.json();
      dispatch({
        type: actions.SET_TOKEN,
        token: result.token,
      });
      dispatch({
        type: actions.SET_USERID,
        user_id: result.user_id,
      });
    } else {
      let result = await response.json();
      result?.message
        ? toast.error(result?.message)
        : toast.error("Something is Wrong");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 p-3 w-50 m-auto">
      <h1>Register Form</h1>
      <form className="container mt-4" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleUsername" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="confirm Password"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (password !== e.target.value) {
                e.target.style.outline = "1px solid red";
              } else {
                e.target.style.outline = "1px solid green";
              }
            }}
            minLength={6}
          />
        </div>
        <Link to="/login" className="m-3" style={{ float: "right" }}>
          Already Have An Account
        </Link>
        <button type="submit " className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
