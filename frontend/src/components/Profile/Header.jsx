import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserLogout } from '../../redux/userSlice';
import { logout } from '../../redux/authSlice';
import { apiGanerator } from '../../helper/apiGanerator';
import { changeSong, closePlayer } from '../../redux/playerSlice';

const Header = ({ user }) => {

    const dispatch = useDispatch();



    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {

        try {
            setLoading(true);
            setError(null);

            const response = await apiGanerator('user/logout', "GET", true);



            const data = await response.json();


            if (!data.success) {
                throw new Error(data.message);
            }

            navigate('/');
            dispatch(UserLogout({ user: data.data }));
            dispatch(logout());

           
                dispatch(closePlayer());
                dispatch(changeSong({
                    songPath: ``,
                    imgOfSong: ``
                  }))
        



        } catch (err) {
            console.log(err);
            toast.error(err.message);
            setError(err.message);


        } finally {
            setLoading(false);
        }


    }


    return (
        <div className='bg-green-900 w-full mx-auto  py-3  absolute top-0 left-0'>

            <div className='container mx-auto flex flex-col gap-6 md:flex-row justify-between md:items-center px-5'>

                <div className='text-white flex flex-col gap-3'>
                    <p className='text-lg md:text-2xl tracking-wider'>Profile</p>
                    <h3 className='font-bold  text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>{user.username}</h3>
                    <p className='text-lg md:text-2xl tracking-wider'>{user.email}</p>
                </div>

                <div className='self-center'>
                    <button className='bg-white border-black p-2 text-lg font-semibold '
                        onClick={handleLogout}
                    >{loading ? 'Loading...' : 'Log Out'}</button>
                </div>

            </div>

        </div>
    )
}

export default Header