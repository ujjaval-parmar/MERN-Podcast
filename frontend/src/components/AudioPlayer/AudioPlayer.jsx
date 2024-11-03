import React, { useEffect, useRef, useState } from 'react'
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { changeSong, closePlayer } from '../../redux/playerSlice';


const AudioPlayer = () => {

    const { isPlayer, songPath, imgOfSong } = useSelector(state => state.player);




    const [isSongPlaying, setIsSongPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const dispatch = useDispatch();



    const audioRef = useRef();

    const getFormateTime = duration => {
        const minute = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        const showMinutes = minute < 10 ? '0' + minute : minute;
        const showSeconds = seconds < 10 ? '0' + seconds : seconds;

        return showMinutes + " : " + showSeconds;

    }


    const handleTimeUpdate = () => {
        if (audioRef?.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }

    const handleLoadedMetaData = () => {
        if (audioRef?.current) {
            setDuration(audioRef.current.duration)
        }
    }


    useEffect(() => {
        if (!songPath) {
            return;
        }

        const currentAudio = audioRef?.current;
        // console.dir(currentAudio);



        if (currentAudio) {

            currentAudio.addEventListener('timeupdate', handleTimeUpdate);
            currentAudio.addEventListener('loadedmetadata', handleLoadedMetaData);

            audioRef.current.play();
            setIsSongPlaying(true)

        }

        return () => {
            currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
            currentAudio.removeEventListener('loadedmetadata', handleLoadedMetaData);

        }


    }, [songPath]);

    const handlePlay = () => {



        if (audioRef?.current?.paused) {
            audioRef.current.play();
            setIsSongPlaying(true);
            return;
        }
        audioRef?.current?.pause();
        setIsSongPlaying(false);
        // console.log(audioRef.current.paused);

    }


    const handleClose = () => {
        dispatch(closePlayer());
        dispatch(changeSong({
            songPath: ``,
            imgOfSong: ``
        }))
    }

    const handleBackward = () => {
        if (audioRef?.current) {
            if (audioRef?.current.paused) {
                audioRef?.current.play();
            }
            let newTime = Math.max(currentTime - 10, 0);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    }

    const handleForward = () => {
        if (audioRef?.current) {
            if (audioRef?.current.paused) {
                audioRef?.current.play();
            }
            let newTime = Math.min(currentTime + 10, duration);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    }

    const handleSeek = (e) => {
        if (audioRef?.current) {
            if (audioRef?.current.paused) {
                audioRef?.current.play();
            }
            let newTime = e.target.value / 100 * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);


        }
    }





    return (
        <div className={`${isPlayer ? 'fixed' : 'hidden'}  bottom-0 left-0 w-full bg-zinc-900 text-zinc-300 px-4 rounded-tl-lg rounded-tr-lg py-4`}>

            <div className='container mx-auto px-2 flex items-center justify-between gap-3'>

                <div className={`hidden lg:block w-2/12 `}>
                    <img src={imgOfSong} alt="podcast-img" className={`size-12 rounded-full object-cover ${isSongPlaying ? 'animate-spin' : ''}`} />
                </div>

                <div className='flex flex-col items-center justify-center w-full lg:w-6/12'>

                    <div className='flex items-center gap-4'>

                        <button onClick={handleBackward}>
                            <TbPlayerTrackPrevFilled size={25} />
                        </button>

                        <button onClick={handlePlay}>
                            {!isSongPlaying ? <FaPlay size={25} /> : <FaPause size={25} />}
                        </button>

                        <button onClick={handleForward}>
                            <TbPlayerTrackNextFilled size={25} />
                        </button>

                    </div>

                    <div className='w-full flex items-center justify-center mt-3 '>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={currentTime / duration * 100 || 0}
                            onChange={handleSeek}
                            className='w-full hover:cursor-pointer' />
                    </div>

                    <div className='w-full flex items-center justify-between text-sm'>
                        <span>{getFormateTime(currentTime)}</span>
                        <span>{getFormateTime(duration)}</span>
                    </div>

                </div>

                <div className='cursor-pointer self-start'>
                    <button onClick={handleClose}>
                        <IoIosCloseCircle size={28} />
                    </button>
                </div>


                {songPath && <audio
                    src={songPath}
                    ref={audioRef}
                    type="audio/*" 
                    
                    />}
                    

                </div>


        </div>
            )
}

            export default AudioPlayer