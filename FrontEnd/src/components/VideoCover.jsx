import { useState } from "react";
import { Organize } from "../scripts/organize";
import VideoModal from "./VideoModal";

function VideoCover({ video }) {
  const [cover, setCover] = useState("data:image/cover;base64," + video.cover);
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    setTimeout(() => {
      setCover("data:image/gif;base64," + video.gif);
    }, 500);
  };

  const handleMouseLeave = () => {
    setCover("data:image/cover;base64," + video.cover);
  };

  return (
    <div className="pb-3">
      <figure className="relative">
        <a
          onClick={(e) => {
            e.preventDefault();

            setShowModal(true);
          }}
        >
          <img
            className="w-4/5 h-44 rounded-xl transition-all duration-300 blur-none hover:blur-0"
            src={cover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            alt="des"
          ></img>
        </a>

        <figcaption className="absolute text-white pl-2  bottom-3">
          <p className="bg-black w-11 rounded-md text-xs  text-center">
            {Organize(parseFloat(video.duration))}
          </p>
        </figcaption>
      </figure>

      {showModal ? <VideoModal content={video} set={setShowModal} /> : null}

      <div className="pt-1">
        <p className="text-md pl-5 text-left font-bold text-white">
          {video.title}
        </p>

        <p className="text-xs pl-5 text-left text-gray-400">{video.user}</p>

        <p className="text-xs pl-5 text-left text-gray-400">{video.date}</p>
      </div>
    </div>
  );
}

export default VideoCover;
