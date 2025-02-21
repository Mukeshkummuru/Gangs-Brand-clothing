import { createContext, useContext, useReducer } from 'react';

const AddressContext = createContext();

const loadAddressesFromLocalStorage = () => {
  const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
  return addresses;
};

const addressReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      const newAddress = {
        id: Date.now(),
        fullName: action.payload.fullName,
        email: action.payload.email,
        phone: action.payload.phone,
        text: action.payload.address
      };
      const updatedAdd = [...state, newAddress];
      localStorage.setItem('addresses', JSON.stringify(updatedAdd));
      return updatedAdd;

    case 'UPDATE_ADDRESS':
      const updatedAddresses = state.map(addr =>
        addr.id === action.payload.id ? { ...addr, ...action.payload } : addr
      );
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
      return updatedAddresses;

    case 'REMOVE_ADDRESS':
      const filteredAddresses = state.filter(addr => addr.id !== action.payload);
      localStorage.setItem('addresses', JSON.stringify(filteredAddresses));
      return filteredAddresses;

    default:
      return state;
  }
};

export const AddressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducer, loadAddressesFromLocalStorage());

  return (
    <AddressContext.Provider value={{ addresses: state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};