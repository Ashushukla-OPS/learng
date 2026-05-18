
const UserModel = require("../model/user.model");
const profilecontroller = async(req,res)=>{
    try{
     let user = req.user
     console.log(user);
     
     return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
    }
    catch (error) {
    console.log("Get profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal serverrr error",
    });
  }
}

const updateProfileController = async (req, res) => {
  try {
    const { userName, bio, email } = req.body;

    const user = req.user;

    if (userName !== undefined) {
      user.userName = userName;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (email !== undefined) {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }

      user.email = email;
    //   user.isVerified = false;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.log("Update profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error:error.message,
    });
  }
};

module.exports = {profilecontroller ,updateProfileController}