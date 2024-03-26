import { generateToken, jsonwebtokenConfig, verifyToken } from "../../utils/jsonwebtoken/index.js";
import User from "../models/users.js";

export const register = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user_exists = await User.findOne({ email }).exec();
        if (user_exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const user = await User.create({ name, email });
        const token = generateToken({ id: user._id, email: user.email});
        user.magicLinkToken = null;
        user.magicLinkExpiresAt = null;
        user.password = null;
        res.status(201).json({ 
            success: true, 
            data: user, 
            token 
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const loginRequest = async (req, res) => {
    try {
        const { email} = req.body;
        if(!email){
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await user.startLogginIn();
        const token = generateToken({ id: user._id, email: user.email });
        user.magicLinkToken = null;
        user.magicLinkExpiresAt = null;
        user.password = null;
        res.status(200).json({ success: true, token });
        
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}



export const verifyMagicLink = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("USER INFO : ", user);
        const isVerified = await user.verifyMagicToken(otp);
        if (!isVerified) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }
        user.magicLinkToken = null;
        user.magicLinkExpiresAt = null;
        user.password = null;
        const token = generateToken({ id: user._id, email: user.email });
        res.status(200).json({ success: true, data: user, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}



export const socialAuth = async (req, res) => {
    try {
        const { email, provider } = req.body;
        let user = await User.findOne({ email }).exec();
        if (!user) {
            // If user does not exist, create a new user with socialAuth
            user = await User.create({ email, socialAuth: { [provider]: true } });
            return res.status(201).json({ success: true, data: user });
        }
        if (!user.socialAuth[provider]) {
            // If user exists but does not have socialAuth for the provider, update the user
            user.socialAuth[provider] = true;
            await user.save();
        }
        user.magicLinkToken = null;
        user.magicLinkExpiresAt = null;
        user.password = null;
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


export const verifyJwtToken = async (req, res) => {
    try {
        const headers = req.headers.authorization.split(" ")[1];
        if(!headers){
            return res.status(400).json({ success: false, message: "Token not found" });
        }

        const decoded = await verifyToken(headers);
        const user = await User.findById(decoded.id).exec();
        // remove confidential data
        user.magicLinkToken = null;
        user.magicLinkExpiresAt = null;
        user.password = null;
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const newToken = generateToken({ id: user._id, email: user.email });
        res.status(200).json({ success: true, data: user, token: newToken });
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}
