import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { changeSong, closePlayer, setPlayer } from '../../redux/playerSlice';

const PodcastItem = ({ podcast }) => {

  const { isLoggedIn } = useSelector(state => state.auth);
  const { isMainLoading } = useSelector(state => state.mainLoading);
  const { user } = useSelector(state => state.user);
  
  const dispatch = useDispatch();



  const navigate = useNavigate();


  const handlePlay = async (e) => {
    e.preventDefault();
    
    if (isMainLoading) {
      return;
    }

    if (!isLoggedIn) {
      dispatch(closePlayer());
      navigate('/login');
      return;
    }

    dispatch(setPlayer());
    dispatch(changeSong({
      songPath: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_PORT ? +import.meta.env.VITE_SERVER_PORT : ''}/${podcast.audioFile}`,
      imgOfSong: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_PORT ? +import.meta.env.VITE_SERVER_PORT : ''}/${podcast.frontImage}`
    }))

  }



  return (
    <NavLink
      to={`/podcast/${podcast._id}`}
      className="border p-4 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex flex-col gap-5 transition-all duration-300 bg-white"
    >

      <div className='w-full rounded-xl'>
        <img
          src={`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_PORT ? +import.meta.env.VITE_SERVER_PORT : ''}/${podcast.frontImage}`}
          alt="podcast-img"
          className='w-full h-40 object-cover rounded-xl '
        />
      </div>

      <div className='mt-2 p-1 flex flex-col gap-4 justify-between h-full'>

        <h3 className=' text-xl font-bold truncate capitalize'>{podcast.title}</h3>

        <p className='text-base text-slate-500 line-clamp-2 leading-5'>{podcast.description}</p>


        <p className='bg-orange-100 text-red-500 rounded-full text-center capitalize py-2 border border-orange-800 '>{podcast.category.categoryName}</p>

        <button
          onClick={handlePlay}
          className='bg-green-800 text-white  w-full py-2 rounded-xl  flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300'>
          Play Now <span><FaPlay size={22} /></span>
        </button>


      </div>



    </NavLink>
  )
}

export default PodcastItem