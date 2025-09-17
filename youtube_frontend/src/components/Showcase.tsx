import { useEffect } from "react";
import { useGetVideos } from "../hooks/requests/useGetVideos";
import { changeShowcaseStore } from "../store/showStore";
import VideoCards from "./ui/VideoCards";
import { Skeleton } from "antd";

const Showcase = () => {
  const isOpen = changeShowcaseStore((state) => state.isOpen);
  const { data, isSuccess, isPending } = useGetVideos();

  useEffect(() => {
    if (isSuccess) {
      console.log(data?.data.videos);
    }
  }, [isSuccess, data]);

  return (
    <div
      className={!isOpen ? `grid grid-cols-3 gap-2` : `grid grid-cols-4 gap-2`}
    >
      {/* ⏳ Agar hali data kelmagan bo‘lsa Skeleton chiqaramiz */}
      {isPending &&
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Thumbnail skeleton */}
            <Skeleton.Image
              active
              style={{ width: "100%", height: 220, borderRadius: 8 }}
            />
            {/* Text skeleton */}
            <Skeleton
              active
              title={{ width: "90%" }}
              paragraph={{ rows: 2, width: ["80%", "60%"] }}
            />
          </div>
        ))}

      {/* ✅ Agar data kelsa VideoCards larni render qilamiz */}
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
