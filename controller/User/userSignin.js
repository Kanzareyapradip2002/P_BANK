const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide Email");
        }

        if (!password) {
            throw new Error("Please provide Password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not Found");
        }

        // Check if the password matches
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            // Sign the JWT token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 6 });

            // Set cookie options
            const tokenOptions = {
                httpOnly: true,      // Prevent access via JavaScript
                secure: process.env.NODE_ENV === 'production', // Set to true in production, false in development
                maxAge: 1000 * 60 * 60 * 6,  // Expiry in ms (6 hours)
                sameSite: 'Strict'   // Optional: helps to prevent CSRF attacks
            };

            // Send the cookie with the token
            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Login Successful",
                data: token,
                success: true,
                error: false,
            });

        } else {
            throw new Error("Please check your Password");
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message || "An error occurred",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
