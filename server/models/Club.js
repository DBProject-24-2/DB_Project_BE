const db = require("../config/db");

class Club{
    static getAllClubs() {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM CLUB";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    static createClub({club_name, leader_id, description, contact_email, category}) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO CLUB (club_name, leader_id, description, contact_email, category)
                VALUES (?, ?, ?, ?, ?);
            `;
            const values = [club_name, leader_id, description, contact_email, category];

            db.query(query, values, (err, data) => {
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    static getClubById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM CLUB where club_id = ?;";
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    }
    static updateClubById(club_id, { club_name, leader_id, description, contact_email, category }) {
        return new Promise((resolve, reject)=>{
            const query = "UPDATE CLUB SET club_name = ?, leader_id = ?, description = ?, contact_email = ?, category = ? WHERE club_id = ?;"
            const values = [club_name, leader_id, description, contact_email, category, club_id];
            db.query(query, values, (err, data) =>{
                if(err) reject({err});
                resolve({data:data,sucess: "1",  message: 'Club updated successfully', updatedId: club_id });
            });
        });
    }
    static deleteClubById(club_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM CLUB WHERE club_id = ?";
            db.query(query, [club_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'Club deleted successfully', updatedId: club_id });
            });
        });
    }
    static getClubMemberById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select U.name, U.email, U.user_id, M.role 
            from ajoucm.USER as U, ajoucm.CLUB as C, ajoucm.MEMBER as M 
            where U.user_id = M.user_id and C.club_id = M.club_id 
            and M.status = "승인"  and C.club_id=?;`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
    static getClubApplicationMemberById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select U.name, U.email, U.user_id
            from ajoucm.USER as U, ajoucm.CLUB as C, ajoucm.MEMBER as M 
            where U.user_id = M.user_id and C.club_id = M.club_id 
            and M.status = "대기"  and C.club_id=?;`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
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
    static getClubRecruitmentById(club_id) {
        return new Promise((resolve, reject)=>{
            const query = `select R.recruitment_id, R.description, R.posted_date,R.deadline,R.update_at
            from ajoucm.CLUB as C, ajoucm.RECRUITMENT as R 
            where C.club_id = R.club_id and C.club_id=1`;
            db.query(query, [club_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    }
}

module.exports = Club;