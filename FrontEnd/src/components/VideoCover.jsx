import image from "../images/image.jpeg";

function VideoCover({ video }) {
  return (
    <div className="pb-3">
      <figure className="relative">
        <a href="">
          <img
            className="w-4/5 h-44 rounded-xl transition-all duration-300 blur-none hover:blur-sm"
            src={image}
            alt="des"
          ></img>
        </a>

        <figcaption className="absolute text-white pl-4 left-56 bottom-3">
          <p className="bg-black w-11 rounded-md text-sm  text-center">
            {video.duration}
          </p>
        </figcaption>
      </figure>

      <div className="pt-1">
        <p className="text-md pl-5 text-left font-bold text-white">
          {video.description}
        </p>

        <p className="text-xs pl-5 text-left text-gray-400">{video.user}</p>

        <p className="text-xs pl-5 text-left text-gray-400">{video.date}</p>
      </div>
    </div>
  );
}

export default VideoCover;
