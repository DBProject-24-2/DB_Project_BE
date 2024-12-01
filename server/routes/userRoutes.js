const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// 사용자 API
router.get('/', getUsers);    // 모든 사용자 조회
router.post('/', createUser); // 사용자 추가

module.exports = router;
