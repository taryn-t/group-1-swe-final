'use client';

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  _id: string;
  name: string;
  isbn?: string
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  fetchCart: (userId: string) => Promise<void>;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: number
  user: string
  setUser: (email:string) => void;
  clearCart: ()=> void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0)
  const [user,setUser] = useState("")
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    getTotal()
  }, []);


  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
    getTotal()
  }, [cart]);
function getTotal(){
    let t = 0;
    
    for(const product of (cart ?? [])){
    
    t = product.price + t
    }
    setTotal(t);
}
  const clearCart = () =>{
    for(const product of (cart ??[])){
      removeItem(product._id)
    }
  }
  const fetchCart = async (userId: string) => {
    try {
    const res = await fetch(`/api/cart?user_id=${userId}`);
      const data = await res.json();
      if (data.success) {
        setCart([
          ...(data.cart.textbooks || []),
          ...(data.cart.merchandise || [])
        ]);
      }


    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };
  

  const addItem = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeItem = async (id: string) => {
    const res = await fetch(`/api/cart?user_id=${user}&item_id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }});
      const data = await res.json();

    setCart(prev => prev.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addItem, removeItem , total, user, setUser, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};