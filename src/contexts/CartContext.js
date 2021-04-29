import React, { createContext, useState } from "react";
export const CartContext = createContext();

export default function CartContextLayout({ children }) {
  const [amount, setAmount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [likedItem, setLikedItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = ({ img, name, star, price, description, id }) => {
    let exitedItem = cartItems.find((item) => item.id === id);
    setAmount(amount + 1);
    let newCartItems;
    if (!exitedItem) {
      newCartItems = [
        ...cartItems,
        {
          id,
          price,
          name,
          img,
          quantity: 1,
        },
      ];
    } else {
      newCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    setCartItems(newCartItems);
    setTotalPrice((prevPrice) => {
      return prevPrice + price;
    });
  };

  const handleMinusFromCart = ({
    img,
    name,
    star,
    price,
    description,
    id,
    quantity,
  }) => {
    let newCartItems;
    if (quantity === 1) {
      newCartItems = cartItems.filter((item) => item.id !== id);
    } else {
      newCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
    setCartItems(newCartItems);
    setAmount(amount - 1);
    setTotalPrice((prevPrice) => {
      return prevPrice - price;
    });
  };

  const handleRemoveFromCart = ({
    img,
    name,
    star,
    price,
    description,
    id,
    quantity,
  }) => {
    let newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    setAmount(amount - quantity);
    setTotalPrice((prevPrice) => {
      return prevPrice - price * quantity;
    });
  };
  function handleAddToWishlist({ img, name, star, price, description, id }) {
    let newWishLish;
    let exitedItem = wishlist.find((item) => item.id === id);
    if (!exitedItem) {
      newWishLish = [...wishlist, { img, name, star, price, description, id }];
      setLikedItem(likedItem + 1);
    } else {
      newWishLish = wishlist.filter((item) => item.id !== id);
      setLikedItem(likedItem - 1);
    }
    setWishlist(newWishLish);
  }
  return (
    <CartContext.Provider
      value={{
        amount,
        handleAddToCart,
        handleMinusFromCart,
        handleRemoveFromCart,
        likedItem,
        wishlist,
        handleAddToWishlist,
        cartItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
