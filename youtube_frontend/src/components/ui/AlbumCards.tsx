import { useState } from "react";
import { TbDotsVertical } from "react-icons/tb";

interface Props {
     img: string;
     title: string;
     duration: string;
     channelName: string;
     views: string;
     date: string
}


const AlbumCards = ({ img, channelName, date, duration, title, views }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="video-cards flex gap-2 justify-start items-start gap-x-1 relative hover:bg-[#d8d1d182] rounded-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Rasm qismi */}
      <div className="card-top relative w-[40%] h-[100px]">
        <img
          className="min-w-[150px] max-w-[150px] h-[90%] object-center rounded-lg"
          src={img}
          alt="Video thumbnail"
        />
        <span className="absolute bottom-2 right-3 bg-black text-white rounded-sm px-1 text-[13px]">
          {duration}
        </span>
      </div>

      <div className="card-bottom flex items-start gap-1">
        <div className="bottom-right flex flex-col gap-1 overflow-hidden leading-tight">
          <span className="text-[14px] text-[#0F0F0F] font-medium line-clamp-2 max-w-[100%] ">
            {title.length < 28 ? title : title.slice(0,27) }
          </span>
          <span className="text-[12px] text-[black] font-bold">{channelName}</span>
          <div className="flex flex-col gap-1 text-[12px] text-[#606060]">
            <span>{views} views</span>
            <span>• {date}</span>
          </div>
        </div>
      </div>

      <TbDotsVertical className={`${hover ? "block size-4 absolute right-4 top-5" : "hidden"}`} />
    </div>
  );
};


export default AlbumCards