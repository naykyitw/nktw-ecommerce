import Head from "next/head";
import { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import Breadcrumbs from "../../components/shared/Breadcrumbs";
import ProductThumbnail from "../../components/shared/ProductThumbnail";
import useCart from "../../store/store";
import star from "../../icons/star.svg";
import UpdateProductQty from "../../components/shared/UpdateProductQty";
import ImageWithPreload from "../../components/shared/ImageWithPreload";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./index.module.css";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();
  if (!product || product?.message?.includes("not found")) {
    return {
      notFound: true,
    };
  }
  return { props: { product } };
}
export default function Product({ product }) {
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const cartContent = useCart((state) => state.cartContent);
  const totalqty = useCart((state) => state.totalqty);

  const [activeImg, setActiveImg] = useState();
  const [mycart, setMycart] = useState();
  const [quantity, setQuantity] = useState();
  const [hasProdInCart, setHasProdInCart] = useState();

  useEffect(() => {
    setMycart(cartContent);
    const cartProductId = cartContent.findIndex(
      (item) => item.id === product.id
    );
    setHasProdInCart(cartProductId !== -1);
    setQuantity(cartContent?.[cartProductId]?.quantity);
  }, [totalqty]);

  const stars = [];
  const addProduct = (params) => {
    const productId = mycart.findIndex((item) => item.id === params.id);
    if (productId !== -1) {
      mycart[productId].quantity++;
      const totalPlusMinusInd = 1;
      updatecart({ params, mycart, totalPlusMinusInd });
    } else {
      addTocart(params);
    }
  };
  for (var i = 0; i < Math.ceil(product?.rating); i++) {
    stars.push(
      <Image src={star} alt="star" width="18" className={styles.star} />
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{product?.title} | NKTW</title>
        <meta
          name="description"
          content={`Check out ${product?.title}`}
          key="desc"
        />
      </Head>
      <Breadcrumbs
        links={[
          { url: "/", name: "Home" },
          { url: `/product/${product?.id}`, name: `${product?.title}` },
        ]}
      />
      <div className={styles.product}>
        <div className={styles.imgContainer}>
          <ProductThumbnail
            thumbnail={activeImg ? activeImg : product?.thumbnail}
            discountPercentage={product?.discountPercentage}
            imgClassName={styles.img}
            height={220}
            width={200}
            preload
          />
          <div className={styles.sliderContainer}>
            <Swiper
              slidesPerView={3}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {product?.images?.map((photo, index) => (
                <div key={index + 1}>
                  <SwiperSlide>
                    <ImageWithPreload
                      src={photo}
                      className={styles.swiperImg}
                      onClick={() => setActiveImg(photo)}
                      alt="slide_img"
                      loading="eager"
                      width={100}
                      height={80}
                      preload
                    />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.productInfoContainer}>
          <h1 className={cx("text-3xl font-bold", styles.title)}>
            {product?.title}
          </h1>
          <div>
            <div className={styles.starsContainer}>
              <p> {product?.rating}</p> {stars}
            </div>
            <div className={styles.price}>S${product?.price}</div>

            {hasProdInCart ? (
              <UpdateProductQty product={{ ...product, quantity: quantity }} />
            ) : (
              <button
                type="button"
                className={styles.button}
                onClick={() =>
                  addProduct({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                  })
                }
              >
                + Add to Card
              </button>
            )}
          </div>
          <div className={styles.productDescription}>
            <p className={styles.subtitle}>Product Description</p>
            <p className="ext-sm text-gray-500">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
