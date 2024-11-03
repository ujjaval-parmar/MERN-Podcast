import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiGanerator } from '../../helper/apiGanerator';
import PodcastList from '../Podcast/PodcastList';

const YourPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPodcasts = async () => {
    try {

      setLoading(true);

      const response = await apiGanerator('podcast/get-user-podcasts', "GET", true);

      const data = await response.json();

      // console.log(data);

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
    <div className='pt-[240px] md:pt-[210px]'>

      <div className='flex justify-between items-center'>
        <h4 className='text-2xl font-bold'>Your Podcasts</h4>

        <div>
          <NavLink
            to='/add-podcast'
            className='bg-gray-800 text-white px-2 py-3 font-semibold text-base rounded-xl'>Add Podcast</NavLink>
        </div>

      </div>

      {loading ?
                <div className="min-h-screen  px-4 flex items-center justify-center bg-green-100 relative">
                    <div className="w-[260px] h-[260px] rounded-full border-[10px] border-green-800 border-r-0 border-l-0 animate-spin ">

                    </div>
                    <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-gray-700 tracking-wider text-lg">Loading.....</p>
                </div>
                :
                <PodcastList podcasts={podcasts} />
            }



    </div>
  )
}

export default YourPodcasts