import { useState, memo } from "react";
import { motion } from "framer-motion";
import Button from "../button";
import Modal from "../modal";
import { ProductType } from "../../../types";



const Card = ({ product }: { product?: ProductType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const close = () => setIsOpen(false);

  // Error
  if (!product) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
        <h2>Error</h2>
        <p>Product data is missing</p>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      className="bg-lime-300 border rounded-lg shadow-md p-4 group hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
    >
      {/* Title */}
      <h2 className="text-xl font-bold">
        <span className="text-red-400 line-clamp-2">{product.title}</span>
      </h2>

      <div>
        {/* Price */}
        <div className="flex mt-6 text-[19px]">
          <span className="font-semibold">$</span>
          <span className="text-[32px]">{product.price}</span>
          <span className="font-semibold self-end"> /one</span>
        </div>

        {/* Button */}
        <div className="mt-4">
          <div className="flex gap-2 mt-2">
            <Button
              title="More"
              designs="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal product={product} isOpen={isOpen} close={close} image={product.image} />
    </motion.div>
  );
};

export default memo(Card);
