import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import PodcastList from '../components/Podcast/PodcastList';

const AllPodcasts = () => {

    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllPodcasts = async () => {
        try {

            setLoading(true);

            const response = await apiGanerator('podcast/get-podcasts', "GET", false);

            const data = await response.json();

            setPodcasts(data.data);


        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllPodcasts()
    }, []);

    



    return (
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] bg-green-100 pb-[123px]'>


            {loading ?
                <div className="min-h-screen  px-4 flex items-center justify-center bg-green-100 relative">
                    <div className="w-[260px] h-[260px] rounded-full border-[10px] border-green-800 border-r-0 border-l-0 animate-spin ">

                    </div>
                    <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-gray-700 tracking-wider text-lg">Loading.....</p>
                </div>
                :
                <PodcastList podcasts={podcasts} />
            }


        </section>
    )
}

export default AllPodcasts