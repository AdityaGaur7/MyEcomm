import User from '../models/userModel.js';

import { hashPassword } from '../helpers/authHelper.js';
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
            status: 'success',
            message: 'User created successfully',
            data: user

        });


    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error registering user' });
    }

}


const loginController = (req, res) => {
    res.send('Login');
}

export { registerController, loginController };