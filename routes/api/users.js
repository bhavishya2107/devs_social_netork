const express = require('express')
const User = require('../../models/User')
const auth = require('../../modules/auth')

const router = express.Router()

//load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//register dev
router.post('/register', async (req, res) => {
  //validation
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    var user = await User.create(req.body)
    res.json({ success: true, id: user.id, name: user.name, email: user.email })
  } catch (error) {
    res.json({ msg: "user not created", error })
  }
})

//login dev
router.post('/login', async (req, res) => {
  //validation
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  var { email, password } = req.body
  var user = await User.findOne({ email })
  if (!user) {
    errors.email = 'Email does not exist'
    return res.json(errors)
  }
  var match = await user.verifyPassword(password)
  if (!match) {
    errors.email = 'Password Incorrect'
    return res.json(errors)
  }
  //generate JWT
  var token = await auth.generateJWT(user);
  res.json({ success: true, token , id:user._id })
})

//get current user
router.get('/current', auth.verifyToken, async (req,res) => {
  var user = req.user.id
  try {
    var currentUser = await User.findById(user).populate('profileId post')
    if(!currentUser) {
      return res.json({msg:"Invalid userId"})
    }
    res.json({success:true, currentUser})
  } catch (error) {
    res.status(400).json({msg:"user not found", error})
  }

})




module.exports = router;