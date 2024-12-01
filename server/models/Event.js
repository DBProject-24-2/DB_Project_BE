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
    static getEventById(id) {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM EVENT where event_id = ?;";
            db.query(query, [id], (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data[0]);
            });
        });
    }
}
module.exports = Event;