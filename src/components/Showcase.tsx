import { useEffect } from "react";
import { useGetVideos } from "../hooks/requests/useGetVideos";
import { changeShowcaseStore } from "../store/showStore";
import VideoCards from "./ui/VideoCards";
import demoImg1 from "../assets/demo1.png";
import demoImg2 from "../assets/demo2.png";
import demoImg3 from "../assets/demo3.png";
import demoImg4 from "../assets/demo.png";

const Showcase = () => {
  const isOpen = changeShowcaseStore((state) => state.isOpen);
  const { data, isSuccess, isPending } = useGetVideos();

  useEffect(() => {
    if (isSuccess) {
      console.log(data?.data.videos);
    }
  }, [isSuccess, data]);

  const demoData = [
    {
      img: demoImg1,
      title: "Мемы 2020",
      description: "Подборка смешных мемов, которые взорвали интернет",
      views: "1.2M просмотров",
      time: "2 года назад",
    },
    {
      img: demoImg2,
      title: "Как надо дизайнить",
      description: "Советы по современному UI/UX дизайну",
      views: "845K просмотров",
      time: "1 год назад",
    },
    {
      img: demoImg3,
      title: "Лучшие моменты",
      description: "Самые эпичные моменты игр и фильмов",
      views: "560K просмотров",
      time: "8 мес. назад",
    },
    {
      img: demoImg4,
      title: "Обзор ютуберов",
      description: "Кто набирал популярность в этом году?",
      views: "2.3M просмотров",
      time: "3 года назад",
    },
  ];

  return (
    <div className={!isOpen ? `grid grid-cols-3 gap-2` : `grid grid-cols-4 gap-2`}>
      {isPending &&
        Array.from({ length: 12 }).map((_, i) => {
          const demo = demoData[i % demoData.length];
          return (
            <div key={i} className="flex flex-col gap-2">
              <img
                src={demo.img}
                alt="demo"
                className="w-full h-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <p className="text-white text-base font-semibold">{demo.title}</p>
                <p className="text-black text-sm">{demo.description}</p>
                <p className="text-gray-500 text-xs">
                  {demo.views} • {demo.time}
                </p>
              </div>
            </div>
          );
        })}

      {isSuccess &&
        data?.data.videos.map((video: any) => (
          <VideoCards
            key={video.id}
            {...{
              ...video,
              channelName: video.author.channelName,
              channelBanner: video.author.avatar,
            }}
          />
        ))}
    </div>
  );
};

export default Showcase;
