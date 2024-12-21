const bcrypt = require("bcryptjs")
const userModel = require("../../models/userModel")



async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Please provide Email");
        }

        if (!password) {
            throw new Error("Please provide Password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not Found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
         res.json({
            message: "Login Successfully",
            success:true,
            error:false
         })

        } else {
            throw new Error("Please check Password")
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }

}

module.exports = userSignInController