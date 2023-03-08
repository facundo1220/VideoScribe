import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import CategorieSpace from "./CategorieSpace";

function CategoriesList() {
  const { categoriesSchema } = useContext(AppContext);

  return (
    <div className="pl-5 pt-5">
      {categoriesSchema.map((categorie) => (
        <CategorieSpace key={categorie.name} categorie={categorie} />
      ))}
    </div>
  );
}

export default CategoriesList;
