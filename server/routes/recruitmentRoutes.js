const express = require('express');
const recruitmentCtrl = require('../controllers/recruitmentController');

const router = express.Router();

//모집공고 API
router.get('/', recruitmentCtrl.getRecruitments); // 모든 모집공고 조회
router.get('/:club_id', recruitmentCtrl.getRecruitmentById); //특정 모집공고 상세 조회
router.post('/:club_id', recruitmentCtrl.createRecruitment); //모집공고 생성
router.put('/:recruitment_id', recruitmentCtrl.updateRecruitmentById ); // 모집공고 수정
router.delete('/:recruitment_id' ,recruitmentCtrl.deleteRecruitmentById); // 모집공고 제거

module.exports = router;
