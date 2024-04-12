import {Router} from "express";
import userModel from '../models/user'
const user=Router()



user.get('/',async(req,res)=>{
    const result = await userModel.findAll()
    res.json(result)
})

user.get('/:id', async (req,res)=>{
    const result = await userModel.findById(req.params.id)
    res.json(result)
})
user.get('/email/:email', async (req,res)=>{
    const result = await userModel.findByemail(req.params.email)
    res.json(result)
})
user.post('/', async (req,res)=>{
    const result = await userModel.create(req.body)
    res.json(result)
})

user.post('/guideSignUp', async (req,res)=>{
    const result = await userModel.create_guide(req.body)
    res.json(result)
})
user.post('/taxi_register', async (req,res)=>{
    const result = await userModel.create_taxi_driver(req.body)
    res.json(result)
})
user.put('/:id', async (req,res)=>{
    const result = await userModel.findByIdAndUpdate(req.params.id, req.body)
    res.json(result)
})
user.delete('/:id', async (req,res)=>{
    const result = await userModel.findByIdAndDelete(req.params.id)
    res.json(result)
})






export default user

