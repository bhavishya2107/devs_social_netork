const express = require('express')
const mongoose = require('mongoose')
const auth = require('../../modules/auth')
const router = express.Router()
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

const validatePostInput = require('../../validation/post')

router.get('/test', (req, res) => {
  res.json({ success: 'profile true' })
})


//get all post
router.get('/', async (req, res) => {
  try {
    var post = await Post.find()
      .populate('user', ['name', 'email', '_id'])
      .sort({ data: -1 })
    res.json({ success: true, post })
  } catch (error) {
    res.status(404).json({ error: "No posts" })
  }
})

//get post by id
router.get('/:id', async (req, res) => {
  try {
    var post = await Post.findById(req.params.id)
      .populate('user', ['name', 'email', '_id'])
    res.json({ success: true, post })
  } catch (error) {
    res.status(404).json({ error: "No posts" })
  }
})

//delete post
router.delete('/:id', auth.verifyToken, async (req, res) => {
  try {
  var profile = await Profile.findOne({ user: req.user.id })
  console.log(profile)
  if (!profile) return res.json({msg:"No profile for this user"})
  if (profile.user.toString() !== req.user.id) {
    return res.status(401).json({ error: "User not autherized" })
  }
  await Post.findByIdAndDelete(req.params.id)

  res.json({ msg: "Post deleted" })
  } catch (error) {
    res.status(400).json({ msg: "error in query" })
  }
})

//create post
router.post('/', auth.verifyToken, async (req, res) => {
  //validation
  const { errors, isValid } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    var post = await Post.create(req.body)
    post.user = req.user.id
    res.json(post)
  } catch (error) {
    res.json({ msg: "error in query" })
  }
})

module.exports = router;