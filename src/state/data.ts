import { API } from "@/api";
import axios from "axios";
import { create } from "zustand";

import { devtools } from "zustand/middleware";

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  restoId: string;
}
export interface Deal extends Category {}
export interface Extra {
  id: number;
  name: string;
  price: number;
  image: string;
  restoId: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  restoId: string;
  ingredients: string[];
}

interface CategoryState {
  categories: Category[];
  deals: Deal[];
  extra: Extra[];
  products: Product[];
  restoId?:string,
  tableId?:number,
  init: (restoId: string,table:number|undefined, callBack: () => void) => void;
  toProductPage: (id: number) => string;
  getProduct: (id: number|undefined) => Product | undefined;
}

const product: Product = {
  id: 1,
  name: "Pizza Margherita",
  description:
    "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard",

  price: 10,
  image:
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=200&q=60",
  categoryId: 1,
  restoId: "abdc1234",
  ingredients: ["tomato", "cheese"],
};

export const useDataStore = create<CategoryState>()(
  devtools((set,get) => ({
    categories: [],
    deals: [],
    extra: [],
    products: [],
    restoId:undefined,
    tableId:undefined,
    getProduct: (id) => {
      return get().products.find((p) => p.id === id);
    },
    toProductPage: (id) => {

     if(get().restoId && get().tableId){
      const {restoId,tableId}=get()
      return `/${restoId}/${tableId}/product/${id}`;
     }
      return `/`;
    },
    init: (restoId,tableId, callBack) => {
      axios
        .all([
          axios.get<Category[]>(`${API}/category?restoId=${restoId}`),
          axios.get<Deal[]>(`${API}/deal?restoId=${restoId}`),
          axios.get<Product[]>(`${API}/product?restoId=${restoId}`),
          axios.get(`${API}/extra?restoId=${restoId}`),
        ])
        .then(
          axios.spread((categories, deals, products, extra) => {
            // output of req.
            set({
              restoId,
              tableId,
              categories: categories.data,
              deals: deals.data,

              products: [
                product,
                product,
                product,
                product,
                product,
                product,
                product,
              ],
              extra: extra.data,
            });
          })
        )
        .catch((err) => {
          console.log(err);
        });
    },
  }))
);
