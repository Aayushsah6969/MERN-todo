import User from '../model/user.model.js';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import { generateTokenANdsaveinCookies } from '../jwt/token.js';

// User Schema Validation using Zod
const UserSchema = z.object({
    email: z.string().email({message:"Invalid Email address"}),
    username: z.string().min(3,{message:"Username must be atleast 3 characters"}),
    password: z.string().min(6,{message:"Password must be atleast 6 characters"})   
})

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const valid = UserSchema.safeParse({ email, username, password });
        if (!valid.success) {
            return res.status(400).json({ message: valid.error.message });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        if (newUser) {
            const token = await generateTokenANdsaveinCookies(newUser._id, res);
            return res.status(201).json({ message: 'User registered successfully', newUser, token });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateTokenANdsaveinCookies(user._id, res);
        return res.status(200).json({ message: 'User logged in successfully', token });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const logOut=(req, res)=>{
    try {
        res.clearCookie("jwt",{
            path:'/',
        })
        res.status(200).json({ message: "User logged out successfully"})
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}