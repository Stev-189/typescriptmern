import {Response,RequestHandler} from 'express'
import Video from './Video'

export const createVideos: RequestHandler= async (req,res)=> {
    try {
        const videoFund= await Video.findOne({url:req.body.url});//lo que el cuerpo traiga es comom un form
        if(videoFund) return res.status(301).json({message: `la url: ${req.body.url} ya existe`})
        const video = new Video(req.body)
        const saveVideo=await video.save()
        res.json(saveVideo)
    } catch (error) {
        res.json(error)
    }
}

export const getVideo: RequestHandler= async (req,res)=> {
    try {
        const videoFound= await Video.findById(req.params.id)//segun lo que indique la url
        // if(!videoFound) return res.status(204).json()
        return res.json(videoFound)
    } catch (error) {
        return res.json({message: `no data in : ${req.params.id}`})
    }
}

export const deleteVideo: RequestHandler= async (req,res)=> {
    try {
        const videoFound= await Video.findByIdAndDelete(req.params.id)//segun lo que indique la url
        // if(!videoFound) return res.status(204).json({message: `no data in : ${req.params.id}`})
        return res.json(videoFound)
    } catch (error) {
        return res.json({message: `no data in : ${req.params.id}`})
    }
}

export const getVideos: RequestHandler= async (req,res)=> {
    try {
        const videos= await Video.find()
        return res.json(videos) 
    } catch (error) {
        res.json(error)
    }
}
export const updateVideo: RequestHandler= async (req,res)=> {
    try {
        const videoFound= await Video.findByIdAndUpdate(req.params.id, req.body, {new: true} )//para que retorne objeto nuevo
        // if(!videoFound) return res.status(204).json({message: `no data in : ${req.params.id}`})
        return res.json(videoFound)
    } catch (error) {
        return res.json({message: `no data in : ${req.params.id}`})
    }
}