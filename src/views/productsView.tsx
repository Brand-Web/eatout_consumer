import Layout from "@/components/ui/layout";
import { useDataStore } from "@/state/data";
import React from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsView = () => {
  return (
    <Layout>
      <SearchBar />
    </Layout>
  );
};

export default ProductsView;


const SearchBar = () => {
const navigation=useNavigate()

  const {categories:cats, products} = useDataStore(state => state)
  return <div className="p-3">
    <input type="text" placeholder="Recherche" className="input input-bordered w-full" />
    <div className="grid grid-cols-2 gap-4 py-5 pb-20">
      {cats.map((cat, i) => 
        <div
        onClick={() => {
          if(products.filter(p => p.categoryId === cat.id).length===0) toast.error("Aucun produit dans cette catégorie")
          else
      navigation(`inside?cat=${cat.id}`)
        }}
        key={i} style={{
          backgroundImage: `url(${cat.image})`,
          //bg-blend-exclusion
        }} className="card h-[160px] relative bg-primary/[10%] bg-center bg-no-repeat 
        bg-blend-exclusion
        border  flex flex-col justify-between p-2">
          <label className="badge">
            {products.filter(p => p.categoryId === cat.id).length}
          </label>
          <h3 className="text-text text-2xl font-bold self-center">
            {cat.name}
          </h3>
        </div>

      )}
    </div>
  </div>
}