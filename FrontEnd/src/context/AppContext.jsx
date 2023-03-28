import { createContext, useState, useEffect } from "react";
import { categoriesSchema } from "../schemas/Categories.schemas";
import { allVideos } from "../schemas/AllVideos.schemas";

import HeaderTools from "../components/HeaderTools";
import CategoriesList from "../components/CategoriesList";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import UserTools from "../components/UserTools";
import MyVideos from "../components/MyVideos";
import NewVideo from "../components/NewVideo";
import VideoPredict from "../components/VideoPredict";
import Loading from "../components/Loading";
import LoadingVideos from "../components/LoadingVideos";

import { Method } from "../scripts/petition";

const components = {
  Login: <Login />,
  SignUp: <SignUp />,
  HeaderTools: <HeaderTools />,
  CategoriesList: <CategoriesList />,
  UserTools: <UserTools />,
  MyVideos: <MyVideos />,
  NewVideo: <NewVideo />,
  VideoPredict: <VideoPredict />,
  Loading: <Loading />,
  LoadingVideos: <LoadingVideos />,
};

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [component, setComponent] = useState({});

  const path = window.location.pathname;

  const [url, setUrl] = useState([]);

  useEffect(() => {
    setUrl(path);
  }, [path]);

  useEffect(() => {
    switch (url) {
      case "/":
        localStorage.clear();

        setComponent({
          body: components.CategoriesList,
          header: components.HeaderTools,
        });

        break;

      case "/SignUp":
        setComponent({
          body: components.SignUp,
          header: components.HeaderTools,
        });

        break;

      case "/Login":
        setComponent({
          body: components.Login,
          header: components.HeaderTools,
        });

        break;

      case "/AllVideos":
        setComponent({
          body: components.CategoriesList,
          header: components.UserTools,
        });

        break;

      case "/MyVideos":
        setComponent({
          body: components.MyVideos,
          header: components.UserTools,
        });

        break;

      case "/NewVideo":
        setComponent({
          body: components.NewVideo,
          header: components.UserTools,
        });

        break;
    }
  }, [url]);

  const [search, setsearch] = useState("");

  let Videos = new Method("videos", 8000);

  function categoriesVideo() {
    let values = [];

    let getValues = Videos.get("");

    if (search.length >= 1 && (url == "/AllVideos" || url == "/")) {
      let searchVideo = getValues.filter((video) => {
        const videoText = video.title.toLowerCase();
        const searchText = search.toLowerCase();

        return videoText.includes(searchText);
      });

      values = searchVideo;
    } else {
      values = getValues;
    }

    if (typeof values != "undefined") {
      let categories = [];

      try {
        for (let i = 0; i < values.length; i++) {
          values[i].category = values[i].category.toString();
          values[i].category = values[i].category.split(",");
        }

        for (let i of values) {
          for (let j of i.category) {
            if (!categories.includes(j)) {
              categories.push(j);
            }
          }
        }
      } catch (error) {
        categories = [];
      }

      let finalVideos = [];

      for (let i of categories) {
        let categoryVideo = {};
        let cateVideos = [];

        for (let j of values) {
          if (j.category.includes(i) && j.privacy == "Public") {
            cateVideos.push(j);
          }

          categoryVideo.name = i;
          categoryVideo.videos = cateVideos;
        }

        finalVideos.push(categoryVideo);
      }

      return finalVideos;
    } else {
      return [];
    }
  }

  let catVideos = categoriesVideo();

  function createUser(userData) {
    const userSignUp = new Method("signin", 8000);

    userSignUp.post(userData);
  }

  function loginUser(userData) {
    const userLogin = new Method("login", 8000);

    userLogin.post(userData);
  }

  function myVideos(user) {
    const myUser = new Method(`video`, 8000);

    let userVideos = myUser.get(user);

    if (typeof userVideos !== "undefined") {
      if (
        userVideos.message !==
        "No se encontraron videos para el usuario especificado"
      ) {
        return userVideos;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  const [finalVideo, setfinalVideo] = useState("");

  function uploadPredictVideo(video) {
    window.localStorage.setItem("src", video.src);
    setvideo(video.formData);
    setfinalVideo(video.video);
  }

  function deleteVideo(userData) {
    const videoDelete = new Method("delete", 8000);

    videoDelete.delete(userData);
  }

  const [prediction, setPrediction] = useState({});
  const [categoriesFinal, setcategoriesFinal] = useState([]);

  const [video, setvideo] = useState("");

  useEffect(() => {
    if (typeof video == "object") {
      makePrediction();
    }
  }, [video]);

  function makePrediction() {
    setComponent({
      body: components.Loading,
    });

    var requestOptions = {
      method: "POST",
      body: video,
      redirect: "follow",
    };

    fetch("http://35.209.247.117:8080/predict", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setComponent({
          body: components.VideoPredict,
          header: components.UserTools,
        });

        setPrediction(result);
      })
      .catch((error) => console.log("error", error));
  }

  function createVideo(userData) {
    const data = new FormData();

    data.append("title", userData.title);
    data.append("privacy", userData.privacy);
    data.append("duration", userData.duration);
    data.append("category", userData.categoriesFinal);
    data.append("cover", userData.cover);
    data.append("gif", userData.gif);
    data.append("video_file", userData.finalVideo);

    const user = localStorage.getItem("userLogin");

    var requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
    };

    fetch(`http://35.209.247.117:8000/create/${user}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .catch((error) => console.log("error", error));
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        component,
        categoriesSchema,
        url,
        video,
        finalVideo,
        prediction,
        catVideos,
        search,
        categoriesFinal,
        showModal,
        setShowModal,
        setcategoriesFinal,
        setsearch,
        uploadPredictVideo,
        makePrediction,
        createUser,
        loginUser,
        myVideos,
        createVideo,
        deleteVideo,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
