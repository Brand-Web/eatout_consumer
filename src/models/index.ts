

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