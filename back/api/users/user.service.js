const pool  = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users(user_id, parent_id, your_name, user_name, mobile_number, password)
            values(?,?,?,?,?,?)`,
            [
                data.user_name,
                data.parent_id,
                data.your_name,
                data.user_name,
                data.mobile_number,
                data.password
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    accoutDetails: (data, callBack) => {
        pool.query(
            `UPDATE users SET account_number=?, account_name=?, bank_ifsc_code=? WHERE user_id=?`,
            [
                data.account_number,
                data.account_name,
                data.bank_ifsc_code,  
                data.user_id          
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getAllUser: callBack => {
        pool.query(
            `select user_id, your_name, mobile_number, user_payment from users`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserId: callBack => {
        pool.query(
            `SELECT user_id FROM airintact.users where user_payment='true'`,
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllChildren: (parent_id, callBack) => {
        pool.query(
            `SELECT your_name, user_payment FROM airintact.users where parent_id = ?`,
            [parent_id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select user_id, parent_id, your_name, user_name, mobile_number, role from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id=?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                console.log();
                return callBack(null, results[0]);
            }
        );
    },
    userLogin:(user_name, callBack) => {
        pool.query(
            `select role, user_payment, your_name, parent_id, user_id, password, account_number from users where user_name = ?`,
            [user_name],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}