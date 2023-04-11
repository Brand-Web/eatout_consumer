
import { useDataStore } from '@/state/data'
import React from 'react'

const Home = () => {

    return (
        <main className='p-content space-y-6'>
            <Search />
            <CategorySection />
            <DealSection />
        </main>
    )
}

export default Home

const Search = () => {
    return <input type="text" placeholder="Recherche" className="input w-full bg-accent text-text" />


}

const CategorySection = () => {
    const categories = useDataStore(state => state.categories)

    return <div className='flex flex-row gap-2 overflow-scroll -mx-content '>
        {


            categories ?
                categories.map((category) => {
                    return <span key={category.id} className='bg-accent rounded-lg p-1 px-3 flex flex-row gap-3 items-center whitespace-nowrap font-light text-text relative first:ml-content'>
                        <div className='absolute top-0 right-0 h-full '></div>
                        <div className='w-10'>
                            <img src={category.image} alt={category.name} />
                        </div>
                        <span className='text-text'>{category.name}</span>
                    </span>
                }) : [1, 2, 3, 4, 5].map((i) => {
                    return <div key={i} className='bg-accent animate-pulse  rounded-lg p-1 px-3 first:ml-content'>
                        <span className='opacity-0'>
                            loading...
                        </span>
                    </div>
                })}
    </div>

}

const DealSection = () => {
    const deals = useDataStore(state => state.deals)
    if (!deals) return <div className='h-72 -mx-content w-screen animate-pulse bg-accent'></div>

    return <div className='-mx-content '>
        <div className="carousel w-full h-64">
            {deals.map((deal, i) => {
                return <div key={i} id={`deal${i}`} className="carousel-item w-full">
                    <img src={deal.image} className="w-full" alt={deal.name} />
                </div>
            })}

        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {deals.map((deal, i) => {
                return <a key={i} href={`#deal${i}`} className="btn btn-xs px-2">{i + 1}</a>
            })}
        </div>
    </div>
}


const Popular = () => {

}