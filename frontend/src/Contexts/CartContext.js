import { createContext, useContext, useReducer, useEffect } from 'react';
import { CartNotification } from '../components/Notifications';

const CartContext = createContext();


// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      return existingItem
        ? {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id && item.size === action.payload.size
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            ),
            showNotification: true,
            notificationMessage: '💖 Added to cart| GANGS style unlocked!'
          }
        : {
            ...state,
            items: [...state.items, action.payload],
            showNotification: true,
            notificationMessage: '💖 Added to cart| GANGS style unlocked!'
          };

    case 'HURRY_NOTIFICATION':
      return {
        ...state,
        showNotification: true,
        notificationMessage: '📦Order placed! Track it in Orders section '
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload)
      };

      case 'CLEAR_CART':
        localStorage.removeItem('cart'); // Ensure cart is cleared from localStorage
        return { ...state, items: [] };
          

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'HIDE_NOTIFICATION':
      return { ...state, showNotification: false };

    case 'INIT_CART':
      return { ...state, items: action.payload };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        showNotification: false // Clear any existing notifications
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    showNotification: false,
    notificationMessage: '',
    orders: [],
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'INIT_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Auto-hide notification
  useEffect(() => {
    if (state.showNotification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showNotification]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount: state.items.reduce((acc, item) => acc + item.quantity, 0),
        orders: state.orders,
        dispatch,
        addOrder: order => dispatch({ type: 'ADD_ORDER', payload: order })
      }}
    >
      {children}
      {state.showNotification && (
        <CartNotification
          onClose={() => dispatch({ type: 'HIDE_NOTIFICATION' })}
          message={state.notificationMessage}
        />
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
