import React from 'react'
import { apiGanerator } from '../helper/apiGanerator'
import { NavLink } from 'react-router-dom'

const CATEGORIES = [
    {
        name: 'Comedy',
        color: 'bg-purple-200'
    },
    {
        name: 'Business',
        color: 'bg-green-200'
    },
    {
        name: 'Education',
        color: 'bg-red-200'
    },
    {
        name: 'Hobbies',
        color: 'bg-zinc-200'
    },
    {
        name: 'Government',
        color: 'bg-indigo-200'
    }
]


const CategoriesPage = () => {

    return (
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] bg-green-50 pb-[123px]'>

            <div className='container mx-auto px-2 py-10'>
                <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-8'>
                    {
                        CATEGORIES.map(cat => {
                            return (
                                <NavLink
                                    to={`/categories/${cat.name.toLowerCase()}`}
                                    key={cat.name}
                                    className={`${cat.color} h-40 rounded-2xl flex items-center justify-center text-2xl font-semibold uppercase tracking-wide text-gray-800 shadow-lg  hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 lg:drop-shadow-2xl`}
                                >

                                    {cat.name}

                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>


        </section>
    )
}

export default CategoriesPage