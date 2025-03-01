import { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const exists = state.some((item) => item._id === action.payload._id);
      return exists
        ? state
        : [
            ...state,
            {
              ...action.payload,
              images: Array.isArray(action.payload.images)
                ? action.payload.images
                : [action.payload.images], // Convert single string to array
            },
          ];

    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};


export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(
    wishlistReducer,
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  console.log("Wishlist from LocalStorage:", JSON.parse(localStorage.getItem("wishlist")));

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
