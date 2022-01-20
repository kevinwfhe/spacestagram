type MediaType = "image" | "video";

type ImageProps = {
  title: string;
  liked: boolean;
  explanation: string;
  media_type: MediaType;
  url: string;
  thumbnail_url?: string;
};
