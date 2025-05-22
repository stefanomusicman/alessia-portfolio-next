import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-20 pt-32 px-4 sm:px-0">
      <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
      <div className="w-full flex justify-center mb-8">
        <Image
          src="/images/about/Alessia-about-me.png"
          alt="About Illustration"
          width={560}
          height={490}
          className="w-full max-w-md sm:max-w-xl md:max-w-2xl h-auto"
          priority
        />
      </div>
      <p className="max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300 mx-auto">
        I am a passionate journalist with a keen eye for detail and a relentless drive to uncover the truth. My journey in journalism has been fueled by curiosity, empathy, and a commitment to telling stories that matter. Whether reporting from the field or crafting in-depth features, I strive to give a voice to the unheard and shed light on the issues that shape our world. My dedication to integrity and storytelling continues to inspire my work every day.
      </p>
    </div>
  );
};

export default About;
