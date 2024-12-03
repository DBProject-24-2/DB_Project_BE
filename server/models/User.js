const db = require("../config/db");

class User{
    static getUsers() {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM USER";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    static createUser({password, email, name}) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO USER (password, eamil, name)
                VALUES (?, ?, ?);
            `;
            const values = [password, email, name];

            db.query(query, values, (err, data) => {
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    static getUserByUserId(user_id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM USER where user_id = ?;";
            db.query(query, [user_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    }
    static updateUserByUserId(user_id, {password ,email ,name}) {
        return new Promise((resolve, reject)=>{
            const query = "UPDATE USER SET password = ?, email = ?, name = ?WHERE club_id = ?;"
            const values = [password, email, name, user_id];
            db.query(query, values, (err, data) =>{
                if(err) reject({err});
                resolve({data:data,sucess: "1",  message: 'User updated successfully', updatedId: User_id });
            });
        });
    }
    static deleteUserByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM USER WHERE user_id = ?";
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'User deleted successfully', updatedId: user_id });
            });
        });
        
    }
    static getUserClubByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = `SELECT U.user_id, M.club_id, C.club_name
            from ajoucm.USER as U, ajoucm.MEMBER as M, ajoucm.CLUB as C
            where U.user_id = M.user_id and M.club_id = C.club_id and
            U.user_id = ? and M.status="승인" and 
            M.role="부원";`;
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve(data[0]);
            });
        });
    }
    static getUserApplicatedClubByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = `SELECT U.user_id, M.club_id, C.club_name
            from ajoucm.USER as U, ajoucm.MEMBER as M, ajoucm.CLUB as C
            where U.user_id = M.user_id and M.club_id = C.club_id and
            U.user_id = ? and M.status="대기" and 
            M.role="부원";`;
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve(data[0]);
            });
        });
    }
    static getManagementClubByUserId(user_id){
        return new Promise((resolve, reject)=>{
            const query = `SELECT U.user_id, M.club_id, C.club_name
            from ajoucm.USER as U, ajoucm.MEMBER as M, ajoucm.CLUB as C
            where U.user_id = M.user_id and M.club_id = C.club_id and
            U.user_id = ? and M.role="임원진";`;
            db.query(query, [user_id], (err, data) =>{
                if(err) reject({err});
                resolve(data[0]);
            });
        });
    }
    
}

module.exports = User;