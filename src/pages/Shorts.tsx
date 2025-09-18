import React, { useState } from "react";

interface Short {
  id: number;
  title: string;
  videoUrl: string;
  likes: number;
  views: number;
}

const shortsMock: Short[] = [
  {
    id: 1,
    title: "Funny cat video",
    videoUrl: "https://www.youtube.com/shorts/7nZiG1LQjfU",
    likes: 1200,
    views: 23000,
  },
  {
    id: 2,
    title: "Street workout",
    videoUrl: "https://www.youtube.com/shorts/7nZiG1LQjfU",
    likes: 450,
    views: 9000,
  },
  {
    id: 3,
    title: "Travel to mountains",
    videoUrl: "https://www.youtube.com/shorts/7nZiG1LQjfU",
    likes: 800,
    views: 15000,
  },
];

const ShortsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % shortsMock.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? shortsMock.length - 1 : prev - 1));
  };

  const activeShort = shortsMock[activeIndex];

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="relative w-[400px] h-[700px] bg-black">
        <video
          src={activeShort.videoUrl}
          autoPlay
          controls
          loop
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute bottom-6 left-4">
          <h3 className="text-lg font-semibold">{activeShort.title}</h3>
          <p className="text-sm text-gray-300">
            {activeShort.views} views • {activeShort.likes} likes
          </p>
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 right-[-60px] text-white p-2 rounded-full"
        >
          ↑
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/3 right-[-60px] text-white p-2 rounded-full"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default ShortsPage;
