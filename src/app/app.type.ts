export interface SaleType {
    percentage: number;
    description: string;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    author_id: number;
    category: string;
    sale?: SaleType;
}
