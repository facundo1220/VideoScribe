import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import CategorieSpace from "./CategorieSpace";

function CategoriesList() {
  const { catVideos } = useContext(AppContext);

  return (
    <div className="pl-5 pt-5">
      {catVideos.map((categorie) => (
        <CategorieSpace key={categorie.name} categorie={categorie} />
      ))}
    </div>
  );
}

export default CategoriesList;
