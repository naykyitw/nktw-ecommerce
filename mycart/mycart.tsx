import { Product } from "@/interfaces/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartStore {
  total: number;
  totalqty: number;
  cartContent: Partial<Product>[];
  addTocart: (params: Partial<Product>) => void;
  updatecart: (options: {
    params: Partial<Product>;
    mycart: Partial<Product>[];
    totalPlusMinusInd: number;
  }) => void;
  clearCart: () => void;
  removeFromCart: (params: Partial<Product>) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set) => ({
      total: 0,
      totalqty: 0,
      cartContent: [],
      addTocart: (params) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseFloat(params.price),
          cartContent: [...state.cartContent, params],
        }));
      },
      updatecart: ({ params, mycart, totalPlusMinusInd }) => {
        const productId: any = mycart?.findIndex(
          (item) => item.id === params.id
        );
        mycart[productId].quantity =
          (mycart[productId].quantity || 0) + 1 * totalPlusMinusInd;
        set((state) => ({
          totalqty: state.totalqty + totalPlusMinusInd,
          total: state.total + totalPlusMinusInd * parseFloat(params.price),
          cartContent: mycart,
        }));
      },
      clearCart: () => set({ totalqty: 0, total: 0, cartContent: [] }),
      removeFromCart: (params) =>
        set((state) => ({
          total: state.total - parseFloat(params.price) * params.quantity,
          totalqty: state.totalqty - params.quantity,
          cartContent: state.cartContent.filter(
            (item) => item.id !== params.id
          ),
        })),
    }),
    { name: "cart" }
  )
);

export default useCart;
