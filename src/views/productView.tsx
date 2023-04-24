import { Link, useNavigate, useParams } from "react-router-dom";
import { Extra, Product, useDataStore } from "@/state/data";
import { BackIcon, CartIcon } from "@/components/icons";
import { useEffect, useState } from "react";

import cx from "classnames";
import { toast } from "react-hot-toast";
const ProductDetails = () => {
  const { productId } = useParams();
  const product = useDataStore(state => state.getProduct(productId ? parseInt(productId) : undefined))
  const nav = useNavigate()
  const back = () => {
    nav(-1)
  }
  if (!product) return <div>Product not found</div>

  return <div className="bg-primary">
    <AddToBack product={product} />
    <div className="relative flex flex-col gap-1 items-center">
      <div className="flex flex-row items-center justify-between p-content w-full">
        <button onClick={back}
          className="btn btn-ghost drawer-button lg:hidden bg-white"
        >
          <BackIcon className="text-2xl text-text " />

        </button>
        <div></div>
      </div>
      <div className="w-[50vw] h-[50vw] overflow-hidden rounded-full z-[2] relative border-white border-[7px] shadow-2xl">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-back rounded-tl-[3rem] rounded-tr-[3rem] h-[25vw] z-[1]">
      </div>
    </div>
    <div className="bg-back p-content">
      <h5 className="text-text text-center text-xl">
        {product.name}
      </h5>
      <div className="divider"></div>
      <div className="bg-white">
        <h6 className="text-text/80 border-l-4 border-primary pl-3 bg-primary/10 py-1">
          Ingredients
        </h6>
        <div className="flex flex-wrap gap-3 p-content">
          {product.ingredients.map((ingredient, i) => <span key={i} className="text-text/60 text-xs font-bold bg-accent p-1 px-3 rounded-xl">{ingredient}</span>)}
        </div>
      </div>
      <div className="divider"></div>
      <div className="bg-white">
        <h6 className="text-text/80 border-l-4 border-primary pl-3 bg-primary/10 py-1">
          Description
        </h6>
        <div className="p-content text-text/50">
          {product.description}
        </div>
      </div>

    </div>

  </div>;
};

export default ProductDetails;


const AddToBack = (props: { product: Product }) => {
  const extra = useDataStore(state => state.extra)
  const [selectedExtra, setSelectedExtra] = useState<Extra[]>([])
  const [quantity, setQuantity] = useState(1)

  const [total, setTotal] = useState(props.product.price)

  useEffect(() => {
    setTotal(props.product.price * quantity + selectedExtra.reduce((acc, extra) => acc + extra.price, 0))
  }, [props.product.price, selectedExtra, quantity])
  return <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-content space-y-3">

    <div className="flex flex-row gap-2 overflow-scroll -mx-content  scrollbar-hide ">
      {extra.map((extra) => {
        const selected = selectedExtra.map((e) => e.id).includes(extra.id);
        return (
          <button
            key={extra.id}
            onClick={() => {
              if (selected) {
                setSelectedExtra(selectedExtra.filter((e) => e.id !== extra.id));
                toast.success(`${extra.name} a été retiré`)
              } else {
                setSelectedExtra([...selectedExtra, extra]);
                toast.success(`${extra.name} a été ajouté`)
              }
            }}
            className={cx("rounded-lg p-1 px-3 flex flex-row gap-3 items-center whitespace-nowrap font-light text-text relative first:ml-content", selected?"bg-primary/10 border border-primary":"bg-accent")}
          >
            <div className="absolute top-0 right-0 h-full "></div>
            <div className="w-8">
              <img src={extra.image} alt={extra.name} />
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-text">{extra.name}</span>
              <span className="font-bold text-green-500">
               {extra.price===0? selected||"Gratuit":<>{selected?"-":"+"} {extra.price} <span className="text-[9px]">MAD</span></>}
               
              </span>
            </div>
          </button>
        );
      })
      }

    </div>
    <div>
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-4 items-center text-xl">
          <button onClick={() => {
            if (quantity > 1) setQuantity(quantity - 1)
          }} className="btn btn-ghost bg-accent btn-sm">-</button>
          <span className="text-text/80">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="btn btn-ghost btn-sm bg-accent">+</button>
        </div>
        <button className="btn btn-primary space-x-2">
       <div className="flex flex-row gap-1 items-center text-lg">
       {total} <span className="text-[10px]">MAD</span>
       </div>
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
          <CartIcon className="text-lg"/>
        </div>
      </button>
      </div>
    
    </div>
  </div>
}