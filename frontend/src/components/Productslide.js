import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import ProductCard from "./Productcard";
import Lottie from "lottie-react";
import loadingAnimation from "../Assests/Animations/loading.json";
import "./ComponentsCSS/products.css";
import { DataContext } from "../Contexts/DataContext";
import FeaturedSection from "./FeaturedSection";
import Scrollingcard from "./Scrollingcard";

const Productslide = ({ products }) => {
  const { products: globalProducts = {}, isLoading: contextLoading } = useContext(DataContext);
  const [allProducts, setAllProducts] = useState([]);
  const [showAll, setShowAll] = useState({});
  const animationRef = useRef(null);
  const scrollRestored = useRef(false);

  /** Ensure scroll position is restored AFTER products load */
  useEffect(() => {
    if (!scrollRestored.current && allProducts.length > 0) {
      const savedPosition = sessionStorage.getItem("lastScrollPosition");
      if (savedPosition) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedPosition), behavior: "smooth" });
          sessionStorage.removeItem("lastScrollPosition");
        });
      }
      scrollRestored.current = true;
    }
  }, [allProducts]); // Runs only when products are set

  /** Set products from props or context */
  useEffect(() => {
    if (products) {
      setAllProducts(products);
    } else if (globalProducts?.data?.length > 0) {
      setAllProducts(globalProducts.data);
    }
  }, [products, globalProducts]);

  /** Memoized product list */
  const displayProducts = useMemo(() => {
    return Array.isArray(allProducts) && allProducts.length > 0 ? allProducts : [];
  }, [allProducts]);

  /** Memoized category map */
  const categoryMap = useMemo(() => {
    const map = {};
    if (!Array.isArray(displayProducts)) return map;

    displayProducts.forEach((product) => {
      const types = product.type || [];
      const formattedTypes = Array.isArray(types)
        ? types.flatMap((t) => t.split(",").map((type) => type.trim()))
        : [];

      formattedTypes.forEach((type) => {
        if (!map[type]) map[type] = [];
        if (!map[type].some((p) => p.id === product.id)) {
          map[type].push(product);
        }
      });
    });

    return map;
  }, [displayProducts]);

  /** If loading, show animation (Fix for footer appearing first) */
  if (contextLoading || allProducts.length === 0) {
    return (
      <div className="loading-container">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          lottieRef={animationRef}
          style={{ width: 150, height: 150 }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>
    );
  }

  return (
    <div className="product-wrapper">
      {Object.keys(categoryMap)
        .filter((category) => !["winter collection", "buy 1 get 1"].includes(category))
        .map((category, index) => {
          const categoryProducts = categoryMap[category];
          const isExpanded = showAll[category] || false;
          const visibleProducts = isExpanded ? categoryProducts : categoryProducts.slice(0, 5);

          return (
            <React.Fragment key={category}>
              <div className="product-section">
                <h2 className="product-category-title">{category}</h2>
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                {categoryProducts.length > 5 && (
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAll({ ...showAll, [category]: !isExpanded })}
                  >
                    {isExpanded ? "Show Less" : "View All"}
                  </button>
                )}
              </div>

              {/* Add Featured Section after first product section */}
              {index === 0 && <FeaturedSection />}
              {index === 0 && <Scrollingcard />}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Productslide;
