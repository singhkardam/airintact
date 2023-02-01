const { 
    create, 
    getUserId,
    getAllUser, 
    getUserById, 
    deleteUser,
    userLogin,
    accoutDetails,
    getAllChildren 
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
            if(err){
                //console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        });
    },
    accoutDetails: (req, res) => {
        const body = req.body;
        accoutDetails(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success:1,
                message:"Accout details updated successfully!"
            })
        });
    },
    getAllChildren: (req, res) => {
        const parent_id = req.params.parent_id;
        getAllChildren(parent_id, (err, results) => {
            if(err){
                console.log(err);
                return 
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "No children id found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return 
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Id Record Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserId: (req, res) => {
        getUserId((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            });
        })
    },
    getAllUser: (req, res) => {
        getAllUser((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            });
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, result) => {
            if(err){
                console.log("error => ",err);
                return;
            }
            console.log("results", result)
            if(result){
                return res.json({
                    success: 1,
                    message: "user deleted successfully"
                });
            }
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        });
    },
    login:(req, res) => {
        const body = req.body;
        userLogin(body.user_name, (err, results) => {
            if(err){
                console.log(err)
            };
            if(!results){
                return res.json({
                    success:0,
                    message: "Invalid login details"
                });
            }
            
            const result = compareSync(body.password, results.password);

            if(result){
                result.password = undefined;
                const jsonToken = sign({ result : results }, process.env.Air_Key, {
                    expiresIn: "1h"
                });

                return res.json({
                    success:1,
                    message: "Login Succesfully",
                    token: jsonToken,
                    expiresIn: 3600
                });
            } else{
                return res.json({
                    success:0,
                    message: "Invalid username and password"
                });                
            }
        });
    }
}