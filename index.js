import express from 'express'
const app = express()
const port = 3400
import mongoose, { Schema } from 'mongoose';
import cors from "cors";

app.use(express.json())
app.use(cors())

const flowersSchema = new Schema({
 image:String,
 name:String,
 price:Number
});

const flowersModel = mongoose.model('Flowers', flowersSchema)

app.get('/', async (req, res) => {
    try {
        const flowers= await flowersModel.find({})
    res.send(flowers)

    } catch (error) {
    res.send(error.message``)
        
    }
  })

  app.get('/:id', async (req, res) => {
    try {
        const {id}= req.params
        const flowers= await flowersModel.findById(id)
    res.send(flowers)
    res.send("get methodu ugurlu")
    } catch (error) {
    res.send(error.message``)
    }
  })
  
  app.post('/', async (req, res) => {
    try {
        const {image,name,price}=req.body
        const newFlowers=  new  flowersModel({image,name,price});
        await newFlowers.save()
    res.send('post methodu ugurlu')
        
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.put('/:id', async (req, res) => {
    try {
        const {id}=req.body
        const {image,name,price}=req.body
        const newFlowers=await flowersModel.findByIdAndUpdate(id)
    } catch (error) {
        res.send(error.message)
    }
    res.send('Got a PUT request at /user')
  })
  
  app.delete('/:id', async (req, res) => {
    try {
     const {id}= req.params
     const newFlowers=await flowersModel.findByIdAndDelete(id)
     res.send('delete methodu ugurlu')
    } catch (error) {
     res.send(error.message)
    }
 })
 mongoose
 .connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
 .then(() => console.log('Connected!'))
 .catch(()=>console.log('not connected'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})