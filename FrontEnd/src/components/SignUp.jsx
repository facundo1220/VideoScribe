import Logo from "./Logo";

import { AppContext } from "../context/AppContext";

import { useState, useContext } from "react";

function SignUp() {
  const { createUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submitSignUp = (e) => {
    e.preventDefault();

    createUser({ email, password, name });

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="max-w-md mx-auto pt-20">
      <div className="pb-5 justify-center grid place-items-center">
        <Logo />
      </div>
      <form
        className="bg-[#212936] shadow-lg p-10 mb-4 rounded-xl grid place-items-center"
        onSubmit={submitSignUp}
      >
        <h1 className="text-2xl font-bold text-white mb-3 pt-1 pb-5">
          Sign up with your email address
        </h1>
        <input
          placeholder="Email"
          type="email"
          required={true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="  border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-full mb-2"
          autoFocus
        />{" "}
        <input
          placeholder="Password"
          type="password"
          required={true}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className=" border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-full mb-2"
          autoFocus
        />{" "}
        <input
          placeholder="Name"
          type="text"
          required={true}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className=" border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-full mb-2"
          autoFocus
        />{" "}
        <button className="font-bold h-10 px-5 m-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800">
          Sign Up
        </button>
        <p className="text-white">Already have an account?</p>{" "}
        <a href="/Login" className="text-blue-600">
          Login
        </a>
      </form>
    </div>
  );
}

export default SignUp;
