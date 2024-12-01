const Club = require('../models/Club');

const validCategories = [
    '과학기술분과', '레저스포츠분과', '사회활동분과', '연행예술분과', '종교분과',
    '창작전시분과', '체육분과', '학술언론분과', '준동아리'
];
//클럽 API
// 모든 클럽 조회
exports.getClubs = async (req, res) => {
    try {
        const clubs = await Club.getAllClubs();
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch clubs', error });
    }
};
//클럽 상세 조회
exports.getClubById = async (req, res) => {
    const { club_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const club = await Club.getClubById(club_id); // 모델 호출
        if (club) {
            res.status(200).json(club); // 클럽 데이터 반환
        } else {
            res.status(404).json({ message: 'Club not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch club', error });
    }
    
};
//클럽 생성
exports.createClub = async (req, res) => {
    const{club_name, leader_id, description, contact_email, category} = req.body;
    // 필수 필드가 모두 있는지 확인
    if (!club_name || !leader_id || !description || !contact_email || !category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category. Please choose from: 과학기술분과, 레저스포츠분과, 사회활동분과, 연행예술분과, 종교분과, 창작전시분과, 체육분과, 학술언론분과, 준동아리.' });
    }
    try{
        const club = await Club.createClub({club_name, leader_id, description, contact_email, category});
        res.status(201).json({ message: 'Club created successfully', clubId: club.insertId });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Database error.' });
    }
};
//클럽 내용 수정
exports.updateClubById = async (req, res) => {
    const { club_id } = req.params;
    const { club_name, leader_id, description, contact_email, category } = req.body;
    if (!club_name || !leader_id || !description || !contact_email || !category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category. Please choose from: 과학기술분과, 레저스포츠분과, 사회활동분과, 연행예술분과, 종교분과, 창작전시분과, 체육분과, 학술언론분과, 준동아리.' });
    }
    try {
        const club = await Club.updateClubById(club_id, { club_name, leader_id, description, contact_email, category });
        if (club.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ message: 'Club not found.' });
        }else if (club) {
            res.status(200).json(club); // 클럽 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
//클럽 삭제
exports.deleteClubBYId = async (req, res) => {
    const { club_id } = req.params;
    try {
        const club = await Club.deleteClubBYId(club_id);
        if (club.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ success: "0", message: 'Club not found.' });
        }else if (club) {
            res.status(200).json(club); // 클럽 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};





