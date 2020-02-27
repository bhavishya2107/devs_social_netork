const express = require('express')
const mongoose = require('mongoose')
const auth = require('../../modules/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const router = express.Router()


const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')


//get profile
router.get('/', auth.verifyToken, async (req, res) => {
  try {
    var user = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
    if (!user) return res.json({ msg: "There is no profile for this user" })
    res.json({ success: true, userProfile: user })
  } catch (error) {
    res.status(404).json({ error })
  }
})

//get all the profile
router.get('/all', async (req, res) => {
  const errors = {}
  try {
    var allProfiles = await Profile.find({}).populate('user')
    if (!allProfiles) {
      errors.noprofile = "There are no profiles"
      res.status(404).json(errors)
    }
    res.json(allProfiles)
  } catch (error) {
    res.json({ msg: "There are no profiles", error })
  }
})

//get profile by handle
router.get('/handle/:handle', async (req, res) => {
  const errors = {}
  try {
    var profile = await Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
    if (!profile) {
      errors.noprofile = "There is no profile for this user"
      res.status(404).json(errors)
    }
    res.json(profile)
  } catch (error) {
    res.status(404).json(error)
  }
})

//get profile by userid
router.get('/:user_id', async (req, res) => {
  const errors = {}
  try {
    var profile = await Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
    if (!profile) {
      errors.noprofile = "There is no profile for this user"
      res.status(404).json(errors)
    }
    res.json(profile)
  } catch (error) {
    res.status(404).json(error)
  }
})

//create profile
router.post('/', auth.verifyToken, async (req, res) => {
  console.log(req.user)
  try {
    var userProfile = await Profile.create(req.body)
    var user = await User.findById(req.user.id)
    if (!user.profileId) {
      await User.findByIdAndUpdate(req.user.id, { profileId: userProfile.id }, { new: true })
    }
    userProfile.user = req.user.id
    userProfile.skills = req.body.skills.split(',')
    userProfile.save()
    res.json({ success: true, userProfile })
  } catch (error) {
    res.json({ msg: "profile not created", error })
  }
})

//update profile
router.put('/', auth.verifyToken, async (req, res) => {
  console.log(req.user)
  try {
    var profile = await Profile.findOneAndUpdate({ user: req.user.id }, req.body, { new: true })
    profile.skills = req.body.skills.split(',')
    profile.save()
    res.json({ success: true, profile })
  } catch (error) {
    res.json({ msg: "profile not updated", error })
  }
})

//add experience to profile
router.post('/experience', auth.verifyToken, (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      profile.experience.unshift(newExp)
      profile.save().then(profile => res.json(profile))
    })
})

//add education to profile
router.post('/education', auth.verifyToken, (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      profile.education.unshift(newEdu)
      profile.save().then(profile => res.json(profile))
    })
})

//delete experience with exp_id
router.delete('/experience/:exp_id', auth.verifyToken, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id)

      //splice out of array
      profile.experience.splice(removeIndex, 1)
      //save
      profile.save().then(profile => {
        res.json(profile)
      })
        .catch(err => res.status(400).json(err))
    })
})

//delete education with edu_id
router.delete('/education/:edu_id', auth.verifyToken, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)

      //splice out of array
      profile.education.splice(removeIndex, 1)
      //save
      profile.save().then(profile => {
        res.json(profile)
      })
        .catch(err => res.status(400).json(err))
    })
})


//delete profile and user
router.delete('/', auth.verifyToken, async (req, res) => {
  var profile = await Profile.findOneAndDelete({ user: req.user.id })
  var user = await User.findOneAndDelete({ _id: req.user.id })

  res.json({ success: true, msg: "Profile/User deleted successfully" })
})

module.exports = router;