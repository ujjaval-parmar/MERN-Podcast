import React from 'react'
import PodcastItem from './PodcastItem'

const PodcastList = ({ podcasts }) => {
  return (
    <div className='container mx-auto px-2 grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] auto-rows-fr gap-8 py-10'>

                    
        {podcasts && podcasts.length>0 && podcasts.map(podcast=>{
            return <PodcastItem key={podcast._id} podcast={podcast} />
        })}


    </div>
  )
}

export default PodcastList