import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGanerator } from '../helper/apiGanerator';
import PodcastList from '../components/Podcast/PodcastList';

const CategoryPodcastPage = () => {

    const { categoryName } = useParams();



    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllPodcasts = async () => {
        try {

            setLoading(true);

            const response = await apiGanerator('podcast//get-category-podcasts/' + categoryName, "GET", true);

            const data = await response.json();

            setPodcasts(data.data);


        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllPodcasts()
    }, []);




    return (
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] bg-green-100 pb-[123px]'>

            <div className='container mx-auto px-2'>

                <h3 className='text-2xl font-bold text-center py-10 uppercase tracking-wider'>{categoryName}</h3>

                {loading && <div className="min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] px-4 flex items-center justify-center bg-green-100 relative">
                    <div className="w-[260px] h-[260px] rounded-full border-[10px] border-green-800 border-r-0 border-l-0 animate-spin ">

                    </div>
                    <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-gray-700 tracking-wider text-lg">Loading.....</p>
                </div>}

                {!loading && podcasts && podcasts?.length > 0 && <PodcastList podcasts={podcasts} />}

                {!loading && podcasts?.length <= 0 &&
                    <h2 className='text-lg text-center my-8'>No Podcasts found for {categoryName} Category</h2>
                }



            </div>



        </section>
    )
}

export default CategoryPodcastPage