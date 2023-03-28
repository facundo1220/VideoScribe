import { AppContext } from "../context/AppContext";

import { useContext } from "react";

function VideoModal(props) {
  const { deleteVideo, url } = useContext(AppContext);

  const setButton = () => {
    if (url == "/MyVideos") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-1/2 ">
          <div className="bg-[#212936] shadow-lg rounded-xl grid place-items-center">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-bold text-white pb-5 content-center">
                View video
              </h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form
                className=" grid place-items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <video controls className="rounded-lg ">
                  <source
                    src={"data:video/mp4;base64," + props.content.video}
                    type="video/mp4"
                  />
                </video>

                <div>
                  {setButton() ? (
                    <button
                      type="button"
                      onClick={() => {
                        let video = props.content.idvideo;

                        deleteVideo({ video });
                      }}
                      className="font-bold h-10 px-5 m-2 text-white transition-colors bg-[#b41818] rounded-lg hover:bg-[#5f0404]"
                    >
                      Delete
                    </button>
                  ) : null}
                </div>

                <div className="pt-3">
                  {!setButton() ? (
                    <div className="">
                      <div>
                        <p className="text-white">Title</p>

                        <input
                          id="disabled-input"
                          type="text"
                          value={props.content.title}
                          className="border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-80 mb-2"
                          autoFocus
                        />
                      </div>

                      <div>
                        <p className="text-white">Categories</p>

                        <input
                          id="disabled-input"
                          type="text"
                          value={props.content.category}
                          className="border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-3 w-80 mb-2"
                          autoFocus
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 font-bold outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  props.set(false);
                }}
              >
                Back to list
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default VideoModal;
