const { response, request } = require("express");
const bcryptjs = require('bcryptjs')

const User = require('../models/users.db');



const usersGet = (req=request, res = response) => {
const {q, nombre, apikey} = req.query;
    res.json({
        msg: "Get working - controller",
        q,
        nombre,
        apikey
    })
}

const usersPost =  async (req=request, res=response) => {




const {nombre, correo, password, role} = req.body;
const user = new User({nombre, correo, password, role});

//Verificar si el correo existe
const existEmail = await User.findOne({correo});
if (existEmail) {
    return res.status(400).json({
        msg: 'Ese correo ya esta en uso'
    })
}


//Verificar la contraseña
const salt = bcryptjs.genSaltSync();
user.password = bcryptjs.hashSync(password.toString(), salt)


await user.save();
    res.json({
        msg: "Post working - controller",
        user
    })
}

const usersPut = (req = request, res=response) => {
    const {id} = req.params;
    res.json({
        msg: "Put working - controller",
        id
    })
}

const usersPath =  (req, res) => {
    res.json({
        msg: "Patch working - controller"
    })
}

const usersDelete = (req, res) => {
    res.json({
        msg: "Delete working - controller"
    })
}

module.exports = {
    usersGet,
    usersDelete,
    usersPath,
    usersPost,
    usersPut
}