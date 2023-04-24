import { Product } from "@/models";
import { Extra } from "./data";
import { create } from "zustand";

interface CartItem {
    product: Product;
    quantity: number;
    extra:Extra[],
}

interface UserState {
    cart: CartItem[];
    note?: string;
    total: number;
    addToCart: (product: Product, quantity: number,extra:Extra[]) => void;
    removeFromCart: (id: number) => void;
  }

  const hasSameExtra=(a:Extra[],b:Extra[])=>{
    if(a.length!==b.length) return false;
    for(let i=0;i<a.length;i++){
        if(a[i].id!==b[i].id) return false;
    }
    return true;
  }
    export const useUserStore = create<UserState>((set, get) => ({
        cart: [],
        total: 0,
        addToCart: (product:Product, quantity:number,extra:Extra[]) => {

            const cart = get().cart;
            const index = cart.findIndex((c) => c.product.id === product.id);
            if (index === -1) {
                cart.push({ product, quantity,extra });
            } else {
                if(!hasSameExtra(cart[index].extra,extra)){
                    cart.push({ product, quantity,extra });
                }
                else
                cart[index].quantity += quantity;
            }
            set({ cart });
        }
        ,
        removeFromCart: (id) => {
            const cart = get().cart;
            const index = cart.findIndex((c) => c.product.id === id);
            if (index !== -1) {
                cart.splice(index, 1);
            }
            set({ cart });
        }
    }));
// Compare this snippet from src/state/user.ts:

useUserStore.subscribe(
    (state) => {
        let total = 0;
        state.cart.forEach((c) => {
            total += (c.product.price+ c.extra.reduce((a,b)=>a+b.price,0))* c.quantity;
        });
        useUserStore.getState().total = total;
        }
  )