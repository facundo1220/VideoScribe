import { AppContext } from "../context/AppContext";

import { useContext } from "react";

import MyvideosList from "./MyvideosList";

function MyVideos() {
  const { myVideos, search, setsearch, url } = useContext(AppContext);

  let userVideos = myVideos(window.localStorage.getItem("userLogin"));

  let allVideos = [];

  if (typeof userVideos !== "undefined") {
    if (search.length >= 1 && url == "/MyVideos") {
      let searchVideo = userVideos.filter((video) => {
        const videoText = video.title.toLowerCase();
        const searchText = search.toLowerCase();

        return videoText.includes(searchText);
      });

      allVideos = searchVideo;
    } else {
      allVideos = userVideos;
    }
  } else {
    allVideos = [];
  }

  return (
    <div className="pt-10 grid place-items-center">
      <table className="text-center shadow-xl">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-white px-20 py-4"
            >
              Video
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-20 py-4"
            >
              Privacy
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-white px-20 py-4"
            >
              Categories
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-white px-20 py-4"
            >
              Date
            </th>
          </tr>
        </thead>

        <tbody className="border-b">
          {allVideos.map((video) => (
            <MyvideosList key={video.idvideo} content={video} />
          ))}
        </tbody>
      </table>

      <br />

      <p className="text-white font-light text-sm">
        Click the cover to view the video{" "}
      </p>
    </div>
  );
}

export default MyVideos;
