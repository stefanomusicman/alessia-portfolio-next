import { createClient, SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

class SanityService {
    private client: SanityClient;
    private builder: ReturnType<typeof imageUrlBuilder>

    constructor() {
        this.client = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            useCdn: true,
            apiVersion: '2025-02-06',
        })

        this.builder = imageUrlBuilder(this.client);
    }

    urlForImage(source: SanityImageSource) {
        return this.builder.image(source);
    }
}

export default new SanityService();