"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type NewCartItem = {
  id: string;
  title: string;
  price: number | string;
  imageUrl?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: NewCartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Загружаем корзину из памяти браузера
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("marketpilot-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
      localStorage.removeItem("marketpilot-cart");
    } finally {
      setCartLoaded(true);
    }
  }, []);

  // Сохраняем корзину после изменений
  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    localStorage.setItem(
      "marketpilot-cart",
      JSON.stringify(cart)
    );
  }, [cart, cartLoaded]);

  const addToCart = useCallback((product: NewCartItem) => {
    const productId = String(product.id);
    const productPrice = Number(product.price || 0);

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          id: productId,
          title: product.title,
          price: productPrice,
          imageUrl: product.imageUrl || "",
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== String(id)
      )
    );
  }, []);

  const increaseQuantity = useCallback((id: string) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === String(id)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id: string) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === String(id)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart должен использоваться внутри CartProvider"
    );
  }

  return context;
}