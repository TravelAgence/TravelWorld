import User from '../models/User.js'



export const createAdminAccount = async () => {
  try {
    // Check if an admin account already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("adminpassword", salt); // Replace with a secure password

    // Create the admin account
    const admin = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
      activationCode: null,
    });

    await admin.save();
    console.log("Admin account created successfully.");
  } catch (err) {
    console.error("Error creating admin account:", err);
  }
};


// create new User
export const createUser = async (req, res) => {

    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save() 

        res 
        .status(200)
        .json({
            success: true,
            message: 'User created successfully',
            data: savedUser,
        })
    }catch (err) {
        res
      .status(500)
      .json({
        success: false,
        message: "Failed to create. Try again",
      })
    }
} 


// update User
export const updateUser = async (req, res) => {

  const id=req.params.id

  try{
    const updatedUser = await User.findByIdAndUpdate(id,
      {
        $set : req.body
      }, {new: true})

      res 
        .status(200)
        .json({
            success: true,
            message: 'Successfully updated User', 
            data: updatedUser,
        })

  }catch(err){
    res
     .status(500)
     .json({
        success: false,
        message: "Failed to update.",
      })
  }
}

// delete User
export const deleteUser = async (req, res) => {
  const id=req.params.id

  try{
     await User.findByIdAndDelete(id)

      res 
        .status(200)
        .json({
            success: true,
            message: 'Successfully deteled', 
        })

  }catch(err){
    res
     .status(500)
     .json({
        success: false,
        message: "Failed to update.",
      })
  }
}

// getSingle User
export const getSingleUser = async (req, res) => {
  const id=req.params.id

  try{
     const user = await User.findById(id)

      res 
        .status(200)
        .json({
            success: true,
            message: 'Successfull', 
            data: user
        })

  }catch(err){
    res
     .status(404)
     .json({
        success: false,
        message: "Not found",
      })
  }
}

// geetAllUser User 
export const getAllUser = async (req, res) => {

  try{

    const users = await User.find({})

    res.status(200).json({
      success: true,
      message: 'Successfull', 
      data: users
    })
  }catch(err){
    res.status(404)
    .json({
       success: false,
       message: "Not found",
     })
  }
}