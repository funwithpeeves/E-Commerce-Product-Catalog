import { BrowserRouter } from "react-router-dom";
import ProductsCatalog from "./components/products-catalog";
import Header from "./components/header";
import Hero from "./components/hero";
import { ThemeProvider } from "./components/dark mode/ThemeContext"; // ThemeProvider dosyasını import edin
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Header />
          <Hero />
          <ProductsCatalog />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
