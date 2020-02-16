const express = require('express')
const User = require('../../models/User')
const auth = require('../../modules/auth')

const router = express.Router()


router.post('/register', async (req, res) => {
  try {
    var user = await User.create(req.body)
    res.json({ success: true, user })
  } catch (error) {
    res.json({ msg: "user not created", error })
  }
})

router.post('/login', async (req, res) => {
  var { email, password } = req.body
  var user = await User.findOne({ email })
  if (!user) return res.json({ msg: "no user with email found" })
  var match = await user.verifyPassword(password)
  if (!match) return res.json({ msg: "password does not match" })
  //generate JWT
  var token = await auth.generateJWT(user);
  res.json({ success: true, token })
})


module.exports = router;