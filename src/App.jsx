import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home";
import { ShopAll } from "./pages/ShopAll";
import { ShopByMaker } from "./pages/ShopByMaker";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    async function fetchProducts() {
      try {
        setStatus("loading");
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="app">
      <header className="mc-header">
        <div className="mc-logo">✨ Magic Crafts ✨</div>
        <p className="mc-tagline">
          Handmade bracelets, keychains & more by Zari, Kelly & Zara.
        </p>
        <nav className="mc-nav">
          <Link to="/">About</Link>
          <Link to="/shop">Shop All</Link>
        </nav>
      </header>

      <main className="mc-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<ShopAll products={products} status={status} />}
          />
          <Route
            path="/shop/:makerId"
            element={<ShopByMaker products={products} status={status} />}
          />
        </Routes>
      </main>

      <footer className="mc-footer">
        <p>© {new Date().getFullYear()} Magic Crafts · Managed by Mom 💜</p>
      </footer>
    </div>
  );
}

export default App;
