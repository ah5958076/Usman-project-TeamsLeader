const User = require("../modals/users");
const moment = require("moment");




const updateUserStatusMiddleware = async (req, res, next) => {
  try {
    const users = await User.find(); // Find all users
    const currentDate = new Date();
    for (const user of users) {
      // Check if user has a trial end date
      if (user.trialEndsAt) {
        // If the trial end date is in the past, set the status to "inactive"
        if (moment(user.trialEndsAt).isSameOrBefore(currentDate)) {
          user.status = "inactive";
          await user.save();
        }
      }
    }

    next();
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { updateUserStatusMiddleware };
