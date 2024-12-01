const Event = require('../models/Event');

//행사 API
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
};

exports.getEventById = async (req, res) => {
    const { event_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const event = await Event.getEventById(event_id); // 모델 호출
        if (event) {
            res.status(200).json(event); // 이벤트 데이터 반환
        } else {
            res.status(404).json({ message: 'Club not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch event', error });
    }
    
};
exports.createEvent = async (req, res) => {

};
exports.updateEventBYId = async (req, res) => {

};
exports.deleteEventBYId = async (req, res) => {

};