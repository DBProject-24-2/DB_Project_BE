const Recruitment = require('../models/Recruitment');

// 공지사항 API
exports.getRecruitments = async (req, res) => {
    try {
        const recruitment = await Recruitment.getRecruitments();
        res.status(200).json(recruitment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recruitments', error });
    }
};

exports.getRecruitmentById = async (req, res) => {
    const { recruitment_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const recruitment = await Recruitment.getRecruitmentById(recruitment_id); // 모델 호출
        if (recruitment) {
            res.status(200).json(recruitment); // 이벤트 데이터 반환
        } else {
            res.status(404).json({ message: 'recruitment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recruitment', error });
    }
    
};
exports.createRecruitmentById = async (req, res) => {
    const { club_id } = req.params;
    const{description, deadline} = req.body;
    if (!description || !deadline ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try{
        const recruitment = await Recruitment.createRecruitmentById(club_id, {description, deadline});
        res.status(201).json({ message: 'recruitment created successfully', recruitmentId: recruitment.insertId });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Database error.' });
    }
};
exports.updateRecruitmentById = async (req, res) => {
    const { recruitment_id } = req.params;
    const {description, deadline} = req.body;
    if (!description || !deadline ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const recruitment = await Recruitment.updateEventByEventId(recruitment_id, {description, deadline});
        if (recruitment.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ message: 'recruitment not found.' });
        }else if (recruitment) {
            res.status(200).json(recruitment); // 행사 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
exports.deleteRecruitmentById = async (req, res) => {
    const { recruitment_id } = req.params;
    try {
        const recruitment = await Recruitment.deleteEventByEventId(recruitment_id);
        if (recruitment.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ success: "0", message: 'recruitment not found.' });
        }else if (recruitment) {
            res.status(200).json(recruitment); // 행사 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};