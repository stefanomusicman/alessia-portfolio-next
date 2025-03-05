import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Category {
    title: string;
    description: string;
    categoryImage: SanityImageSource;
}