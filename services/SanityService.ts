import { Blog } from "@/types/blog";
import { MultimediaItem } from "@/types/multimedia";
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

    async getArticlesByCategory(categoryName: string): Promise<Blog[]> {
        try {
            const request = `
            *[_type == "post" && categories[]->title match "${categoryName}"] {
                _id,
                title,
                slug{current},
                mainImage,
                secondaryImage,
                categories[]->{
                    title
                },
                body,
                originalArticle
                }
            `;

            const articles = await this.client.fetch(request);
            return articles as Blog[];
        } catch (error) {
            console.error(`ERROR FETCHING ARTICLES OF CATEGORY ${categoryName}: `, error);
        }
        return [];
    }

    async getArticleById(id: string): Promise<Blog> {
        try {
            const request = `
                *[_type == "post" && _id match "${id}"] {
                    _id,
                    title,
                    slug{current},
                    mainImage,
                    secondaryImage,
                    categories[]->{
                        title
                    },
                    body,
                    originalArticle
                }
            `;

            const article = await this.client.fetch(request);

            // Ensure the article exists
            if (!article || article.length === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }

            return article[0] as Blog;
        } catch (error) {
            console.error(`ERROR FETCHING ARTICLE WITH ID ${id}: `, error);

            return {
                _id: '',
                title: 'Article Not Found',
                slug: { current: '' },
                mainImage: '',
                secondaryImage: '',
                categories: [],
                body: [],
                originalArticle: '',
            };
        }
    }

    async getCategoryTitles(): Promise<string[]> {
        try {
            const request = `*[_type == "category"].title`;
            const titles = await this.client.fetch(request);
            return titles as string[];
        } catch (error) {
            console.error("ERROR FETCHING CATEGORY TITLES: ", error);
            return [];
        }
    }

    async getFaqs(): Promise<{ _id: string; question: string; answer: string }[]> {
        try {
            const request = `*[_type == "faq"] | order(_createdAt asc) {
                _id,
                question,
                answer
            }`;
            const faqs = await this.client.fetch(request);
            return faqs as { _id: string; question: string; answer: string }[];
        } catch (error) {
            console.error("ERROR FETCHING FAQS: ", error);
            return [];
        }
    }

    async getLatestWork(): Promise<{ _id: string; title: string; category: string; description: string; fullArticle: string }[]> {
        try {
            const request = `*[_type == "latestWork"] | order(_createdAt asc) {
                _id,
                title,
                category,
                description,
                fullArticle
            }`;
            const items = await this.client.fetch(request);
            return items as { _id: string; title: string; category: string; description: string; fullArticle: string }[];
        } catch (error) {
            console.error("ERROR FETCHING LATEST WORK: ", error);
            return [];
        }
    }

    /**
     * Fetches all multimedia documents (photos or videos).
     * Expected Sanity schema: type "multimedia" with title, optional image, optional videoUrl.
     */
    async getMultimedia(): Promise<MultimediaItem[]> {
        try {
            const request = `*[_type == "multimedia"] | order(_createdAt asc) {
                _id,
                title,
                image,
                videoUrl
            }`;
            const items = await this.client.fetch(request);
            return items as MultimediaItem[];
        } catch (error) {
            console.error("ERROR FETCHING MULTIMEDIA: ", error);
            return [];
        }
    }
}

export default new SanityService();