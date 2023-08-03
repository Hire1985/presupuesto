const { response, request } = require("express");
const bcryptjs = require('bcryptjs')

const User = require('../models/users.db');



const usersGet = async (req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = {estado:true}

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
    ])
    res.json({
        msg: "Get working - controller",
       total,
       usuarios,


    })
}

const usersPost = async (req = request, res = response) => {




    const { nombre, correo, password, role } = req.body;
    const user = new User({ nombre, correo, password, role });

    //Verificar si el correo existe


    //Verificar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password.toString(), salt)


    await user.save();
    res.json({
        msg: "Post working - controller",
        user
    })
}

const usersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, google, correo, _id, ...rest } = req.body;

    //Validar contra DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password.toString(), salt)
    }

    const usuarioUpdate = await User.findByIdAndUpdate(id, rest)



    res.json({
        msg: "Put working - controller",
        usuarioUpdate
    })
}

const usersPath = (req, res) => {
    res.json({
        msg: "Patch working - controller"
    })
}

const usersDelete = async (req, res) => {
    const {id} = req.params;

    const userDeleted = await User.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: "Delete working - controller",
        id
    })
}

module.exports = {
    usersGet,
    usersDelete,
    usersPath,
    usersPost,
    usersPut
}