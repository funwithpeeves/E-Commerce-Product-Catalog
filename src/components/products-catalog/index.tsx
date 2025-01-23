import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { getProducts } from "../../redux/actions";
import Searchbar from "../searchbar/";
import Warning from "../warning/";
import Card from "../card";
import SortBar from "../sort";

const ProductsCatalog: FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    dispatch(getProducts({ sort: "asc" }));
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="sm:pt-10 sm:px-16 px-6 max-w-[1440px] mx-auto">
      <div className="flex flex-col mt-10 gap-y-2.5">
        <h1 className="text-4xl font-extrabold">Products Catalog</h1>
        <p>Review Products</p>
      </div>

      <div className="mt-4 w-full flex justify-between items-center flex-wrap gap-5">
        <Searchbar />
        <SortBar />
      </div>

      {!loading && error ? (
        <Warning>{error}</Warning>
      ) : !loading && currentProducts.length < 1 ? (
        <Warning>No products were found.</Warning>
      ) : (
        <div>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
            {currentProducts.map((product) => (
              <Card product={product} key={product.id} />
            ))}
          </div>

          <div className="pagination flex justify-center gap-4 mt-8 mb-12">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className="px-6 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 disabled:bg-gray-200"
            >
              Previous
            </button>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg shadow-md text-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === pageCount}
              onClick={() => paginate(currentPage + 1)}
              className="px-6 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {loading && <Warning>Loading...</Warning>}
    </div>
  );
};

export default ProductsCatalog;
