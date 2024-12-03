const express = require('express');
const eventCtrl = require('../controllers/eventController');

const router = express.Router();


// 행사 API
router.get('/', eventCtrl.getEvents); //모든 이벤트 조회
router.get('/:event_id', eventCtrl.getEventByEventId); // 이벤트 상세
router.post('/:club_id', eventCtrl.createEventByClubId); // 해당 클럽 이벤트 추가
router.put('/:event_id', eventCtrl.updateEventByEventId); // 이벤트 내용 수정
router.delete('/:event_id', eventCtrl.deleteEventByEventId); // 이벤트 삭제

module.exports = router;