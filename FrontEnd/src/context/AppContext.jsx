import { createContext, useState, useEffect } from "react";
import { categoriesSchema } from "../schemas/Categories.schemas";

import HeaderTools from "../components/HeaderTools";
import CategoriesList from "../components/CategoriesList";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const components = {
  Login: <Login />,
  SignUp: <SignUp />,
  HeaderTools: <HeaderTools />,
  CategoriesList: <CategoriesList />,
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
    }
  }, [url]);

  return (
    <AppContext.Provider value={{ component, categoriesSchema, url }}>
      {props.children}
    </AppContext.Provider>
  );
}
