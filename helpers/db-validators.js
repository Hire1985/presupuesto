const Role = require('../models/role')
const User = require('../models/users.db');

const isRoleValid = async(role = '')=> {
    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`El rol ${role} no esta en la DB`);
    }
}


const emailValid = async (correo = '') => {
    const existEmail = await User.findOne({correo});
    if (existEmail) {
      throw new Error(`El correo ${correo} ya esta en la DB`)
    }
}

const existUserById = async (id ) => {
    const existUserId = await User.findOne({_id: id});
    if (!existUserId) {
      throw new Error(`El ID ${id} no esta en la DB`)
    }
}



module.exports = {
    isRoleValid,
    emailValid,
    existUserById
}