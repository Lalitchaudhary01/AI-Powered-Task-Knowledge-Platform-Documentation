import userModel from "../models/user.model"

export const register = async (req, res)=> {
    const { name, email, password, confirmPassword, otp } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        const newUser = new userModel({ name, email, password, otp, otpExpiry });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}