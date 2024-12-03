const express = require('express');
const userCtrl = require('../controllers/userController');

const router = express.Router();

// 사용자 API
 router.get('/', userCtrl.getUsers);   // 모든 사용자 조회
//
router.get('/:user_id', userCtrl.getUserByUserId); // 내 정보 조회
router.post('/', userCtrl.createUser); // 사용자 추가
router.put('/:user_id', userCtrl.updateUserByUserId); // 내 정보 수정
router.delete('/:user_id', userCtrl.deleteUserByUserId); // 유저 삭제
router.get('/:user_id/clubs',userCtrl.getUserClubByUserId); // 가입한 클럽
router.get('/:user_id/applicatedclubs', userCtrl.getUserApplicatedClubByUserId); // 가입 신청 클럽
router.get('/:user_id/managementclubs', userCtrl.getManagementClubByUserId) // 임원진으로 있는 클럽
//동아리 가입신청

module.exports = router;
