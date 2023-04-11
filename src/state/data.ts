
import { API } from '@/api'
import axios from 'axios'
import { create } from 'zustand'

import { devtools } from 'zustand/middleware'

export interface Category {
    id: number
    name: string
    description: string
    image: string
    restoId: string
}
export interface Deal extends Category { }
export interface Extra {
    id: number
    name: string
    price: number
    image: string
    restoId: string

}

export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
    categoryId: number
    restoId: string
    ingredients: string[]
}

interface CategoryState {
    categories: Category[],
    deals: Deal[],
    extra: Extra[],
    products: Product[],
    init: (restoId: string, callBack: () => void) => void,


}

export const useDataStore = create<CategoryState>()(devtools((set) => ({
    categories: [],
    deals: [],
    extra: [],
    products: [],
    init: (restoId, callBack) => {
        axios.all([
            axios.get<Category[]>(`${API}/category?restoId=${restoId}`),
            axios.get<Deal[]>(`${API}/deal?restoId=${restoId}`),
            axios.get<Product[]>(`${API}/product?restoId=${restoId}`),
            axios.get(`${API}/extra?restoId=${restoId}`)
        ])
            .then(axios.spread((categories, deals, products, extra) => {
                // output of req.
                set({
                    categories: categories.data,
                    deals: deals.data,
                    products: products.data,
                    extra: extra.data
                })
            }));
    }
})))