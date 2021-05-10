import {Schema, model} from 'mongoose'

const videoSchema=new Schema({
    title:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    url:{
        type: String,
        require: true,
        trim: true,
        unique: true
    }
},{
    versionKey: false, //sin _V
    timestamps: true //para sever cunado fue creado o modificado
});

export default model('video', videoSchema);