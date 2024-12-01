const db = require("../config/db");

class User{
    static getUser() {
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM USER;";
            db.query(query, (err, data) =>{
                if(err) reject`{$(err)}`;
                resolve(data);
            });
        });
        
    };
    
}

module.exports = User;