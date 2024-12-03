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

exports.getEventByEventId = async (req, res) => {
    const { event_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const event = await Event.getEventByEventId(event_id); // 모델 호출
        if (event) {
            res.status(200).json(event); // 이벤트 데이터 반환
        } else {
            res.status(404).json({ message: 'Club not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch event', error });
    }
    
};
exports.createEventByClubId = async (req, res) => {
    const { club_id } = req.params;
    const{title, location, description, event_date} = req.body;
    // 필수 필드가 모두 있는지 확인
    // if (!club_name || !leader_id || !description || !contact_email || !category) {
    //     return res.status(400).json({ message: 'All fields are required.' });
    // }
    try{
        const event = await Event.createEventByClubId(club_id, {title, location, description, event_date});
        res.status(201).json({ message: 'Event created successfully', eventId: event.insertId });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Database error.' });
    }
};
exports.updateEventByEventId = async (req, res) => {
    const { evnet_id } = req.params;
    const {title, location, description, event_date } = req.body;
    if (!title || !location || !description || !event_date ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const event = await Event.updateEventByEventId(evnet_id, {title, location, description, event_date });
        if (event.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ message: 'Event not found.' });
        }else if (event) {
            res.status(200).json(event); // 행사 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
exports.deleteEventByEventId = async (req, res) => {
    const { event_id } = req.params;
    try {
        const event = await Event.deleteEventByEventId(event_id);
        if (event.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ success: "0", message: 'Evnet not found.' });
        }else if (event) {
            res.status(200).json(event); // 행사 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};