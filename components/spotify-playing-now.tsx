import Link from "next/link";
import { getNowPlaying, getRecentTrack } from "@/lib/spotify";
import { SpotifyIcon } from "./social-icons";

interface SpotifyTrack {
    name: string;
    artists: Array<{ name: string }>;
    album: {
        name: string;
        images: Array<{ url: string }>;
    };
    external_urls: {
        spotify: string;
    };
}

interface SpotifyRecentResponse {
    items: Array<{
        track: SpotifyTrack;
    }>;
}

async function getSpotifyPlayingNow() {
    console.log("getSpotifyPlayingNow");
    let response = await getNowPlaying();

    let song = null;
    let isPlaying = false;
    let title = null;
    let artist = null;
    let album = null;
    let albumImageUrl = null;
    let songUrl = null;

    console.log("response", response);

    if (response.status === 204 || response.status > 400) {
        try {
            response = await getRecentTrack();
            const recentData = await response.json() as SpotifyRecentResponse;

            if (!recentData?.items?.[0]?.track) {
                return {
                    isPlaying: false,
                    title: "Not playing",
                    artist: "Spotify",
                    album: "",
                    albumImageUrl: "",
                    songUrl: "https://open.spotify.com",
                };
            }

            console.log("response", recentData);
            song = recentData.items[0].track;
            title = song.name;
            artist = song.artists.map((artist) => artist.name).join(", ");
            album = song.album.name;
            albumImageUrl = song.album.images[0].url;
            songUrl = song.external_urls.spotify;
        } catch (error) {
            console.error("Error fetching recent track:", error);
            return {
                isPlaying: false,
                title: "Not playing",
                artist: "Spotify",
                album: "",
                albumImageUrl: "",
                songUrl: "https://open.spotify.com",
            };
        }
    } else {
        song = await response.json();
        isPlaying = song.is_playing;
        title = song.item.name;
        artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
        album = song.item.album.name;
        albumImageUrl = song.item.album.images[0].url;
        songUrl = song.item.external_urls.spotify;
    }

    return {
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
    };
}

export default async function SpotifyPlayingNow(): Promise<JSX.Element> {
    const data = await getSpotifyPlayingNow();

    return (
        <div className=" flex justify-center md:justify-start">
            <div className="max-w-3xl inline-flex">
                <div>
                    <SpotifyIcon className="h-4 w-4 mt-1 mr-2" />
                </div>
                <div>
                    {!data && <div> Loading...</div>}
                    {data && data.isPlaying && (
                        <p className="text-sm text-zinc-800 dark:text-zinc-100">
                            <Link
                                href={data.songUrl}
                                className="text-zinc-800 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-500 font-semibold"
                            >
                                {data.title}
                            </Link>{" "}
                            <span className="text-zinc-600 dark:text-zinc-400">by</span>{" "}{" "}
                            <span className="font-semibold">{data?.artist ?? "Spotify"}</span>{" "}
                            ▶️
                        </p>
                    )}
                    {data && !data.isPlaying && (
                        <p className="text-sm text-zinc-800 dark:text-zinc-100">
                            <Link
                                href={data.songUrl}
                                target="_blank"
                                className="text-zinc-800 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-500 font-semibold"
                            >
                                {data.title}
                            </Link>{" "}
                            <span className="text-zinc-600 dark:text-zinc-400">by</span>{" "}
                            <span className="font-semibold">{data?.artist ?? "Spotify"}</span>{" "}
                            ⏸️
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
