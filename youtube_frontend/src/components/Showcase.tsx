import { changeShowcaseStore } from "../store/showStore"
import VideoCards from "./ui/VideoCards"

const Showcase = () => {
  const isOpen = changeShowcaseStore((state) => state.isOpen)
  return (
    <>
     <div className={!isOpen ? `grid grid-cols-3  gap-2 `:`grid grid-cols-4 gap-2`}>
      <VideoCards />
      <VideoCards />
      <VideoCards />
      <VideoCards />
      <VideoCards />
      <VideoCards />
    </div></>
  )
}

export default Showcase
