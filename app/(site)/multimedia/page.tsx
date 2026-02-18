"use client";

import { useState, useEffect } from "react";
import SanityService from "@/services/SanityService";
import SanityImage from "@/components/Sanity";
import SectionHeader from "@/components/Common/SectionHeader";
import { MultimediaItem } from "@/types/multimedia";
import { motion } from "framer-motion";

function getEmbedUrl(url: string): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();
  // YouTube: watch?v= or youtu.be/
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

function MultimediaBlock({ item, index }: { item: MultimediaItem; index: number }) {
  const isPhoto = item.image != null;
  const embedUrl = item.videoUrl ? getEmbedUrl(item.videoUrl) : null;
  const isEmbed = embedUrl != null;
  const isDirectVideo = item.videoUrl != null && !embedUrl;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="animate_top rounded-md border border-stroke bg-surface p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10"
    >
      <h3 className="mb-6 text-2xl font-semibold text-black dark:text-white">
        {item.title}
      </h3>
      {isPhoto && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <SanityImage
            src={item.image!}
            alt={item.title}
            fill
            className="object-cover object-center"
          />
        </div>
      )}
      {isEmbed && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <iframe
            src={embedUrl}
            title={item.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      {isDirectVideo && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <video
            src={item.videoUrl}
            title={item.title}
            controls
            className="h-full w-full object-contain"
          />
        </div>
      )}
    </motion.article>
  );
}

export default function MultimediaPage() {
  const [items, setItems] = useState<MultimediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SanityService.getMultimedia().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: "MULTIMEDIA",
                subtitle: "Multimedia",
                description:
                  "Photos and videos from the field.",
              }}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
              <div className="rounded-md border border-stroke bg-surface p-12 text-center shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <p className="text-lg text-waterloo dark:text-gray-400">
                  There is no content available at the moment. Please check back later.
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-15 grid max-w-c-1280 grid-cols-1 gap-10 px-4 md:px-8 xl:mt-20 xl:px-0 lg:grid-cols-2">
              {items.map((item, index) => (
                <MultimediaBlock key={item._id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
