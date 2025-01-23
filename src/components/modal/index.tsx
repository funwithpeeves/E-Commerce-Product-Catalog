import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-star-with-type";
import { ProductType } from "../../../types";

interface Props {
  product: ProductType;
  isOpen: boolean;
  close: () => void;
  image: string | string[];
}

const Modal: FC<Props> = ({ product, isOpen, close, image }) => {
  const [star, setStar] = useState<number>(Number(product.rating) || 0); // Convert a value to a number at the beginning

  const handleRatingChange = (nextValue: number) => {
    setStar(nextValue); // Update new value
    console.log(`New rating: ${nextValue}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 grid place-items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative p-6 max-w-lg max-h-[90vh] rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto"
          >
            <button
              className="cursor-pointer p-1 absolute end-1 top-1 z-10 bg-white rounded-full"
              onClick={close}
            >
              <img
                width={30}
                className="font-bold"
                src="/close.svg"
                alt="Close"
              />
            </button>

            {/* Product Images */}
            <div className="flex gap-2 overflow-x-auto">
              {Array.isArray(product.image) ? (
                product.image.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                ))
              ) : (
                <img
                  src={product?.image}
                  alt={product.title}
                  className="ml-28 rounded-lg w-60 max-h-64 object-center"
                />
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-4">
              {Object.entries(product)
                .filter(([key]) => key !== "image")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center text-lime-600 gap-6"
                  >
                    <h4 className="capitalize font-medium">
                      {key.split("_").join(" ")}
                    </h4>
                    {key === "rating" ? (
                      <div className="flex items-center gap-2">
                        <ReactStars
                          data-testid="react-stars"
                          onChange={handleRatingChange}
                          value={product.rating.rate}
                          isEdit={false}
                          size={20}
                          filledIcon={<FaStar size={20} color="#FFCE00" data-testid="star-filled" />}
                          emptyIcon={<FaStar size={20} color="#E4E5E9" data-testid="star-empty" />}
                        />

                        <span className="rating-text">{product.rating.rate} / 5</span>
                        <span>Count: {product.rating.count}</span>
                      </div>
                    ) : (
                      <p className="font-semibold capitalize">
                        {typeof value === "object" && value !== null
                          ? JSON.stringify(value)
                          : value}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
