const User = require('../models/User');
const database = require('../../database/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { nickname, email, password } = req.body;

    try {
        const newUser = new User({
            nickname: nickname,
            email: email,
            password: await bcrypt.hash(password, 10)
        });

        await newUser.save();
        res.status(200).send({ message: 'Registration successful' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    try {
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
            res.status(200).send({ message: 'Login successful', token: token });

        } else {
            res.status(401).send({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const getUser = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    } res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    } res.status(200).json("User deleted successfully");
}

module.exports = {
    register,
    login,
    getUser,
    deleteUser,
}