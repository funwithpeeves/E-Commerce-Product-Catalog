import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../modal/index";
import { ProductType } from "../../../types";

const product: ProductType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe("Modal Component", () => {
  test("should render product details correctly when open", () => {
    render(<Modal product={product} isOpen={true} close={() => {}} image={product.image} />);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`${product.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`${product.rating.rate} / 5`)).toBeInTheDocument();
    expect(screen.getByAltText(product.title)).toBeInTheDocument();
  });

  
  test("debug ReactStars rendering", () => {
    render(<Modal product={product} isOpen={true} close={() => {}} image={product.image} />);
    console.log(screen.debug());
  });
  

  test("should call close function when close button is clicked", () => {
    const closeMock = jest.fn();
    render(<Modal product={product} isOpen={true} close={closeMock} image={product.image} />);

    const closeButton = screen.getByAltText("Close");
    fireEvent.click(closeButton);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("should not render the modal when isOpen is false", () => {
    render(<Modal product={product} isOpen={false} close={() => {}} image={product.image} />);

    expect(screen.queryByText(product.title)).not.toBeInTheDocument();
  });
});
