import { User } from '../models/user.model.js';
import { asyncHandeller } from "../utils/asyncHandeller.js";


const userLogin = asyncHandeller(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const token = await existingUser.generateToken();
    res.status(200).json({
        token
    });
}
);

const userSignup = asyncHandeller(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
    const newUser = new User({
        name,
        email,
        password
    });
    await newUser.save();
    const token = await newUser.generateToken();
    res.status(200).json({
        token
    });
});



export { userLogin, userSignup }