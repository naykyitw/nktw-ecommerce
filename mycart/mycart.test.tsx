// useCart.test.tsx
import { renderHook, act } from "@testing-library/react";
import { useCart } from "./mycart";

const product1 = {
  id: 1,
  title: "Product 1",
  price: 10,
  quantity: 1,
};
const product2 = {
  id: 2,
  title: "Product 2",
  price: 20,
  quantity: 1,
};

test("Add item to cart correctly", async () => {
  const { result } = renderHook(() => useCart());

  await act(() => {
    result.current.addTocart(product1);
  });
  expect(result.current.total).toBe(10);
  expect(result.current.totalqty).toBe(1);
  expect(result.current.cartContent).toEqual([product1]);
});

test("Update item quantity in cart correctly", async () => {
  const { result } = renderHook(() => useCart());

  await act(() => {
    result.current.addTocart(product2);
  });
  await act(() => {
    result.current.updatecart({
      params: product1,
      mycart: result.current.cartContent,
      totalPlusMinusInd: 1,
    });
  });

  expect(result.current.total).toBe(40);
  expect(result.current.totalqty).toBe(3);
  expect(result.current.cartContent).toEqual([
    { ...product1, quantity: 2 },
    product2,
  ]);
});

test("Remove item from shopping cart correctly", () => {
  const { result } = renderHook(() => useCart());

  act(() => {
    result.current.removeFromCart(product2);
  });

  expect(result.current.total).toBe(20);
  expect(result.current.totalqty).toBe(2);
  expect(result.current.cartContent).toEqual([{ ...product1, quantity: 2 }]);
});

test("Clear shopping cart correctly", () => {
  const { result } = renderHook(() => useCart());

  act(() => {
    result.current.clearCart();
  });

  expect(result.current.total).toBe(0);
  expect(result.current.totalqty).toBe(0);
  expect(result.current.cartContent).toEqual([]);
});
