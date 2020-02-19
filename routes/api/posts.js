const express = require('express')
const mongoose = require('mongoose')
const auth = require('../../modules/auth')
const router = express.Router()
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

const validatePostInput = require('../../validation/post')


//get all post
router.get('/', async (req, res) => {
  try {
    var post = await Post.find()
      .populate('user', ['name', 'email', '_id'])
      .sort({ data: -1 })
    if (!post) return res.json({ error: "No post found" })
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
    if (!post) return res.json({ error: "No post found" })
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
    if (!profile) return res.json({ msg: "No profile for this user" })
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

//like a post
router.post('/like/:id', auth.verifyToken, async (req, res) => {
  try {
    var user = req.user.id
    var posts = await Post.findById(req.params.id)
    console.log(posts)
    if (!posts.likes.includes(user)) {
      var post = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.user.id } }, { new: true })
      res.json({ success: true, post })
    } else {
      res.json({ msg: "Already liked by you" })
    }
  } catch (error) {
    res.json({ error: "error in query" })
  }

})

//unlike a post
router.delete('/unlike/:id', auth.verifyToken, async (req, res) => {
  try {
    var user = req.user.id
    var posts = await Post.findById(req.params.id)
    console.log(posts)
    if (posts.likes.includes(user)) {
      var post = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user.id } }, { new: true })
      res.json({ success: true, post })
    } else {
      res.json({ msg: "Already disliked" })
    }
  } catch (error) {
    res.json({ error: "error in query" })
  }

})

//add a comment
router.post('/comment/:id', auth.verifyToken, async (req, res) => {
  try {
    var post = await Post.findById(req.params.id)
    const comment = {
      user: req.user.id,
      avatar: req.user.avatar,
      name: req.user.name,
      text: req.body.text,
    }
    post.comments.unshift(comment)
    post.save()
    res.json({ msg: "Comment created", post })
  } catch (error) {
    res.json({ msg: "Error in query" })
  }
})

//remove a comment
router.delete('/comment/:id/:comment_id', auth.verifyToken, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: 'Comment does not exist' });
      }

      // Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of array
      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
}
);

module.exports = router;