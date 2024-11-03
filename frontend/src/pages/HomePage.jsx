import React from 'react'

const HomePage = () => {
    return (
        <section className='min-h-[calc(100vh-83px)] lg:min-h-[calc(100vh-98px)] pb-16 lg:pb-0  px-4 flex items-center justify-center bg-green-100 '>

            <div className='container mx-auto w-full flex flex-col gap-4 '>


                <div className='flex items-center flex-col md:flex-row text-center md:text-left gap-6 '>

                    <div className='w-5/6'>
                        <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-bold text-nowrap'>
                            <h1>Create & listen the </h1>
                            <h2 className='flex py-6  justify-center items-center md:justify-start'>
                                P    <img src="images.jpeg" alt="banner" className='w-[80px] md:w-[128px] rounded-full mix-blend-darken' /> dcast
                            </h2>
                        </div>

                        <p className='text-base md:text-lg lg:text-xl font-semibold'>Listen to th most popluar on just one platform - <span className='font-bold'>PODCASTER</span></p>

                    </div>

                    <div className=' w-fit lg:w-1/6 rotate-0  md:-rotate-90 mx-auto'>

                        <div>
                            <button className='px-5 py-3 border border-black text-xl rounded-full text-nowrap mb-4 block w-fit mx-auto'>Best Podcasts</button>
                        </div>

                    </div>


                </div>

                <div className='flex flex-col md:flex-row gap-5 justify-between items-center mt-6'>

                    <div>
                        <button className='bg-green-900 text-white px-4 py-3 rounded-full'>Login to Listen</button>
                    </div>

                    <p className='text-gray-500 font-semibold text-sm sm:text-base'>Our app contains more than 2000 podcasts for you</p>

                </div>







            </div>







        </section>
    )
}

export default HomePage