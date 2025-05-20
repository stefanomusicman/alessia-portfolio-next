'use client';
import { useState, useEffect, useRef } from "react";
import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import { Blog } from "@/types/blog";
import SanityService from "@/services/SanityService";

// export const metadata: Metadata = {
//   title: "Articles - Alessia Productions",

//   // other metadata
//   description: "This is a page listing all articles by category"
// };

const BlogPage = () => {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Environment');
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [categoryTitles, setCategoryTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const fetchedArticles = await SanityService.getArticlesByCategory(selectedCategory);
      setArticles(fetchedArticles);
      setLoading(false);
    }

    const fetchCategoryTitles = async () => {
      const fetchedCategoryTitles = await SanityService.getCategoryTitles();
      setCategoryTitles(fetchedCategoryTitles);
    }

    fetchArticles();
    fetchCategoryTitles();
  }, [selectedCategory]);

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        {/* Centered Dropdown Menu */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <details className="group" ref={dropdownRef}>
              <summary className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 flex items-center dark:bg-blacksection">
                {selectedCategory || 'Filter by Category'}
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 dark:bg-blacksection dark:text-white">
                <div className="py-1">
                  {categoryTitles.map((category, index) => (
                    <p 
                      key={index} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer dark:bg-blacksection dark:text-white"
                      onClick={() => {
                        setSelectedCategory(category);
                        // Close the dropdown
                        if (dropdownRef.current) {
                          dropdownRef.current.removeAttribute('open');
                        }
                      }}
                    >
                      {category}
                    </p>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {articles.map((post, key) => (
                <BlogItem key={key} blog={post} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No articles found in this category. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
