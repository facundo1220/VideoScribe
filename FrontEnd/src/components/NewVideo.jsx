import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaUpload } from "react-icons/fa";

function NewVideo() {
  return (
    <div className="pt-16 max-w-md mx-auto">
      <h1 className="text-white text-center font-bold text-4xl pb-10 ">
        Upload a video and predict its metadata
      </h1>

      <form className="bg-[#212936] shadow-lg p-10 mb-4 rounded-xl grid place-items-center">
        <div className="pb-5">
          <MdOutlineVideoLibrary color="#374151" size={80} opacity="50" />
        </div>

        <label for="inputFile"></label>
        <label>
          <div className="text-lg h-11 px-5 font-bold text-white transition-colors bg-blue-700 rounded-full hover:bg-blue-800">
            <div className="flex justify-between">
              <div className="px-2 pt-2">
                <FaUpload />
              </div>
              <div className="pt-2">Load video</div>
            </div>
          </div>
          <input type="file" id="inputFile" className="sr-only" />
        </label>
      </form>
    </div>
  );
}

export default NewVideo;
