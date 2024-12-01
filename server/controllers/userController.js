const User = require('../models/User');

// 모든 사용자 조회
exports.getUsers = async (req, res) => {
    try {
        const users = await User.getUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
};

// 사용자 추가
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
};
