const express = require('express')
const router= express.Router();
const News = require("../models/News");
require("dotenv").config({ path: "./.env" });
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Route 1: get all notes using Get "/api/notes/fetchallnotes" login required

router.get('/fetchallnews',fetchUser,async (req,res)=>{
    try {
        const news = await News.find({user:req.user.id});
        res.json(news);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
    
})


//Route 2: Add note using Post "/api/notes/addnotes" login required

router.post('/addnews',fetchUser,[
    body('title','Enter a valid title').isLength({min:5}),
    body('description','Enter a valid description').isLength({min:20})
],async (req,res) => {
    
    try {
        const {title,description,category,tag} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const news = new News({
            title,description,category,tag,user:req.user.id
        })
        const savedNews = await news.save()
        res.json(savedNews);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
})


// Route 3: Update notes using PUT "/api/notes/updatenotes/:id" login required

router.put('/updatenews/:id',fetchUser,async (req,res)=>{
    const {title,description,category,tag} = req.body;

    const newNews ={};
    if(title){newNews.title = title}
    if(description){newNews.description = description}
    if(tag){newNews.category = category}
    if(tag){newNews.tag = tag}

    //find the note to be updated and update it

    let news = await News.findById(req.params.id);
    if(!news){return res.status(404).send("Not found")}

    if(news.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    news = await News.findByIdAndUpdate(req.params.id,{$set:newNews},{new:true})
    res.json(news)
 }) 


 // Route 4: Delete notes using DELETE "/api/notes/deletenotes/:id" login required

router.delete('/deletenews/:id',fetchUser,async (req,res)=>{
    const {title,description,category,tag} = req.body;

    //find the note to be deleted and delete it

    let news = await News.findById(req.params.id);
    if(!news){return res.status(404).send("Not found")}

    if(news.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    news = await News.findByIdAndDelete(req.params.id)
    res.json({"Succes":"Note has been deleted"})
 }) 
 
module.exports = router