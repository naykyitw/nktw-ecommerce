import { useEffect, useState } from "react";
import Item from "../components/shared/Item";
import ReactPaginate from "react-paginate";

import styles from "./page.module.css";

async function getData(params, category) {
  if (category) {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?${params}`
    );
    return res.json();
  }
  const res = await fetch(`https://dummyjson.com/products?${params}`);
  return res.json();
}
async function getCategories() {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  return res.json();
}

export async function getServerSideProps() {
  const res = getData("limit=20");
  const categories = getCategories();
  const data = {
    productResult: await res,
    categories: await categories,
  };
  return { props: { data } };
}
export default function Page({ data }) {
  const limit = 20;
  const [result, setResult] = useState(data.productResult);
  const [categories, setCategories] = useState(data.categories);
  const [params, setParams] = useState({ limit: 20 });
  const [pageCount, setPageCount] = useState(
    Math.ceil(data.productResult.total / limit)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [initPage, setInitPage] = useState(true);
  const [filterCategory, setFilterCategory] = useState();

  useEffect(() => {
    setResult(data.productResult);
    setPageCount(Math.ceil(data.productResult.total / limit));
    setCategories(data.categories);
  }, [data]);

  useEffect(() => {
    updateParam("skip", 0, true);
  }, [filterCategory]);

  const getResultData = async (newParams, category) => {
    const query = Object.keys(newParams)
      .reduce(function (a, k) {
        a.push(k + "=" + encodeURIComponent(newParams[k]));
        return a;
      }, [])
      .join("&");

    const resultData = await getData(query, category);
    setResult(resultData);
    setPageCount(Math.ceil(resultData.total / limit));
  };

  const updateParam = (label, value, callback) => {
    const newParams = { ...params, [label]: value };
    setParams(newParams);
    if (callback) {
      getResultData(newParams, filterCategory);
    }
  };

  const handleCategoryChange = (e) => {
    setCurrentPage(1);
    setFilterCategory(e.target.value);
  };

  const pagginationHandler = (page) => {
    if (!page) return null;
    if (!initPage) {
      const updateCurrentPage = page?.selected + 1;
      setCurrentPage(updateCurrentPage);
      let skipPage = 0;
      if (updateCurrentPage > 1) {
        skipPage = (updateCurrentPage - 1) * 20;
      }
      updateParam("skip", skipPage, true);
    }
    setInitPage(false);
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.filter}>
          <label>Filter by: </label>
          <select
            className={styles.input}
            onChange={(e) => {
              handleCategoryChange(e);
            }}
          >
            <option value=""> All Products </option>
            {categories &&
              categories?.length > 0 &&
              categories?.map((category, ind) => {
                return (
                  <option key={ind} value={`${category}`}>
                    {category}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      {result?.products && result?.products?.length > 0 && (
        <div className={styles.grid}>
          {result?.products?.map((product, index) => (
            <div key={product?.id}>
              <Item product={product} index={index + 1} />
            </div>
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          activeClassName="isActive"
          containerClassName={styles.PaginationList}
          initialPage={currentPage - 1}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(page) => pagginationHandler(page)}
        />
      )}
    </div>
  );
}
