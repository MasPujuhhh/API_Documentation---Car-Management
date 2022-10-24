const router = require('express').Router()
const carsController = require('./../controller/carsController')
const authMiddleware = require('./../middlewares/auth-middleware')


router.use(authMiddleware)

router.get('/cars', carsController.getAllCar)
router.post('/car', carsController.addCar)
router.get('/car/:id', carsController.getCarById)
router.put('/car/:id', carsController.updateCar)
router.delete('/car/:id', carsController.deleteCar)

module.exports = router