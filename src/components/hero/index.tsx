import { FC } from "react";
import Button from "../button";
import { motion } from "framer-motion";

const Hero: FC = () => {
  return (
    <div className="relative ">
      <div className="flex flex-col justify-center items-center text-center min-h-[70vh]">
        <h1 className="text-xl font-bold text-green-900 mb-4">
          Explore Our Wide Range of Products and Find Your Perfect Match Today!
        </h1>
        
        <div className="text-lg md:text-xl text-gray-700 mt-2 mb-2">
          <p>
            Discover a variety of products that cater to your unique needs and
            style.
          </p>
          <p>
            Start shopping today and find the perfect item to enhance your
            lifestyle.
          </p>
        </div>

        <Button designs="mt-10" title="Discover Products" />
      </div>

      <div className="absolute border-radius-inherit inset-0 flex justify-center ">
        <motion.img
          initial={{
            translateX: 200,
            scale: 0.7,
          }}
          animate={{
            translateX: 0,
            scale: 1,
          }}
          transition={{ duration: 0.7 }}
          className="block w-full object-center object-cover border-radius-inherit -z-10"
          src="/girl.webp"
          alt="girl"
        />
      </div>
    </div>
  );
};

export default Hero;
