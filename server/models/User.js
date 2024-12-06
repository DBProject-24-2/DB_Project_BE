const db = require("../config/db");

class User{
    //전체 유저 조회
    static getUsers() {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM USER";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    //유저 생성 
    static createUser({password, email, username, phone}) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO USER (password, eamil, username, phone)
                VALUES (?, ?, ?, ?);
            `;
            const values = [password, email, username, phone];

            db.query(query, values, (err, data) => {
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    //유저 조회
    static getUserByUserId(user_id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM USER where user_id = ?;";
            db.query(query, [user_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    }
    //유저 업데이트 
    static updateUserByUserId(user_id, {password, email, username, phone}) {
        return new Promise((resolve, reject)=>{
            const query = "UPDATE USER SET password = ?, email = ?, username = ?, phone = ? WHERE club_id = ?;"
            const values = [password, email, username,phone, user_id];
            db.query(query, values, (err, data) =>{
                if(err) reject({err});
                resolve({data:data,sucess: "1",  message: 'User updated successfully', updatedId: User_id });
            });
        });
    }
    //유저 삭제
    static deleteUserByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM USER WHERE user_id = ?";
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'User deleted successfully', updatedId: user_id });
            });
        });
        
    }
    //유저가 가입한 클럽
    static getUserClubByUserId(user_id){
        return new Promise((resolve, reject)=>{
                const query = `SELECT U.user_id, M.club_id, C.club_name
                from ajoucm.USER as U, ajoucm.MEMBER as M, ajoucm.CLUB as C
                where U.user_id = M.user_id and M.club_id = C.club_id and
                U.user_id = ? and M.status='승인' and 
                M.role='일반회원';`;
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve(data);
            });
        });
    }
    //유저가 지원한 클럽
    static getUserApplicatedClubByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = `SELECT U.user_id, M.club_id, C.club_name
            from ajoucm.USER as U, ajoucm.MEMBER as M, ajoucm.CLUB as C
            where U.user_id = M.user_id and M.club_id = C.club_id and
            U.user_id = ? and M.status="대기" and 
            M.role="일반회원";`;
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve(data);
            });
        });
    }
    //유저가 관리하는 클럽
    static getManagementClubByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = `SELECT U.user_id, M.club_id, C.club_name
            from ajoucm.USER as U, ajoucm.MEMBER as M, ajoucm.CLUB as C
            where U.user_id = M.user_id and M.club_id = C.club_id and
            U.user_id = ? and (M.role="임원" OR M.role ="회장");`;
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve(data);
            });
        });
    }
    
}

module.exports = User;