const express = require('express')
const Inform = require('./../models/inform')
const router = express.Router()

router.post('/add', async (req, res) => {
    const { title, content } = req.body;

    const inform = new Inform({
        title,
        content
    })
    try {
        const newInform = await inform.save()
        console.log(newInform)
        return res.redirect('/inform')
    } catch (e) {
        console.log(e)
    }
})

router.get("/", async (req, res) => {
    try {
        let inform = await Inform.find();
        console.log(inform)
        inform = inform.reverse()
        res.render('inform', { inform });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router