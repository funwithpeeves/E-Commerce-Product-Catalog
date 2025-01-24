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
  it("should render product details correctly when open", () => {
    render(<Modal product={product} isOpen={true} close={() => {}} image={product.image} />);

    const title = screen.queryByText(product.title);
    const description = screen.queryByText(product.description);
    const price = screen.queryByText(`${product.price.toFixed(2)}`);
    const rating = screen.queryByText(`${product.rating.rate} / 5`);
    const imageAlt = screen.queryByAltText(product.title);

    expect(title).not.toBeNull();
    expect(description).not.toBeNull();
    expect(price).not.toBeNull();
    expect(rating).not.toBeNull();
    expect(imageAlt).not.toBeNull();
  });

  it("should log DOM structure for debugging", () => {
    render(<Modal product={product} isOpen={true} close={() => {}} image={product.image} />);
    screen.debug();
  });

  it("should call close function when close button is clicked", () => {
    const closeMock = jest.fn();
    render(<Modal product={product} isOpen={true} close={closeMock} image={product.image} />);

    const closeButton = screen.getByAltText("Close");
    fireEvent.click(closeButton);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it("should not render the modal when isOpen is false", () => {
    render(<Modal product={product} isOpen={false} close={() => {}} image={product.image} />);

    const title = screen.queryByText(product.title);
    expect(title).toBeNull();
  });
});
