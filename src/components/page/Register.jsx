import axios from "axios";
import React, { createRef, useState, useEffect } from "react";
import { LoadingSpinner } from "../Layouts/Loading";
import { API } from "../../config/config";
import { Redirect } from "react-router";
const Register = () => {
  const ref = createRef();
  const [loggined, setLoggined] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setLoggined(true);
  });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [errorFormValue, setErrorFormValue] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    place_of_birth: "",
    date_of_birth: "",
  });
  const [formValue, setFormValue] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    place_of_birth: "",
    date_of_birth: "",
  });
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const validation = () => {
    let error = {};
    for (let i in formValue) {
      if (!formValue[i]) {
        error = {
          ...error,
          [i]: `Field tidak boleh kosong`,
        };
      } else {
        delete error[i];
      }
    }
    if (formValue.password !== formValue.confirmPassword) {
      console.log("confirm");
      error = {
        ...error,
        confirmPassword: "Password tidak sama",
      };
    }

    if (Object.keys(error).length > 0) {
      setErrorFormValue(error);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLoading(true);
    axios(`${API}/api/auth/register`, {
      method: "POST",
      data: formValue,
    })
      .then((res) => {
        setLoading(false);
        setRegistered(true);
      })
      .catch((res) => {
        if (res.response.status != 400) return;
        if (res.response.data.error) {
          const key = Object.keys(res.response.data.error);
          const msg = res.response.data.error[key];
          setErrorFormValue({ [key]: msg });
          setLoading(false);
        }
      });
  };
  return (
    <section className="px-4 md:px-10">
      {loggined && <Redirect to="/" />}
      {registered && (
        <Redirect
          to={{
            pathname: "/success",
            props: { success: true },
          }}
        />
      )}
      {loading && <LoadingSpinner />}
      <div className="py-6">
        <p className="text-mont text-base text-color2">Home / Register</p>
        <p className="text-mont font-bold text-3xl text-secondary capitalize">
          Register
        </p>
      </div>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
      >
        {/* name */}
        <div className="-mx-3 md:flex mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Nama
            </label>
            <input
              className={
                (errorFormValue?.name && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              name="name"
              onChange={handleUserInput}
            />
            {errorFormValue?.name && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue.name}{" "}
              </div>
            )}
          </div>
        </div>
        {/* username */}
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Username
            </label>
            <input
              className={
                (errorFormValue?.username && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-first-name"
              type="text"
              placeholder="janedoe"
              name="username"
              onChange={handleUserInput}
            />
            {errorFormValue?.username && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue.username}
              </div>
            )}
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Email
            </label>
            <input
              className={
                (errorFormValue?.email && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-last-name"
              type="text"
              placeholder="janedoe@gmail.comm"
              name="email"
              onChange={handleUserInput}
            />{" "}
            {errorFormValue?.email && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue.email}
              </div>
            )}
          </div>
        </div>
        {/* password */}
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className={
                (errorFormValue?.password && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-password"
              type="password"
              placeholder="******************"
              name="password"
              onChange={handleUserInput}
            />
            {errorFormValue?.password && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue.password}{" "}
              </div>
            )}
          </div>
        </div>
        {/* confiirm password */}
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Konfirmasi Password
            </label>
            <input
              className={
                (errorFormValue?.confirmPassword && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-password"
              type="password"
              placeholder="******************"
              name="confirmPassword"
              onChange={handleUserInput}
            />
            {errorFormValue?.confirmPassword && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue.confirmPassword}
              </div>
            )}
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          {/* place of birth */}
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Tempat Lahir
            </label>
            <input
              className={
                (errorFormValue?.place_of_birth && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-first-name"
              type="text"
              placeholder="Malang"
              name="place_of_birth"
              onChange={handleUserInput}
            />
            {errorFormValue?.place_of_birth && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue?.place_of_birth}
              </div>
            )}
          </div>

          {/* date of birth */}
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Tanggal Lahir
            </label>
            <input
              className={
                (errorFormValue?.date_of_birth && " border-red-400 ") +
                "appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded py-3 px-4 mb-3"
              }
              id="grid-last-name"
              type="date"
              name="date_of_birth"
              onChange={handleUserInput}
            />
            {errorFormValue?.date_of_birth && (
              <div className="text-red-400 -mt-2 text-sm">
                {errorFormValue?.date_of_birth}{" "}
              </div>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white focus:outline-none rounded"
          >
            Daftar
          </button>
        </div>
      </form>
      <hr />
    </section>
  );
};

export default Register;
