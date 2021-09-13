const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')

//const usersFilePath = path.join(__dirname, '../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let db = require('../database/models')


const controlador = {
    login: (req, res) => {

        let errors = validationResult(req);
        let userLogged = '';

        if (errors.isEmpty()) {

            db.Users.findOne({
                where: {
                  userEmail: req.body.userEmail
                }
              })
            .then( user => {

                if (bcryptjs.compareSync(req.body.userPassword, user.userPassword)) {
                    userLogged = user;
                }

                else {
                    userLogged = undefined;
                }

                if (userLogged == undefined) {
                    return res.render('users/register', { errors: [{ msg: 'Credenciales invalidas' }] })
                } 
                else {
                    req.session.usuarioLogueado = userLogged
                    console.log('Usuario logueado:',  userLogged)
                    return res.redirect(303, '/')
                }
            })

        }

        else { res.render('users/register', { errors: errors.errors }) }

    }
}



module.exports = controlador;