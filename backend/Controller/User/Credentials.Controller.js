const UserCredentials = require('../../Models/User/User.credentials.js');
const UserDetails = require('../../Models/User/User.details.js');
const upload = require('../../Middlewares/multer.js'); // Multer setup
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require("../../Utils/cloudinary.js");


// Define the fields for multer
const uploadMiddleware = upload.fields([
    { name: 'ProfilePic', maxCount: 1 }, // Single profile picture
]);
const registerHandler = async (req, res) => {
    // Wrap multer in the function
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            // Handle multer errors
            console.log(err);
            return res.status(400).send({ message: 'File upload error', error: err.message });
        }
        const result = await cloudinary.uploader.upload(req.files.ProfilePic[0].path,{
            width: 176, 
            height: 176, 
            crop: "fill",
            quality: "auto:best",  // Balances quality and file size
            fetch_format: "auto",  // Converts to WebP or best format
            flags: "progressive",
        });
        try {
            // Extract form data from req.body
            const {
                FirstName,
                MiddleName,
                LastName,
                Email,
                Gender,
                Department,
                Year,
                RollNumber,
                Phone,
                Skills,
                Password,
                Resume,
            } = req.body;
            // Check if the user already exists
            // console.log(FirstName)
            const user = await UserDetails.findOne({ RollNumber });
            if (user) {
                console.log("user exist");
                return res.status(500).send("This email is already registered");
            }
            
            // Extract uploaded file paths from req.files
            const ProfilePic = result.url;
            const ProfilePicPublicId = result.public_id;
            // Create user details
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(Password,salt,async (err,hash)=>{
                    let createdUser = await UserDetails.create({
                        FirstName,
                        MiddleName,
                        LastName,
                        Email,
                        Gender,
                        Department,
                        Year,
                        RollNumber,
                        Phone,
                        Skills,
                        ProfilePicPublicId,
                        ProfilePic, // Save the profile picture path
                        Resume      // Save the resume path
                    });
        
        
                    // Create user credentials
                    const createdCredentials = await UserCredentials.create({
                        Loginid: RollNumber, // Generate Loginid dynamically
                        Password : hash
                    });
                    // console.log('User credentials:', createdCredentials);
                    const data = createdUser;
                    return res.json(data);
                })
            })
        } catch (error) {
            console.log('Error during registration:', error);
            return res.status(500).send("An error occurred while registering the user");
        }
    });
};

const loginHandler = async(req,res)=>{
    
    const {Loginid,Password} = req.body;

    const user = await UserCredentials.findOne({Loginid});
    if(!user)
    {
        console.log("user not exist");
        return res
            .status(400)
            .json({ success: false, message: "User not exist" });
    }
    else
    {
        bcrypt.compare(Password,user.Password, async function(err, result) {
            if(result)
            {
                const data = await UserDetails.findOne({RollNumber:Loginid})
                return res.json(data);
            }
            else
            {
                return res
                .status(400)
                .json({ success: false, message: "Wrong Password" });
            }
        });
    }
};

const changePassword = async(req,res)=>{
    const{token,newPassword} = req.body;
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        const {Loginid} = decoded;
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newPassword,salt,async (err,hash)=>{
                try {
                    const user = await UserCredentials.findOne({Loginid});
                    user.Password = hash;
                    await user.save();
                    return res.json({sucess:true});
                } catch (error) {

                    return res.json({sucess:false});
                }
            })
        })
      });
    
}

module.exports = { registerHandler,loginHandler,changePassword };
