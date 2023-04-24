import { Product } from "@/models";
import { useDataStore } from "@/state/data";
import { FavIcon } from "@components/icons";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const {toProductPage}=useDataStore()
  const nav=useNavigate()
  const toProduct=()=>{
    nav(toProductPage(product.id))
  }
  return (
    <button
    onClick={toProduct}
     className="p-3 text-center flex flex-col gap-2 items-center rounded-xl bg-accent">
      <div className="self-end p-1">
        <FavIcon />
      </div>
      <div className="avatar ">
        <div className="rounded-full border border-primary shadow-2xl">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      <span className="text-text/80 text-xs ">{product.name}</span>
      <span className="font-bold flex flex-row gap-1 items-center text-green-800 ordinal">
        {product.price} <span className="text-[9px]">MAD</span>
      </span>
    </button>
  );
};

export default ProductCard;
