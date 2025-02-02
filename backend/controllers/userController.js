import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import validator from "validator"; 

export const loginUser = async (req, res) => {
    // Your login logic here
   
        const {email,password}=req.body;
        try{
            const user = await userModel.findOne({email});
            if(!user){
                return res.json({success:false,message:"use dont exist"})
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.json({success:false,message:"invalid credentials"})
            }
            const token = createToken(user._id);
            res.json({success:true,token})
        }
        catch(error){
        console.log(error);
    res.json({success:false,message:"dobinid"})}

    }


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

export const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        // Return the user data and token (excluding the password)
        res.json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during registration" });
    }
}
