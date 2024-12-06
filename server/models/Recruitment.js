const db = require("../config/db");

class Recruitment {
    static getRecruitments() {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM RECRUITMENT";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    static getRecruitmentById(recruitment_id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM RECRUITMENT where recruitment_id = ?;";
            db.query(query, [recruitment_id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    };
    static createRecruitmentById(club_id, {title, description, deadline}) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO RECRUITMENT (club_id,title, description, deadline)
                VALUES (?,?, ?, ?);
            `;
            const values = [club_id,title, description, deadline];

            db.query(query, values, (err, data) => {
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    static updateEventByEventId(recruitment_id, {title,description, deadline}) {
        return new Promise((resolve, reject)=>{
            const query = "UPDATE RECRUITMENT SET title=?, description = ?, deadline = ? WHERE club_id = ?;"
            const values = [title, description, deadline, recruitment_id];
            db.query(query, values, (err, data) =>{
                if(err) reject({err});
                resolve({data:data,sucess: "1",  message: 'RECRUITMENT updated successfully', updatedId: recruitment_id });
            });
        });
    }
    static deleteEventByEventId(recruitment_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM RECRUITMENT WHERE recruitment_id = ?";
            db.query(query, [recruitment_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'RECRUITMENT deleted successfully', updatedId: recruitment_id });
            });
        });
    }
}

module.exports = Recruitment;