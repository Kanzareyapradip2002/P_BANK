const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    const token = req.cookies?.token;

    // If no token is found, return an error response
    if (!token) {
      return res.status(200).json({
        message: "User Not Logged In",
        error: true,
        success: false,
      });
    }

    // Verify the token and extract the user ID
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        // If there's an error in token verification, return an error response
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      // If token is valid, extract user ID
      req.userId = decoded._id;

      // Fetch user details from the database
      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          error: true,
          success: false,
        });
      }

      // Return the user details if found
      res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "User details fetched successfully",
      });
    });
  } catch (err) {
    // Catch unexpected errors and send a response
    res.status(400).json({
      message: err.message || "An unexpected error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
