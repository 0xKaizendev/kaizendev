const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENT_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, 
    {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    cache: "no-store",
  });

  return response.json();
};


export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  return response;
};

export const getRecentTrack = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(RECENT_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  return response;
};

export type SpotifyPlayingNow = {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl: string | null;
};

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: { name: string; images: Array<{ url: string }> };
  external_urls: { spotify: string };
}

interface SpotifyRecentResponse {
  items: Array<{ track: SpotifyTrack }>;
}

const FALLBACK: SpotifyPlayingNow = {
  isPlaying: false,
  title: "Not playing",
  artist: "Spotify",
  songUrl: "https://open.spotify.com",
  albumImageUrl: null,
};

export async function getSpotifyPlayingNow(): Promise<SpotifyPlayingNow> {
  let response: Response;
  try {
    response = await getNowPlaying();
  } catch {
    return FALLBACK;
  }

  if (response.status === 204 || response.status > 400) {
    try {
      const recent = await getRecentTrack();
      const data = (await recent.json()) as SpotifyRecentResponse;
      const track = data?.items?.[0]?.track;
      if (!track) return FALLBACK;
      return {
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        songUrl: track.external_urls.spotify,
        albumImageUrl: track.album?.images?.[0]?.url ?? null,
      };
    } catch {
      return FALLBACK;
    }
  }

  try {
    const song = await response.json();
    return {
      isPlaying: !!song.is_playing,
      title: song.item?.name ?? "Not playing",
      artist:
        (song.item?.artists ?? [])
          .map((a: { name: string }) => a.name)
          .join(", ") || "Spotify",
      songUrl: song.item?.external_urls?.spotify ?? "https://open.spotify.com",
      albumImageUrl: song.item?.album?.images?.[0]?.url ?? null,
    };
  } catch {
    return FALLBACK;
  }
}
