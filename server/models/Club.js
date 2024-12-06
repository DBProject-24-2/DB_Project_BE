const db = require("../config/db");

class Club{
    //모든 클럽 조회
    static getAllClubs() {  
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM CLUB";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    //클럽 생성 
    static createClub({club_name, description, category, contact_email, contact_phone, club_sns}) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO CLUB (club_name, description, category, contact_email, contact_phone, club_sns)
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            const values = [club_name, description, category, contact_email, contact_phone, club_sns];

            db.query(query, values, (err, data) => {
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    // 클럽 조회
    static getClubById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM CLUB where club_id = ?;";
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    }
    //클럽 업데이트 
    static updateClubById(club_id, { club_name, description, category, contact_email, contact_phone, club_sns }) {
        return new Promise((resolve, reject)=>{
            const query = "UPDATE CLUB SET club_name = ?, description = ?, category = ?, contact_email = ?, contact_phone = ?, club_sns = ?  WHERE club_id = ?;"
            const values = [club_name, description, category, contact_email, contact_phone, club_sns];
            db.query(query, values, (err, data) =>{
                if(err) reject({err});
                resolve({data:data,sucess: "1",  message: 'Club updated successfully', updatedId: club_id });
            });
        });
    }
    //클럽 삭제
    static deleteClubById(club_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM CLUB WHERE club_id = ?";
            db.query(query, [club_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'Club deleted successfully', updatedId: club_id });
            });
        });
    }
    // 전체 클럽 멤버 조회
    static getClubMemberById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select U.username, U.email,U.phone, U.user_id, M.role, M.activity 
            from ajoucm.USER as U, ajoucm.CLUB as C, ajoucm.MEMBER as M 
            where U.user_id = M.user_id and C.club_id = M.club_id 
            and M.status = "승인"  and C.club_id=?;`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    //클럽 지원 멤버 조회
    static getClubApplicationMemberById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select U.username, U.email,U.phone, U.user_id, U.phone
            from ajoucm.USER as U, ajoucm.CLUB as C, ajoucm.MEMBER as M 
            where U.user_id = M.user_id and C.club_id = M.club_id 
            and M.status = "대기"  and C.club_id=?;`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    //클럽 이벤트 조회
    static getClubEventsById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select E.event_id, E.title, E.location, E.description, E.event_date  
            from ajoucm.CLUB as C, ajoucm.EVENT as E 
            where C.club_id = E.club_id and C.club_id=?`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    //클럽 모집공고 조회
    static getClubRecruitmentById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select R.recruitment_id, R.title, R.description, R.posted_date,R.deadline
            from ajoucm.CLUB as C, ajoucm.RECRUITMENT as R 
            where C.club_id = R.club_id and C.club_id=?`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    //멤버 승인
    static upadateApproveMember(club_id,user_id){
        return new Promise((resolve, reject)=>{
            const query = `UPDATE MEMBER SET status = '승인' WHERE club_id = ? and user_id = ?;`;
            db.query(query, [club_id, user_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    //현재 모집중인 클럽
}

module.exports = Club;