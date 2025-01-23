import React, { FC } from "react";
import ReactSelect from "react-select";
import { useAppDispatch } from "../../redux/store";
import { sortByPrice, sortByRating } from "../../redux/productsSlice"; 

const SortBar: FC = () => {
  const dispatch = useAppDispatch();

  // Sorting options for both price and rating
  const options = [
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "ratingAsc", label: "Rating: Low to High" },
    { value: "ratingDesc", label: "Rating: High to Low" },
  ];

  // Handle selection change for sorting
  const handleChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      if (selectedOption.value === "priceAsc" || selectedOption.value === "priceDesc") {
        dispatch(sortByPrice(selectedOption.value as "priceAsc" | "priceDesc"));
      } else if (selectedOption.value === "ratingAsc" || selectedOption.value === "ratingDesc") {
        dispatch(sortByRating(selectedOption.value as "ratingAsc" | "ratingDesc"));
      }
    }
  };

  return (
    <div className="flex justify-end w-full">
      <ReactSelect
        options={options}
        placeholder="Sort by"
        onChange={handleChange}
        isSearchable={false}
        className="min-w-[240px]"
      />
    </div>
  );
};

export default SortBar;
