import { Link } from "react-router-dom"
import { changeShowcaseStore } from "../../store/showStore"

// interface Videoprops {
     
// }

const VideoCards = () => {
     const isOpen = changeShowcaseStore((state) => state.isOpen)
     const id = 1;
     return (
          <div
               className={`video-cards flex flex-col gap-2  
      ${!isOpen ? "w-[415px]" : "w-[350px]"} `}
          >
               {/* Rasm qismi */}
               <Link to={`video/${id}`} >
                    <div className="card-top relative w-full h-[220px]">
                         <img
                              className="w-full h-full object-cover rounded-lg "
                              src="https://picsum.photos/id/27/600/338"
                              alt="Video thumbnail"

                         />

                         <span className="absolute bottom-1 right-1 bg-black text-white rounded-sm px-1 text-xs">
                              3:38
                         </span>
                    </div></Link>

               {/* Pastki qism */}
               <div className="card-bottom flex items-start gap-2">
                    {/* Avatar */}
                    <div className="bottom-left min-w-[28px] h-[28px] rounded-full overflow-hidden">
                         <img
                              className="w-full h-full object-cover"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeY33yre4TmHcV6Upg4qHDWqMcU_DsR7s5Fg&s"
                              alt="Channel avatar"
                         />
                    </div>

                    {/* Text qismi */}
                    <div className="bottom-right flex flex-col overflow-hidden leading-tight">
                         <span className="text-[14px] text-[#0F0F0F] font-medium line-clamp-2">
                              New attack targets U.S. base in Syria following American airstrikes over
                         </span>
                         <span className="text-[12px] text-[#606060]">CBS News</span>
                         <div className="flex items-center gap-1 text-[12px] text-[#606060]">
                              <span>126K views</span>
                              <span>• 2 hours ago</span>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default VideoCards
