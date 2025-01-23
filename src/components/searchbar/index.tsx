import searchbarIcon from "../../../public/searchbar.png";
import { RootState, useAppDispatch } from "../../redux/store";
import { FormEvent, useState, useMemo, memo, FC } from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { filter } from "../../redux/productsSlice";

// type olş

const Searchbar: FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Başlık seçeneklerini oluştur
  const titleOptions = useMemo(() => {
    const uniqueTitles = Array.from(
      new Set(products.map((product) => product.title))
    );
    return uniqueTitles.map((name) => ({
      value: name,
      label: name,
    }));
  }, [products]);

  // Kategori seçeneklerini oluştur
  const categoryOptions = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return uniqueCategories.map((category) => ({
      value: category,
      label: category,
    }));
  }, [products]);

  // Filtreleme işlemi
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(filter({ title, category }));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={handleSubmit} className="flex gap-4 items-center w-full">
        <ReactSelect
          options={titleOptions}
          placeholder="Search by title"
          value={title ? { value: title, label: title } : null}
          onChange={(selected) => setTitle(selected?.value || "")}
          isClearable
          className="flex-1 lg:w-1/3"
        />

        <ReactSelect
          options={categoryOptions}
          placeholder="Filter by category"
          value={category ? { value: category, label: category } : null}
          onChange={(selected) => setCategory(selected?.value || "")}
          isClearable
          className="flex-1 lg:w-1/3"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          <img src={searchbarIcon} alt="Search" width={18} height={18} />
        </button>
      </form>
    </div>
  );
};

export default memo(Searchbar);
