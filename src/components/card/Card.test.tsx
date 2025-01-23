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

    // Control of title and price
    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();
    expect(screen.getByText("109.95")).toBeInTheDocument();
  });

  it("should render if product title is string", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    // Product title is a string or not
    const productTitle = screen.getByText(product.title);
    expect(typeof productTitle.textContent).toBe("string");
  });

  it("should open the modal when the 'More' button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    // Find 'More' button and click
    const moreButton = screen.getByText("More");
    fireEvent.click(moreButton);

    // Control if Modal is opening (description text)
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card product={product} />
      </ThemeProvider>
    );

    // Find 'More' button and click
    const moreButton = screen.getByText("More");
    fireEvent.click(moreButton);

    // Control if Modal is opening
    expect(screen.getByText(product.description)).toBeInTheDocument();

    // Find 'Close' button and click (by using alt text)
    const closeButton = screen.getByAltText("Close");
    fireEvent.click(closeButton);

    // Control if Modal is closing
    expect(screen.queryByText(product.description)).not.toBeInTheDocument();
  });

  it("should render error component when product prop is missing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>
    );

    // Control if error message is rendered
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Product data is missing")).toBeInTheDocument();
  });
});
