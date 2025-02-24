import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Productslide from "./components/Productslide";
import SaleOfferCard from "./components/Saleoffercard";
import Footer from "./components/Footer";
import Searchpage from "./pages/Searchpage";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import ProductPage from "./pages/Productpage";
import { DataProvider } from "./Contexts/DataContext";
import CartPage from "./pages/CartPage";
import BuyNowPage from "./pages/BuyNowPage";
import { CartProvider } from "./Contexts/CartContext";
import OrdersPage from "./pages/OrderPage";
import AddressPage from "./pages/Addresspage";
import { AddressProvider } from "./Contexts/AddressContext";
import { AuthProvider } from "./Contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const App = () => {
  return (
      <DataProvider>
        <CartProvider>
          <AddressProvider>
            <Router>
            <AuthProvider> {/* Auth Provider should wrap everything */}
              <Navbar />
              <main style={{ marginTop: "80px", minHeight: "100vh" }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <SaleOfferCard />
                        <Productslide />
                      </>
                    }
                  />
                  <Route path="/search" element={<Searchpage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/buy-now" element={<BuyNowPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/Address" element={<AddressPage />} />
                </Routes>
              </main>
              <Footer />
                <ToastContainer />
              </AuthProvider>
            </Router>
          </AddressProvider>
        </CartProvider>
      </DataProvider>
  );
};

export default App;
