const UserCredentials = require('../../Models/User/User.credentials.js');
const UserDetails = require('../../Models/User/User.details.js');
const upload = require('../../Middlewares/multer.js'); // Multer setup
const path = require('path');
const fs = require("fs");
const cloudinary = require("../../Utils/cloudinary.js");
const sort = require('fast-sort');
const { removeAllListeners } = require('process');

const uploadMiddleware1 = upload.fields([
    { name: 'imageFile', maxCount: 1 }, // Single profile picture
]);
const filterUser = async(req,res)=>{
    const {department,year, skills, gender} = req.body;

    try{
        const query = {};

        if (department!="" && department!="All") {
            query.Department = department;
        }
        if (year!="" && year!="All") {
            query.Year = year;
        }
        if (gender!="" && gender!="All") {
            query.Gender = gender;
        }
        if (skills && skills.length > 0) {
            query.Skills = { $in: skills }; // Reference `skills` from request body
        }
        // Find users matching the query
        const users = await UserDetails.find(query);
        // console.log(typeof(users))
        const arr = [];
        users.forEach(user => {
            var match = 0;
            for(var skill in skills)
            {
                for(var key in user.Skills)
                {
                    if(user.Skills[key]===skills[skill])
                        match = match+1;
                }
            }
            arr.push({user,match});
        });

        arr.sort((a,b)=> b.match - a.match);
        const sortedUsers = [];
        arr.forEach(ele=>{
            sortedUsers.push(ele.user);
        })

        // console.log(sortedUsers);

        return res.status(200).json(sortedUsers);
    }catch(err){
        console.log(err);
    }

    // console.log(users);
}

const viewProfile = async(req,res)=>{
    try{
        const {RollNumber} = req.body;
        const user = await UserDetails.findOne({RollNumber});
        return res.status(200).json(user);
    }
    catch(err)
    {
        console.log(err);
    }
    
}

const Update = async(req,res)=>{
    try{
        const {
            FirstName,
            MiddleName,
            LastName,
            Email,
            Gender,
            Department,
            Year,
            Phone,
            Skills,
            Resume,
        } = req.body.formData;
        
        const RollNumber = req.body.RollNumber;
        // console.log(req.body);
       const UpdatedUser = await UserDetails.updateOne({RollNumber},{
        $set: {
          FirstName,
          MiddleName,
          LastName,
          Email,
          Gender,
          Department,
          Year,
          Phone,
          Skills,
          Resume,
        },
      });
      const data = {...req.body.formData,RollNumber};
       return res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}
const ToggleStatus = async(req,res)=>{
    
    // console.log("req aya hai")
    const {RollNumber} = req.body;
    try {
        const user = await UserDetails.findOne({RollNumber});
        user.Status = !user.Status;
        await user.save();

        res.status(200).json(user.Status);
    } catch (error) {
        
    }
}

const changeProfile = async(req,res)=>{

    uploadMiddleware1(req, res, async (err) => {
        if (err) {
            // Handle multer errors
            console.log(err);
            return res.status(400).send({ message: 'File upload error', error: err.message });
        }
        const result = await cloudinary.uploader.upload(req.files.imageFile[0].path,{
            width: 176, 
            height: 176, 
            crop: "fill",
            quality: "auto:best",  // Balances quality and file size
            fetch_format: "auto",  // Converts to WebP or best format
            flags: "progressive",
        });
        const ProfilePic = result.url;
        const ProfilePicPublicId = result.public_id;

        const user = await UserDetails.findOne({RollNumber:req.body.RollNumber});
        // console.log(user)
        const oldPath = user.ProfilePicPublicId;
        user.ProfilePic = ProfilePic;
        user.ProfilePicPublicId = ProfilePicPublicId;

        await user.save();

        await cloudinary.uploader.destroy(oldPath);
        return res.json(ProfilePic);
    })
}

const activeUsers = async(req,res)=>{
    const users = await UserDetails.find({Status : true}).limit(10);
    return res.status(200).json(users);
}

const deleteProfile = async(req,res)=>{

    const user = await UserDetails.findOne({RollNumber:req.body.RollNumber});
    if(user)
    {
        const oldPath = user.ProfilePicPublicId;
        await cloudinary.uploader.destroy(oldPath);
        await UserDetails.findOneAndDelete({RollNumber:req.body.RollNumber});
        await UserCredentials.findOneAndDelete({RollNumber:req.body.RollNumber});
        const data = true;
        return res.json(data);
    }
    else
    {
         const data = true;
        return res.json(data);
    }
}

module.exports = {filterUser,viewProfile,Update,ToggleStatus,changeProfile,activeUsers,deleteProfile};