import { userVideos } from "../schemas/userVideos.schemas";

import MyvideosList from "./MyvideosList";

function MyVideos() {
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
              Visibility
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
          {userVideos.map((video) => (
            <MyvideosList key={video.idvideo} content={video} />
          ))}
        </tbody>
      </table>

      <br />

      <p className="text-white font-light text-sm">
        Click the cover to edit the video{" "}
      </p>
    </div>
  );
}

export default MyVideos;
