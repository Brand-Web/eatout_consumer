import { Order, Product } from "@/models";
import { Extra } from "./data";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface CartItem {
    product: Product;
    quantity: number;
    extra: Extra[],
}

interface UserState {
    cart: CartItem[];
    note?: string;
    total: number;
    addToCart: (product: Product, quantity: number, extra: Extra[]) => void;
    removeFromCart: (id: number) => void;
    sendOrder: (idUser: string, restoId: string, tableId: string) => void;
    setNote: (note: string | undefined) => void;
    removeNote: () => void;

}

const hasSameExtra = (a: Extra[], b: Extra[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].id !== b[i].id) return false;
    }
    return true;
}
export const useUserStore = create<UserState>(
    //  persist<UserState>(
    (set, get) => ({
        cart: [],
        total: 0,
        note: undefined,
        addToCart: (product: Product, quantity: number, extra: Extra[]) => {

            const cart = get().cart;
            const index = cart.findIndex((c) => c.product.id === product.id);
            if (index === -1) {
                cart.push({ product, quantity, extra });
            } else {
                if (!hasSameExtra(cart[index].extra, extra)) {
                    cart.push({ product, quantity, extra });
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
        },
        sendOrder: (idUser: string, restoId: string, tableId: string) => {
            const { cart, note, total } = get()

            const order: Omit<Order, "id"> = {

                idUser,
                commandes: cart.map((c) => ({
                    quantity: c.quantity,
                    extra: c.extra,
                    product: c.product
                })),
                total,
                note,
                idResto: restoId,
                idTable: tableId,
                date: new Date(),
                status: {
                    type: "pending",
                    date: new Date()
                },
                logs: [
                    {
                        type: "pending",
                        date: new Date()
                    }

                ],
            }
            console.log('order :>> ', order);
            addDoc(collection(db, "orders"), order).then((docRef) => {
                toast.success("Commande envoyée");
                set({ cart: [], total: 0, note: undefined });
            }
            ).catch((error) => {
                toast.error("Erreur lors de l'envoi de la commande");
            }
            );

        },
        setNote: (note: string | undefined) => {
            set({ note });
        },
        removeNote: () => {
            set({ note: undefined });
        }

    }),
    //         {
    //     name: 'user-eatout-storage', // unique name // (optional) by default, 'localStorage' is used
    //   })
);
// Compare this snippet from src/state/user.ts:

useUserStore.subscribe(
    (state, prev) => {
        let total = 0;
        state.cart.forEach((c) => {
            total += (c.product.price + c.extra.reduce((a, b) => a + b.price, 0)) * c.quantity;
        });
        useUserStore.getState().total = total;
        if (state.note !== prev.note) {
            if (!prev.note) {
                toast.success("Note ajoutée");
            }
            else if (prev.note && state.note) {
                toast.success("Note modifiée");
            } else {
                toast.success("Note supprimée");
            }
        }
    }
)


interface IdState {
    id: string;
}
export const useIdStore = create(
    persist<IdState>(
        (set) => ({
            id: Math.random().toString(36).substring(2, 8)
        }),
        {
            name: 'id-eatout-storage', // unique name // (optional) by default, 'localStorage' is used
        }
    )
);

useIdStore.subscribe(
    (state) => {
        if (!state.id) {
            state.id = Math.random().toString(36).substring(2, 8);
        }
    }
)