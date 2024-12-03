const db = require("../config/db");

class Event {
    static getAllEvents() {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM EVENT";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    static getEventByEventId(id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM EVENT where event_id = ?;";
            db.query(query, [id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    };
    static createEventByClubId(club_id, {title, location, description, event_date}) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO EVENT (club_name, leader_id, description, contact_email, category)
                VALUES (?, ?, ?, ?, ?);
            `;
            const values = [club_id, title, location, description, event_date];

            db.query(query, values, (err, data) => {
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
    };
    static updateEventByEventId(evnet_id, {title, location, description, event_date }) {
        return new Promise((resolve, reject)=>{
            const query = "UPDATE EVENT SET title = ?, location = ?, description = ?, event_date = ?, category = ? WHERE club_id = ?;"
            const values = [evnet_id, title, location, description, event_date];
            db.query(query, values, (err, data) =>{
                if(err) reject({err});
                resolve({data:data,sucess: "1",  message: 'Event updated successfully', updatedId: evnet_id });
            });
        });
    }
    static deleteEventByEventId(event_id){
        return new Promise((resolve, reject)=>{
            const query = "DELETE FROM EVENT WHERE event_id = ?";
            db.query(query, [event_id], (err, data) =>{
                if(err) reject({err});
                resolve({ data, sucess: "1", message: 'Club deleted successfully', updatedId: club_id });
            });
        });
    }
}
module.exports = Event;