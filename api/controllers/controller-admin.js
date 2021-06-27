const config = require('../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const sha1 = require('sha1');

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {

    postLogin(req, res) {
        let id = req.params.id;
        let dataLogin = {
            email: req.body.email,
            password: sha1(req.body.password),
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM admin WHERE email = ? AND password = ?;
                `
                , [dataLogin.email, dataLogin.password],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },

    // Update data admin
    editDataAdmin(req, res) {
        let dataEdit = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            updated_at: Date.now()
        }
        let id = req.body.id
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE admin SET ? WHERE id = ?;
                `
                , [dataEdit, id],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil edit data!',
                    });
                });
            connection.release();
        })
    },

}