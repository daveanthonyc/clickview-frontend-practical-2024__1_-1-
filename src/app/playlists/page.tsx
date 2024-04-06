import React from 'react';
import { GET as getPlaylists } from '../api/playlists/route';
import { Playlist } from '@/interfaces/playlist';
import { PlaylistItem } from '@/components/playlist-item';

export default async function PlaylistsPage() {
    try {
        const playlistData = await getPlaylists();
        const data: Playlist[] = await playlistData.json();

          return (
            <>
              <h1>Playlists route</h1>
              {
                  data.map((playlist: Playlist, index) => (
                      <a href={`/playlists/${playlist.id}`} key={index}>
                        <PlaylistItem  playlist={playlist} />
                      </a>
                  ))
              }
            </>
          );
    } catch (error) {
        return (
            <>
                <h1>Error</h1>
                <p>Failed to fetch playlist data.</p>
            </>
        )
    }
}
