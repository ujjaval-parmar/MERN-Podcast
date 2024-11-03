import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { apiGanerator } from '../../helper/apiGanerator';

const InputPodcast = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [dragging, setDragging] = useState(false);

    const [formData, setFormData] = useState({
        frontImage: '',
        title: '',
        description: '',
        audioFile: '',
        categoryName: ''
    });


    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const getAllCategories = async () => {

        try {

            setLoading(true);

            const response = await apiGanerator('categories/get-all-categories', "GET", true);

            const data = await response.json();

            setCategories(data.data);




        } catch (err) {
            console.log(err);
            toast.error(err.message)

        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {

        getAllCategories()

    }, [])


    const handleChangeImage = e => {

        console.log(e);

        if (e.target.value)
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });

    }

    const handleDragEnter = e => {
        e.stopPropagation();
        e.preventDefault();

        setDragging(true);
        // if(e.target.value)
        // setFormData({...formData, [e.target.name]: e.target.files[0]});

    }

    const handleDragLeave = e => {
        e.stopPropagation();
        e.preventDefault();

        setDragging(false);
    }

    const handleDragOver = e => {
        e.stopPropagation();
        e.preventDefault();


    }

    const handleDropImage = e => {
        e.stopPropagation();
        e.preventDefault();

        setFormData({ ...formData, frontImage: e.dataTransfer.files[0] })


        setDragging(false);
    }


    const handleAudioChange = e => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.value) {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.title || !formData.frontImage || !formData.description || !formData.audioFile || !formData.categoryName) {
            setError('All Fields are Required!');
        }

        try {

            setLoading(true);

            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('frontImage', formData.frontImage);
            data.append('category', formData.categoryName);
            data.append('audioFile', formData.audioFile);



            const response = await fetch(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_PORT || ''}/api/` + 'podcast/add-podcast', {
                method: "POST",
                "Access-Control-Allow-Origin": "*",
                credentials: 'include',
                body: data,
                headers: {
                    // 'Content-Type': 'multipart/form-data',

                    'Accept': '*/*',
                }
            })

            const responseData = await response.json();


            if(!responseData.success){
                throw new Error(response.error || responseData.message);
            }
            
            toast.success('Podcast Added Successfully!');

            setFormData({
                frontImage: '',
                title: '',
                description: '',
                audioFile: '',
                categoryName: ''
            });

            navigate('/profile');


        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }





    return (
        <div className='my-4 '>

            <div>

                <div>
                    <h1 className='text-2xl font-semibold text-center'>Create Your Podacast</h1>
                </div>

                <div className='mt-5 flex flex-col lg:flex-row gap-10 items-center'>

                    <div
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDropImage}
                        className='w-full h-[20vh] lg:min-h-[60vh] lg:max-w-[60vh]  border border-black border-dashed relative'>


                        <label
                            htmlFor='podcastImage'

                            className={`w-full h-full flex items-center justify-center  transition-all duration-200 relative z-30 ${!formData.frontImage ? 'hover:bg-zinc-300' : ''} ${dragging ? 'hover:bg-blue-100' : ''} `}>



                            {formData?.frontImage ? '' : 'Drag or Click to Add Podcast Image'}

                        </label>
                        <input
                            type="file"
                            accept='image/*'
                            name='frontImage'
                            id='podcastImage'
                            className=' w-full h-full hidden'
                            onChange={handleChangeImage}
                        />

                        {formData.frontImage && <img src={URL.createObjectURL(formData.frontImage)} alt="frontImage" className='absolute inset-0 z-20 w-full h-full object-scale-down' />}

                    </div>

                    <div className='w-full flex flex-col justify-between  gap-6 md:gap-8'>

                        <div>
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' name='title' placeholder='Title of Podcast' className='mt-2' value={formData.title} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea type="text" id='description' name='description' placeholder='Description of Podcast' resize='none' rows={6} className='mt-2' value={formData.description} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 items-center w-full'>

                            <div className='w-full'>
                                <label htmlFor="audioFile">Select Audio File</label>

                                <input type="file" accept='audio/*' className='border-0 mt-0.5 px-0' name='audioFile' onChange={handleAudioChange} />
                            </div>

                            <div className='w-full'>
                                <label htmlFor='categoryName'>
                                    {categories?.length > 0 ? 'Select Category' : "Loading..."}
                                </label>

                                {categories?.length > 0 && <select name="categoryName" id="categoryName" className='mt-0.5 px-0'
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                                    <option value="">Select Category</option>
                                    {categories.map(item => {
                                        return (
                                            <option
                                                key={item.categoryName}
                                                value={item.categoryName}
                                                className='capitalize'
                                            >{item.categoryName}</option>
                                        )
                                    })}

                                </select>}
                            </div>


                        </div>

                        {error && <div>
                            <p className='text-base text-red-500 font-semibold text-center'>{error}</p>
                        </div>}

                        <div>
                            <button className='bg-zinc-900 text-white font-semibold py-3 w-full my-3 hover:bg-zinc-800 transition-colors duration-300' onClick={handleSubmit}>{loading ? "Loading...." : "Create Podcast"}</button>
                        </div>



                    </div>



                </div>




            </div>




        </div>
    )
}

export default InputPodcast