import User from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import { hashPassword } from '../helpers/authHelper.js';
import { comparePassword } from '../helpers/authHelper.js';
export const registerController = async (req, res) => {

    try {

        const { name, email, password, phone, address, answer } = req.body;

        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({ message: 'Please enter all fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword, phone, address, answer });
        await user.save();

        await user.save();
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            user: user

        });


    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error registering user' });
    }

}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Please enter all fields' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'User does not exist' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = await JWT.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role

            }, token
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error logging in user' });
    }

}

export const forgotPasswordController = async (req, res) => {
    try {

        const { email, answer, newPassword } = req.body;
        if (!email || !answer || !newPassword) {
            return res.status(400).send({ message: 'Please enter all fields' });
        }

        const user = await User.findOne({
            email,
            answer
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const hashedPassword = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.status(200).send({
            success: true,
            message: 'Password reset successful'
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send(
            {
                success: false,
                message: 'Error resetting password',
                error
            }
        );
    }
}

