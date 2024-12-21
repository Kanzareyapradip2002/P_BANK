const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email) {
            throw new Error("Please provide an Email.");
        }

        if (!password) {
            throw new Error("Please provide a Password.");
        }

        // Look up the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found.");
        }

        // Compare the provided password with the stored hash
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            // Create the token payload (data to encode)
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            // Sign the JWT token with a secret key and expiration time
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '6h' });

            // Set cookie options, only send cookie over secure connections and make it HTTP-only
            const tokenOptions = {
                httpOnly: true,  // Ensures the cookie can't be accessed by JavaScript
                secure: process.env.TOKEN_SECRET_KYE = "NUYCEYRTVEURLUKSCRTYVI",  // Only secure in production
                sameSite: "Strict",  // Strict CSRF protection
                maxAge: 6 * 60 * 60 * 1000, // Same as the token expiration (6 hours)
            };

            // Send the token in an HTTP-only cookie
            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Login successful",
                success: true,
                error: false,
                data: {
                    token: token,  // Optional: Return the token in the response body
                }
            });
        } else {
            throw new Error("Invalid password. Please check again.");
        }
    } catch (err) {
        // Catch errors and respond with an error message
        res.status(400).json({
            message: err.message || "An error occurred during sign-in.",
            success: false,
            error: true,
        });
    }
}

module.exports = userSignInController;
