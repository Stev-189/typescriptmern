import React, { ChangeEvent, FormEvent, useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'; //uso de redireccionamiento
import Video from './Video';
import * as videoService from './VideoServices';
import {toast} from 'react-toastify'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params{
    id: string;
}

const VideoForm = () => {

    const history= useHistory(); // uso de redireccinamiento
    const params= useParams<Params>();

    const initialState={
        title:'',
        description:'',
        url:''
    };

    const [video, setVideo] = useState<Video>(initialState);

    // const handleInputChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{ //F1
    const handleInputChange=(e:InputChange)=>{
        setVideo({...video, [e.target.name]: e.target.value})
    };

    const handleSubmit= async (e :FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!params.id){
            await videoService.createVideo(video);
            toast.success('Nuevo Video agregado');
            setVideo(initialState)
        } else {
            await videoService.updateVideo(params.id, video)
            toast.success('Video Actualizado');
        }
        history.push('/') //es pare redirecciionar despues de crear un video
    };

    const getVideo= async (id: string)=>{
        const res= await videoService.getVideo(id);
        const {title, description, url} = res.data;
        setVideo({title, description, url})
    }

    useEffect(() => {
        (params.id) && getVideo(params.id)
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Nuevo Video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="from-group">
                                <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="Escriba un titutlo" 
                                    className="form-control" 
                                    onChange={handleInputChange}
                                    value={video.title}
                                    autoFocus
                                />
                            </div>
                            <div className="from-group">
                                <input 
                                    type="text" 
                                    name="url" 
                                    placeholder="escriba url" 
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.url}
                                />
                            </div>
                            <div className="from-group">
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="form-control"
                                    onChange={handleInputChange}
                                    placeholder="escriba una descripcion"
                                    value={video.description}
                                >
                                </textarea>
                            </div>
                            {
                                params.id 
                                    ?<button className="btn btn-primary">Update</button>
                                    :<button className="btn btn-primary">Crear Video</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForm
