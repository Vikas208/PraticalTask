import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Confirm Password Not matched");
      return;
    }
    let data = {
      email: email,
      newPassword: password,
    };

    let response = await fetch("/auth/changePassword", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    let result = await response.json();
    if (response.status === 200) {
      toast.success(result?.message);
      navigation("/login");
    } else {
      result?.message
        ? toast.error(result?.message)
        : toast.error("Something went wrong");
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 p-3 w-50 m-auto">
      <h1>Forgot Password Form</h1>
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
            New Password
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
            placeholder="Password"
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
        <button type="submit " className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
