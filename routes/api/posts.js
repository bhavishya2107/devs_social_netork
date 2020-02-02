const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({success:'profile true'})
})

module.exports = router;