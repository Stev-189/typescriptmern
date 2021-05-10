import React, { useEffect, useState } from 'react'
import * as videoService from './VideoServices';
import VideoItem from './VideoItem';

import Video from './Video';

const VideoList = () => {

    const [videos, setVideos] = useState<Video[]>([])

    const loadVideos= async ()=>{
        const res = await videoService.getVideos()
        const formatedVideo=res.data.map(video=>{
            return {...video,
                    createdAt: video.createdAt? new Date(video.createdAt): new Date(),
                    updatedAt: video.updatedAt? new Date(video.updatedAt): new Date()
            }
        })
        .sort((a,b)=> b.createdAt.getTime() - a.createdAt.getTime());

        // setVideos(res.data)
        setVideos(formatedVideo)
    }

    useEffect(() => {
        loadVideos()
    }, [])

    return (
        <div className="row">
            {
                videos.map(video=>{
                   return (
                       <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>
                   ) 
                })
            }            
        </div>
    )
}

export default VideoList
