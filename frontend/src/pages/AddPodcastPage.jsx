import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputPodcast from '../components/AddPodcast/InputPodcast';

const AddPodcastPage = () => {


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
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] pb-[123px]'>

            <div className='container mx-auto px-2'>

                <InputPodcast />

            </div>




        </section>
    )
}

export default AddPodcastPage