import image from "../images/image.jpeg";

function VideoCoverList({ content }) {
  return (
    <div className="pb-3 flex justify-between">
      <figure className="relative">
        <a href="">
          <img
            className="w-48 h-28 rounded-xl transition-all duration-300 blur-none hover:blur-sm"
            src={image}
            alt="des"
          ></img>
        </a>

        <figcaption className="absolute text-white pl-2  bottom-3">
          <p className="bg-black w-11 rounded-md text-xs  text-center">
            {content.duration}
          </p>
        </figcaption>
      </figure>

      <div className="pt-8">
        <p className="text-md pl-5 text-left font-bold text-white">
          {content.name}
        </p>

        <p className="text-xs pl-5 text-left text-gray-400">
          {content.description}
        </p>
      </div>
    </div>
  );
}

export default VideoCoverList;
