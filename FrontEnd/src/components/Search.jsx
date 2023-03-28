import { BiSearch } from "react-icons/bi";
import { AppContext } from "../context/AppContext";
import { useState, useContext } from "react";

function Search() {
  const { setsearch, search } = useContext(AppContext);

  const searched = (e) => {
    setsearch(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BiSearch size={19} color={"#7E8692"} />
      </div>
      <input
        type="search"
        id="search"
        className=" p-3 w-96 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search"
        required
        value={search}
        onChange={searched}
      />
    </div>
  );
}

export default Search;
