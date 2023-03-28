import Header from "./components/Header";
import Body from "./components/Body";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";

function App() {
  const { component, video } = useContext(AppContext);

  return (
    <>
      <Header content={component.header} />
      <Body content={component.body} />
    </>
  );
}

export default App;
