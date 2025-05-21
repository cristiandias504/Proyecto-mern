const { Router } = require('express');
const router = Router();

const {getUsers, createUsers, deleteUsers} = require('../controllers/users.controller')

router.route('/')
    .get(getUsers)
    .post(createUsers)

router.route('/:id')
    .delete(deleteUsers)

module.exports = router;