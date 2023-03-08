import VideoCover from "./VideoCover";

function CategorieSpace({ categorie }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white pb-2 content-center">
        {categorie.name}
      </h1>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="grid grid-cols-4 gap-2 pt-3 pb-3">
        {categorie.videos.map((video) => (
          <VideoCover key={video.idvideo} video={video} />
        ))}
      </div>
    </div>
  );
}

export default CategorieSpace;
