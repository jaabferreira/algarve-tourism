import data from "../content/videos/manual.json" with { type: "json" };

export interface VideoYouTubeMetadata {
  name: string;
  description: string;
  uploadDate: string;
  duration: string;
}

export interface TourVideoEntry {
  ambientClip?: string;
  youtubeId?: string;
  youtubeMetadata?: VideoYouTubeMetadata;
}

export interface HomepageVideoEntry {
  ambientClip: string;
  ambientPoster?: string;
}

interface VideosManifest {
  homepage?: HomepageVideoEntry;
  byItemPk: Record<string, TourVideoEntry>;
}

const manifest = data as VideosManifest;

export function getHomepageVideo(): HomepageVideoEntry | undefined {
  return manifest.homepage;
}

export function getTourVideo(itemPk: number | string): TourVideoEntry | undefined {
  return manifest.byItemPk[String(itemPk)];
}
