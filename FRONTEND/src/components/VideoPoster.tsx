import image2 from "../images/Image(1).jpg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { timeAgo } from "../utils/timeAgo";

interface VideoPosterProps {
  variant: "column" | "raw";
  time: string;
  poster_url?: string;
  channelName: string;
  channelIage_url?: string;
  title?: string;
  views: string;
  ago: string;
  videoId: string;
  videoDataId: string;
}

const VideoPoster: React.FC<VideoPosterProps> = ({
  variant,
  ago,
  channelName,
  time,
  title,
  views,
  channelIage_url,
  poster_url,
  videoId,
  videoDataId,
}) => {
  const [newId, setVideoId] = useState<string>();

  useEffect(() => {
    if (videoId) {
      const fileName = videoId.split("/")[3];
      const withoutExt = fileName.replace(".jpg", "");
      setVideoId(withoutExt);
    }
  }, [videoId]);

  const imageSrc = poster_url ? `http://localhost:4000${poster_url}` : image2;
  const channelImage = channelIage_url || image2;

  if (variant === "column") {
    return (
      <section className="w-[360px] cursor-pointer">
        <div className="relative w-full h-[202px] rounded-[12px] overflow-hidden">
          <Link to={`/video/${newId}/${videoDataId}`}>
            <img src={imageSrc} alt={title} className="w-full h-full hover:opacity-70" />
          </Link>
          <span className="absolute z-10 bg-black rounded-[4px] px-1 h-[18px] flex items-center justify-center text-white text-[12px] font-medium bottom-2 right-2">
            {time}
          </span>
        </div>
        <div className="pt-[12px] max-h-[100px]">
          <div className="flex gap-3 items-start max-h-[36px]">
            <img src={channelImage} alt={channelName} className="w-[36px] h-[36px] rounded-full object-cover" />
            <h1 className="w-[287px] text-[16px] font-medium text-[#0F0F0F]">{channelName}</h1>
          </div>
          <div className="ml-[48px] w-[287px] max-h-[40px] text-[14px] text-[#606060] font-normal">
            <h4>{title}</h4>
            <p>{views} views {timeAgo(ago)}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-[402px] flex items-start gap-2 cursor-pointer">
      <div className="relative w-[168px] h-[94px] rounded-[12px] overflow-hidden">
        <Link to={`/video/${newId}/${videoDataId}`}>
          <img src={imageSrc} alt={title} className="w-full h-full hover:opacity-70" />
        </Link>
        <span className="absolute z-10 bg-black rounded-[4px] px-1 h-[18px] flex items-center justify-center text-white text-[12px] font-medium bottom-2 right-2">
          {time}
        </span>
      </div>
      <div className="w-[226px] flex flex-col gap-1">
        <h1 className="text-[16px] font-medium text-[#0F0F0F] leading-5">{channelName}</h1>
        <div className="text-[14px] text-[#606060] font-normal">
          <h4>{title}</h4>
          <p>{views} views {timeAgo(ago)}</p>
        </div>
      </div>
    </section>
  );
};

export default VideoPoster;
