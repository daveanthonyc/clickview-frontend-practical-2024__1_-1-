import { Video } from "@/interfaces/video";
import { GET as getVideos } from "../api/videos/route";
import VideoItem from "@/components/video-item";

export default async function VideosPage() {
    try {
        const videoData = await getVideos();
        const data: Video[] = await videoData.json();

          return (
            <>
              <h1>Videos route</h1>
              {
                  data.map((video: Video, index) => (
                    <VideoItem key={index} video={video} />
                  ))
              }
            </>
          );
    } catch (error) {
        return (
            <>
                <h1>Error</h1>
                <p>Failed to fetch video data.</p>
            </>
        )
    }
}
