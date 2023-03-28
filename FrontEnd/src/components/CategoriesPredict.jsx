import { useState, useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";

function CategoriesPredict({ categorie }) {
  const { categoriesFinal, setcategoriesFinal } = useContext(AppContext);

  const submitCategory = (e) => {
    const value = e.target.checked;

    if (value) {
      setcategoriesFinal([...categoriesFinal, categorie]);
    } else {
      const deletedCategory = categoriesFinal.filter(function (category) {
        return category !== categorie;
      });

      setcategoriesFinal(deletedCategory);
    }
  };

  return (
    <div className="flex items-center pl-5">
      <input
        id="checked-checkbox"
        type="checkbox"
        value=""
        onChange={submitCategory}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      ></input>
      <label
        htmlFor="checked-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {categorie}
      </label>
    </div>
  );
}

export default CategoriesPredict;
