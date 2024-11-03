import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Profile/Header';
import YourPodcasts from '../components/Profile/YourPodcasts';

const ProfilePage = () => {

    
    const { isLoggedIn } = useSelector(state => state.auth);
    const { isMainLoading } = useSelector(state => state.mainLoading);
    const { user } = useSelector(state => state.user);



    const navigate = useNavigate();

    useEffect(() => {

        if (isMainLoading) {
            return;
        }



        if (!isLoggedIn) {
            navigate('/');
        }

    });

    



    return (
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)]  relative pb-[123px]'>

            <div className='container mx-auto px-2 '>

                {user && <Header user={user} />}

                {user && <YourPodcasts />}

            </div>



        </section>
    )
}

export default ProfilePage