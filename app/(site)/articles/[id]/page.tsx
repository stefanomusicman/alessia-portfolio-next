'use client';
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import SanityImage from "@/components/Sanity";
import SanityService from "@/services/SanityService";
import { Block, Blog } from "@/types/blog";
import { Metadata } from "next";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SanityImage as SanityImageType } from "@/types/sanity-image";

// export const metadata: Metadata = {
//   title: "Blog Details Page - Solid SaaS Boilerplate",

//   // other metadata
//   description: "This is Blog details page for Solid Pro"
// };

const SingleBlogPage = () => {
  const params = useParams();
  const [article, setArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await SanityService.getArticleById(params.id as string);
        setArticle(article);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [params.id]);

  console.log('Article: ', article);

  // Show loading spinner when loading or article is null
  if (loading || !article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>

                <ul>
                  {article?.categories?.map((category, index) => {
                    return (
                      <li key={index} className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                        <a href="#">{typeof category === 'object' ? (category as { title: string }).title : category}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <SanityImage 
                      src={article!.mainImage} 
                      alt={article!.title} 
                      fill 
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  {article?.title}
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Author: </span>{" "}
                    Alessia Proietti
                  </li>
                  {/* <li>
                    <span className="text-black dark:text-white">
                      Published On: July 30, 2023
                    </span>{" "}
                  </li> */}
                </ul>

                <div className="blog-details">
                {article!.body.map((item, index) => {
                  if ((item as Block)._type === 'block') {
                    const blockItem = item as Block;
                    return (
                      <div key={blockItem._key || `block-${index}`}>
                        <p className="mb-4">
                          {blockItem.children.map((child) => child.text).join('')}
                        </p>
                      </div>
                    );
                  }
                  if ((item as SanityImageType)._type === 'image') {
                    const imageItem = item as SanityImageType;
                    return (
                      <div key={`image-${index}`} className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <SanityImage 
                        src={imageItem} 
                        alt={article!.title} 
                        fill 
                        className="rounded-md object-cover object-center"
                      />
                      </div>
                    );
                  }
                  return null;
                })}
                </div>

                <div className="mt-11 flex flex-wrap gap-4 md:items-center md:justify-between md:gap-0">
                  <a href={article!.originalArticle} target="_blank" rel="noopener noreferrer" className="text-primary">Original Article</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
