const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/User/userSignUp")
const userSignInController = require("../controller/User/userSignin")
const userLogout = require('../controller/User/userLogout')
const allUsers = require('../controller/User/allUsers')
const updateUser = require('../controller/User/updateUser')
const  sendOtp = require('../controller/User/EmailSandOtp')
const sendKEY = require('../controller/User/EmailSandKEY')
const sendMessage = require('../controller/User/EmailSandMessage')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/userLogout",userLogout)

//admin panel 

router.get("/all-user",allUsers)
router.post("/update-user",updateUser)

//opt 
router.post("/email-sandotp",sendOtp)
router.post("/email-sandKEY",sendKEY)
router.post("/email-sandMessage",sendMessage)


module.exports = router 