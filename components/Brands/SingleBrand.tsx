import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, href, name, imageLight, id } = brand;

  return (
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: id }}
        viewport={{ once: true }}
        href={href}
        className="animate_top relative flex items-center justify-center h-10 w-full max-w-[150px]"
      >
        <Image
          className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden object-contain"
          src={image}
          alt={name}
          fill
        />
        <Image
          className="hidden opacity-50 transition-all duration-300 hover:opacity-100 dark:block object-contain"
          src={imageLight}
          alt={name}
          fill
        />
      </motion.a>
    </>
  );
};

export default SingleBrand;
