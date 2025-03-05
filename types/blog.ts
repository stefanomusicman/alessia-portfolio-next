import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export interface Blog {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImageSource;
  secondaryImage?: SanityImageSource;
  categories: string[];
  metadata?: string;
  body: Body[];
  originalArticle: string;
  // author?: Author;
  // tags?: string[];
  // publishedAt?: string;
};

// types/block.ts
export interface Span {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

export interface Block {
  _key: string;
  _type: 'block';
  style: string; // e.g., 'normal', 'h1', 'h2', etc.
  children: Span[];
  markDefs: any[]; // Define this more precisely if needed
}

export type Body = Block | SanityImageSource
