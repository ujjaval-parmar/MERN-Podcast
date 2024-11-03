import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGanerator } from '../helper/apiGanerator';

const PodcastDetailPage = () => {

    const { podcastId } = useParams();

    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPodcastById = async () => {
        try {

            setLoading(true);

            const response = await apiGanerator('podcast/get-podcast/' + podcastId, "GET");

            const data = await response.json();

            setPodcast(data.data);


        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getPodcastById()
    }, []);

    return (
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] bg-green-100'>

            <div className='container mx-auto px-2'>



                {loading && <div className="min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] px-4 flex items-center justify-center bg-green-100 relative">
                    <div className="w-[260px] h-[260px] rounded-full border-[10px] border-green-800 border-r-0 border-l-0 animate-spin ">

                    </div>
                    <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-gray-700 tracking-wider text-lg">Loading.....</p>
                </div>}


                {!loading && podcast &&

                    <div className='pt-10 flex flex-col lg:flex-row items-center   gap-10'>

                        <div>
                            <img src={`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_PORT ? +import.meta.env.VITE_SERVER_PORT : ''}/${podcast.frontImage}`} alt={podcast.title} className='min-w-[250px] min-h-[250px] max-w-[350px] max-h-[350px] ' />
                        </div>

                        <div className='flex flex-col gap-5 justify-center lg:justify-start'>
                            <h3 className='text-2xl font-bold text-wrap overflow-hidden capitalize'>{podcast.title}</h3>
                            <p className='text-lg text-gray-700 text-wrap'>{podcast.description}</p>

                            <p className='bg-orange-100 text-red-500 rounded-full text-center capitalize py-2 px-3 border border-orange-800  w-fit'>{podcast.category.categoryName}</p>

                        </div>

                    </div>}






            </div>



        </section>
    )
}

export default PodcastDetailPage