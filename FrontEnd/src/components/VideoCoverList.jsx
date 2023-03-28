import { AppContext } from "../context/AppContext";

import { useContext, useState } from "react";

import VideoModal from "./VideoModal";

import { Organize } from "../scripts/organize";

function VideoCoverList({ content }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="pb-3 flex justify-between">
      <figure className="relative">
        <a
          onClick={(e) => {
            e.preventDefault();

            setShowModal(true);
          }}
        >
          <img
            className="w-48 h-28 rounded-xl transition-all duration-300 blur-none hover:blur-sm"
            src={"data:image/cover;base64," + content.cover}
            alt="des"
          ></img>
        </a>

        {showModal ? <VideoModal content={content} set={setShowModal} /> : null}

        <figcaption className="absolute text-white pl-2  bottom-3">
          <p className="bg-black w-11 rounded-md text-xs  text-center">
            {Organize(parseFloat(content.duration))}
          </p>
        </figcaption>
      </figure>

      <div className="pt-8">
        <p className="text-md pl-5 text-left font-bold text-white">
          {content.title}
        </p>

        <p className="text-xs pl-5 text-left text-gray-400">
          {content.description}
        </p>
      </div>
    </div>
  );
}

export default VideoCoverList;
