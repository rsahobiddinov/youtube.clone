import React, { useRef } from "react";
import videoFile from "/video.mp4"; 
import { Heart, MessageCircle, Share2 } from "lucide-react";

const ShortsPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "М";
    if (num >= 1000) return (num / 1000).toFixed(1) + "К";
    return num.toString();
  };

  const likes = 123;
  const views = 2300;
  const title = "КРУтое видео";

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="relative w-[800px] h-[900px] bg-black">
        <video
          ref={videoRef}
          src={videoFile}
          autoPlay
          loop
          className="w-full h-full object-cover rounded-2xl"
          onError={(e) => console.log("Ошибка загрузки видео:", e)}
        />
        <div className="absolute bottom-5 left-4 right-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-300">
            {formatNumber(views)} просмотров • {formatNumber(likes)} лайков
          </p>
        </div>
        <div className="absolute right-4 bottom-20 flex flex-col gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200"
            title="Лайк"
          >
            <Heart />
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
            title="Комментарии"
          >
            <MessageCircle />
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
            title="Поделиться"
          >
            <Share2 />
          </button>
          <button
            onClick={handlePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200 mt-2"
          >
            Play Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortsPage;
