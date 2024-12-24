import User from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import { hashPassword } from '../helpers/authHelper.js';
import { comparePassword } from '../helpers/authHelper.js';
const registerController = async (req, res) => {

    try {

        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({ message: 'Please enter all fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword, phone, address });
        await user.save();

        await user.save();
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            data: user

        });


    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error registering user' });
    }

}


const loginController = async (req, res) => {
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
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address

            }, token
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error logging in user' });
    }

}

export { registerController, loginController };