const { Router } = require('express')
const { usersGet, usersPost, usersPut, usersDelete, usersPath } = require('../controllers/users')
const { check } = require('express-validator')
const { validateEntries } = require('../middlewares/validate-entries')
const { isRoleValid } = require('../helpers/db-validators')


const router = Router()

router.get('/', usersGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener seis caracteres').isLength({min: 6}),
    check('correo', 'Ese correo no es valido').isEmail(),
    check('role').custom(isRoleValid),
    validateEntries
], usersPost)

router.put('/:id', usersPut)

router.delete('/', usersDelete)

router.patch('/', usersPath)


module.exports = router