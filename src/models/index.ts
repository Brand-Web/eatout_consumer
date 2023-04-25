import { Extra } from "@/state/data";


export interface Category{
    id: number;
    name: string;
    image: string;
    color?: string;
    description?: string;
    products?: Product[];
}

export interface Product{
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    categoryId: number;
    restoId: string;
    //Optional
    idCategory?:string,
    categorie?: Category;
    star?: number;
    isNew?: boolean;
    isPromo?: boolean;
    promoPrice?: number;
    endPromo?: Date;
    isNotAvailable?: boolean;
    ingredients?:string[],
    availableUntil?: Date;

    //Methods
}

export type OrderStatusType = "pending" | "accepted"  | "canceled" | "preparing" | "ready" | "served"|"rejected";
export interface Status<StatusType>{
    id: string;
    type: StatusType;
    date: Date;

}
export interface Order{
    id: string;
    numero?: number;
    date: Date;
    note?: string;
    //
    idUser: string;
    idResto: string;
    idTable: string;

    //
    totalPrice: number;
    commandes:{
        quantity: number;
        extra: Extra[];
        product: Product;
    }

    logs: Status<OrderStatusType>[];
    status:  Status<OrderStatusType>;


}