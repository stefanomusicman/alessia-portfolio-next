"use client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image, { ImageProps } from "next/image";
import SanityService from "@/services/SanityService";

type Props = Omit<ImageProps, "src"> & {
    src: SanityImageSource;
};

export default function SanityImage({ src, alt, ...props }: Props) {
    return (
        <Image
            src="Doesn't matter"
            alt={alt}
            loader={({ width, quality = 100 }) =>
                SanityService.urlForImage(src).width(width).quality(quality).url()
            }
            {...props}
        />
    );
}