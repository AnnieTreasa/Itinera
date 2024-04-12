import {Router} from "express";
const search=Router()

// search.get('/search',async(req,res)=>{
//     res.send("search/search")

// })

search.get('/search',async(req,res)=>{
    res.render('search/search')
})

search.get('/display',async(req,res)=>{
    res.render("search/display")

})

export default search;