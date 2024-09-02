import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Todo } from "./todo.model.js";
import jwt from "jsonwebtoken";





const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: true
    },
    todo_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] 
});


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
}



userSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });

        this.tokens = this.tokens.concat({ token });
        await this.save();

        return token;
    } catch (error) {
        console.error(error);
    }
};


export const User = mongoose.model("User", userSchema);


