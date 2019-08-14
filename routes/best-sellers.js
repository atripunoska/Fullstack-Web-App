const express = require('express');
const router = express.Router();

router.get('/best-sellers', function(req, res) {
    
    res.render('best-sellers/index')
});

module.exports = router;