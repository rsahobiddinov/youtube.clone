import AlbumCards from "./AlbumCards";
const Album = () => {
  const videos = [
    {
      img: 'https://picsum.photos/seed/1/320/180',
      title: 'React Tutorial for Beginners',
      duration: '12:34',
      channelName: 'Code Academy',
      views: '1.2M',
      date: '2 days ago',
    },
    {
      img: 'https://picsum.photos/seed/2/320/180',
      title: 'JavaScript Advanced Concepts',
      duration: '20:10',
      channelName: 'JS Mastery',
      views: '850K',
      date: '1 week ago',
    },
    {
      img: 'https://picsum.photos/seed/3/320/180',
      title: 'CSS Flexbox & Grid',
      duration: '15:45',
      channelName: 'Design World',
      views: '540K',
      date: '3 days ago',
    },
    {
      img: 'https://picsum.photos/seed/4/320/180',
      title: 'TypeScript in 30 Minutes',
      duration: '30:05',
      channelName: 'TS Academy',
      views: '320K',
      date: '5 days ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
    {
      img: 'https://picsum.photos/seed/5/320/180',
      title: 'Node.js Backend Crash Course',
      duration: '25:20',
      channelName: 'Backend Heroes',
      views: '780K',
      date: '1 month ago',
    },
  ];

  return (
   <div className="right w-full mt-2 mb-1">
  <div className="max-h-[600px] flex flex-col gap-y-1 w-full">
    {videos.map((e, index) => (
      <AlbumCards
        key={index}
        channelName={e.channelName}
        date={e.date}
        duration={e.duration}
        img={e.img}
        title={e.title}
        views={e.views}
      />
    ))}
  </div>
</div>

  )
};

export default Album;
