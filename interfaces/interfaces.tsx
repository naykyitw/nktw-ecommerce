export interface Product {
  id: number;
  title: string;
  rating: number;
  price: any;
  thumbnail: string;
  discountPercentage?: number;
  images?: string[];
  description: string;
  quantity: any;
}
export interface ProductResult {
  total: number;
  products: Product[];
}

export interface Data {
  productResult: ProductResult;
  categories: string[];
  page: number;
  category: string;
}

export interface ProductResult {
  total: number;
  products: Product[];
}

export interface Data {
  productResult: ProductResult;
  categories: string[];
  page: number;
  category: string;
}
