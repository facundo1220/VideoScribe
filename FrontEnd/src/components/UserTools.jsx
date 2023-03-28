import Logo2 from "./Logo2";
import Search from "./Search";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function UserTools() {
  const { url } = useContext(AppContext);

  const setSearch = () => {
    if (url == "/NewVideo") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="flex justify-between">
      <div className="flex justify-between">
        <a href="/AllVideos">
          <Logo2 />
        </a>

        <button
          onClick={() => {
            window.location.href = "/MyVideos";
          }}
          className="h-10 px-2 m-2 font-bold text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          My videos
        </button>
        <button
          onClick={() => {
            window.location.href = "/NewVideo";
          }}
          className="h-10 px-2 m-2 font-bold text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          New Video
        </button>
      </div>

      <div className="pt-1">{setSearch() ? <Search /> : null}</div>

      <div className=""></div>

      <div className="pt-1 pr-5 ">
        <div className="pr-4 min-w-full flex justify-end">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="h-10 font-bold text-white transition-colors rounded-lg"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTools;
