interface Video {
    _id?:string//? no lo combierte en obligatorio
    url:string
    title:string
    description:string
    createdAt?:string | Date
    updatedAt?:string | Date
}

export default Video;