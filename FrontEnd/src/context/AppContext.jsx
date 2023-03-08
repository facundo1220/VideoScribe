import { createContext, useState, useEffect } from "react";
import { categoriesSchema } from "../schemas/Categories.schemas";

import HeaderTools from "../components/HeaderTools";
import CategoriesList from "../components/CategoriesList";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import UserTools from "../components/UserTools";
import MyVideos from "../components/MyVideos";
import NewVideo from "../components/NewVideo";

const components = {
  Login: <Login />,
  SignUp: <SignUp />,
  HeaderTools: <HeaderTools />,
  CategoriesList: <CategoriesList />,
  UserTools: <UserTools />,
  MyVideos: <MyVideos />,
  NewVideo: <NewVideo />,
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

  return (
    <AppContext.Provider value={{ component, categoriesSchema, url }}>
      {props.children}
    </AppContext.Provider>
  );
}
