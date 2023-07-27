const express = require('express')
const { getMessages, postMessages } = require('../controller/message')
const router = express.Router()

router.get('/all/messages',getMessages)
router.post('/new/message',postMessages)


module.exports =router