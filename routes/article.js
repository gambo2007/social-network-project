const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.post('/new', async (req,res)=>{
    console.log("OK")
    const {content,sharing} = req.body;
    let article = new Article({
        content : content,
        sharing : sharing
    })
    try{
        await article.save()
        console.log("OK",article.id)
        return res.send(article.id)
    }catch(e){
        console.log("failure")
        return res.send("failure")
    }
})

module.exports = router