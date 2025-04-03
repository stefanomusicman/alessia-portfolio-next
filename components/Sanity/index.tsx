"use client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image, { ImageProps } from "next/image";
import SanityService from "@/services/SanityService";

type Props = Omit<ImageProps, "src"> & {
    src: SanityImageSource;
    className?: string;
};

export default function SanityImage({ src, alt, className, ...props }: Props) {
    return (
        <Image
            src="Doesn't matter"
            alt={alt}
            className={className}
            loader={({ width, quality = 100 }) =>
                SanityService.urlForImage(src).width(width).quality(quality).url()
            }
            {...props}
        />
    );
}