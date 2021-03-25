const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sharing: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Article',articleSchema)