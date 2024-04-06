import React from 'react';
import { GET as getVideos } from '@/app/api/videos/route';
import { GET as getPlaylists } from '@/app/api/playlists/route';
import { Video } from '@/interfaces/video';
import VideoItem from '@/components/video-item';
import { Playlist } from '@/interfaces/playlist';
import { PlaylistItem } from '@/components/playlist-item';

export default async function PlaylistsPage({ params }) {
    try {
        // fetch the playlist data, 
        const playlistData = await getPlaylists();
        const playlists = await playlistData.json();

        const selectedPlayList = playlists.filter((playlist: Playlist) => {
            return (playlist.id == params.id)
        }) as Playlist[];
        const playlistTitle = selectedPlayList[0].name;

        const videoIdsOfSelectedPlaylist = selectedPlayList[0].videoIds;

        const videoData = await getVideos();
        const data: Video[] = await videoData.json();
        const selectedVideos = data.filter((video: Video, index: number) => {
            return (videoIdsOfSelectedPlaylist.includes(video.id));
        })

          return (
            <>
              <h1>{playlistTitle}</h1>
              {
                  selectedVideos.map((video: Video, index: number) => (
                    <VideoItem video={video} key={index}/> 
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
