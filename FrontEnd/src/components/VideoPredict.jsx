import { useState, useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";

import CategoriesPredict from "./CategoriesPredict";

import { CgMathPlus } from "react-icons/cg";

import { Organize } from "../scripts/organize";

function VideoPredict() {
  const {
    prediction,
    categoriesFinal,
    setcategoriesFinal,
    createVideo,
    finalVideo,
  } = useContext(AppContext);

  //console.log(prediction);

  const src = window.localStorage.getItem("src");

  const [title, settitle] = useState("");
  const [gif, setGif] = useState(prediction.gif_b64);
  const [cover, setCover] = useState(prediction.cover_b64);
  const [duration, setduration] = useState(prediction.duration);
  const [categorie, setcategorie] = useState("");
  const [predicts, setPredicts] = useState(Object.keys(prediction.prediction));
  const [privacy, setprivacy] = useState("Public");

  const addCategorie = (e) => {
    setPredicts([...predicts, categorie]);
    setcategorie("");
  };

  const changePrivacy = (e) => {
    if (e.target.checked) {
      setprivacy("Private");
    } else {
      setprivacy("Public");
    }
  };

  const submitVideo = (e) => {
    e.preventDefault();

    createVideo({
      title,
      privacy,
      duration,
      categoriesFinal,
      cover,
      gif,
      finalVideo,
    });
  };

  return (
    <div className="max-w-5xl mx-auto pt-32">
      <form
        className="bg-[#212936] shadow-lg p-10 mb-4 rounded-xl grid place-items-center"
        onSubmit={submitVideo}
      >
        <h1 className="text-3xl font-bold text-white mb-3 pt-1 pb-5">
          Predictions{" "}
        </h1>
        <div className="flex justify-between">
          <div className="px-5">
            {" "}
            <video className="rounded-lg " controls>
              <source src={src} type="video/mp4" />
            </video>
          </div>
          <div className="px-5">
            {" "}
            <input
              placeholder="Title"
              required={true}
              type="text"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              className="  border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-80 mb-2"
              autoFocus
            />{" "}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none"></div>
              <input
                placeholder="Categories"
                type="text"
                value={categorie}
                onChange={(e) => {
                  setcategorie(e.target.value);
                }}
                className=" border block border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-full mb-2"
                autoFocus
              />{" "}
              <button
                type="submit"
                className=" absolute right-2.5 bottom-2.5"
                onClick={(e) => {
                  e.preventDefault();
                  addCategorie();
                }}
              >
                <CgMathPlus
                  size={20}
                  color="white"
                  className=" rounded-full pb-1 bg-slate-700"
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pb-3">
              {predicts.map((categorie) => (
                <CategoriesPredict key={categorie} categorie={categorie} />
              ))}
            </div>
            <br />
            <div className="flex justify-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={privacy}
                  onChange={changePrivacy}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {privacy}
                </span>
              </label>
            </div>
            <div className="flex justify-center pt-3">
              <button className="h-10 px-2 m-2 font-bold text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VideoPredict;
