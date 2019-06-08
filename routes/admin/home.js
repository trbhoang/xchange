const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    var dataObject = {'title':'Home'}
    res.render('admin/home',{data: dataObject})
})

module.exports = router;