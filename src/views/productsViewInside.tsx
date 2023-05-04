import Back from '@/components/back'
import Layout from '@/components/ui/layout'
import { useDataStore } from '@/state/data'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductsViewInside = () => {
    const params = useParams()
    const toProductPage=useDataStore(state=>state.toProductPage)
    const products = useDataStore(state => state.products).filter(p => {
        if (params.cat)
            return p.categoryId === parseInt(params.cat)
        else return true
    })
    const navigation=useNavigate()
    return (
        <Layout>
           <div className='p-3'>
           <Back/>
           </div>
            <div className="p-3 space-y-3">
                {products.map((product, i) =>
                  <div 
                  
                  onClick={()=>{
                    navigation(toProductPage(product.id))
                  }}
                  key={i} className="card card-side bg-base-100 shadow ">
                  <figure><img src={product.image} alt="Movie" className='h-full w-[100px]'/></figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg text-text/50">
                        {product.name}
                    </h2>

                    <label className='badge'>
                        {product.price} DH
                    </label>
                  </div>
                  
                </div>
                    )}
            </div>
        </Layout>
    )
}

export default ProductsViewInside