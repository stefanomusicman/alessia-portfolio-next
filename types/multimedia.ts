import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type MultimediaItem = {
  _id: string;
  title: string;
  /** Present when the item is a photo */
  image?: SanityImageSource;
  /** Present when the item is a video (URL for embed or direct video) */
  videoUrl?: string;
};
