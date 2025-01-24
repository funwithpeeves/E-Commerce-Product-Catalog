import { render, screen, fireEvent } from "@testing-library/react";
import { ProductType } from "../../../types";
import Card from "../card";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme";

jest.mock("framer-motion", () => ({
  __esModule: true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

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

describe("Card Component", () => {
  it("should render product title and price correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    const title = screen.queryByText(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );
    const price = screen.queryByText("109.95");

    expect(title).not.toBeNull();
    expect(price).not.toBeNull();
  });

  it("should render if product title is string", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    const productTitle = screen.queryByText(product.title);
    expect(typeof productTitle?.textContent).toBe("string");
  });

  it("should open the modal when the 'More' button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    const moreButton = screen.getByText("More");
    fireEvent.click(moreButton);

    const description = screen.queryByText(product.description);
    expect(description).not.toBeNull();
  });

  it("should close the modal when the close button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    const moreButton = screen.getByText("More");
    fireEvent.click(moreButton);

    const descriptionBeforeClose = screen.queryByText(product.description);
    expect(descriptionBeforeClose).not.toBeNull();

    const closeButton = screen.getByAltText("Close");
    fireEvent.click(closeButton);

    const descriptionAfterClose = screen.queryByText(product.description);
    expect(descriptionAfterClose).toBeNull();
  });

  it("should render error component when product prop is missing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>
    );

    const errorTitle = screen.queryByText("Error");
    const errorMessage = screen.queryByText("Product data is missing");

    expect(errorTitle).not.toBeNull();
    expect(errorMessage).not.toBeNull();
  });
});
