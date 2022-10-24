const router = require('express').Router()

const userRoutes = require('./userRoutes')
const carRoutes = require('./carRoutes')

router.use(userRoutes)
router.use(carRoutes)



module.exports = router