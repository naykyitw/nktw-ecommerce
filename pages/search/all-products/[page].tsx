import { ProductResult, Data } from "@/interfaces/interfaces";
import Search from "../../../components/shared/Search/search";

async function getData(page: number): Promise<ProductResult> {
  const limit = "20";
  const skip = (page - 1) * 20;
  const res = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
  );
  return res.json();
}

async function getCategories(): Promise<string[]> {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  return res.json();
}

export async function getStaticPaths() {
  // Pre-generate paths for the first few pages, assuming 5 pages in total
  const totalPages = 5;
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: any) {
  const { page } = params;
  const res = getData(page);
  const categories = getCategories();
  const data: Data = {
    productResult: await res,
    categories: await categories,
    page,
    category: "",
  };
  return { props: { data }, revalidate: 60 };
}
export default function Page({ data }: { data: Data }) {
  return <Search data={data} />;
}
