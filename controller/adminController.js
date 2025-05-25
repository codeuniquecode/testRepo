const admin = require("../model/adminSchema");

const fs = require('fs');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const contact = require("../model/contactSchema");
const activity = require("../model/activitySchema");
const bank = require("../model/bankInfoSchema");
const setting = require('../model/settingSchema');
exports.renderLoginPage = (req,res)=>{
    // return res.status(200).json({message:"load login page"});
    return res.render('login');
}
exports.validateAdmin= async(req,res)=>{
    const {email,password} = req.body;
     if(!email || !password){
        return res.status(404).json({message:"enter all credentials"});
    }
    try {
        const validAdmin = await admin.findOne({
        email
    });
    if(!validAdmin){
        return res.status(404).json({message:"invalid email"});
    }
    const validPassword = await bcrypt.compare(password,validAdmin.password);
    if(!validPassword){
        return res.status(404).json({message:"invalid password"});
    }
    const token = jwt.sign({id:validAdmin._id},process.env.SECRETKEY,{
                expiresIn:'1d'
            });
            res.cookie("token", token,{
                maxAge:24*60*60*1000
            });
            // return res.status(200).json({message:"admin logged in"});
            return res.redirect('/adminDashboard');


    } catch (error) {
        console.log('error in validating admin',error);
    }

    
}
exports.renderRegisterPage=(req,res)=>{
    
    return res.status(200).json({message:"load register page"});
}
exports.saveAdmin = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(404).json({message:"enter all credentials"});
    }
    const hashedPassword = await bcrypt.hash(password,1);
    try{
        const adminData = new admin({
            email,
            password:hashedPassword
        });
        await adminData.save();
        if(adminData){
            return res.status(201).json({message:"admin registered"});
        }
        else{
            return res.status(404).json({message:"failed to save admin"});
        }
    }
    catch(e){
        // return res.status(404).json({message:"error in regstering admin"});
        console.log('error in registering admin');
    }
}

exports.renderAdminDashboard = async(req,res)=>{
    // return res.status(200).status({message:"render admin dashboard"});
    const contacts = await contact.find({isRead:false});
    const totalContacts = contacts.length;
    const activities = await activity.find();
    const totalActivity = activities.length;
    return res.render('adminDashboard',{totalContacts,totalActivity});
}
exports.logout = (req,res)=>{
    res.clearCookie('token');
    res.redirect('/login');
}
exports.handleContact = async(req,res)=>{
    const {name,email,phone,subject,message}= req.body;
    if(phone.length!=10){
        return res.status(404).json({message:"phone number must be of 10 digits"});
    }
    try {
        const saveContact = new contact({
            name, email, phone, subject,message
        });
        await saveContact.save();
        if(saveContact){
            return res.status(201).json({message:"contact info saved"});
        }
        else{
            return res.status(404).json({message:"failed to save handle contacts"});
        }
    } catch (error) {
        console.log('error in handeling contact details');
    }
}

exports.renderAllContacts=async(req,res)=>{
        const contactInfo = await contact.find({
            isRead:false
        });
        return res.render('contacts',{contactInfo});
}
exports.markAsRead = async(req,res)=>{
    const _id = req.params.id;
    // console.log(_id);
     const updateInfo = await contact.findByIdAndUpdate(_id,{isRead:true});
     if(updateInfo){
        return res.redirect('/contacts');
     }
     else{
        return res.status(404).json({message:"error in marking as read"});
     }
}

exports.renderActivity = async(req,res)=>{
    const activityData = await activity.find();
    return res.render('activity',{activityData});
}
exports.renderAddActivityPage = (req,res)=>{
    return res.render('addActivity');
}
exports.addActivity = async(req,res)=>{
    const {title,description}= req.body;
    try {
        const newActivity = new activity({
        title,
        description,
        image:req.file.filename
    });
    await newActivity.save();
    if(newActivity){
        // return res.status(201).json({message:"new activity created"});
        return res.redirect('/viewActivity');
    }
    else{
        return res.status(404).json({message:"error in saving activity"})
    }
    } catch (error) {
        console.log('error in saving activityy',error);
    }
}
exports.deleteActivity = async(req,res)=>{
    const _id = req.params.id;
    const deleteActivity = await activity.findByIdAndDelete(_id);
    if(deleteActivity){
        return res.redirect('/viewActivity');
    }
    else{
        return res.status(404).json({message:"error in deleting activity"});
    }
}
exports.renderEditActivity = async(req,res)=>{
    const _id = req.params.id;
    const activityData = await activity.findOne({_id});
    console.log(activityData);
    if(!activityData){
        return res.status(404).json({message:"error in deleting activity"});
    }
    return res.render('editActivity',{activityData});
}
exports.updateActivity = async(req,res)=>{
    const _id = req.params.id;
    //   console.log(req.body);
    // return;
    const {title,description} = req.body;
  
    const oldData = await activity.findOne({_id});

   if(req.file){
            fileUrl = req.file.filename
            const oldImage =  oldData.image;
            //purano file delete garne
            fs.unlink('storage/'+oldImage ,(err)=>{
                if(err){
                    console.log('error happened');
                }
                else{
                    console.log('old image deleted successfully');
                }
            })
        }
        else{
            fileUrl = oldData.image
        }
        const update = await activity.findByIdAndUpdate(_id,{
            title,
            description,
            image:fileUrl
        });
        if(update){
            return res.redirect('/viewActivity');
        }
        else{
            return res.status(404).json({message:"error in updating activity"});
        }
}
exports.renderAccountPage = async(req,res)=>{
    const updated = await bank.findOne();
    return res.render('account',{updated});
}
exports.updateAccountInfo = async (req, res) => {
  const { bankName, branchInfo, accountName, accountNumber } = req.body;

  try {
    const updated = await bank.findOneAndUpdate({}, {
      bankName,
      branchInfo,
      accountName,
      accountNumber
    }, { new: true });

    if (updated) {
        return res.render('account',{updated})
    } else {
      return res.status(404).json({ message: "Bank info not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error updating bank info", error: err.message });
  }
};

// const SiteSettings = require('../models/siteSettings');
// const setting = require("../model/settingSchema");

exports.renderSettings = async (req, res) => {
  try {
    // Check if settings already exist
    let site = await setting.findOne();

    // // If not, create default settings
    // if (!site) {
    //   site = await setting.create({
    //     siteName: "Ashish Social Service",
    //     tagline: "Empowering Communities Together",
    //     email: "contact@ashishservice.org",
    //     phone: "+977-9800000000",
    //     address: "Old Baneshwor, Kathmandu, Nepal",
    //     facebook: "https://facebook.com/ashishsocial",
    //     instagram: "https://instagram.com/ashishsocial",
    //     footer: "© 2025 Ashish Social Service. All rights reserved."
    //   });
    // }

    // Render the view and pass the settings
    return res.render('siteSettings', { site });

  } catch (error) {
    console.error("Error rendering settings:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.updateSettings=async(req,res)=>{
     try {
    const data = {
      siteName: req.body.siteName,
      tagline: req.body.tagline,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      footer: req.body.footer,
      updatedAt: new Date()
    };

    // Update the existing document, or insert if none exists
    await setting.findOneAndUpdate({}, data, {
      new: true,
      upsert: true
//       upsert: true
// If no matching document is found, then create a new one using data.

// "Upsert" = "Update" + "Insert".
    });

    res.redirect('/setting'); // Redirect back to settings page
  } catch (error) {
    console.error("Error updating site settings:", error);
    res.status(500).send("Failed to update site settings.");
  }
}