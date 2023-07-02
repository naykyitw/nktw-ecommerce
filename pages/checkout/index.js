import { useEffect, useState } from "react";
import Link from "next/link";

import useCart from "../../store/store";
import UpdateProductQty from "../../components/shared/UpdateProductQty";

import styles from "./index.module.css";

export default function Checkout() {
  const cartContent = useCart((state) => state.cartContent);
  const totalqty = useCart((state) => state.totalqty);
  const total = useCart((state) => state.total);
  const clearCart = useCart((state) => state.clearCart);

  const [myCartContent, setMyCartContent] = useState();
  const [myTotal, setMyTotal] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMyCartContent(cartContent);
    setMyTotal(total);
  }, [totalqty]);

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {myCartContent && myCartContent?.length > 0 ? (
          myCartContent?.map((product, index) => (
            <div key={index} className={styles.productContainer}>
              <Link
                className={styles.title}
                href="/product/[id]"
                as={`/product/${product.id}`}
              >
                <div
                  style={{ backgroundImage: ` url(${product.thumbnail})` }}
                  className={styles.imgContainer}
                />
              </Link>
              <div key={index} className={styles.productInfoContainer}>
                <Link
                  className={styles.productInfo}
                  href="/product/[id]"
                  as={`/product/${product.id}`}
                >
                  <p className={styles.title}>{product.title}</p>
                  <p className={styles.price}>S${product.price}</p>
                </Link>
                <div className={styles.itemPriceContainer}>
                  <UpdateProductQty product={product} />
                  <div className={styles.itemPrice}>
                    S${product?.quantity * product?.price}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.title}>No Item in Cart</p>
        )}
      </div>
      <div className={styles.cardSummaryContainer}>
        <p className={styles.title}>Cart Summary</p>
        <div className={styles.totalPrice}>
          <p className={styles.totalLabel}>Total</p>
          <p className={styles.total}>S${myTotal}</p>
        </div>
        <button
          className={styles.checkout}
          disabled={myCartContent?.length === 0}
          onClick={() => {
            setShowModal(true);
            clearCart();
          }}
        >
          Checkout Securely
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Your order has been placed!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-end p-6 rounded-b">
                  <Link
                    href="/"
                    className={styles.checkout}
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Continue to Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
