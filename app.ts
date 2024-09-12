import express from 'express'
import multer from 'multer'
import path from 'path'
import fs, { copyFileSync } from 'fs'

const app = express()
const PORT = 6900 

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null , 'uploads/')
    },

    filename : (req, file, cb)=>{
        cb(null , file.originalname)
    }
})

const upload = multer( {storage : storage})

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.post('/upload' , upload.single('file'), (req,res)=>{
    
    if(!req.file){
        return res.status(400).json({
            mesage : 'No file uploaded'
        })
    }

    res.status(200).json({
        message : `Fille uploaded successfull.`, file:req.file
    })

})

app.listen(PORT, ()=>{
    console.log(`There server is listening on ${PORT} `)
})
