const { Router } = require('express')
const { usersGet, usersPost, usersPut, usersDelete, usersPath } = require('../controllers/users')
const { check } = require('express-validator')
const { validateEntries } = require('../middlewares/validate-entries')
const { isRoleValid, emailValid, existUserById } = require('../helpers/db-validators')


const router = Router()

router.get('/', usersGet)

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isRoleValid),
    validateEntries
], usersPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener seis caracteres').isLength({min: 6}),
    check('correo', 'Ese correo no es valido').isEmail(),
    check('correo').custom(emailValid),
    check('role').custom(isRoleValid),
    validateEntries
], usersPost)



router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
], usersDelete)

router.patch('/', usersPath)


module.exports = router