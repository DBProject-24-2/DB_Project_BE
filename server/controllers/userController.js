const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const user = await User.getUsers();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
};
//유저 상세 조회
exports.getUserByUserId = async (req, res) => {
    const { user_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const user = await User.getUserByUserId(user_id); // 모델 호출
        if (user) {
            res.status(200).json(user); // 클럽 데이터 반환
        } else {
            res.status(404).json({ message: 'Club not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
    
};
//유저 생성 
exports.createUser = async (req, res) => {
    const{password, email, username, phone} = req.body;
    // 필수 필드가 모두 있는지 확인
    if (!password || !email || !username || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    
    try{
        const user = await User.createUser({password, email, username, phone});
        res.status(201).json({ message: 'User created successfully', userId: user.insertId });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Database error.' });
    }
};
//유저 업데이트 
exports.updateUserByUserId = async (req, res) => {
    const { user_id } = req.params;
    const{password, email, username, phone} = req.body;
    if (!password || !email || !username ||!phone) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const user = await User.updateUserByUserId(user_id, {password, email, username, phone});
        if (user.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ message: 'User not found.' });
        }else if (user) {
            res.status(200).json(user); // 클럽 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
//유저 삭제
exports.deleteUserByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await User.deleteUserByUserId(user_id);
        if (user.data.affectedRows === 0) {
            // 조건에 맞는 데이터가 없는 경우
            return res.status(404).json({ success: "0", message: 'User not found.' });
        }else if (user) {
            res.status(200).json(user); // 클럽 데이터 반환
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}
 exports.getUserClubByUserId = async (req, res) => {
        const { user_id } = req.params; // URL에서 유저 ID 추출
        try {
            const user = await User.getUserClubByUserId(user_id); // 모델 호출
            if (user) {
                res.status(200).json(user); // 클럽 데이터 반환
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch user', error });
        }
};
exports.getUserApplicatedClubByUserId = async (req, res) => {
    const { user_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const user = await User.getUserApplicatedClubByUserId(user_id); // 모델 호출
        if (user) {
            res.status(200).json(user); // 클럽 데이터 반환
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
};
exports.getManagementClubByUserId = async (req, res) => {
    const { user_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const user = await User.getManagementClubByUserId(user_id); // 모델 호출
        if (user) {
            res.status(200).json(user); // 클럽 데이터 반환
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
};
exports.getUserApplicationById = async (req, res) => {
    const { club_id, user_id } = req.params; // URL에서 클럽 ID 추출
    try {
        const user = await User.getUserApplicationById(club_id, user_id); // 모델 호출
        if (user) {
            res.status(200).json(user); // 클럽 데이터 반환
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
}; 

