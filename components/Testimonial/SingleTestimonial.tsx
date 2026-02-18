import type { LatestWorkItem } from "@/types/latest-work";

const SingleTestimonial = ({ item }: { item: LatestWorkItem }) => {
  const { title, category, description, fullArticle } = item;
  return (
    <div className="rounded-lg bg-surface p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {title}
          </h3>
          <p>{category}</p>
        </div>
      </div>

      <p>{description}</p>
      {fullArticle ? (
        <a
          href={fullArticle}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-primary hover:underline"
        >
          See Article
        </a>
      ) : null}
    </div>
  );
};

export default SingleTestimonial;
