const express = require('express');
const clubCtrl = require('../controllers/clubController');

const router = express.Router();

// 클럽 API
router.get('/', clubCtrl.getClubs);    // 모든 클럽 조회
router.get('/:club_id', clubCtrl.getClubById); // 예: GET /api/clubs/1
router.post('/', clubCtrl.createClub); // 클럽 추가
router.put('/:club_id', clubCtrl.updateClubById); // 클럽 내용 수정
router.delete('/:club_id', clubCtrl.deleteClubBYId); // 클럽 삭제
router.get('/:club_id/member', clubCtrl.getClubs); // 특정 클럽 회원 정보
router.get('/:club_id/waitingMember', clubCtrl.getClubs); //승인 대기중인 멤버
router.get('/:club_id/:user_id/application', (req, res) => { // 지원서 열람
    res.send('Welcome to the Club application API!');
});



module.exports = router;
