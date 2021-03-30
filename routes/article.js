const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const imageMineTypes = ['image/jpeg', 'image/png', 'image/gif']

router.post('/articles', async (req, res) => {
    console.log("OK")
    const { content, image } = req.body;
    const article = new Article({
        content
    })
    saveArticle(article, image)
    try {
        const newArticle = await article.save()
        console.log(newArticle)
        return res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

function saveArticle(article, imgEncoded) {
    if (imgEncoded == null) return;
    const img = JSON.parse(imgEncoded);
    console.log("img");
    if (img != null && imageMineTypes.includes(img.type)) {
        console.log(img)
        article.image = new Buffer.from(img.data, 'base64')
        article.imageType = img.type
    }

}
module.exports = router