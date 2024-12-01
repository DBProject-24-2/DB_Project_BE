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
    static getClubById(id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM CLUB where club_id = ?;";
            db.query(query, [id], (err, data) =>{
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
    static deleteClubBYId(club_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM CLUB WHERE club_id = ?";
            db.query(query, [club_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'Club deleted successfully', updatedId: club_id });
            });
        });
    }
    
}

module.exports = Club;